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
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotNull;
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
     * @Route("/api/decrypt", name="api_restaurant_decrypt_id", methods={"GET"})
     */
    public function decryptId(Request $request, RestaurantRepository $restaurantRepository)
    {
   
        $data = json_decode($request->getContent());

        $RestaurantId = CryptoService::decrypt($data->restaurant);

        $restaurant = $restaurantRepository->find($RestaurantId);

        dd($restaurant);
        return $this->json($restaurant, 200, [], ['groups' => 'restaurant_decrypt']);
    }

    /**
     * @Route("api/partner/{id}", name="api_restaurant_update",  methods={"PUT"})
     */
    public function edit($id, Request $request, ?Restaurant $restaurant, UserPasswordEncoderInterface $encoder, UserRepository $userRepository,RestaurantRepository $restaurantRepository , DenormalizerInterface $denormalizer, ValidatorInterface $validator, \Swift_Mailer $mailer)
    {
        //If the restaurant didn't exist we send back a error
        if($request->get('restaurant') === null){
            return $this->json( Response::HTTP_NOT_FOUND);
        }

        // I decode the json
        $data = json_decode($request->getContent());

        //We get a array of user
        $user = $userRepository->findBy(['restaurant' => $restaurant]);
        //we check the current password of user password on BDD 
        $CurrentPasswordVerifie = password_verify($data->currentpassword , $user[0]->getpassword());

        //if the currentPassword is invalid we send a errors message
        if($CurrentPasswordVerifie == false){
            return $this->json(['message' => 'CurrentPassword invalide.'],Response::HTTP_UNPROCESSABLE_ENTITY);
        }
     
        $messages = [];
       
        //if json argument is empty we send back a error
        if(!isset($data->user) && !isset($data->restaurant)){
            return $this->json(['message' => 'Aucuns champs a mettres à jour.'],Response::HTTP_I_AM_A_TEAPOT);
        }
        //dd($data->restaurant);
        //if the argument of restaurant is setup we creat a class of restaurant
        if(isset($data->restaurant)){
          
            $restaurant = $restaurantRepository->find($id);
            $Newdata = $denormalizer->denormalize($data->restaurant, Restaurant::class);
            $restaurant->setUpdatedAt(new \DateTime);
        }else{
            //else we creat a empty new class of restaurant
            $Newdata = new Restaurant;
        }

       
        //if the argument of user is setup we creat a class of user
        if(isset($data->user)){
            $NewdatasUser = $denormalizer->denormalize($data->user, User::class);
            $user[0]->setUpdatedAt(new \DateTime);
        }else{
            //else we creat a empty new class of user
            $NewdatasUser = new User;
        }
       

        //if the argument of class user getpassword is not empty we set at the old class of user
        if(!empty($NewdatasUser->getPassword())){
            //dd($data->user->newpassword);
            $user[0]->setPassword($encoder->encodePassword($user[0],  $NewdatasUser->getPassword()));
            //we put on the array all comments we want to put on the mail
            $messages[] = "votre password à été mis à jour";
        }
        if(!empty($NewdatasUser->getEmail())){
            //dd($data->user->newpassword);
            $user[0]->setEmail($NewdatasUser->getEmail());
            //we put on the array all the comments we want to put on the mail
            $messages[] = "votre email à été mis à jour";
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
        
        //we can check if we need to update the gps position of restaurant with $updatePosition if the adress change
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

            ->setFrom('send@example.com')
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
}
