<?php


// src/Service/QrCodeService.php

namespace App\Service;

use BaconQrCode\Encoder\QrCode;
use Endroid\QrCode\Color\Color;
use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Writer\PngWriter;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\RoundBlockSizeMode;
use Endroid\QrCode\Label\Font\NotoSans;
use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\Label\LabelAlignment;
use Endroid\QrCode\Builder\BuilderInterface;
use Symfony\Component\HttpFoundation\Response;



class QrCodeService
{
    private BuilderInterface $builder;

    public function __construct()
    {
        $this->builder = Builder::create();
    }

    public function generateQrCode(string $url, int $size = 300, int $margin = 10): Response
    {
        $result = Builder::create()
            ->writer(new PngWriter())
            ->writerOptions([])
            ->data($url)
            ->encoding(new Encoding('UTF-8'))
            ->errorCorrectionLevel(ErrorCorrectionLevel::High)
            ->size(300)
            ->margin(10)
            ->roundBlockSizeMode(RoundBlockSizeMode::Margin)
            ->validateResult(false)
            ->build();

        $image = $result->getString();

        return new Response($image, Response::HTTP_OK, [
            'Content-Type' => 'image/png',
        ]);
    }
}
