<?php

namespace App\Controller\Api;


use App\Service\StatusService;
use App\Repository\UserRepository;
use App\Repository\TicketRepository;
use App\Repository\CustomerRepository;
use App\Repository\RestaurantRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class BackOfficeController extends AbstractController
{
    /**
     * @Route("/back/office/user", name="back_office_user", methods={"GET"})
     */
    public function getPosition(RestaurantRepository $restaurantRepository)
    {
        $restaurant = $restaurantRepository->findAll();
 
        return $this->json ($restaurant, 200, [], ['groups' => 'restaurant_backoffice']);
       
    }

     /**
     * @Route("/back/office", name="back_office", methods={"GET"})
     */
    public function Getinformation(UserRepository $userRepository ,TicketRepository $ticketRepository, CustomerRepository $customerRepository)
    {

        $datas =   [
            'controller_name' => 'DashController',
            'waiting' =>  $ticketRepository->findWaiting(),
            'customer' => $customerRepository->findNb(),
            'ticketNb' => $ticketRepository->countTicket(),
            'userNb' => $userRepository->countUser(),
            'ticketsCancelled' => $ticketRepository->countCancelled(),
            'coversNb' => $ticketRepository->countCovers()
        ];

        return $this->json($datas, 200, []);
       
    }

      /**
     * @Route("/back/office/test", name="back_office_test", methods={"GET"})
     */
    public function Gettest(UserRepository $userRepository ,TicketRepository $ticketRepository, CustomerRepository $customerRepository)
    {

        $datas = StatusService::test();


        return $this->json($datas, 200, []);
       
    }

}
