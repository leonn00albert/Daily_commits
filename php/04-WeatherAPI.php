<?php
require 'helpers/Logger.php';
/*
Challenge: Daily Weather Reporter

Description:
Create a PHP script that automates the process of fetching and reporting the daily weather forecast for a specific location.
You'll utilize an API service to fetch weather data and present it in a user-friendly format.

Requirements:
1. The script should be able to accept a location input (e.g., city name or ZIP code).
2. Utilize a weather API service (e.g., OpenWeatherMap, Weatherstack, or any other of your choice) to fetch the weather data.
3. Display the following weather information:
   - Current temperature
   - Weather description (e.g., sunny, cloudy, rainy)
   - Minimum and maximum temperature for the day
   - Wind speed and direction
   - Any other relevant weather information you find useful
4. Make the output visually appealing and easy to read.
5. Handle errors gracefully, such as invalid location input or API request failures.
6. Provide clear instructions on how to run the script, including any required dependencies.

Extra Challenges (Optional):
1. Implement caching mechanisms to reduce the number of API requests.
2. Allow users to specify units (e.g., metric, imperial) for the weather data.
3. Integrate with a database to store and retrieve historical weather data.
4. Create a web interface for the script using PHP and HTML/CSS, allowing users to input their location through a form.

Note: Make sure to respect the terms of service of the chosen weather API service, especially regarding usage limits and attribution requirements.
*/
$key = base64_decode("NjA4OWY2NTA5YTUwMzA0OTgwY2QwMDM3ZjcwZmU4YjE=");


class WeatherAPI
{
    private $key;
    private $url;
    private string $city;
    private $data;
    private string $country;
    private string $units;

    private int $lat = 0;
    private int $lon = 0;

    public function __construct(string $key, string $units = 'metric')
    {
        $this->key = $key;
        $this->units = $units;
    }

    public function getLocation(): ?WeatherAPI
    {
        try {
            $endPoint = "https://api.ipgeolocation.io/ipgeo?apiKey=781c9512347e4f059d71b7218896ee3a";
            $response = $this->fetch($endPoint);
            $this->lat = $response['latitude'];
            $this->lon = $response['longitude'];
            $this->url = "https://api.openweathermap.org/data/2.5/weather?units={$this->units}&lat={$this->lat}&lon={$this->lon}&appid={$this->key}";
            $this->city = $response['city'];
            $this->country = $response['country_name'];
            return $this;
        } catch (\Throwable $th) {
            Logger::log($th->getMessage(), 'ERROR');
            return null;
        }

    }

    public function fetch(string $url): ?array
    {
        try {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            $data = json_decode(curl_exec($ch), true);
            curl_close($ch);

            return $data;
        } catch (\Throwable $th) {
            Logger::log($th->getMessage(), 'ERROR');
        }

    }

    public function getWeather(): ?WeatherAPI
    {
        try {
            if ($this->lat == 0 || $this->lon == 0) {
                $this->getLocation();
            }
            $this->data = $this->fetch($this->url);
            return $this;
        } catch (\Throwable $th) {
            Logger::log($th->getMessage(), 'ERROR');
        }

    }

    public function display()
    {
        $temp = $this->data['main']['temp'];
        $location = "{$this->city}, {$this->country}";
        $weather = $this->data['weather'][0]['description'];
        $wind_speed = $this->data['wind']['speed'];
        $wind_deg = $this->data['wind']['deg'];
    
        // ANSI escape codes for styling
        $bold = "\033[1m";
        $reset = "\033[0m";
        $underline = "\033[4m";
    
        // Output with styling and border
        echo "┌──────────────────────────┐\n";
        echo "│ {$bold}Location:{$reset} $location\n";
        echo "│ {$bold}Current Temperature:{$reset} {$temp}°C\n";
        echo "│ {$bold}Weather:{$reset} $weather\n";
        echo "│ {$bold}Wind:{$reset} $wind_speed km/h, {$wind_deg}°\n";
        echo "└──────────────────────────┘\n";
    }
    
}

$weather = new WeatherAPI($key);
$weather->getWeather()->display();


?>