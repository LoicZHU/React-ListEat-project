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
            'Authorization' => 'Bearer e7b58925-32bc-39ca-a975-014fa4706c91'
        );

        if(strlen($siretCode) === 14){
            //I use unirest for erreur gestion is better than file_get_content
            $response = Request::get('https://api.insee.fr/entreprises/sirene/V3/siret/'.$siretCode ,$opts);
        }if(strlen($siretCode) === 9){
            $response = Request::get('https://api.insee.fr/entreprises/sirene/V3/siren/'.$siretCode ,$opts);
        }
        if(!isset($response)){
            return false;
        }
        if($response->code == 200){
            return true;
        }else{
            return false;
        }
    }
}
