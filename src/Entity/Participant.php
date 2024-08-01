<?php

namespace App\Entity;

use App\Repository\ParticipantRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: ParticipantRepository::class)]
class Participant
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["collection:participant", "item:participant"])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'participants')]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'participants')]
    #[Groups(["collection:participant", "item:user", "item:participant"])]
    private ?Event $event = null;

    #[ORM\Column(length: 255)]
    private ?string $status = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(["collection:participant", "item:participant"])]
    private ?string $identifier = null;

    public function __construct()
    {
        $this->status = "waiting";
        $this->identifier = $token = bin2hex(random_bytes(16));
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getEvent(): ?Event
    {
        return $this->event;
    }

    public function setEvent(?Event $event): static
    {
        $this->event = $event;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getIdentifier(): ?string
    {
        return $this->identifier;
    }

    public function setIdentifier(string $identifier): static
    {
        $this->identifier = $identifier;

        return $this;
    }
}
