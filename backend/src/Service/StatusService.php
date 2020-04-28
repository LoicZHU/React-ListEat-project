<?php

namespace App\Service;

use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Exception\ClientException;
use Symfony\Component\Routing\Annotation\Route;


class StatusService
{
    
      /**
     * 
     */
    public function test()
    {
      
//vérification route POST /api/partner/login
        try {
            $client = new Client([
                'headers' => [ 'Content-Type' => 'application/json' ]
            ]);
            $res = $client->request('POST', 'https://www.listeat.io:8080/api/partner/login',
                    ['body' => json_encode(
                        [
                            'username' => 'test@test.fr',
                            'password' => 'test12'
                        ]
                    )]
            );
        }catch (ClientException $e) {
            $response = $e->getResponse();
            $responseBodyAsString = $response->getBody()->getContents();
        }

        if(isset($res)){
            $result = $res->getStatusCode();
        }else{
            $result = 0;
        }
       
        //we set a array 
        $jsonconsole = [];

        if($result == 200 ){
            $jsonconsole[] = [ 'login' => true];
        }else{
            $jsonconsole[] = [ 'login' => false];
        }


//vérification route POST api/tickets
            $res = null;
        try {
                $client = new Client([
                    'headers' => [ 'Content-Type' => 'application/json' ]
                ]);
                $res = $client->request('POST', 'https://www.listeat.io:8080/api/tickets',
                        ['body' => json_encode(
                            [
                                'lastName' => 'test',
                                'firstName' => 'test',
                                'cellphone' => '0700000000',
                                'email' => 'servertest@test.fr',
                                'restaurant' => 32,
                                'ticket' =>  [
                                    'coversNb' => 2,
                                ]                              

                            ]
                        )]
                );
            }catch (ClientException $e) {
                $response = $e->getResponse();
                $responseBodyAsString = $response->getBody()->getContents();
            }

            if($res !== null){
                $result = $res->getStatusCode();
            }else{
                $result = 0;
            }

           
            if($result == 201 ){
                $jsonconsole[] = [ 'ticket_add' => true];
            }else{
                $jsonconsole[] = [ 'ticket_add' => false];
            }



//vérification route PUT api/tickets
            $res = null; 
        try {
            $client = new Client([
                'headers' => [ 'Content-Type' => 'application/json' ]
            ]);
            $res = $client->request('PUT', 'https://www.listeat.io:8080/api/tickets/3',
                    ['body' => json_encode(
                        [
                            'validation' => 'validate',
                        ]
                    )]
            );
        }catch (ClientException $e) {
            $response = $e->getResponse();
            $responseBodyAsString = $response->getBody()->getContents();
        }

        //dd($res->getStatusCode());
        if($res !== null){
            $result = $res->getStatusCode();
        }else{
            $result = 0;
        }
       
        if($result == 200 ){
            $jsonconsole[] = [ 'ticket_edit' => true];
        }else{
            $jsonconsole[] = [ 'ticket_edit' => false];
        }
    

//vérification route GET /api/partner/99999
        $res = null; 
        try {
            $client = new Client([
                'headers' => [ 'Content-Type' => 'application/json' ]
            ]);
            $res = $client->request('GET', 'https://www.listeat.io:8080/api/partner/999999'
            );
        }catch (ClientException $e) {
            $response = $e->getResponse();
            $responseBodyAsString = $response->getBody()->getContents();
        }

        //dd($res->getStatusCode());
        if($res !== null){
            $result = $res->getStatusCode();
        }else{
            $result = 0;
        }

        if($result == 200 ){
            $jsonconsole[] = [ 'restaurant_show' => true];
        }else{
            $jsonconsole[] = [ 'restaurant_show' => false];
        }
      
        
//vérification route PUT api/partner/32
        $res = null; 
        try {
            $client = new Client([
                'headers' => [ 'Content-Type' => 'application/json' ]
            ]);
            $res = $client->request('PUT', 'https://www.listeat.io:8080/api/partner/32',
                    ['body' => json_encode(
                        [
                            'restaurant' => [
                                'name' => 'chez test',
                            ],

                            'currentpassword' => 'test12',
                        ]
                    )]
            );
        }catch (ClientException $e) {
            $response = $e->getResponse();
            $responseBodyAsString = $response->getBody()->getContents();
        }

        //dd($res->getStatusCode());
        if($res !== null){
            $result = $res->getStatusCode();
        }else{
            $result = 0;
        }

        if($result == 200 ){
            $jsonconsole[] = [ 'restaurant_edit' => true];
        }else{
            $jsonconsole[] = [ 'restaurant_edit' => false];
        }


//vérification route GET /api/partner/99999
        $res = null; 
        try {
            $client = new Client([
                'headers' => [ 'Content-Type' => 'application/json' ]
            ]);
            $res = $client->request('POST', 'https://www.listeat.io:8080/api/partner/islogged'
            );
        }catch (ClientException $e) {
            $response = $e->getResponse();
            $responseBodyAsString = $response->getBody()->getContents();
        }

        //dd($res->getStatusCode());
        if($res !== null){
            $result = $res->getStatusCode();
        }else{
            $result = 0;
        }

        if($result == 200 ){
            $jsonconsole[] = [ 'islogged' => true];
        }else{
            $jsonconsole[] = [ 'islogged' => false];
        }


//vérification route GET /api/partner/99999
        $res = null; 
        try {
            $client = new Client([
                'headers' => [ 'Content-Type' => 'application/json' ]
            ]);
            $res = $client->request('GET', 'https://www.listeat.io:8080/logout'
            );
        }catch (ClientException $e) {
            $response = $e->getResponse();
            $responseBodyAsString = $response->getBody()->getContents();
        }

        //dd($res->getStatusCode());
        if($res !== null){
            $result = $res->getStatusCode();
        }else{
            $result = 0;
        }

        if($result == 200 ){
            $jsonconsole[] = [ 'logout' => true];
        }else{
            $jsonconsole[] = [ 'logout' => false];
        }














        //echo $res->getStatusCode();
        // "200"
        //echo $res->getHeader('content-type')[0];
        // 'application/json; charset=utf8'
        //echo $res->getBody();
        // {"type":"User"...'
            
        // // Send an asynchronous request.
        // $request = new Request('PUT', 'https://listeat.io:8080/api/tickets/15',[
        //     'validation' => 'validate'
        // ]
        
        // );
        // $promise = $client->sendAsync($request)->then(function ($response) {
        //     echo 'I completed! ' . $response->getBody();
        // });
        // $promise->wait();
        // Send an asynchronous request.
     

        return $jsonconsole;
    }
}
