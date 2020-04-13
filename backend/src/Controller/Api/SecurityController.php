<?php

namespace App\Controller\Api;


use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

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
            'restaurantId' => $user->getRestaurant()->getId()
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

    /**
     * @Route("api/partner/islogged", name="api_", methods={"POST"})
     * @IsGranted("ROLE_RESTAURATEUR")
     */
    public function islogged(){

        $user = $this->getUser();

        return $this->json([
            'username' => $user->getUsername(),
            'restaurantId' => $user->getRestaurant()->getId(),
            'restaurantStatus' => $user->getRestaurant()->getStatus()
        ], Response::HTTP_OK);
    
        }

}
