<?php

namespace App\Service;

use Endroid\QrCode\QrCode;
use App\Service\CryptoService;
use Endroid\QrCode\LabelAlignment;
use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\Response\QrCodeResponse;
use Symfony\Component\HttpFoundation\Response;

class QrCodeGenerator
{
    /**
     * returns booleen
     * Generate
     */
    public function generate($restaurantId)
    {

        //We crypt restaurant Id
        $cryptedId = CryptoService::crypt($restaurantId);

        
        // Create a basic QR code
        $lien='http://'.$_SERVER['HTTP_HOST'].'/restaurant/'.$cryptedId.'/tickets/add';
        $qrCode = new QrCode($lien);
        $qrCode->setSize(300);
        //dd($lien);
        // Set advanced options
        $qrCode->setWriterByName('png');
        $qrCode->setMargin(150);
        $qrCode->setEncoding('UTF-8');
        $qrCode->setErrorCorrectionLevel(ErrorCorrectionLevel::HIGH());
        //$qrCode->setForegroundColor(['r' => 0, 'g' => 0, 'b' => 0, 'a' => 0]);
        //$qrCode->setBackgroundColor(['r' => 255, 'g' => 255, 'b' => 255, 'a' => 0]);
        
        $qrCode->setLogoPath('../ressource/logo/LogoListEat.png');
        //$qrCode->setLogoSize(150, 200);
        $qrCode->setRoundBlockSize(true);
        $qrCode->setValidateResult(false);
        $qrCode->setWriterOptions(['exclude_xml_declaration' => true]);

        // Directly output the QR code
        //header('Content-Type: ' . $qrCode->getContentType());
        //echo $qrCode->writeString();

        // Save it to a file
        $qrCode->writeFile($_SERVER['PWD']."/file/temp/Qrcode".$restaurantId.".png");

        $image = imagecreatefrompng($_SERVER['PWD']."/file/temp/Qrcode".$restaurantId.".png"); // this is a source image
        $logo = imagecreatefrompng($_SERVER['PWD']."/ressource/logo/LogoListEat.png"); //Owner logo


        //Text on the Qr Code!
        $texte = "Scanner le Qr code pour prendre un ticket";

        // Text color
        $color = imagecolorallocate($image, 0, 0, 0);

        //We put a font style
        imagettftext($image, 18, 0, 60, 70, 1, $_SERVER['PWD'].'/ressource/police/OpenSans-Regular.ttf', $texte);

        //we save image on server
        $UrlImage = $_SERVER['PWD']."/file/qr_code/qrcode-".$restaurantId.".jpg";
        imagejpeg($image, $_SERVER['PWD']."/file/qr_code/qrcode-".$restaurantId.".jpg");

        //Remove the Qr-code with Out Logo
        unlink($_SERVER['PWD'].'/file/temp/Qrcode'.$restaurantId.'.png');

        


        if (file_exists($UrlImage)) {
            return $UrlImage;
        } else {
            return false;
        }

        
    }
}
