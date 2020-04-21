<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TicketRepository")
 */
class Ticket
{
    public function __construct()
    {
        $this->createdAt = new \DateTime;
        $this->status = 0;
        $this->statusnotification = 0;
    }
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("tickets_get")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     * @Assert\Type(type="integer")
     * @Assert\Positive
     * @Groups("tickets_get")
     */
    private $coversNb;

    /**
     * @ORM\Column(type="smallint")
     * @Groups("tickets_get")
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
     * @ORM\ManyToOne(targetEntity="App\Entity\Restaurant", inversedBy="tickets")
     * @ORM\JoinColumn(nullable=false)
     */
    private $restaurant;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Customer", mappedBy="ticket", cascade={"persist", "remove"})
     * @Groups("tickets_get")
     */
    private $customer;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups("tickets_get")
     */
    private $estimatedWaitingTime;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups("tickets_get")
     */
    private $estimatedEntryTime;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $statusnotification;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCoversNb(): ?int
    {
        return $this->coversNb;
    }

    public function setCoversNb(int $coversNb): self
    {
        $this->coversNb = $coversNb;

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

    public function getRestaurant(): ?Restaurant
    {
        return $this->restaurant;
    }

    public function setRestaurant(?Restaurant $restaurant): self
    {
        $this->restaurant = $restaurant;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(Customer $customer): self
    {
        $this->customer = $customer;

        // set the owning side of the relation if necessary
        if ($customer->getTicket() !== $this) {
            $customer->setTicket($this);
        }

        return $this;
    }

    public function getEstimatedWaitingTime(): ?int
    {
        return $this->estimatedWaitingTime;
    }

    public function setEstimatedWaitingTime(?int $estimatedWaitingTime): self
    {
        $this->estimatedWaitingTime = $estimatedWaitingTime;

        return $this;
    }

    public function getEstimatedEntryTime(): ?\DateTimeInterface
    {
        return $this->estimatedEntryTime;
    }

    public function setEstimatedEntryTime(?\DateTimeInterface $estimatedEntryTime): self
    {
        $this->estimatedEntryTime = $estimatedEntryTime;

        return $this;
    }

    public function getStatusnotification(): ?int
    {
        return $this->statusnotification;
    }

    public function setStatusnotification(?int $statusnotification): self
    {
        $this->statusnotification = $statusnotification;

        return $this;
    }
}
