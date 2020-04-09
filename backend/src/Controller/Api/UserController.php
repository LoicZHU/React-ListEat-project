<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Repository\RoleRepository;
use Symfony\Component\HttpFoundation\Request;
use FOS\UserBundle\Model\UserManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserController extends AbstractController
{
    /**
     * @Route("/api/partner", name="api_user_add", methods={"POST"})
     */
    public function registrer(Request $request, UserPasswordEncoderInterface $encoder, RoleRepository $roleRepository, DenormalizerInterface $denormalizer, ValidatorInterface $validator)
    {
        
        $data = json_decode($request->getContent());
        //dd($data->role);

        $user = $denormalizer->denormalize($data, User::class);

        $errors = $validator->validate($user);

        // $errors est une ConstraintViolationList = se comporte comme un tableau
        if (count($errors) !== 0) {
            $jsonErrors = [];
            foreach ($errors as $error) {
                $jsonErrors[] = [
                    'field' => $error->getPropertyPath(),
                    'message' => $error->getMessage(),
                ];
            }

            return $this->json($jsonErrors, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

       
        $user->setPassword($encoder->encodePassword($user, $user->getPassword()));

        if(!isset($data->role)) {
            $role = $roleRepository->find(1);

        } else {
        
            $role = $roleRepository->find($data->role);       
        }
        $user->setRole($role);
       
        //dd($user);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($user);
        $entityManager->flush();


       return $this->json(Response::HTTP_CREATED);
       
    }
}