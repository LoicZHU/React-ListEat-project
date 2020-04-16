<?php

namespace App\Service;



class Timer
{
    /**
     * returns a integer
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
        $result = date("d-m-Y H:i:s", strtotime('now +'.$estimatedWaitingTime.' Minutes'));
        $datetime = new \DateTime($result);
       
        return $datetime;
    }
}