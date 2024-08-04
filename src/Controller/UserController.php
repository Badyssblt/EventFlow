<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Service\UserService;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController
{
    #[Route('/profile', name: 'app_profile', methods: ["GET"])]
    public function profile()
    {
        $user = $this->getUser();
        return $this->json($user, Response::HTTP_OK, [], ["groups" => ["item:user"]]);
    }

    #[Route('/user/{email}', name: 'app_search_user', methods: ['GET'])]
    public function search(string $email, UserRepository $userRepository)
    {
        $user = $userRepository->findOneBy(['email' => $email]);
        return $this->json($user, Response::HTTP_OK, [], ["groups" => ["item:user"]]);
    }
}
