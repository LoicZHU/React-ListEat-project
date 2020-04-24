<?php

namespace App\Controller\Backend;

use App\Repository\CustomerRepository;
use App\Repository\TicketRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class DashController extends AbstractController
{
    /**
     * @Route("/backend/dash", name="backend_dash")
     */
    public function index(UserRepository $userRepository ,TicketRepository $ticketRepository, CustomerRepository $customerRepository)
    {
        return $this->render('backend/dash/index.html.twig', [
            'controller_name' => 'DashController',
            'waiting' =>  $ticketRepository->findWaiting(),
            'customer' => $customerRepository->findNb(),
            'ticketNb' => $ticketRepository->countTicket(),
            'userNb' => $userRepository->countUser(),
            'ticketsCancelled' => $ticketRepository->countCancelled(),
            'coversNb' => $ticketRepository->countCovers()
        ]);
    }
}
