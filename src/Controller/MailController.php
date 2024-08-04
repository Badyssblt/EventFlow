<?php

namespace App\Controller;

use App\Entity\Event;
use App\Entity\Participant;
use Symfony\Component\Mime\Email;
use App\Service\InvitationService;
use App\Repository\InvitationRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class MailController extends AbstractController
{
    #[Route('/invitation/{id}', name: 'app_mail_invite', methods: ['POST'])]
    public function sendInvitation(Request $request, Event $event, InvitationService $invitationService)
    {
        $receiver = $request->getPayload()->get('mail');

        return $invitationService->sendInvitationEmail($receiver, $event);
    }

    #[Route('/accept-invitation/{token}', name: 'app_accept_invitation', methods: ['POST', 'GET'])]
    public function accept($token, InvitationRepository $invitationRepository, EntityManagerInterface $manager)
    {
        $user = $this->getUser();
        $invitation = $invitationRepository->findOneBy(['token' => $token]);

        if (!$invitation) return $this->json(['message' => 'Cette invitation a expirée'], Response::HTTP_BAD_REQUEST);

        $event = $invitation->getEvent();


        $participant = new Participant();
        $participant->setUser($user);
        $participant->setEvent($event);


        $event->addParticipant($participant);

        $manager->persist($event);
        $manager->flush();

        return $this->json(['message' => 'Vous avez accepter l\'invitation']);
    }
}
