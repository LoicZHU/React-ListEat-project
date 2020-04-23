<?php

namespace App\Tests\Services;

use App\Service\SiretService;
use PHPUnit\Framework\TestCase;

class SiretServiceTest extends TestCase
{
    public function testCheckSiret()
    {
        $siretService = new SiretService();
        $result = $siretService->checkSiret(35161267600046);

        // assert that the SiretService found that this siret code does exist
        $this->assertEquals(true, $result);
    }

}