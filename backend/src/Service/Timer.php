<?php

namespace App\Service;



class Timer
{
    /**
     * returns an integer
     * estimated waiting time
     */
    public function estimatedTime($waitingNb, $averageEatingTime, $seatNb)
    {

        $d = intval($averageEatingTime/3);
   
        $result = ($waitingNb*$averageEatingTime)/$seatNb;

        //convert result integer because we can get float number
        $result = intval($result);

        if($result<= $d){
            $result = $d;
        }
        if($result > $d && $result <= ($d*2)){
            $result = $d*2;
        }
        if($result > ($d*2) && $result <= $averageEatingTime){
            $result = $averageEatingTime;
        }

        return $result;
    }

    /**
     * returns an estimated entry time
     */
    public function estimatedEntryTime($estimatedWaitingTime)
    {
        // getting the estimated entry time by adding the estimated waiting time to the current time then transforming it into a datetime object (required for the database to process the data)

        $result = date("d-m-Y H:i:s", strtotime('now +'.$estimatedWaitingTime.' Minutes'));
        $datetime = new \DateTime($result);
       
        return $datetime;
    }
}