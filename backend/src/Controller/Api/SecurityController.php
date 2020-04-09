<?php

namespace App\Controller\Api;


use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class SecurityController extends AbstractController
{
    /**
     * @Route("api/partner/login", name="api_login", methods={"POST"})
     */
    public function login(Request $request)
    {
        $user = $this->getUser();

        //dd($request);

        return $this->json([
            'username' => $user->getUsername(),
            'roles' => $user->getRoles(),
        ]);
    }


    /**
     * @Route("api/partner/logout", name="api_logout", methods={"GET"})
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

}
