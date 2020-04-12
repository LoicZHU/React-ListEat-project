<?php

namespace App\Controller\Api;

use App\Entity\Ticket;
use App\Entity\Customer;
use App\Entity\Restaurant;
use App\Repository\CustomerRepository;
use App\Repository\TicketRepository;
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
    public function add(Request $request, RestaurantRepository $restaurantRepository, DenormalizerInterface $denormalizer, ValidatorInterface $validator, \Swift_Mailer $mailer)
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

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($customer);
        $entityManager->persist($ticket);
        $entityManager->flush();
    
    return $this->json(['ticketId' => $ticket->getId(), 'estimatedWaitingTime' => 30], Response::HTTP_CREATED);
    }

    /**
     * @Route("/api/tickets/id", name="api_tickets_edit", methods={"PUT"})
     */
    public function edit(Request $request, TicketRepository $ticketRepository, CustomerRepository $customerRepository, RestaurantRepository $restaurantRepository, \Swift_Mailer $mailer)
    {

        $data = json_decode($request->getContent());
        
        $ticket = $ticketRepository->find($data->ticket->id);
        
        if ($ticket) {
        $customer = $customerRepository->findBy(['ticket' => $ticket->getId()]);
        // when findBy is used, it returns an array in which the results/objects are stored, therefore, in order to use methods on an object (impossible on an array) we have to retrieve the object with its key
        $customer = $customer[0];
        $restaurant = $restaurantRepository->findBy(['id' => $ticket->getRestaurant()]);
        $restaurant = $restaurant[0];
        } else {
            return $this->json(['message' => 'Le ticket n\'existe pas.'], Response::HTTP_NOT_FOUND);
        }

        if ($data->ticket->validation == "validate") {
            $ticket->setStatus(1);
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

        return $this->json(['ticketId' => $ticket->getId(), 'estimatedWaitingTime' => 30], Response::HTTP_OK);

        } elseif ($data->ticket->validation == "cancel") {
            $ticket->setStatus(0);
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->flush();
            return $this->json(['ticketId' => $ticket->getId()], Response::HTTP_OK);
        }


    }
}