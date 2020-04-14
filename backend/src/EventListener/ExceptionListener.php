<?php

// src/EventListener/ExceptionListener.php
namespace App\EventListener;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

class ExceptionListener
{
    public function onKernelException(ExceptionEvent $event)
    {
        //dd($event);
        // You get the exception object from the received event
        $exception = $event->getThrowable();
        $message = sprintf(
            'message: %s ',
            $exception->getMessage()
            
        );
       
        // Customize your response object to display the exception details
        $response = new Response();
        $response->setContent($message);
        
        // HttpExceptionInterface is a special type of exception that
        // holds status code and header details
        if ($exception instanceof HttpExceptionInterface) {
            $response->setStatusCode($exception->getStatusCode());
            $response->headers->replace($exception->getHeaders());
        } else {
            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        //dd($event->getRequest()->getContent());
        $data = json_decode($event->getRequest()->getContent());
        //dd($message);
        $response->setContent(json_encode([
                                  'code' => $response->getStatusCode(),
                                  'message' => $response->getContent(),
                                  'request'=> $data,
        ]));

        // sends the modified response object to the event
        $event->setResponse($response);
        
    }
}