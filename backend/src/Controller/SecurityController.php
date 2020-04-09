<?php

namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


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
        // controller can be blank: it will never be executed!
        throw new \Exception('Don\'t forget to activate logout in security.yaml');
    }


    //{
    //"username": "dunglas",
    //"password": ""
    //}

}
