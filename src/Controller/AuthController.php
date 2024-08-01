<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AuthController extends AbstractController
{
    #[Route('/register', name: 'app_register', methods: ['POST'])]
    public function register(Request $request, SerializerInterface $serializer, UserPasswordHasherInterface $hasher, EntityManagerInterface $manager)
    {
        $data = $request->getContent();
        $user = $serializer->deserialize($data, User::class, 'json');
        $password = $hasher->hashPassword($user, $user->getPassword());
        $user->setPassword($password);
        $manager->persist($user);
        $manager->flush();

        return $this->json($user, Response::HTTP_CREATED, [], ['groups' => ['item:user']]);
    }

    #[Route('/user', name: 'app_user')]
    public function getUserConnected()
    {
        return $this->json($this->getUser(), Response::HTTP_OK, [], ["groups" => ["item:user"]]);
    }
}
