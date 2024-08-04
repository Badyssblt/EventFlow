<?php

namespace App\Service;

use App\Entity\Event;
use App\Entity\Invitation;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Validator\Constraints\Json;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class InvitationService
{
    private $mailer;
    private $router;
    private $manager;
    private $validator;

    public function __construct(MailerInterface $mailer, UrlGeneratorInterface $router, EntityManagerInterface $manager, ValidatorInterface $validator)
    {
        $this->mailer = $mailer;
        $this->router = $router;
        $this->manager = $manager;
        $this->validator = $validator;
    }

    public function sendInvitationEmail(string $recipientEmail, Event $event)
    {

        $token = bin2hex(random_bytes(64));

        $invitation = new Invitation();
        $invitation->setEmail($recipientEmail);
        $invitation->setToken($token);
        $invitation->setStatus("pending");
        $invitation->setEvent($event);

        $errors = $this->validator->validate($invitation);
        if (count($errors) > 0) {
            return new JsonResponse(["message" => $errors[0]->getMessage()], Response::HTTP_CONFLICT);
        }

        $this->manager->persist($invitation);
        $this->manager->flush($invitation);

        $acceptUrl = $this->router->generate('app_accept_invitation', ['token' => $token], UrlGeneratorInterface::ABSOLUTE_URL);

        $email = (new Email())
            ->from('contact@badyssblilita.fr')
            ->to($recipientEmail)
            ->subject('Nouvelle invitation')
            ->html("<p>You are invited to our event. Click <a href=\"$acceptUrl\">here</a> to accept the invitation.</p>");

        $this->mailer->send($email);

        return new JsonResponse(['message' => 'Invitation envoyé']);
    }
}
