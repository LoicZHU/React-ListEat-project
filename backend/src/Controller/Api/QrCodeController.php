<?php

namespace App\Controller\Api;

use App\Entity\QrCode;
use App\Service\QrCodeGenerator;
use App\Repository\RestaurantRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;



class QrCodeController extends AbstractController
{
    // /**
    //  * update
    //  * @Route("/api/qr/code", name="api_qr_code", methods={"GET"} )
    //  */
    // public function generate()
    // {
    //     $response = QrCodeGenerator::generate('2');

    //     dd($response);
    //     if ($response !== false) {
    //         return $this->json( $response,Response::HTTP_OK);
    //     } else {
    //         return $this->json(Response::HTTP_BAD_REQUEST);
    //     }
    // }

    /**
     * @Route("api/partner/{id}/qrcode", name="api_QrCode_add", methods={"POST"})
     * @IsGranted("ROLE_RESTAURATEUR")
     */
    public function add($id,ValidatorInterface $validator, RestaurantRepository $restaurantRepository)
    {

        $restaurant = $restaurantRepository->find($id);

        if (!$restaurant) {
            return $this->json(['message' => 'Ce restaurant n\'existe pas.'],Response::HTTP_NOT_FOUND);
        } 

        // checks if the connected partner is the same as the owner of the restaurant on which he/she wants to perform an action
        $user = $this->getUser();
        if ($user->getRestaurant()->getId() != $id) {
            return $this->json(['message' => 'Ce n\'est pas votre restaurant.'], Response::HTTP_BAD_REQUEST);
        }
        // generates the QRccode if the restaurant exists
        $lien = QrCodeGenerator::generate($id,$restaurant->getName());

        $QrCode = new QrCode;
        $QrCode->setUrl($lien);
        $QrCode->setRestaurant($restaurant);

        //TODO VERIFICATION
        $errors = $validator->validate($QrCode);
        $jsonErrors = [];
        // $errors est une ConstraintViolationList = se comporte comme un tableau
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

        $restaurant->setQrCode($QrCode);

        $errors = $validator->validate($restaurant);

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

        $em = $this->getDoctrine()->getManager();
        $em->persist($QrCode);
        $em->persist($restaurant);
        $em->flush();
        $em->refresh($QrCode);
        
        return $this->file($QrCode->getUrl(), 'VotreQrCode.pdf', ResponseHeaderBag::DISPOSITION_ATTACHMENT);
    }
}


