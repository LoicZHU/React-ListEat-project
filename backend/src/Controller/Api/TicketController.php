<?php

namespace App\Controller\Api;

use App\Entity\Ticket;
use App\Service\Timer;
use App\Service\CryptoService;
use App\Entity\Customer;
use App\Repository\TicketRepository;
use App\Repository\CustomerRepository;
use App\Repository\RestaurantRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Messenger\MessageBus;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

class TicketController extends AbstractController
{

    /**
     * @Route("/api/decrypt/tickets", name="api_tickets_decrypt", methods={"POST"})
     */
    public function decryptId(Request $request, TicketRepository $ticketRepository)
    {
        $data = json_decode($request->getContent());
        
        $ticketId = CryptoService::decrypt($data->ticket);

        $ticket = $ticketRepository->find($ticketId);
        
        // $serializer = $this->get('serializer');
        // $data = $serializer->serialize($ticket, 'json' , ['groups' => 'ticket_decrypt']);
        
        //return $this->json($data, 200, [], ['groups' => 'ticket_decrypt']);
        return new Response($ticket, 200, [], ['groups' => 'ticket_decrypt']);
    }

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
        
        // if restaurant's status is inactive, the customer will be unable to subscribe to the waiting list and get a ticket
        if ($restaurant->getStatus() === 0) {
            return $this->json(['message' => 'Le restaurant est fermé ou ne peut plus accepter de nouveaux clients.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $ticket->setRestaurant($restaurant);

        $ticket->setCustomer($customer);

        // getting all data needed in order to calculate the estimated waiting time
        $averageEatingTime = $restaurant->getAverageEatingTime();
        $seatNb = $restaurant->getSeatNb();
        $waitingNb = $ticketRepository->findWaitingNb($data->restaurant);

        $estimatedWaitingTime = Timer::estimatedTime($waitingNb, $averageEatingTime, $seatNb);

        $ticket->setEstimatedWaitingTime($estimatedWaitingTime);

        // getting the estimated entry time by adding the estimated waiting time to the current time
        $estimatedEntryTime = Timer::estimatedEntryTime($estimatedWaitingTime);

        $ticket->setEstimatedEntryTime($estimatedEntryTime);
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($customer);
        $entityManager->persist($ticket);
        $entityManager->flush();
    
    return $this->json(['ticketId' => $ticket->getId(), 'ticketStatus' => $ticket->getStatus(), 'estimatedWaitingTime' => $estimatedWaitingTime, 'estimatedEntryTime' => $estimatedEntryTime], Response::HTTP_CREATED);
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

        //// Sending New ticket To the Front By WebSocket///////////////////

            // We asset token  
            define('PUBLIC_JWT', $_ENV['MERCURE_JWT_TOKEN']);

            $topic = 'ticket';
            $restaurantId = $restaurant->getId();
            //We put $ticket objet on
            $serializer = $this->get('serializer');
            $data = $serializer->serialize($ticket, 'json' , ['groups' => 'tickets_get']);
    
            $postData = http_build_query([
                // we stay on topic
                'topic' => 'https://www.listeat.io/'.$topic."/".$restaurantId,
                'data' => json_encode([
                    'eventName' => $data,
                ]),
            ]);
         
                // we do a POST request to mercure
                $r = file_get_contents($_ENV['MERCURE_PUBLISH_URL'], false, stream_context_create(['http' => [
                    'method'  => 'POST',
                    'header'  => "Content-type: application/x-www-form-urlencoded\r\nAuthorization: Bearer ".PUBLIC_JWT,
                    'Content-Security-Policy' => "upgrade-insecure-requests",
                    'content' => $postData,
                ]]));

         
            $postData = http_build_query([
                // we stay on topic
                'topic' => 'https://www.listeat.io/backoffice',
                'data' => json_encode([
                    'eventName' => 'new add ticket',
                ]),
            ]);

            //Make function or service for send
            // we do a POST request to mercure
          
                $r = file_get_contents($_ENV['MERCURE_PUBLISH_URL'], false, stream_context_create(['http' => [
                    'method'  => 'POST',
                    'header'  => "Content-type: application/x-www-form-urlencoded\r\nAuthorization: Bearer ".PUBLIC_JWT,
                    'Content-Security-Policy' => "upgrade-insecure-requests",
                    'content' => $postData,
                ]]));
          
        
            // if (!$r) {
            //     echo sprintf("Erreur lors de l'envoi du message: %s\n", $r);
            // }

            // echo sprintf("Le message a bien été envoyé, reçu un ID: %s\n", $r);

     ////////////////////////////////////////////////////////////////////

        // Cancellation route customer
        $cryptedId = CryptoService::crypt($id);
        // /tickets/id/customer-cancellation
        //////////////////////////////////// TODO RECTIFICATION SERVER HOSTING//////////////////////////////////////
        $routeCancel = 'https://www.listeat.io/tickets/'.$cryptedId.'/customer-cancellation';
    
         // Email sent to the customer to confirm the subscription to the waiting list
         $message = (new \Swift_Message('Information client ListEat'))
        ->setFrom('team@listeat.io')
        ->setTo($customer->getEmail())
        ->setBody(
                    $this->renderView(
                        'emails/subscription.html.twig',
                        ['name' => $customer->getfirstName(),
                        'restaurantName' => $restaurant->getName(),
                        'ticketId' => $ticket->getId(),
                        'estimatedWaitingTime' => $ticket->getEstimatedWaitingTime(),
                        'estimatedEntryTime' => $ticket->getEstimatedEntryTime(),
                        'customerCancellation' => $routeCancel
                        ]
                    ),
                    'text/html'
                );

        $mailer->send($message);

        return $this->json(['message' => 'Votre inscription sur la liste d\'attente a bien été validée.', 'ticketId' => $ticket->getId(), 'ticketStatus' => $ticket->getStatus(), 'estimatedWaitingTime' => $ticket->getEstimatedWaitingTime(), 'estimatedEntryTime' => $ticket->getEstimatedEntryTime(), 'restaurantId' => $restaurant->getId()], Response::HTTP_OK);

        } elseif ($data->validation == "cancel") {
            $ticket->setStatus(2);
            $ticket->setUpdatedAt(new \DateTime());
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->flush();


            //// Sending New ticket To the Front By WebSocket///////////////////

            // We asset token  
            define('PUBLIC_JWT', $_ENV['MERCURE_JWT_TOKEN']);

            $topic = 'ticket-delete';
            $restaurantIdD = $restaurant->getId();
            //We put $ticket objet on
            $serializer = $this->get('serializer');
            $data = $serializer->serialize($ticket, 'json' , ['groups' => 'tickets_get']);
    
            $postData = http_build_query([
                // we stay on topic
                'topic' => 'https://www.listeat.io/'.$topic."/".$restaurantIdD,
                'data' => json_encode([
                    'eventName' => $data,
                ]),
            ]);
         
                // we do a POST request to mercure
                $r = file_get_contents($_ENV['MERCURE_PUBLISH_URL'], false, stream_context_create(['http' => [
                    'method'  => 'POST',
                    'header'  => "Content-type: application/x-www-form-urlencoded\r\nAuthorization: Bearer ".PUBLIC_JWT,
                    'Content-Security-Policy' => "upgrade-insecure-requests",
                    'content' => $postData,
                ]]));

         
            $postData = http_build_query([
                // we stay on topic
                'topic' => 'https://www.listeat.io/backoffice',
                'data' => json_encode([
                    'eventName' => 'new delete ticket',
                ]),
            ]);

            //Make function or service for send
            // we do a POST request to mercure
          
                $r = file_get_contents($_ENV['MERCURE_PUBLISH_URL'], false, stream_context_create(['http' => [
                    'method'  => 'POST',
                    'header'  => "Content-type: application/x-www-form-urlencoded\r\nAuthorization: Bearer ".PUBLIC_JWT,
                    'Content-Security-Policy' => "upgrade-insecure-requests",
                    'content' => $postData,
                ]]));
          
        
            // if (!$r) {
            //     echo sprintf("Erreur lors de l'envoi du message: %s\n", $r);
            // }

            // echo sprintf("Le message a bien été envoyé, reçu un ID: %s\n", $r);

     ////////////////////////////////////////////////////////////////////


            return $this->json(['message' => 'Votre inscription sur la liste d\'attente a bien été annulée.','ticketId' => $ticket->getId(), 'ticketStatus' => $ticket->getStatus()], Response::HTTP_OK);
        }

    }

    /**
    * @Route("/api/partner/{id<\d+>}/tickets", name="api_tickets_show", methods={"GET"})
    */
    public function showAll($id, TicketRepository $ticketRepository, RestaurantRepository $restaurantRepository)
    {
        //$hasAccess = $this->isGranted('ROLE_RESTAURATEUR');
        //$this->denyAccessUnlessGranted('ROLE_RESTAURATEUR');

        $restaurant = $restaurantRepository->find($id);

        if (!$restaurant) {
            return $this->json(['message' => 'Ce restaurant n\'existe pas.'], Response::HTTP_NOT_FOUND);
        }
        
        // finds all active tickets related to a single restaurant, ordered by estimatedEntryTime, sorted in ascending order
        $tickets = $ticketRepository->findBy(['restaurant' => $restaurant, 'status' => 1], ['estimatedEntryTime' => 'ASC']);

        return $this->json($tickets, 200, [], ['groups' => 'tickets_get']);
    }

    /**
     * @Route("api/partner/{id<\d+>}/tickets/{ticketId<\d+>}", name="api_tickets_partner_edit", methods={"PUT"})
     */
    public function partnerEdit($id, $ticketId, Request $request, TicketRepository $ticketRepository, CustomerRepository $customerRepository, RestaurantRepository $restaurantRepository)
    {
        /*
        {
            "status": "confirmed" / "seated" / "cancelled" / "restored"
        }
        */
        $data = json_decode($request->getContent());

    
        $ticket = $ticketRepository->findBy(['restaurant' => $restaurantRepository->find($id), 'id' => $ticketId]);
        
        if (!$ticket) {
            return $this->json(['Ce ticket n\'existe pas.'], Response::HTTP_NOT_FOUND);
        }
        $ticket = $ticket[0];

        // if the ticket was created by the restaurateur, the below condition can be used to confirm the ticket and add the customer to the waiting list (thus not sending an email to the customer, contrary to the validation made by the client him/herself)
        if ($data->status == "confirmed") {
            $ticket->setStatus(1);
            $ticket->setUpdatedAt(new \DateTime());
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->flush();

            return $this->json(['message' => 'Le ticket est confirmé. Le client a bien été ajouté à la liste d\attente.', 'ticketId' => $ticket->getId(), 'ticketStatus' => $ticket->getStatus(), 'estimatedWaitingTime' => $ticket->getEstimatedWaitingTime(), 'estimatedEntryTime' => $ticket->getEstimatedEntryTime()], Response::HTTP_OK);
        }

        // when the restaurateur is seating the clients
        if ($data->status == "seated") {
            $ticket->setStatus(0);
            $ticket->setUpdatedAt(new \DateTime());
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->flush();

            return $this->json(['message' => 'Les clients du ticket ont été installés.', 'ticketId' => $ticket->getId(), 'ticketStatus' => $ticket->getStatus()], Response::HTTP_OK);
        }

        // when the restaurateur cancels a ticket due to a no-show or a client whose ticket has been created by the restaurateur and deems the wait too long
        if ($data->status == "cancelled") {
            $ticket->setStatus(2);
            $ticket->setUpdatedAt(new \DateTime());
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->flush();

            return $this->json(['message' => 'Le ticket a été annulé.', 'ticketId' => $ticket->getId(), 'ticketStatus' => $ticket->getStatus()], Response::HTTP_OK);
        }

        // calculating the time difference between the last updated time of the ticket and the restoration time of this same ticket
        // TODO: put the below calculation in a service
        $lastUpdatedTime = $ticket->getUpdatedAt();
        $restoreTime = new \DateTime();
        $dateInterval = $lastUpdatedTime->diff($restoreTime);
        $daysInMin = $dateInterval->d * 24 * 60;
        $hoursInMin = $dateInterval->h * 60;
        $minutes = $dateInterval->i;
        $totalMinutes = $daysInMin + $hoursInMin + $minutes;
        $interval = $totalMinutes;

        // TODO: see if we only allow this function to be performed on tickets which statuses are 0
        if ($data->status == "restored" && $interval < 5) {
            $ticket->setStatus(1);
            $ticket->setUpdatedAt(new \DateTime());
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->flush();

            return $this->json(['message' => 'Le ticket a été restauré.', 'ticketId' => $ticket->getId(), 'ticketStatus' => $ticket->getStatus()], Response::HTTP_OK);
        } else {
            return $this->json(['message' => 'Ce ticket ne peut plus être restauré. Veuillez en créer un nouveau.', 'ticketId' => $ticket->getId(), 'ticketStatus' => $ticket->getStatus()], Response::HTTP_OK);
        }

    }

}