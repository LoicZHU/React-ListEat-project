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
            if($waitingNb <= $seatNb){

                return $averageEatingTime;

            }else{
                $result = ($waitingNb*$averageEatingTime)/$seatNb;

                //convert result integer because we can get float number
                $result = intval($result);

                return $result;
            }
    }
}