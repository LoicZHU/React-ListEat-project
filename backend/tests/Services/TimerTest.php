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

        // assert that the timer calculated the estimated time correctly.
        $this->assertEquals(20, $result);
    }

    public function testEstimatedEntryTime()
    {
        $timer = new Timer();
        // DateTime object: 2020-04-23T11:26:43+02:00
        $result = $timer->estimatedEntryTime(20);
        // purposefully formatted the result to only show the hours and minutes so it would be easy to change the expected result while running tests.
        $formattedResult = date_format($result, 'H:i');
        // expected result to change according to current time
        $this->assertEquals("17:41", $formattedResult);
    }
}