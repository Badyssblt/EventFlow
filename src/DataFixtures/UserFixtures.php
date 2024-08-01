<?php

namespace App\DataFixtures;

use Faker\Factory as Fakers;
use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class UserFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Fakers::create();
        for ($i = 0; $i < 20; $i++) {
            $user = new User();
            $user->setEmail($faker->email());
            $user->setPassword($faker->password());
            $manager->persist($user);
        }


        $manager->flush();
    }
}
