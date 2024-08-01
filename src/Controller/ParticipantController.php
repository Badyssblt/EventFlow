<?php

namespace App\Controller;

use App\Repository\ParticipantRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ParticipantController extends AbstractController
{
    #[Route('/events/participated', name: 'app_event_participated')]
    public function getParticipatedEvent()
    {
        $user = $this->getUser();

        $participants = $user->getParticipants();

        return $this->json($participants, Response::HTTP_OK, [], ["groups" => ["collection:participant"]]);
    }

    #[Route('/ticket/{ticketId}', name: 'app_get_ticket')]
    public function getTicket(ParticipantRepository $participantRepository, string $ticketId)
    {
        $event = $participantRepository->findOneBy(['identifier' => $ticketId]);

        return $this->json($event, Response::HTTP_OK, [], ["groups" => ["item:participant"]]);
    }
}
