<?php

namespace App\Controller;

use Stripe\Stripe;
use Stripe\StripeClient;
use App\Service\StripeService;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class StripeController extends AbstractController
{

    private $stripe;

    public function __construct()
    {
        $this->stripe = new StripeClient($_ENV['STRIPE_SECRET_KEY']);
    }

    #[Route('/create-payment-intent', name: 'app_create_payment_intent', methods: ['POST'])]
    public function createPaymentIntent(StripeService $stripeService, Request $request): JsonResponse
    {

        $amount = $request->getPayload()->get('amount');

        $customer = $this->stripe->customers->create([
            'name' => 'John Doe',
            'email' => 'johndoe@gmail.com'
        ]);


        $paymentIntent = $stripeService->createPaymentIntent($amount, $customer, 'eur');

        return new JsonResponse([
            'clientSecret' => $paymentIntent->client_secret,
        ]);
    }
}
