<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Entity\Token;
use App\Entity\Restaurant;
use App\Service\SiretService;
use App\Service\GeocodingService;
use App\Repository\RoleRepository;
use App\Repository\UserRepository;
use App\Repository\TokenRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Constraints as Assert;
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
       
        $user = $denormalizer->denormalize($data, User::class);
        $errorsUser = $validator->validate($user);

        $restaurant = $denormalizer->denormalize($data->restaurant, Restaurant::class);
       
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
            if(!empty($jsonErrors)){
                return $this->json($jsonErrors,Response::HTTP_UNPROCESSABLE_ENTITY);
            }
        }

        //Checking siret or siren code call service
        $response = SiretService::checkSiret($user->getRestaurant()->getSiretCode());

        //dd($response);
        if ($response === false) {
            return $this->json([['field' => 'siret code',
                                'message' => 'Numéro siret ou siren invalide.']],Response::HTTP_BAD_REQUEST);
        }
    
        $restaurantPosition = GeocodingService::geocodeAddress($restaurant->getAddress(), $restaurant->getPostcode(), $restaurant->getCity(),$restaurant->getCountry());
        //dd($restaurantPosition);
        if($restaurantPosition == false ){
            return $this->json([['field' => 'adresse postale',
                                'message' => 'Adresse postale invalide']],Response::HTTP_UNPROCESSABLE_ENTITY);
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

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($user);
        $entityManager->flush();


        // Email sent to the newly created User/Restaurant to confirm the registration
        $message = (new \Swift_Message('Information partenaire ListEat'))

            ->setFrom('team@listeat.io')
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

        return $this->json(['message' => 'Votre inscription est finalisé.',
                            'code' => Response::HTTP_CREATED]);
    }

    /**
     * @Route("/forgotten-password", name="api_user_pwd", methods={"POST"})
     */
    public function forgottenPwd(Request $request, UserRepository $userRepository, DenormalizerInterface $denormalizer, \Swift_Mailer $mailer)
    {
        /*
        {"username": "blabla@bla.com"}
        */
        $data = json_decode($request->getContent());

        // looking for the existence of the user in the database based on the provided email
        $user = $userRepository->findBy(['email' => $data->username]);
       
        // if the user exists, a token is created
        if($user) {
            $user = $user[0];
            $token = $denormalizer->denormalize($data, Token::class);

            // $tokenString = random_bytes(10);
            // $tokenforbdd= rtrim(strtr(base64_encode($tokenString), '+/', '-_'), '=');

            $tokenforbdd = rand ( 100000 , 999999 );

            $token->setTokenString($tokenforbdd);
            $token->setUser($user);
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($token);
            $entityManager->flush();

             // Email sent to the user with the token/security code needed to set a new password
            $message = (new \Swift_Message('Information partenaire ListEat'))

            ->setFrom('team@listeat.io')
            ->setTo($user->getEmail())
            ->setBody(
                        $this->renderView(
                            'emails/forgotten-password.html.twig',
                            ['name' => $user->getfirstName(),
                            'token' => $token->getTokenString()]
                        ),
            'text/html'
                    );

        $mailer->send($message);

        } else {
            return $this->json(['message' => 'Cet identifiant n\'existe pas.'], Response::HTTP_NOT_FOUND);
        }

        return $this->json(['message' => 'Code de sécurité envoyé'], Response::HTTP_CREATED);
    }

    /**
     * @Route("/forgotten-password/confirmation", name="api_new_pwd", methods={"POST"})
     */
    public function newPwd(Request $request, UserPasswordEncoderInterface $encoder, UserRepository $userRepository, TokenRepository $tokenRepository, DenormalizerInterface $denormalizer, \Swift_Mailer $mailer, ValidatorInterface $validator)
    {
         /*
        {
        "securityCode":"blabla",
        "userId": 4,
        "newPassword":"EGRGE"
        }
        */
        $data = json_decode($request->getContent());
        $securityCode = $data->securityCode;
        $user = $userRepository->find($data->userId);

        // looking for a token for which the provided security code and user id match
        $token = $tokenRepository->findBy(['tokenString' => $securityCode, 'user' => $user ]);
        
        if (!$token) {
            return $this->json(['Votre code de sécurité est erroné.'], Response::HTTP_NOT_FOUND);
        }

        // calculating the time difference between the creation time of the token and the input time of this same token
        $tokenCreationTime = $token[0]->getCreatedAt();
        $tokenInputTime = new \DateTime();
        $dateInterval = $tokenCreationTime->diff($tokenInputTime);
        $daysInMin = $dateInterval->d * 24 * 60;
        $hoursInMin = $dateInterval->h * 60;
        $minutes = $dateInterval->i;
        $totalMinutes = $daysInMin + $hoursInMin + $minutes;
        $interval = $totalMinutes;

        // if the difference is greater than 10 minutes (can be changed), the token is considered expired and therefore destroyed, the user can't change the password and has to ask for a new token
        if ($interval > 10) {
            $user->removeToken($token[0]);
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->flush();
            return $this->json(['Votre code de sécurité a expiré.'], Response::HTTP_NOT_FOUND);
        }
        
        // if the token is valid and the password deemed acceptable (for the time being "not blank"), the new password is set and the token destroyed
        if ($token[0]) {
            $errors = $validator->validate($data->newPassword, new Assert\NotBlank());

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
            $user->setPassword($encoder->encodePassword($user, $data->newPassword));
            $user->removeToken($token[0]);
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->flush();

            // Email sent to the user confirming the new password has been set
            $message = (new \Swift_Message('Information client ListEat'))

            ->setFrom('team@listeat.io')
            ->setTo($user->getEmail())
            ->setBody(
                        $this->renderView(
                            'emails/forgotten-password-confirmation.html.twig',
                            ['name' => $user->getfirstName()]
                        ),
            'text/html'
                    );

            $mailer->send($message);

            return $this->json(['message' => 'mot de passe modifié'], Response::HTTP_OK);
        }
    }
    
}

// @Assert\Length(min=7, groups={"registration"})
// @Assert\Length(min=8)
// https://symfony.com/doc/current/validation/groups.html
