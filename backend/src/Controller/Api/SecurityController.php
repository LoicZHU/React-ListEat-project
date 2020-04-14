<?php

namespace App\Controller\Api;


use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class SecurityController extends AbstractController
{
    /**
     * @Route("api/partner/login", name="api_login", methods={"POST"})
     */
    public function login(Request $request)
    {
        $user = $this->getUser();
        // in order to be authenticated, the login method in SecurityController must retrieve a role that starts with "ROLE_" and that must be stored in an array 
        return $this->json([
            'username' => $user->getUsername(),
            'roles' => $user->getRoles(),
            'restaurantId' => $user->getRestaurant()->getId(),
            'logged' => true
        ]);
    }

    /**
     * @Route("/logout", name="api_logout", methods={"GET"})
     */
    public function logout()
    {
        
    }

    /**
     * @Route("api/partner/logout/success", name="api_logout_success", methods={"GET"})
     */
    public function logoutSuccess(){

    return $this->json(Response::HTTP_OK);

    }

    //{
    //"username": "dunglas",
    //"password": ""
    //}

    
   // /**
   //  * @Route("api/partner/islogged", name="api_islogged", methods={"POST"})
   //  * @Security("is_granted('ROLE_RESTAURATEUR')", statusCode=200, message="false")
   //  */
    /*public function islogged2(){

        $user = $this->getUser();

        if($user) {
        return $this->json([
            'username' => $user->getUsername(),
            'restaurantId' => $user->getRestaurant()->getId(),
            'restaurantStatus' => $user->getRestaurant()->getStatus(),
            'logged' => true
        ], Response::HTTP_OK);
        }
    }*/

    /**
     * @Route("api/partner/islogged", name="api_islogged", methods={"POST"})
     */
    public function islogged(){

        $user = $this->getUser();
        
        if ($user) {
        return $this->json([
            'username' => $user->getUsername(),
            'restaurantId' => $user->getRestaurant()->getId(),
            'restaurantStatus' => $user->getRestaurant()->getStatus(),
            'logged' => true
        ]);
        } else {
            return $this->json(['logged' => false]);
        }
    }
}