<?php

namespace App\Command;

use Twig\Environment;
use App\Entity\Customer;
use App\Repository\CustomerRepository;
use App\Repository\TicketRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class DeleteCustomersCommand extends Command
{
    protected static $defaultName = 'app:delete:customers';

    private $ticketRepository;
    private $customerRepository;
    private $entityManager;

    /**
     * On récupère nos services via le constructeur
     * (car la commande est elle aussi un service)
     */
    public function __construct(ContainerInterface $container, TicketRepository $ticketRepository,CustomerRepository $customerRepository, EntityManagerInterface $entityManager)
    {
        $this->ticketRepository = $ticketRepository;
        $this->customerRepository = $customerRepository;
        $this->entityManager = $entityManager;
        $this->container = $container;

        parent::__construct();
    }

    /**
     * Configuration de la commande
     */
    protected function configure()
    {
        $this
            ->setDescription('Delete all customers older than 1 month')
            ->addOption('dump', 'd', InputOption::VALUE_NONE, 'Display customer information')
        ;
    }

    /**
     * Delete all customers older than 1 month
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $io->title('Delete all customers above 1 month');

        $currentTime = date("d/m/Y H:i:s", strtotime('now')); 
        $stamp = date("d/m/Y H:i:s", strtotime('now -1 Months'));  

        // 1. Get tickets from the BDD
        $tickets = $this->ticketRepository->findWhere($stamp);
   
        //We 
        foreach ($tickets as $ticket) {

            $customer = $this->customerRepository->find($ticket->getCustomer()->getId());

            $em = $this->container->get('doctrine')->getManager();
            $em->remove($customer);
            $em->flush();
        }       
        return 0;
    }

}
