<?php

namespace App\Service;

use phpseclib\Crypt\RSA;



class CryptoService
{
    /**
     * returns a string
     */
    public function crypt($dataToCrypt)
    {
         // CRYPTER
        $rsa = new RSA();
        $rsa->loadKey($_ENV['PUBLIC_KEY']); // public key

        

        //$rsa->setEncryptionMode(RSA::ENCRYPTION_OAEP);
        $data = $rsa->encrypt($dataToCrypt);

        //converter characters to Url
        $dataEncodeForUrl= rtrim(strtr(base64_encode($data), '+/', '-_'), '=');

       return $dataEncodeForUrl;
    }

    /**
     * returns a string
     */
    public function decrypt($dataToDecrypt)
    {
        $rsa = new RSA();
        $rsa->loadKey($_ENV['PRIVATE_KEY']); // private key

        $dataToRsa = base64_decode(str_pad(strtr($dataToDecrypt, '-_', '+/'), strlen($dataToDecrypt) % 4, '=', STR_PAD_RIGHT));
        $decryptedData = $rsa->decrypt($dataToRsa);


        return $decryptedData;
    }
} 