<?php

namespace App\Command;

use DateTime;
use DateInterval;
use App\Entity\Ticket;
use App\Repository\TicketRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class SendNotifComeCommand extends Command
{
    protected static $defaultName = 'app:send:notif';

    private $ticketRepository;
    private $entityManager;

    /**
     * On récupère nos services via le constructeur
     * (car la commande est elle aussi un service)
     */
    public function __construct(TicketRepository $ticketRepository, EntityManagerInterface $entityManager)
    {
        $this->ticketRepository = $ticketRepository;
        $this->entityManager = $entityManager;

        // On appelle le constructeur du parent qui contient du code
        // si non exécuté => bug
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
     * Que fait la commande
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $io->title('Listing all tickets coming shedull');

        $time = new DateTime();
        $time->add(new DateInterval('PT' . 5 . 'M'));
        $stamp = $time->format('Y-m-d H:i');
   
        // 1. Aller chercher les ticket depuis la BDD
        $tickets = $this->ticketRepository->findWhereEstimated($stamp);

dd($tickets);

        // 2. Parcourir chaque film
        // foreach ($tickets as $movie) {


        //     $message = (new \Swift_Message('Information client ListEat'))

        //     ->setFrom('send@example.com')
        //     ->setTo($customer->getEmail())
        //     ->setBody(
        //                 $this->renderView(
        //                     'emails/subscription.html.twig',
        //                     ['name' => $customer->getfirstName(),
        //                     'restaurantName' => $restaurant->getName(),
        //                     'ticketId' => $ticket->getId()]
        //                 ),
        //                 'text/html'
        //             );
    
        //     $mailer->send($message);



            // 3. Pour chaque film, lire le JSON depuis OMDBAPI avec la clé
            // 4. Lire l'attribut "Poster"
        //     $url = $this->getPosterUrlFromMovie($movie);

        //     // 5. Télécharger l'image en local (dans le dossier public par ex.)
        //     if ($url !== null) {
        //         $filename = $this->downloadFromUrl($url, $movie->getId());
        //     } else {
        //         $filename = null;
        //     }
        //     // 6. Mettre à jour l'entité $movie avec son nom d'image
        //     $movie->setPoster($filename);

        //     // Dump
        //     if ($input->getOption('dump')) {
        //         $io->text($movie->getTitle() . ' image=' . $filename);
        //     }
        // }
        // // On flush tous les films
        // $this->entityManager->flush();

//        $io->success('Posters downloaded');

        return 0;
    }

}
