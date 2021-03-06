<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;
// TODO : vérifier les contraintes notamment sur les integers

/**
 * @ORM\Entity(repositoryClass="App\Repository\RestaurantRepository")
 */
class Restaurant
{
  
    public function __construct()
    {
        $this->createdAt = new \DateTime;
        $this->tickets = new ArrayCollection();
        $this->status = 0;
    }
    
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("restaurant_get")
     * @Groups("restaurant_decrypt")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=14)
     * @Assert\NotBlank()
     * @Groups("restaurant_get")
     */
    private $siretCode;

    /**
     * @ORM\Column(type="string", length=100)
     * @Assert\NotBlank()
     * @Groups("restaurant_get")
     * @Groups("restaurant_decrypt")
     * @Groups("restaurant_backoffice")
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank()
     * @Groups("restaurant_get")
     */
    private $address;

    /**
     * @ORM\Column(type="integer")
     * @Assert\NotBlank()
     * @Groups("restaurant_get")
     */
    private $postcode;

    /**
     * @ORM\Column(type="string", length=180)
     * @Assert\NotBlank()
     * @Groups("restaurant_get")
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=180)
     * @Assert\NotBlank()
     * @Groups("restaurant_get")
     */
    private $country;

    /**
     * @ORM\Column(type="string", length=15)
     * @Assert\NotBlank()
     * @Groups("restaurant_get")
     */
    private $phone;

    /**
     * @ORM\Column(type="integer")
     * @Assert\NotBlank()
     * @Groups("restaurant_get")
     */
    private $averageEatingTime;

    /**
     * @ORM\Column(type="string", length=20, nullable=true)
     * @Groups("restaurant_backoffice")
     */
    private $latitude;

    /**
     * @ORM\Column(type="string", length=20, nullable=true)
     * @Groups("restaurant_backoffice")
     */
    private $longitude;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $menuURL;

    /**
     * @ORM\Column(type="integer")
     * @Assert\Type(type="integer")
     * @Assert\NotBlank()
     * @Groups("restaurant_get")
     */
    private $seatNb;

    /**
     * @ORM\Column(type="smallint")
     * @Groups("restaurant_get")
     * @Groups("restaurant_decrypt")
     */
    private $status;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;


    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Ticket", mappedBy="restaurant", orphanRemoval=true)
     */
    private $tickets;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\QrCode", inversedBy="restaurant", cascade={"persist", "remove"})
     * @Groups("restaurant_get")
     */
    private $qrCode;

    public function __toString() {
        return $this->name;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSiretCode(): ?string
    {
        return $this->siretCode;
    }

    public function setSiretCode(string $siretCode): self
    {
        $this->siretCode = $siretCode;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getPostcode(): ?int
    {
        return $this->postcode;
    }

    public function setPostcode(int $postcode): self
    {
        $this->postcode = $postcode;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): self
    {
        $this->country = $country;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getAverageEatingTime(): ?int
    {
        return $this->averageEatingTime;
    }

    public function setAverageEatingTime(int $averageEatingTime): self
    {
        $this->averageEatingTime = $averageEatingTime;

        return $this;
    }

    public function getLatitude(): ?string
    {
        return $this->latitude;
    }

    public function setLatitude(?string $latitude): self
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getLongitude(): ?string
    {
        return $this->longitude;
    }

    public function setLongitude(?string $longitude): self
    {
        $this->longitude = $longitude;

        return $this;
    }

    public function getMenuURL(): ?string
    {
        return $this->menuURL;
    }

    public function setMenuURL(?string $menuURL): self
    {
        $this->menuURL = $menuURL;

        return $this;
    }

    public function getSeatNb(): ?int
    {
        return $this->seatNb;
    }

    public function setSeatNb(int $seatNb): self
    {
        $this->seatNb = $seatNb;

        return $this;
    }

    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(int $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * @return Collection|Ticket[]
     */
    public function getTickets(): Collection
    {
        return $this->tickets;
    }

    public function addTicket(Ticket $ticket): self
    {
        if (!$this->tickets->contains($ticket)) {
            $this->tickets[] = $ticket;
            $ticket->setRestaurant($this);
        }

        return $this;
    }

    public function removeTicket(Ticket $ticket): self
    {
        if ($this->tickets->contains($ticket)) {
            $this->tickets->removeElement($ticket);
            // set the owning side to null (unless already changed)
            if ($ticket->getRestaurant() === $this) {
                $ticket->setRestaurant(null);
            }
        }

        return $this;
    }

    public function getQrCode(): ?QrCode
    {
        return $this->qrCode;
    }

    public function setQrCode(?QrCode $qrCode): self
    {
        $this->qrCode = $qrCode;

        return $this;
    }
}
