<?php

namespace App\Controller;

use App\Entity\Event;
use App\Entity\Participant;
use App\Repository\EventRepository;
use App\Repository\ParticipantRepository;
use App\Repository\UserRepository;
use App\Service\QrCodeService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class EventController extends AbstractController
{
    #[Route('/event', methods: ['POST'], name: 'app_event_create')]
    public function createEvent(Request $request, EntityManagerInterface $manager)
    {
        $formData = $request->request->all();
        $file = $request->files->get('image');

        $event = new Event();

        $user = $this->getUser();


        if (!$user) return $this->json(['message' => 'Vous devez vous connectez'], Response::HTTP_UNAUTHORIZED);

        $event->setOwner($user);
        if (isset($formData['name'])) {
            $event->setName($formData['name']);
        }
        if (isset($formData['description'])) {
            $event->setDescription($formData['description']);
        }
        if (isset($formData['started_at'])) {
            try {
                $event->setStartedAt(new \DateTimeImmutable($formData['started_at']));
            } catch (\Exception $e) {
                return new JsonResponse(['error' => 'Invalid date format'], JsonResponse::HTTP_BAD_REQUEST);
            }
        }
        if (isset($formData['isRecurring'])) {
            $event->setRecurring(filter_var($formData['isRecurring'], FILTER_VALIDATE_BOOLEAN));
        }
        if (isset($formData['location'])) {
            $event->setLocation($formData['location']);
        }
        if (isset($formData['maxParticipants'])) {
            $event->setMaxParticipants($formData['maxParticipants']);
        }
        if (isset($formData['price'])) {
            $event->setPrice($formData['price']);
        }

        if(isset($formData['city'])){
            $event->setCity($formData['city']);
        }

        if ($file instanceof UploadedFile) {
            $event->setImageFile($file);
        }
        $manager->persist($event);
        $manager->flush();

        return $this->json($event, Response::HTTP_OK, [], ["groups" => ["item:event"]]);
    }


    #[Route('/events/user', name: 'app_event_user')]
    public function getUserEvents(ParticipantRepository $participantRepository)
    {
        $user = $this->getUser();

        $participants = $participantRepository->findBy(['user' => $user]);

        $events = [];

        foreach ($participants as $participant) {
            $events[] = $participant->getEvent();
        }

        return $this->json($events, Response::HTTP_OK, [], ["groups" => ["collection:event"]]);
    }

    #[Route('/event/{id}', name: 'app_event_read', methods: ['GET'])]
    public function fetchEvent(Event $event)
    {
        $participants = $event->getParticipants();
        $last = $event->getMaxParticipants() - count($participants);

        $user = $this->getUser();

        $isIn = false;
        $participantToken = null;

        if ($user) {
            foreach ($event->getParticipants() as $participant) {
                if ($participant->getUser() === $user) {
                    $isIn = true;
                    $participantToken = $participant->getIdentifier();
                }
            }
        }


        return $this->json(["event" => $event, "last" => $last, "isIn" => $isIn, "token" => $participantToken], Response::HTTP_OK, [], ['groups' => ['item:event']]);
    }

    #[Route('/events', name: 'app_events', methods: ['GET'])]
    public function fetchAll(Request $request, EventRepository $eventRepository): Response
    {
        $criteria = $request->query->all();

        // Convert string booleans to actual booleans
        foreach ($criteria as $key => $value) {
            if ($value === 'true') {
                $criteria[$key] = true;
            } elseif ($value === 'false') {
                $criteria[$key] = false;
            }
        }

        // Handle datetime conversion if necessary
        if (isset($criteria['started_at'])) {
            try {
                $criteria['started_at'] = new \DateTimeImmutable($criteria['started_at']);
            } catch (\Exception $e) {
                return new JsonResponse(['error' => 'Invalid date format'], JsonResponse::HTTP_BAD_REQUEST);
            }
        }

        $events = $eventRepository->findByCriteria($criteria);

        return $this->json($events, Response::HTTP_OK, [], ['groups' => ['collection:event']]);
    }


    #[Route('/event/{id}', name: "app_event_edit", methods: ['POST'])]
    public function editEvent(
        int $id,
        Request $request,
        EntityManagerInterface $entityManager,
    ): JsonResponse {
        $event = $entityManager->getRepository(Event::class)->find($id);

        if (!$event) {
            return new JsonResponse(['error' => 'Event not found'], 404);
        }

        $data = $request->request->all();


        if (isset($data['name'])) {
            $event->setName($data['name']);
        }

        if (isset($data['description'])) {
            $event->setDescription($data['description']);
        }

        if (isset($data['started_at'])) {
            $event->setStartedAt(new \DateTimeImmutable($data['started_at']));
        }

        if (isset($data['location'])) {
            $event->setLocation($data['location']);
        }

        if (isset($data['isRecurring'])) {
            $event->setRecurring($data['isRecurring']);
        }

        if (isset($data['maxParticipants'])) {
            $event->setMaxParticipants($data['maxParticipants']);
        }

        if (isset($data['price'])) {
            $event->setPrice($data['price']);
        }

        if ($request->files->get('image')) {
            $imageFile = $request->files->get('image');
            $event->setImageFile($imageFile);
        }

        $event->setUpdatedAt(new \DateTimeImmutable());

        $entityManager->persist($event);
        $entityManager->flush();

        return $this->json($event, Response::HTTP_OK, [], ["groups" => ["item:event"]]);
    }

    #[Route('/event/{id}/join', name: 'app_join_event', methods: ['POST'])]
    public function joinEvent(Event $event, EntityManagerInterface $manager)
    {
        $user = $this->getUser();

        if ($event->getMaxParticipants() <= count($event->getParticipants())) {
            return $this->json(['message' => 'Aucune disponibilité pour cet évènement'], Response::HTTP_CONFLICT);
        }

        $participant = new Participant();
        $participant->setUser($user);
        $participant->setEvent($event);

        $event->addParticipant($participant);


        $manager->persist($event);
        $manager->flush();

        return $this->json(["event" => $event, "message" => "La réservation a bien été prise en compte", "id" => $participant->getIdentifier()], Response::HTTP_ACCEPTED, [], ["groups" => ["item:event"]]);
    }

    #[Route('/event/{id}/unjoin', name: 'app_unjoin_event', methods: ['DELETE'])]
    public function unjoinEvent(Event $event, EntityManagerInterface $manager, ParticipantRepository $participantRepository)
    {
        $user = $this->getUser();

        $participant = $participantRepository->findOneBy(["event" => $event, "user" => $user]);

        $event->removeParticipant($participant);

        $manager->persist($event);
        $manager->flush();

        return $this->json($event, Response::HTTP_NO_CONTENT, [], ["groups" => ["item:event"]]);
    }

    #[Route('/event/{id}/generateQrCode', name: 'app_generate_qr', methods: ["GET"])]
    public function generateQrCode(QrCodeService $qrCodeService, Event $event)
    {
        $url = $_ENV['BASE_URL'] . '/event/' . $event->getId();
        return $qrCodeService->generateQrCode($url);
    }

    #[Route('/event/{id}/generateQrCode/checkIn', name: 'app_generate_qr_checkin', methods: ["GET"])]
    public function generateQrCodeCheckIn(QrCodeService $qrCodeService, Event $event)
    {

        $user = $this->getUser();
        $isIn = false;

        if ($user) {
            foreach ($event->getParticipants() as $participant) {
                if ($participant->getUser() === $user) {
                    $isIn = true;
                }
            }
        }

        if (!$isIn) return $this->json(["isIn" => $isIn], Response::HTTP_CONFLICT);

        $url = $_ENV['BASE_URL'] . '/check/' . $event->getId() . '/user/' . $user->getId();
        return $qrCodeService->generateQrCode($url);
    }

    #[Route('/event/{id}/checkIn/{userId}')]
    public function checkIn(Event $event, UserRepository $userRepository, int $userId, EntityManagerInterface $manager, ParticipantRepository $participantRepository)
    {
        $owner = $this->getUser();

        if ($owner !== $event->getOwner()) return $this->json(['message' => "Vous n'êtes pas propriétaire de cet évènement"], Response::HTTP_UNAUTHORIZED);

        $user = $userRepository->find($userId);

        $participant = $participantRepository->findOneBy(['user' => $user, 'event' => $event]);

        if (!$participant) return $this->json(['message' => 'Vous n\'êtes pas inscrit à cet évènement'], Response::HTTP_CONFLICT);

        $participant->setStatus("checkIn");

        $manager->persist($participant);
        $manager->flush();

        return $this->json(['message' => 'Le participant a bien été vérifié']);
    }


    #[Route('/myevents', name: 'app_myevent', methods: ['GET'])]
    public function myEvents(EventRepository $eventRepository)
    {
        $user = $this->getUser();

        return $this->json($eventRepository->findBy(['owner' => $user]), Response::HTTP_OK, [], ['groups' => ["collection:event"]]);
    }


    #[Route('/events/popular', name: 'app_popular')]
    public function popularEvents(EventRepository $eventRepository)
    {
        return $this->json($eventRepository->findByParticipantNumber(), Response::HTTP_OK, [], ["groups" => ["collection:event"]]);
    }
}
