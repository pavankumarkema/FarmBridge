const AP_MOCK_WEATHER = {
  Hyderabad: { temperature: 32, feelsLike: 36, humidity: 65, windSpeed: 14, description: 'Partly Cloudy', icon: '02d', uvIndex: 7 },
  Guntur:    { temperature: 34, feelsLike: 38, humidity: 72, windSpeed: 10, description: 'Sunny', icon: '01d', uvIndex: 9 },
  Vijayawada:{ temperature: 33, feelsLike: 37, humidity: 70, windSpeed: 12, description: 'Sunny', icon: '01d', uvIndex: 8 },
  Nellore:   { temperature: 31, feelsLike: 35, humidity: 75, windSpeed: 11, description: 'Partly Cloudy', icon: '02d', uvIndex: 6 },
  Tirupati:  { temperature: 29, feelsLike: 32, humidity: 68, windSpeed: 13, description: 'Mostly Cloudy', icon: '03d', uvIndex: 5 },
  Vizag:     { temperature: 28, feelsLike: 30, humidity: 80, windSpeed: 18, description: 'Coastal Breeze', icon: '02d', uvIndex: 5 },
  Warangal:  { temperature: 33, feelsLike: 37, humidity: 60, windSpeed: 12, description: 'Hot and Sunny', icon: '01d', uvIndex: 9 },
  Karimnagar:{ temperature: 32, feelsLike: 36, humidity: 63, windSpeed: 10, description: 'Clear', icon: '01d', uvIndex: 8 },
  Kurnool:   { temperature: 35, feelsLike: 40, humidity: 55, windSpeed: 9,  description: 'Very Hot', icon: '01d', uvIndex: 10 },
};

async function getCityWeather(cityName = 'Hyderabad', lat, lng) {
  const city = cityName;
  const apiKey = process.env.WEATHER_API_KEY;

  if (apiKey && apiKey.trim().length > 0 && !apiKey.includes('your_')) {
    try {
      let url = '';
      if (lat && lng) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;
      } else {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)},IN&appid=${apiKey}&units=metric`;
      }

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const temp = Math.round(data.main.temp);
        const humidity = data.main.humidity;
        const windSpeed = Math.round((data.wind.speed * 3.6)); // m/s to km/h
        const condition = data.weather?.[0]?.main || 'Clear';
        const isRainRisk = condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('drizzle');

        return {
          city: data.name || cityName,
          cityName: data.name || cityName,
          temperature: temp,
          temp,
          feelsLike: Math.round(data.main.feels_like || temp),
          humidity,
          windSpeed,
          description: data.weather?.[0]?.description || condition,
          condition,
          icon: data.weather?.[0]?.icon || '01d',
          uvIndex: 6,
          rainfall: data.rain ? (data.rain['1h'] || data.rain['3h'] || 0) : 0,
          isRainRisk,
          isMockData: false,
          isDemo: false,
          source: 'OpenWeatherMap',
          advisory: isRainRisk
            ? 'Rain expected. Ensure safe crop storage and cover open harvests.'
            : 'Good conditions for harvesting. Avoid irrigation during peak midday heat (12-3 PM).',
        };
      }
    } catch (err) {
      console.warn('Weather API fetch failed, falling back to mock weather:', err.message);
    }
  }

  // Fallback to AP mock weather data
  const cityData = AP_MOCK_WEATHER[city] || AP_MOCK_WEATHER['Hyderabad'];
  return {
    city,
    cityName: city,
    ...cityData,
    temp: cityData.temperature,
    rainfall: 0,
    isRainRisk: cityData.description.toLowerCase().includes('rain'),
    isMockData: true,
    isDemo: true,
    source: 'regional_estimate',
    advisory: 'Good conditions for harvesting. Avoid irrigation during peak midday heat (12-3 PM).',
  };
}

module.exports = { getCityWeather };
