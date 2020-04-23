<?php

namespace App\Tests\Services;

use App\Service\Timer;
use PHPUnit\Framework\TestCase;

class TimerTest extends TestCase
{
    public function testEstimatedTime()
    {
        $timer = new Timer();
        $result = $timer->estimatedTime(10, 30, 15);

        // assert that the timer calculated the estimated time correctly!
        $this->assertEquals(20, $result);
    }
}