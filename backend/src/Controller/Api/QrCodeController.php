<?php

namespace App\Controller\Api;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Service\QrCodeGenerator;


class QrCodeController extends AbstractController
{
    /**
     * @Route("/api/qr/code", name="api_qr_code", methods={"GET"} )
     */
    public function generate()
    {
        $response = QrCodeGenerator::generate();

        if($response){
            return $this->json(Response::HTTP_OK);
        }else{
            return $this->json(Response::HTTP_BAD_REQUEST);
        }
    }
}
