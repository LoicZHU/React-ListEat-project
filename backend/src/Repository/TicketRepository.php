<?php

namespace App\Repository;

use App\Entity\Ticket;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Ticket|null find($id, $lockMode = null, $lockVersion = null)
 * @method Ticket|null findOneBy(array $criteria, array $orderBy = null)
 * @method Ticket[]    findAll()
 * @method Ticket[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TicketRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Ticket::class);
    }

    // SQL query:
    // SELECT SUM(`covers_nb`) FROM `ticket` WHERE `restaurant_id` = 5 AND `ticket`.`status` = 1

    public function findWaitingNb($restaurantId)
    {
        $em = $this->getEntityManager();

        $query = $em->createQuery(
            'SELECT SUM(t.coversNb)
            FROM App\Entity\Ticket t
            WHERE t.restaurant = :restaurantId
            AND t.status = 1'
        );
        $query->setParameter('restaurantId', $restaurantId);

        // returns total number of covers for active tickets, for a given restaurant
        return $query->getSingleScalarResult();;
    }
    
    public function findWhereEstimated($current)
    {
        $em = $this->getEntityManager();

        $query = $em->createQuery(
            'SELECT t
            FROM App\Entity\Ticket t
            WHERE t.status = :status
            AND t.statusnotification = :statusnotification
            AND t.estimatedWaitingTime <= :estimatedWaitingTime'
    
        );
        $query->setParameter('status', 1);
        $query->setParameter('statusnotification', 0);
        $query->setParameter('estimatedWaitingTime', $current);
        // returns total number of covers for active tickets, for a given restaurant
        return  $query->getResult();
    }

    public function findWhere($current)
    {
        $em = $this->getEntityManager();

        $query = $em->createQuery(
            'SELECT t
            FROM App\Entity\Ticket t
            WHERE t.status = :status OR t.status = :statusCancelled
            AND t.createdAt < :estimatedWaitingTime'
        
        );
        $query->setParameter('status', 2);
        $query->setParameter('statusCancelled', 0);
        $query->setParameter('estimatedWaitingTime', $current);
        // returns total number of covers for active tickets, for a given restaurant
        return  $query->getResult();
    }

    // /**
    //  * @return Ticket[] Returns an array of Ticket objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Ticket
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}