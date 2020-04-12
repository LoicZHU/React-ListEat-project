<?php

namespace App\Service;

use Unirest\Request;


class SiretService
{
    /**
     * returns a string
     */
    public function checkSiret($siretCode)
    {
        //We put token key on the header
        $opts = array(
            'Authorization' => 'Bearer 7f61f0f7-cf74-3852-8a0b-1d5c925ca296'
        );

        if(strlen($siretCode) === 14){
            //I use unirest for erreur gestion is better than file_get_content
            $response = Request::get('https://api.insee.fr/entreprises/sirene/V3/siret/'.$siretCode ,$opts);
        }if(strlen($siretCode) === 9){
            $response = Request::get('https://api.insee.fr/entreprises/sirene/V3/siren/'.$siretCode ,$opts);
        }
        
        if($response->code == 200){
            return true;
        }else{
            return false;
        }
    }
}
