<?php
$json_data = file_get_contents('files/data.json');

// Decode JSON data
$data = (json_decode($json_data, true))['venues'];

// Extract country code
$country_codes = [];
foreach($data as $d){
    $country_codes[] = $d['address_country'];
}


// Initialize an array to store unique country codes

// Add country code to the array if it's not already present


// Display the unique country codes array
print_r(array_unique($country_codes));