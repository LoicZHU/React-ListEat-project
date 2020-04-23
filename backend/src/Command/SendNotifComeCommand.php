<?php

namespace App\Command;

use Twig\Environment;
use App\Entity\Ticket;
use App\Repository\TicketRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class SendNotifComeCommand extends Command
{
    protected static $defaultName = 'app:send:notif';

    private $ticketRepository;
    private $entityManager;
    private $mailer;
    private $twig;

    /**
     * On récupère nos services via le constructeur
     * (car la commande est elle aussi un service)
     */
    public function __construct(ContainerInterface $container,TicketRepository $ticketRepository, EntityManagerInterface $entityManager, \Swift_Mailer $mailer, Environment $twig )
    {
        $this->ticketRepository = $ticketRepository;
        $this->entityManager = $entityManager;
        $this->mailer = $mailer;
        $this->twig = $twig;
        $this->container = $container;

        parent::__construct();
    }

    /**
     * Configuration de la commande
     */
    protected function configure()
    {
        $this
            ->setDescription('Send notification at the user ticket when is time')
            ->addOption('dump', 'd', InputOption::VALUE_NONE, 'Display ticket information')
        ;
    }

    /**
     * Sending mail and chaging status of statusnotification and write on Notification.txt
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $io->title('Listing all tickets coming soon -5min');

        $currentTime = date("d/m/Y H:i:s", strtotime('now')); 
        $stamp = date("Y/m/d H:i:s", strtotime('now +5 Minutes')); 
        //dd($stamp);
        // 1. Get tickets from the BDD
        $tickets = $this->ticketRepository->findWhereEstimated($stamp);

        //We send mail at all tickets
        foreach ($tickets as $ticket) {

            if($ticket->getCustomer()->getEmail()){

                echo ($ticket->getCustomer()->getEmail()); 

                $message = (new \Swift_Message('Votre passage est imminent'))

                ->setFrom('team@listeat.io')
                ->setTo($ticket->getCustomer()->getEmail())
                ->setBody(
                            $this->twig->render(
                                'emails/notif-passage.html.twig',
                                ['name' => $ticket->getCustomer()->getFirstName(),
                                'restaurantName' => $ticket->getRestaurant()->getName(),
                                'ticketId' => $ticket->getId(),
                                'CoverNb'=> $ticket->getCoversNb()]
                            ),
                            'text/html'
                        );
                $this->mailer->send($message);

            }
        }       
                 
        //we change statusNotification at 1 for don't send agant in other result
        foreach ($tickets as $ticket) {
           $ticket->setStatusnotification(1);
           $ticket->setUpdatedAt(new \DateTime());
           $em = $this->container->get('doctrine')->getManager();
           $em->flush();
        }          

        //We writed a history sample of notification sended a='write at the end'
        //Must write the absolut way of the file for when cron execut it
        $fichier = fopen('/var/www/html/projet-list-eat/backend/diary/Notification.txt', 'a','c+b');
        foreach ($tickets as $ticket) {
            fwrite($fichier,'to'.$ticket->getCustomer()->getEmail().'at'.$currentTime.'  ');
        }

        return 0;
    }

}
