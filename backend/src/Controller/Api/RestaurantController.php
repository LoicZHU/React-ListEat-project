<?php

namespace App\Controller\Api;

use App\Entity\Restaurant;
use App\Repository\RestaurantRepository;
use App\Service\GeocodingService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

class RestaurantController extends AbstractController
{

    /**
     * @Route("/api/partner/{id}", name="api_restaurant_show", methods={"GET"})
     */
    public function show($id, Request $request, ?Restaurant $restaurant, RestaurantRepository $restaurantRepository)
    {
        if($request->get('restaurant') === null){
            return $this->json( Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $restaurant = $restaurantRepository->find($id);
        
        return $this->json($restaurant, 200, [], ['groups' => 'restaurant_get']);
    }

    /**
     * @Route("api/partner/{id}", name="api_restaurant_update",  methods={"PUT"})
     */
    public function edit($id, Request $request, ?Restaurant $restaurant, RestaurantRepository $restaurantRepository , DenormalizerInterface $denormalizer, ValidatorInterface $validator)
    {
        if($request->get('restaurant') === null){
            return $this->json( Response::HTTP_NOT_FOUND);
        }

        $restaurant = $restaurantRepository->find($id);

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
            $updatePosition = true;
        }
        if(!empty($Newdata->getPostcode())){
            $restaurant->setPostcode($Newdata->getPostcode());
            $updatePosition = true;
        }
        if(!empty($Newdata->getCity())){
            $restaurant->setCity($Newdata->getCity());
            $updatePosition = true;
        }
        if(!empty($Newdata->getCountry())){
            $restaurant->setCountry($Newdata->getCountry());
            $updatePosition = true;
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
        if(!empty($Newdata->getMenuURL())){
            $restaurant->setMenuURL($Newdata->getMenuURL());
        }

        if(isset($updatePosition)){
            $address = $restaurant->getAddress()." ".$restaurant->getPostcode()." ".$restaurant->getCountry();
            
            $restaurantPosition = GeocodingService::geocodeAddress($address);
            //dd($restaurantPosition);
            if(empty($restaurantPosition['lat'])){

                return $this->json(['message' => 'Adresse invalide.'],Response::HTTP_UNPROCESSABLE_ENTITY);
            }else{
                $restaurant->setLongitude($restaurantPosition['lng']);
            }   $restaurant->setLatitude($restaurantPosition['lat']);
        }

        $errorsNewdata = $validator->validate($restaurant);

        $jsonErrors = [];
        // $errors est une ConstraintViolationList = se comporte comme un tableau
        if (count($errorsNewdata) !== 0) {
            //$jsonErrors = [];
            foreach ($errorsNewdata as $error) {
                $jsonErrors[] = [
                    'field' => $error->getPropertyPath(),
                    'message' => $error->getMessage(),
                ];
            }
        }

        if(!empty($jsonErrors)){
            return $this->json($jsonErrors, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $restaurant->setUpdatedAt(new \DateTime);

        $em = $this->getDoctrine()->getManager();
        $em->flush();

        return $this->json(Response::HTTP_CREATED);
    }
}
