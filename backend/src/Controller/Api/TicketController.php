<?php

namespace App\Controller\Api;

use App\Entity\Ticket;
use App\Entity\Customer;
use App\Entity\Restaurant;
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
    public function add(Request $request, RestaurantRepository $restaurantRepository, DenormalizerInterface $denormalizer, ValidatorInterface $validator)
    {

        /* le JSON attendu est :
        {
            "customer": {
                "lastName": "Oclock",
                "firstName": "Nicole",
                "cellPhone": "0612345678",
                "email": "nicole@oclock.io"		
            },
            "ticket": {
                "coversNb",
                "status"
            }
        }
        */

        $data = json_decode($request->getContent());
        //dd($data);

        $customer = $denormalizer->denormalize($data, Customer::class);
        $errorsCustomer = $validator->validate($customer);

        $ticket = $denormalizer->denormalize($data->ticket, Ticket::class);
        $errorsTicket = $validator->validate($ticket);

        //$restaurant = $denormalizer->denormalize($data->restaurant, Restaurant::class);
        //$errorsTicket = $validator->validate($ticket);
        
        $restaurant = $restaurantRepository->find($data->restaurant);

        $ticket->setRestaurant($restaurant);

        $ticket->setCustomer($customer);

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

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($customer);
        $entityManager->persist($ticket);
        $entityManager->flush();


        //We send Email At The New Restaurant
        /*$message = (new \Swift_Message('Information partenaire ListEat'))

            ->setFrom('send@example.com')
            ->setTo($user->getEmail())
            ->setBody(
                        $this->renderView(
                            
                            //TODO Registration Template 
                            // templates/emails/registration.html.twig
                            'emails/registration.html.twig',
                            ['name' => $customer->getfirstName(),
                            'ticketId' => $ticket->getId()]
                        ),
            'text/html'
                    );

        $mailer->send($message);*/
    
    return $this->json(['ticketId' => $ticket->getId()], Response::HTTP_CREATED);
    }
}