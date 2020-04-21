<?php

namespace App\Service;

use Endroid\QrCode\QrCode;
use App\Service\CryptoService;
use Endroid\QrCode\LabelAlignment;
use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\Response\QrCodeResponse;
use Symfony\Component\HttpFoundation\Response;
use ImalH\PDFLib\PDFLib;


class QrCodeGenerator
{
    /**
     * returns booleen
     * Generate
     */
    public function generate($restaurantId,$restaurantName)
    {

        //we encrypt the resaturant id, it will be in the QR code Url
        $cryptedId = CryptoService::crypt($restaurantId);

        //we define the base url in $baseUrl by php function getcwd()
        $baseUrl= getcwd();
        $binary = "\x09/public\x0A";
        $trimmed = trim($baseUrl,  $binary);
        $baseUrl = '/'.$trimmed;
    
        // creating a qrcode with the Qrcode class
        $lien='http://'.$_SERVER['HTTP_HOST'].'/restaurant/'.$cryptedId.'/tickets/add';
        $qrCode = new QrCode($lien);
        $qrCode->setSize(1000);
        //dd($lien);

        // Set advanced options
        $qrCode->setWriterByName('png');
        $qrCode->setMargin(50);
        $qrCode->setEncoding('UTF-8');
        $qrCode->setErrorCorrectionLevel(ErrorCorrectionLevel::HIGH());
        $qrCode->setForegroundColor(['r' => 0, 'g' => 0, 'b' => 0, 'a' => 0]);
    
        $qrCode->setRoundBlockSize(false);
        $qrCode->setValidateResult(false);
        $qrCode->setWriterOptions(['exclude_xml_declaration' => true]);

        // Save it to a folder temp
        $qrCode->writeFile( $baseUrl."/file/temp/Qrcode".$restaurantId.".png");

        $image = imagecreatefrompng( $baseUrl."/file/temp/Qrcode".$restaurantId.".png"); // this is a source image

        // Text color
        $color = imagecolorallocate($image, 0, 0, 0);

        //we save image on server
        imagejpeg($image,  $baseUrl."/file/qr_code/qrcode-".$restaurantId.".png");

        //Remove the Qr-code with Out Logo
        unlink( $baseUrl.'/file/temp/Qrcode'.$restaurantId.'.png');


/////////////////////////// CREATE THE A4 FORMAT

    $source = imagecreatefromjpeg($baseUrl."/file/qr_code/qrcode-".$restaurantId.".png"); // Le logo est la source
    $destination = imagecreatefrompng($baseUrl."/ressource/logo/CalqueA4.png"); // La photo est la destination

    // Les fonctions imagesx et imagesy renvoient la largeur et la hauteur d'une image
    $largeur_source = imagesx($source);
    $hauteur_source = imagesy($source);
    $largeur_destination = imagesx($destination);
    $hauteur_destination = imagesy($destination);

    // On veut placer le logo en bas à droite, on calcule les coordonnées où on doit placer le logo sur la photo
    $destination_x = $largeur_destination - $largeur_source-225;
    $destination_y =  $hauteur_destination - $hauteur_source-390;

    // On met le logo (source) dans l'image de destination (la photo)
    imagecopymerge($destination, $source, $destination_x, $destination_y, 0, 0, $largeur_source, $hauteur_source, 90);

    //Name of the restaurant to merge on image
    $texte = $restaurantName;
    $color = imagecolorallocate($source, 42, 42, 42);
    //On met le texte
    imagettftext($destination, 35, 0, 145, 2550,  $color, $baseUrl.'/ressource/police/OpenSans-Bold.ttf', $texte);

    imagejpeg($destination, $baseUrl."/file/qr_code/qrcode-".$restaurantId.".png");


    /////////////////////////////////////////
        // jpe to pdf
        $pdflib = new PDFLib;
        $imagePaths = [$baseUrl."/file/qr_code/qrcode-".$restaurantId.".png" ];
        $pdflib->makePDF($baseUrl."/file/qr_code/qrcode-".$restaurantId.".pdf",$imagePaths);
        //unlink( $baseUrl."/file/qr_code/qrcode-".$restaurantId.".png");

        $UrlImage =  $baseUrl."/file/qr_code/qrcode-".$restaurantId.".pdf";
        if (file_exists($UrlImage)) {
            return $UrlImage;
        } else {
            return false;
        }        
    }
}
