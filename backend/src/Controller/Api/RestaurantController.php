<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Entity\Restaurant;
use App\Service\CryptoService;
use App\Service\GeocodingService;
use App\Repository\UserRepository;
use App\Repository\RestaurantRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

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
     * @Route("/api/decrypt", name="api_restaurant_decrypt_id", methods={"POST"})
     */
    public function decryptId(Request $request, RestaurantRepository $restaurantRepository)
    {
        $data = json_decode($request->getContent());

        $RestaurantId = CryptoService::decrypt($data->restaurant);
        
        $restaurant = $restaurantRepository->find($RestaurantId);
        
        return $this->json($restaurant, 200, [], ['groups' => 'restaurant_decrypt']);
    }

    /**
     * @Route("api/partner/{id}", name="api_restaurant_update",  methods={"PUT"})
     */
    public function edit($id, Request $request, ?Restaurant $restaurant, UserPasswordEncoderInterface $encoder, UserRepository $userRepository,RestaurantRepository $restaurantRepository , DenormalizerInterface $denormalizer, ValidatorInterface $validator, \Swift_Mailer $mailer)
    {
        // If the restaurant does not exist we send back an error
        if($request->get('restaurant') === null){
            return $this->json( Response::HTTP_NOT_FOUND);
        }

        // Decodes the json
        $data = json_decode($request->getContent());

        // We get an array of users
        $user = $userRepository->findBy(['restaurant' => $restaurant]);
        // We check the current password of the user in the database 
        $currentPasswordVerify = password_verify($data->currentpassword , $user[0]->getpassword());

        // If the current password is invalid we send an error message
        if($currentPasswordVerify == false){
            return $this->json(['message' => 'Le mot de passe est invalide.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
     
        $messages = [];
       
        // If json argument is empty we send back an error
        if(!isset($data->user) && !isset($data->restaurant)){
            return $this->json(['message' => 'Aucun champs à mettre à jour.'], Response::HTTP_I_AM_A_TEAPOT);
        }
        //dd($data->restaurant);
        //if the argument of restaurant is set we create a class of restaurant
        if(isset($data->restaurant)){
          
            $restaurant = $restaurantRepository->find($id);
            $Newdata = $denormalizer->denormalize($data->restaurant, Restaurant::class);
            $restaurant->setUpdatedAt(new \DateTime);
        }else{
            // else we create a new empty class of restaurant
            $Newdata = new Restaurant;
        }

       
        // if the argument of user is set we create a class of user
        if(isset($data->user)){
            $NewdatasUser = $denormalizer->denormalize($data->user, User::class);
            $user[0]->setUpdatedAt(new \DateTime);
        }else{
            //else we create a empty new class of user
            $NewdatasUser = new User;
        }
       

        //if the argument of class user getpassword is not empty we set at the old class of user
        if(!empty($NewdatasUser->getPassword())){
            //dd($data->user->newpassword);
            $user[0]->setPassword($encoder->encodePassword($user[0],  $NewdatasUser->getPassword()));
            //we put on the array all comments we want to put on the mail
            $messages[] = "Votre mot de passe a été mis à jour.";
        }
        if(!empty($NewdatasUser->getEmail())){
            //dd($data->user->newpassword);
            $user[0]->setEmail($NewdatasUser->getEmail());
            //we put on the array all the comments we want to put on the mail
            $messages[] = "Votre email a été mis à jour.";
        }
        if(!empty($Newdata->getName())){
            $restaurant->setName($Newdata->getName());
        }
        if(!empty($Newdata->getName())){
            $restaurant->setName($Newdata->getName());
        }
        if(!empty($Newdata->getSiretCode())){
            $restaurant->setSiretcode($Newdata->getSiretCode());
        }
        if(!empty($Newdata->getAddress())){
            $restaurant->setAddress($Newdata->getAddress());
            //if the adress change we setup $updatePosition
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
        if(!empty($Newdata->getMenuURL())){
            $restaurant->setMenuURL($Newdata->getMenuURL());
        }
        
        //we can check if we need to update the gps position of restaurant with $updatePosition if the address changes
        if(isset($updatePosition)){
 
            $restaurantPosition = GeocodingService::geocodeAddress($restaurant->getAddress(), $restaurant->getPostcode(), $restaurant->getCity(),$restaurant->getCountry());

            //if the value is false or empty we have a problème on User address
            if($restaurantPosition === false){

                return $this->json(['message' => 'Adresse invalide.'],Response::HTTP_UNPROCESSABLE_ENTITY);
            }else{
                $restaurant->setLongitude($restaurantPosition['lng']);
            }   $restaurant->setLatitude($restaurantPosition['lat']);
        }

        //Validate the new entry of $restaurant updated
        if(isset($data->restaurant)){
            $restaurant->setUpdatedAt(new \DateTime);
            $errors = $validator->validate($restaurant);

            $jsonErrors = [];
            // $errors est une ConstraintViolationList = se comporte comme un tableau
            if (count($errors) !== 0) {
                //$jsonErrors = [];
                foreach ($errors as $error) {
                    $jsonErrors[] = [
                        'field' => $error->getPropertyPath(),
                        'message' => $error->getMessage(),
                    ];
                }
           }

            if(!empty($jsonErrors)){
                return $this->json($jsonErrors, Response::HTTP_UNPROCESSABLE_ENTITY);
            }

        }
        
         //Validate the new entry of $user[0] updated
        if(isset($data->user)){
            $user[0]->setUpdatedAt(new \DateTime);
            $errors = $validator->validate($user[0]);

             // $errors est une ConstraintViolationList = se comporte comme un tableau
            if (count($errors) !== 0) {
                //$jsonErrors = [];
                foreach ($errors as $error) {
                    $jsonErrors[] = [
                        'field' => $error->getPropertyPath(),
                        'message' => $error->getMessage(),
                    ];
                }
            }

            //if the array errors is not empty we send a error message with the array errors
            if(!empty($jsonErrors)){
                return $this->json($jsonErrors, Response::HTTP_UNPROCESSABLE_ENTITY);
            }

        }

        //else we update all of class on BDD
        $em = $this->getDoctrine()->getManager();
        $em->flush();

        //If we are here, all processus succes we can send email
        if(isset($data->user->email) || isset($data->user->password)){
            $user = $user[0];
            //dd($messages);
            $message = (new \Swift_Message('Information partenaire ListEat'))

            ->setFrom('team@listeat.io')
            ->setTo($user->getEmail())
            ->setBody(
                        $this->renderView(
                            
                            //TODO Registration Template 
                            // templates/emails/registration.html.twig
                            'emails/update-user.html.twig',
                            ['name' => $user->getfirstName(),
                             'messages' => $messages
                            ]
                        ),
            'text/html'
                    );

            $mailer->send($message);
        }



        return $this->json(Response::HTTP_CREATED);
    }

     /**
     * @Route("/api/partner/{id<\d+>}/status", name="api_restaurant_status", methods={"PUT"})
     */
    public function editStatus($id, Request $request, RestaurantRepository $restaurantRepository)
    {
        /*
        {
            "status": "on" / "off"
        }
        */
        $data = json_decode($request->getContent());

        $restaurant = $restaurantRepository->find($id);

        if (!$restaurant) {
           return $this->json(['message' => 'Ce restaurant n\'existe pas.'], Response::HTTP_NOT_FOUND);
        }

        if ($data->status == "on") {
            $restaurant->setStatus(1);
            $restaurant->setUpdatedAt(new \DateTime());    
            $em = $this->getDoctrine()->getManager();
            $em->flush();
            return $this->json(['message' => 'Le statut de votre restaurant est désormais actif.'], Response::HTTP_OK);
        }

        if ($data->status == "off") {
            $restaurant->setStatus(0);
            $restaurant->setUpdatedAt(new \DateTime());
            $em = $this->getDoctrine()->getManager();
            $em->flush();
            return $this->json(['message' => 'Le statut de votre restaurant est désormais inactif.'], Response::HTTP_OK);
        }
    }

    /**
     * @Route("/api/partner/{id<\d+>}/eating-time", name="api_restaurant_eating_time", methods={"PUT"})
     */
    public function editEatingTime($id, Request $request, RestaurantRepository $restaurantRepository)
    {
        /*
        {
            "addedTime": 25
        }
        */
        $data = json_decode($request->getContent());

        $restaurant = $restaurantRepository->find($id);

        if (!$restaurant) {
           return $this->json(['message' => 'Ce restaurant n\'existe pas.'], Response::HTTP_NOT_FOUND);
        }

        $currentAverageEatingTime = $restaurant->getAverageEatingTime();

        $newAverageEatingTime = $currentAverageEatingTime + $data->addedTime;

        if ($newAverageEatingTime < 0) {
            return $this->json(['message' => 'Le temps moyen d\'un repas ne peut pas être inférieur à zéro.'], Response::HTTP_BAD_REQUEST);
        }

        $restaurant->setAverageEatingTime($newAverageEatingTime);
        $restaurant->setUpdatedAt(new \DateTime());
        $em = $this->getDoctrine()->getManager();
        $em->flush();

        return $this->json(['message' => 'Le temps moyen d\'un repas a bien été modifié', 'averageEatingTime' => $restaurant->getAverageEatingTime()], Response::HTTP_OK);
        }
}
