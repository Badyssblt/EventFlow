<?php

namespace App\Repository;

use App\Entity\Event;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Event>
 */
class EventRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Event::class);
    }

    //    /**
    //     * @return Event[] Returns an array of Event objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('e')
    //            ->andWhere('e.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('e.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Event
    //    {
    //        return $this->createQueryBuilder('e')
    //            ->andWhere('e.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }


    /**
     * Find events based on search criteria
     *
     * @param array $criteria
     * @return Event[]
     */
    public function findByCriteria(array $criteria): array
    {
        $qb = $this->createQueryBuilder('e');

        foreach ($criteria as $field => $value) {
            if ($value !== null && $value !== '') {
                $paramName = str_replace('.', '_', $field);
                if (is_bool($value) || is_int($value)) {
                    $qb->andWhere("e.$field = :$paramName")
                        ->setParameter($paramName, $value);
                } elseif ($value instanceof \DateTimeImmutable) {
                    $qb->andWhere("e.$field >= :$paramName")
                        ->setParameter($paramName, $value);
                } else {
                    $qb->andWhere("e.$field LIKE :$paramName")
                        ->setParameter($paramName, '%' . $value . '%');
                }
            }
        }

        return $qb->getQuery()->getResult();
    }

    public function findByParticipantNumber(int $limit = 5)
    {
        return $this->createQueryBuilder('e')
            ->addSelect('COUNT(p.id) AS HIDDEN participantCount')
            ->leftJoin('e.participants', 'p')
            ->groupBy('e.id')
            ->orderBy('participantCount', 'DESC')
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();
    }
}
