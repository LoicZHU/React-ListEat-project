<?php

namespace App\Controller\Api;

use App\Entity\QrCode;
use App\Service\QrCodeGenerator;
use App\Repository\RestaurantRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
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
     */
    public function add($id,ValidatorInterface $validator, RestaurantRepository $restaurantRepository)
    {

        $restaurant = $restaurantRepository->find($id);

        if (!$restaurant) {
            return $this->json(Response::HTTP_BAD_REQUEST);
        } 

        //we generat the QRccode if the restaurant exist
        $lien = QrCodeGenerator::generate($id);

        $QrCode = new QrCode;
        $QrCode->setUrl($lien);
        $QrCode->setRestaurant($restaurant);

        //TODO VERIFICATION
        $errors = $validator->validate($QrCode);
        if (count($errors) > 0) {
            return $this->json(Response::HTTP_BAD_REQUEST);
        }

        $restaurant->setQrCode($QrCode);

        $errors = $validator->validate($restaurant);
        if (count($errors) > 0) {
            return $this->json(Response::HTTP_BAD_REQUEST);
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($QrCode);
        $em->persist($restaurant);
        $em->flush();
        $em->refresh($QrCode);
        
    return $this->json(['QrCodeUrl' => $QrCode->getUrl()], Response::HTTP_CREATED);
    }
}


