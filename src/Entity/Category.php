<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\CategoryRepository;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: CategoryRepository::class)]
class Category
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["collection:event", "item:event"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["collection:event", "item:event"])]
    private ?string $name = null;

    #[ORM\Column(length: 16)]
    #[Groups(["collection:event", "item:event"])]
    private ?string $color = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(string $color): static
    {
        $this->color = $color;

        return $this;
    }
}
