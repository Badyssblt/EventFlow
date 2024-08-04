<?php

namespace App\Service;

use Stripe\Stripe;
use Stripe\PaymentIntent;

class StripeService
{
    public function __construct()
    {
        Stripe::setApiKey($_ENV['STRIPE_SECRET_KEY']);
    }

    public function createPaymentIntent($amount, $customer,  $currency = 'eur')
    {
        return PaymentIntent::create([
            'amount' => $amount,
            'currency' => $currency,
            'customer' => $customer["id"],
            'payment_method_types' => ['card'],
        ]);
    }
}
