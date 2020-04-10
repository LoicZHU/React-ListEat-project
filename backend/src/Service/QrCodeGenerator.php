<?php

namespace App\Service;

use Endroid\QrCode\QrCode;
use Endroid\QrCode\LabelAlignment;
use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\Response\QrCodeResponse;

class QrCodeGenerator
{
    /**
     * returns booleen
     * Generate
     */
    public function generate()
    {
        // Create a basic QR code
        $lien='';
        $qrCode = new QrCode('https://www.monadresseweb.com');
        $qrCode->setSize(300);

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
        $qrCode->writeFile('../file/temp/Qrcode.png');

        $image = imagecreatefrompng("../file/temp/Qrcode.png"); // this is a source image
        $logo = imagecreatefrompng("../ressource/logo/LogoListEat.png"); //Owner logo


        //Text on the Qr Code!
        $texte = "Scanner le Qr code pour prendre un ticket";

        // Text color
        $color = imagecolorallocate($image, 0, 0, 0);

        //We put a font style
        imagettftext($image, 18, 0, 60, 70, 1, '../ressource/police/OpenSans-Regular.ttf', $texte);

        //we save image on server
        imagejpeg($image, "../file/qr_code/qrcode-id.jpg");

        //Remove the Qr-code with Out Logo
        unlink('../file/temp/Qrcode.png');


        return true;
    }
}
