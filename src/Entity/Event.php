<?php

namespace App\Entity;

use App\Repository\EventRepository;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Attribute\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: EventRepository::class)]
#[Vich\Uploadable]
class Event
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['item:event', 'collection:event', 'collection:participant', 'item:user', "item:participant"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['item:event', 'collection:event', 'collection:participant', 'item:user', "item:participant"])]
    private ?string $name = null;

    #[ORM\Column]
    #[Groups(['item:event', 'collection:event'])]
    private ?string $description = null;

    #[ORM\Column]
    #[Groups(['item:event', 'collection:event', 'collection:participant', "item:participant"])]
    private ?\DateTimeImmutable $started_at = null;

    #[ORM\Column(length: 255)]
    #[Groups(['item:event', "collection:event", 'collection:participant', "item:participant"])]
    private ?string $location = null;

    #[ORM\Column]
    #[Groups(['item:event'])]
    private ?bool $isRecurring = null;

    #[ORM\Column]
    #[Groups(['item:event'])]
    private ?int $maxParticipants = null;

    #[ORM\Column]
    #[Groups(['item:event', 'collection:event', "item:participant"])]
    private ?float $price = null;

    #[Vich\UploadableField(mapping: 'events', fileNameProperty: 'imageName', size: 'imageSize')]
    private ?File $imageFile = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['item:event', 'collection:event', 'collection:participant', "item:participant"])]
    private ?string $imageName = null;

    #[ORM\Column(nullable: true)]
    private ?int $imageSize = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['item:event', "item:participant"])]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\Column]
    #[Groups(['item:event', "item:participant"])]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\ManyToOne(inversedBy: 'events')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['collection:event', 'collection:participant'])]
    private ?User $owner = null;


    #[ORM\Column]
    private ?bool $is_public = null;

    #[ORM\Column]

    private ?bool $is_started = null;

    /**
     * @var Collection<int, Participant>
     */
    #[ORM\OneToMany(targetEntity: Participant::class, mappedBy: 'event', cascade: ["PERSIST"])]
    private Collection $participants;

    /**
     * @var Collection<int, Category>
     */
    #[ORM\ManyToMany(targetEntity: Category::class)]
    #[Groups(["collection:event", "item:event", 'collection:participant'])]
    private Collection $categories;

    #[ORM\Column(length: 255)]
    #[Groups(['item:event', "collection:event", 'collection:participant'])]
    private ?string $city = null;



    public function __construct()
    {
        $this->created_at = new DateTimeImmutable();
        $this->participants = new ArrayCollection();
        $this->is_public = false;
        $this->is_started = false;
        $this->categories = new ArrayCollection();
    }

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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getStartedAt(): ?\DateTimeImmutable
    {
        return $this->started_at;
    }

    public function setStartedAt(\DateTimeImmutable $started_at): static
    {
        $this->started_at = $started_at;

        return $this;
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation(string $location): static
    {
        $this->location = $location;

        return $this;
    }

    public function isRecurring(): ?bool
    {
        return $this->isRecurring;
    }

    public function setRecurring(bool $isRecurring): static
    {
        $this->isRecurring = $isRecurring;

        return $this;
    }

    public function getMaxParticipants(): ?int
    {
        return $this->maxParticipants;
    }

    public function setMaxParticipants(int $maxParticipants): static
    {
        $this->maxParticipants = $maxParticipants;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function setImageFile(?File $imageFile = null): void
    {
        $this->imageFile = $imageFile;

        if (null !== $imageFile) {
            // It is required that at least one field changes if you are using doctrine
            // otherwise the event listeners won't be called and the file is lost
            $this->updatedAt = new \DateTimeImmutable();
        }
    }

    public function getImageFile(): ?File
    {
        return $this->imageFile;
    }

    public function setImageName(?string $imageName): void
    {
        $this->imageName = $imageName;
    }

    public function getImageName(): ?string
    {
        return $this->imageName;
    }

    public function setImageSize(?int $imageSize): void
    {
        $this->imageSize = $imageSize;
    }

    public function getImageSize(): ?int
    {
        return $this->imageSize;
    }

    /**
     * Get the value of created_at
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * Set the value of created_at
     *
     * @return  self
     */
    public function setCreated_at($created_at)
    {
        $this->created_at = $created_at;

        return $this;
    }

    /**
     * Get the value of updatedAt
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * Set the value of updatedAt
     *
     * @return  self
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): static
    {
        $this->owner = $owner;

        return $this;
    }


    public function isPublic(): ?bool
    {
        return $this->is_public;
    }

    public function setPublic(bool $is_public): static
    {
        $this->is_public = $is_public;

        return $this;
    }

    public function isStarted(): ?bool
    {
        return $this->is_started;
    }

    public function setStarted(bool $is_started): static
    {
        $this->is_started = $is_started;

        return $this;
    }

    /**
     * @return Collection<int, Participant>
     */
    public function getParticipants(): Collection
    {
        return $this->participants;
    }

    public function addParticipant(Participant $participant): static
    {
        foreach ($this->participants as $existingParticipant) {
            if (
                $existingParticipant->getUser() === $participant->getUser() &&
                $existingParticipant->getEvent() === $participant->getEvent()
            ) {
                return $this;
            }
        }

        $this->participants->add($participant);
        $participant->setEvent($this);

        return $this;
    }

    public function removeParticipant(Participant $participant): static
    {
        if ($this->participants->removeElement($participant)) {
            // set the owning side to null (unless already changed)
            if ($participant->getEvent() === $this) {
                $participant->setEvent(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Category>
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategory(Category $category): static
    {
        if (!$this->categories->contains($category)) {
            $this->categories->add($category);
        }

        return $this;
    }

    public function removeCategory(Category $category): static
    {
        $this->categories->removeElement($category);

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): static
    {
        $this->city = $city;

        return $this;
    }
}
