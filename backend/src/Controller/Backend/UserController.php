<?php

namespace App\Controller\Backend;

use App\Entity\User;
use App\Form\UserType;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserController extends AbstractController
{
    /**
     * @Route("/backend/user", name="backend_user_list", methods={"GET"})
     */
    public function show(UserRepository $userRepository)
    {
        return $this->render('backend/user/list.html.twig', [
            'users' => $userRepository->findAll(),
        ]);
    }

     /**
     * @Route("/backend/user/{id<\d+>}", name="backend_user_show", methods={"GET"})
     */
    public function list($id,UserRepository $userRepository)
    {
        $user = $userRepository->find($id);

        return $this->render('backend/user/show.html.twig', [
            'user' => $user,
        ]);
    }

    /**
     * @Route("/backend/user/delete/{id<\d+>}", name="backend_user_delete", methods={"DELETE"})
     */
    public function delete(User $user = null, Request $request)
    {
        //$submittedToken = $request->request->get('token');

        // 'delete-job' is the same value used in the template to generate the token
       // if ($this->isCsrfTokenValid('delete-job', $submittedToken)) {

            // Token valide

            if ($user === null) {
                // 404 ?
                throw $this->createNotFoundException('Cet user n\'existe pas.');
            }
    
            // On remove via Doctrine Manager
            $em = $this->getDoctrine()->getManager();
            $em->remove($user);
            $em->flush($user);
    
            $this->addFlash('success', 'user supprimé : '.$user->getEmail());

        //} else {

            // Token invalide

            //$this->addFlash('danger', 'Formulaire invalide. Veuillez le renvoyer.');

        //}

        return $this->redirectToRoute('backend_user_list');
    }

     /**
     * @Route("backend/edit/{id}", name="backend_user_edit", methods={"GET","POST"})
     */
    public function edit( Request $request, User $user, UserPasswordEncoderInterface $passwordEncoder): Response
    {
      
        // On crée une nouvelle entité user
       
        //dump($job);
        // On crée le formulaire d'ajout du job
        // ... sur lequel on "map" le job
        $form = $this->createForm(UserType::class, $user);

        // On demande au form de "prendre en charge" la requête
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

        // Si form est soumis ? Est-il valide ?
        if ($form->get('password')->getData()) {
            // Encodons-le
            $encodedPassword = $passwordEncoder->encodePassword($user, $form->get('password')->getData());
            // Mettons-le dans le user
            $user->setPassword($encodedPassword);
        }
        $this->getDoctrine()->getManager()->flush();

        $this->addFlash('success', "user mis à jour avec succès");

        return $this->redirectToRoute('backend_user_list');
    }

    return $this->render('backend/user/edit.html.twig', [
        'user' => $user,
        'form' => $form->createView(),
    ]);
    }
}

