let weather, currentTempC, currentTempF;

async function getWeather() {
  const response = await fetch(
    'https://api.weatherapi.com/v1/current.json?key=bc79352061074a5d963213546231104&q=London&aqi=no',
    { mode: 'cors' }
  );
  weather = await response.json();
  currentTempC = await weather.current.temp_c;
  currentTempF = await weather.current.temp_f;
}

getWeather().then(() => {
  console.log(weather);
  console.log(currentTempC);
  console.log(currentTempF);
});
