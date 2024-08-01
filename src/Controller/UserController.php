<?php

namespace App\Controller;

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
}
