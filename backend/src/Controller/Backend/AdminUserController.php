<?php

namespace App\Controller\Backend;

use App\Repository\UserRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AdminUserController extends AbstractController
{
    /**
     * @Route("backend/admin/user", name="backend_admin_user_list")
     */
    public function index(UserRepository $userRepository)
    {
        return $this->render('backend/admin_user/list.html.twig', [
            'users' => $userRepository->findBy(['role' => 2])
        ]);
    }
}
