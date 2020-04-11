<?php

namespace App\Controller\Api;

use App\Entity\Restaurant;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

class RestaurantController extends AbstractController
{
    /**
     * @Route("api/partner/{id}", name="api_restaurant_update",  methods={"PUT"})
     */
    public function edit($id, Request $request, ?Restaurant $restaurant,  DenormalizerInterface $denormalizer, ValidatorInterface $validator)
    {
        if($request->get('restaurant') === null){
            return $this->json( Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $restaurant = $this->getDoctrine()
            ->getRepository(Restaurant::class)
            ->find($id);

        $data = json_decode($request->getContent());

        $Newdata = $denormalizer->denormalize($data->restaurant, Restaurant::class);

        if(!empty($Newdata->getName())){
            $restaurant->setName($Newdata->getName());
        }
        if(!empty($Newdata->getSiretCode())){
            $restaurant->setSiretcode($Newdata->getSiretCode());
        }
        if(!empty($Newdata->getAddress())){
            $restaurant->setAddress($Newdata->getAddress());
        }
        if(!empty($Newdata->getPostcode())){
            $restaurant->setPostcode($Newdata->getPostcode());
        }
        if(!empty($Newdata->getCity())){
            $restaurant->setCity($Newdata->getCity());
        }
        if(!empty($Newdata->getCountry())){
            $restaurant->setCountry($Newdata->getCountry());
        }
        if(!empty($Newdata->getPhone())){
            $restaurant->setPhone($Newdata->getPhone());
        }
        if(!empty($Newdata->getAverageEatingTime())){
            $restaurant->setAverageEatingTime($Newdata->getAverageEatingTime());
        }
        if(!empty($Newdata->getSeatNb())){
            $restaurant->setSeatNb($Newdata->getSeatNb());
        }
        if(!empty($Newdata->getStatus())){
            $restaurant->setStatus($Newdata->getStatus());
        }
        if(!empty($Newdata->getLatitude())){
            $restaurant->setLatitude($Newdata->getLatitude());
        }
        if(!empty($Newdata->getLongitude())){
            $restaurant->setLongitude($Newdata->getLongitude());
        }
        if(!empty($Newdata->getMenuURL())){
            $restaurant->setMenuURL($Newdata->getMenuURL());
        }
        if(!empty($Newdata->getLongitude())){
            $restaurant->setLongitude($Newdata->getLongitude());
        }

        $restaurant->setUpdatedAt(new \DateTime);

        $em = $this->getDoctrine()->getManager();
        $em->flush();

        return $this->json(Response::HTTP_CREATED);
    }
}
