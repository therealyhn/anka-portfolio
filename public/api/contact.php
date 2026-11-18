<?php
declare(strict_types=1);

require __DIR__ . '/lib/kontakt.php';

kontakt_handle([
    'site' => 'ljsc-design.com',
    'origins' => ['https://ljsc-design.com', 'https://www.ljsc-design.com'],
    'fields' => [
        'name' => ['label' => 'Ime', 'type' => 'line', 'required' => true, 'max' => 100],
        'email' => ['label' => 'Email', 'type' => 'email', 'required' => true, 'max' => 254],
        'company' => ['label' => 'Kompanija', 'type' => 'line', 'required' => false, 'max' => 200],
        'phone' => ['label' => 'Telefon', 'type' => 'line', 'required' => false, 'max' => 40],
        'interests' => ['label' => 'Interesovanja', 'type' => 'line', 'required' => false, 'max' => 200],
        'budget' => ['label' => 'Budžet', 'type' => 'line', 'required' => false, 'max' => 200],
        'project_details' => ['label' => 'Detalji projekta', 'type' => 'text', 'required' => false, 'max' => 5000],
        'lang' => ['label' => 'Jezik sajta', 'type' => 'enum', 'required' => false, 'values' => ['sr', 'en']],
    ],
], dirname(__DIR__, 2));
