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
    public function generate($restaurantId,$restaurantName)
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
        $qrCode->setForegroundColor(['r' => 0, 'g' => 0, 'b' => 0, 'a' => 0]);
        //$qrCode->setBackgroundColor(['r' => 255, 'g' => 255, 'b' => 255, 'a' => 0]);
        
        $qrCode->setLogoPath($_SERVER['PWD']."/ressource/logo/QrcodeCalqueV3.png");
        //$qrCode->setLogoSize(150, 200);
        $qrCode->setRoundBlockSize(false);
        $qrCode->setValidateResult(false);
        $qrCode->setWriterOptions(['exclude_xml_declaration' => true]);

        // Directly output the QR code
        //header('Content-Type: ' . $qrCode->getContentType());
        // dd$qrCode->writeString();

        // Save it to a file
        $qrCode->writeFile($_SERVER['PWD']."/file/temp/Qrcode".$restaurantId.".png");

        $image = imagecreatefrompng($_SERVER['PWD']."/file/temp/Qrcode".$restaurantId.".png"); // this is a source image
        //$calque = imagecreatefrompng("$_SERVER['PWD']."/ressource/logo/QrcodeCalque.png"); //Calque

        //Text on the Qr Code!
        $texte = $restaurantName;
  
        // Text color
        $color = imagecolorallocate($image, 0, 0, 0);

        //We put a font style
        imagettftext($image, 18, 0, 55, 95, 1, $_SERVER['PWD'].'/ressource/police/OpenSans-Regular.ttf', $texte);
     
        //we save image on server
        //imagecopymerge($image, $calque, 0, 0, 0, 0, 100, 47, 75);
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
