<?php

namespace App\Controller\Api;

use DateTime;
use App\Entity\User;
use App\Entity\Token;
use App\Entity\Restaurant;
use App\Service\SiretService;
use App\Service\GeocodingService;
use App\Repository\RoleRepository;
use App\Repository\UserRepository;
use App\Repository\TokenRepository;
use Doctrine\ORM\Query\AST\Functions\CurrentTimestampFunction;
use Symfony\Component\HttpFoundation\Request;
use FOS\UserBundle\Model\UserManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\BrowserKit\Response as BrowserKitResponse;
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
            return $this->json($jsonErrors, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        //Checking siret or siren code call service
        $response = SiretService::checkSiret($user->getRestaurant()->getSiretCode());

        //dd($response);
        if ($response == false) {
            return $this->json(['message' => 'Numéro siret ou siren invalide.'], Response::HTTP_BAD_REQUEST);
        }
    
        $address = $restaurant->getAddress()." ".$restaurant->getPostcode()." ".$restaurant->getCountry();
        
        $restaurantPosition = GeocodingService::geocodeAddress($address);
        //dd($restaurantPosition);
        if(empty($restaurantPosition['lat'])){
            return $this->json(['message' => 'Adresse invalide.'], Response::HTTP_UNPROCESSABLE_ENTITY);
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

        return $this->json(['message' => 'Votre inscription est finalisé.'], Response::HTTP_CREATED);
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
        $user = $userRepository->findBy(['email' => $data->username]);
       

        if($user) {
            $user = $user[0];
            $token = $denormalizer->denormalize($data, Token::class);
            $tokenString = random_bytes(10);
            $tokenforbdd= rtrim(strtr(base64_encode($tokenString), '+/', '-_'), '=');
            $token->setTokenString($tokenforbdd);
            $token->setUser($user);
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($token);
            $entityManager->flush();

             // Email sent to the user with the security code needed to set a new password
            $message = (new \Swift_Message('Information partenaire ListEat'))

            ->setFrom('send@example.com')
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

        return $this->json(['message' => 'Code de sécurité envoyé', 'userId' => $user->getId()], Response::HTTP_CREATED);
    }

     /**
     * @Route("/forgotten-password/confirmation", name="api_new_pwd", methods={"POST"})
     */
    public function newPwd(Request $request, UserPasswordEncoderInterface $encoder, UserRepository $userRepository, TokenRepository $tokenRepository, DenormalizerInterface $denormalizer, \Swift_Mailer $mailer, ValidatorInterface $validator)
    {
        /*
        {"securityCode":"blabla",
        "userId": 4,
        "newPassword":"EGRGE",
        ""}
        */
        $data = json_decode($request->getContent());
        $securityCode = $data->securityCode;
        $user = $userRepository->find($data->userId);
        $token = $tokenRepository->findBy(['tokenString' => $securityCode, 'user' => $user ]);
        

        $tokenDate = $token[0]->getCreatedAt();
            $toto= DateTime::format($tokenDate);

        dd($toto);

        die();

        $timestamp = strtotime($tokenDate);
        DateTime::format ( $tokenDate );
        
        //$currentTimestamp = current;
        //$diff = $currentTimestamp - $timestamp
        // $diffConvertedInMin = 
        //if ($diffConvertedInMin > 20)
        //$time = date('H:i:s'); 
        //$tokenhour= DateTime::createFromFormat('H:I:S', $tokenDate);


     
        


        // sM2OUPJ--5BnAA
        //dd($tokenhour);
        if ($token[0]) {
            $errors = $validator->validate($data->newPassword, new Assert\NotBlank());
            //dd($errors);
            
            //$errorsUser = $validator->validate($user, null, ['Newpassword']);

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
            return $this->json(['message' => 'mot de passe modifié'], Response::HTTP_OK);
        }
    }
    
}
// @Assert\Length(min=7, groups={"registration"})

// @Assert\Length(min=8)
// https://symfony.com/doc/current/validation/groups.html

//AdYvlh1M3BvpNg


