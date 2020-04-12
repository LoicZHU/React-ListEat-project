<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Entity\Restaurant;
use App\Service\GeocodingService;
use App\Repository\RoleRepository;
use Symfony\Component\HttpFoundation\Request;
use FOS\UserBundle\Model\UserManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserController extends AbstractController
{
    /**
     * @Route("/api/partner", name="api_user_add", methods={"POST"})
     */
    public function register(Request $request, UserPasswordEncoderInterface $encoder, RoleRepository $roleRepository, DenormalizerInterface $denormalizer, ValidatorInterface $validator, \Swift_Mailer $mailer)
    {

        $data = json_decode($request->getContent());
        //dd($data->role);

        $user = $denormalizer->denormalize($data, User::class);
        $errorsUser = $validator->validate($user);

        $restaurant = $denormalizer->denormalize($data->restaurant, Restaurant::class);
        // $restaurant= $denormalizer->denormalize($data->restaurant, Restaurant::class);
        // $errors = [];
        $errorsRestaurant = $validator->validate($restaurant);

        $jsonErrors = [];
        // $errors est une ConstraintViolationList = se comporte comme un tableau
        if (count($errorsUser) !== 0) {
            //$jsonErrors = [];
            foreach ($errorsUser as $error) {
                $jsonErrors[] = [
                    'field' => $error->getPropertyPath(),
                    'message' => $error->getMessage(),
                ];
            }
        }

        // $errors est une ConstraintViolationList = se comporte comme un tableau
        if (count($errorsRestaurant) !== 0) {
            //$jsonErrors = [];
            foreach ($errorsRestaurant as $error) {
                $jsonErrors[] = [
                    'field' => $error->getPropertyPath(),
                    'message' => $error->getMessage(),
                ];
            }
        }

        if(!empty($jsonErrors)){
            return $this->json($jsonErrors, Response::HTTP_UNPROCESSABLE_ENTITY);
        }



            $address = $restaurant->getAddress()." ".$restaurant->getPostcode()." ".$restaurant->getCountry();
            
            $restaurantPosition = GeocodingService::geocodeAddress($address);
            //dd($restaurantPosition);
            if(empty($restaurantPosition['lat'])){
                return $this->json(['message' => 'Adresse invalide.'],Response::HTTP_UNPROCESSABLE_ENTITY);
            }else{
                $user->setRestaurant($restaurant->setLongitude($restaurantPosition['lng']));
                $user->setRestaurant($restaurant->setLatitude($restaurantPosition['lat']));
            } 


        $user->setPassword($encoder->encodePassword($user, $user->getPassword()));

        // if $data->role is not set, default role is RESTAURATEUR (id : 1)
        if (!isset($data->role)) {
            $role = $roleRepository->find(1);
        } else {
            $role = $roleRepository->find($data->role);
        }
        $user->setRole($role);

        //dd($user->getRestaurant()->getCity());
        //die();

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($user);
        $entityManager->flush();


        // Email sent to the newly created User/Restaurant to confirm the registration
        $message = (new \Swift_Message('Information partenaire ListEat'))

            ->setFrom('send@example.com')
            ->setTo($user->getEmail())
            ->setBody(
                        $this->renderView(
                            
                            //TODO Registration Template 
                            // templates/emails/registration.html.twig
                            'emails/registration.html.twig',
                            ['name' => $user->getfirstName()]
                        ),
            'text/html'
                    );

        $mailer->send($message);

        return $this->json(Response::HTTP_CREATED);
    }

}
