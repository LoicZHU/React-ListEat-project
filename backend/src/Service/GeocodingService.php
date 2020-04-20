<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Config\Definition\Exception\Exception;

class GeocodingService
{
    private static $apikey = 'AIzaSyAnC8-HtRMV3wBgYeSogDMYWtD-zYRTuRU';

    //TODO
    public static function geocodeAddress($street, $postcode, $city, $country) {

        $address1 = $street." ".$postcode." ".$city." ".$country;
        //valeurs vide par défaut
        $data = array('address' => '', 'lat' => '', 'lng' => '', 'city' => '', 'department' => '', 'region' => '', 'country' => '', 'postal_code' => '');
        //on formate l'adresse
        $address = str_replace(" ", "+", $address1);
        //on fait l'appel à l'API google map pour géocoder cette adresse
        $json = file_get_contents("https://maps.google.com/maps/api/geocode/json?key=" . self::$apikey . "&address=$address&sensor=false&region=fr");
        $json = json_decode($json);

        //on enregistre les résultats recherchés
        if ($json->status == 'OK' && count($json->results) > 0) {
            $res = $json->results[0];
            //full address  and latitude/longitude
            $data['address'] = $res->formatted_address;
            $data['lat'] = $res->geometry->location->lat;
            $data['lng'] = $res->geometry->location->lng;
            foreach ($res->address_components as $component) {
              
                if ($component->types[0] == 'street_number') {
                    $data['number'] = $component->long_name;
                }
                //street
                if ($component->types[0] == 'route') {
                    $data['street'] = $component->long_name;
                }
                //city
                if ($component->types[0] == 'locality') {
                    $data['city'] = $component->long_name;
                }
                //pays
                if ($component->types[0] == 'country') {
                    $data['country'] = $component->long_name;
                }
                //code postal
                if ($component->types[0] == 'postal_code') {
                    $data['postal_code'] = $component->long_name;
                    
                }
            }
        }
        //dd($component);
        //VERIFIER LE NUMERO  
        if(!isset($data['street'])){
             return false;
        }
        $t=stristr($address1, $data['street']);
        $c=stristr($address1, $data['postal_code']);
        $z=stristr($address1, $data['city']);

        if($t===false){
            return false;
        }
        if($c===false){
            return false;
        }
        if($z===false){
            return false;
        }
        //dd($data, $t, $address1, $c);
        return $data;
    }



     /**
     * Return the distance between two gps entry point by meter 
     */
    public static function distance($lat1, $lng1, $lat2, $lng2) {
        $earth_radius = 6378137;   // Terre = sphère de 6378km de rayon
        $rlo1 = deg2rad($lng1);
        $rla1 = deg2rad($lat1);
        $rlo2 = deg2rad($lng2);
        $rla2 = deg2rad($lat2);
        $dlo = ($rlo2 - $rlo1) / 2;
        $dla = ($rla2 - $rla1) / 2;
        $a = (sin($dla) * sin($dla)) + cos($rla1) * cos($rla2) * (sin($dlo) * sin($dlo));
        $d = 2 * atan2(sqrt($a), sqrt(1 - $a));
        //
        $meter = ($earth_radius * $d);
      
        return $meter;
    }

}