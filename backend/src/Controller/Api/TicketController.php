<?php

namespace App\Controller\Api;

use App\Entity\Ticket;
use App\Service\Timer;
use App\Entity\Customer;
use App\Repository\TicketRepository;
use App\Repository\CustomerRepository;
use App\Repository\RestaurantRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

class TicketController extends AbstractController
{
    /**
     * @Route("/api/tickets", name="api_tickets", methods={"POST"})
     */
    public function add(Request $request, TicketRepository $ticketRepository, RestaurantRepository $restaurantRepository, DenormalizerInterface $denormalizer, ValidatorInterface $validator)
    {

        $data = json_decode($request->getContent());

        $customer = $denormalizer->denormalize($data, Customer::class);
        $errorsCustomer = $validator->validate($customer);

        $ticket = $denormalizer->denormalize($data->ticket, Ticket::class);
        $errorsTicket = $validator->validate($ticket);
        
        $jsonErrors = [];
        // $errors est une ConstraintViolationList = se comporte comme un tableau
        if (count($errorsCustomer) !== 0) {
            //$jsonErrors = [];
            foreach ($errorsCustomer as $error) {
                $jsonErrors[] = [
                    'field' => $error->getPropertyPath(),
                    'message' => $error->getMessage(),
                ];
            }
        }

        // $errors est une ConstraintViolationList = se comporte comme un tableau
        if (count($errorsTicket) !== 0) {
            //$jsonErrors = [];
            foreach ($errorsTicket as $error) {
                $jsonErrors[] = [
                    'field' => $error->getPropertyPath(),
                    'message' => $error->getMessage(),
                ];
            }
        }

        if(!empty($jsonErrors)){
            return $this->json($jsonErrors, Response::HTTP_UNPROCESSABLE_ENTITY);
        } 

        $restaurant = $restaurantRepository->find($data->restaurant);

        $ticket->setRestaurant($restaurant);

        $ticket->setCustomer($customer);

        $averageEatingTime = $restaurant->getAverageEatingTime();
        $seatNb = $restaurant->getSeatNb();
        $waitingNb = $ticketRepository->findWaitingNb($data->restaurant);

        $estimatedWaitingTime = Timer::estimatedTime($waitingNb, $averageEatingTime, $seatNb);

        $ticket->setEstimatedWaitingTime($estimatedWaitingTime);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($customer);
        $entityManager->persist($ticket);
        $entityManager->flush();
    
    return $this->json(['ticketId' => $ticket->getId(), 'estimatedWaitingTime' => $estimatedWaitingTime], Response::HTTP_CREATED);
    }

    /**
     * @Route("/api/tickets/{id<\d+>}", name="api_tickets_edit", methods={"PUT"})
     */
    public function edit($id, Request $request, TicketRepository $ticketRepository, CustomerRepository $customerRepository, RestaurantRepository $restaurantRepository, \Swift_Mailer $mailer)
    {

        $data = json_decode($request->getContent());
        
        $ticket = $ticketRepository->find($id);
        
        if ($ticket) {
        $customer = $customerRepository->findBy(['ticket' => $ticket]);
        // when findBy is used, it returns an array in which the results/objects are stored, therefore, in order to use methods on an object (impossible on an array) we have to retrieve the object with its key
        $customer = $customer[0];
        $restaurant = $restaurantRepository->findBy(['id' => $ticket->getRestaurant()]);
        $restaurant = $restaurant[0];
        } else {
            return $this->json(['message' => 'Le ticket n\'existe pas.'], Response::HTTP_NOT_FOUND);
        }

        // depending on the value of "validation" ("validate" or "cancel" - can be changed later) in the JSON, the ticket's status will be set to Active (1) or Inactive (0) and an emailing to the customer will be triggered or not

        if ($data->validation == "validate") {
            $ticket->setStatus(1);
            $ticket->setUpdatedAt(new \DateTime());
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->flush();

        // Email sent to the customer to confirm the subscription to the waiting list
        $message = (new \Swift_Message('Information client ListEat'))

        ->setFrom('send@example.com')
        ->setTo($customer->getEmail())
        ->setBody(
                    $this->renderView(
                        'emails/subscription.html.twig',
                        ['name' => $customer->getfirstName(),
                        'restaurantName' => $restaurant->getName(),
                        'ticketId' => $ticket->getId()]
                    ),
                    'text/html'
                );

        $mailer->send($message);

        // TODO: prevent the emailing if the ticket status is being changed from Inactive to Active after a faulty handling from the restaurateur

        return $this->json(['message' => 'Votre inscription à la liste d\'attente a bien été validée.', 'ticketId' => $ticket->getId(), 'estimatedWaitingTime' => $ticket->getEstimatedWaitingTime()], Response::HTTP_OK);

        } elseif ($data->validation == "cancel") {
            $ticket->setStatus(0);
            $ticket->setUpdatedAt(new \DateTime());
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->flush();
            return $this->json(['message' => 'Votre inscription à la liste d\'attente a bien été annulée.','ticketId' => $ticket->getId()], Response::HTTP_OK);
        }

    }

     /**
     * @Route("/api/partner/{id<\d+>}/tickets", name="api_tickets_show", methods={"GET"})
     */
    public function showAll($id, TicketRepository $ticketRepository, RestaurantRepository $restaurantRepository)
    {
        $restaurant = $restaurantRepository->find($id);

        if (!$restaurant) {
            return $this->json(['message' => 'Ce restaurant n\'existe pas.'], Response::HTTP_NOT_FOUND);
        }
        
        $tickets = $ticketRepository->findBy(['restaurant' => $restaurant]);

        return $this->json($tickets, 200, [], ['groups' => 'tickets_get']);
    }


}