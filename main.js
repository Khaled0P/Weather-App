//dom elements
const headerDom = document.querySelector('.container h1');
const forecastContainer = document.querySelector('.forecastBg');
const statsDom = document.querySelector('.stats')
const conditionBox = document.querySelector('.condition')
const currentTempDom = document.querySelector('.temp');
const windDom = document.querySelector('.wind');
const pressureDom = document.querySelector('.pressure');
const conditionDom = document.querySelector('.text');
const iconDom = document.querySelector('.icon img');
const switchTemp = document.querySelector('.switchTemp')
const form = document.querySelector('form');
const search = document.querySelector('#search');
//declare weather stats
let weather,
  currentTempC,
  currentTempF,
  condition,
  icon,
  wind,
  pressure,
  location1,
  displayTemp = 'c';

async function setWeather(city = 'London') {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=bc79352061074a5d963213546231104&q=${city}&aqi=no`,
    { mode: 'cors' }
  );
  weather = await response.json();
  currentTempC = await weather.current.temp_c;
  currentTempF = await weather.current.temp_f;
  condition = await weather.current.condition.text;
  icon = await weather.current.condition.icon;
  wind = await weather.current.gust_kph;
  pressure = await weather.current.gust_mph;
  location1 = await weather.location.name;
}

function appendToDom() {
  iconDom.src = icon;
  conditionDom.textContent = condition;
  currentTempDom.textContent = `${currentTempC} °C`;
  windDom.textContent = `Wind: ${wind} kmph`;
  pressureDom.textContent = `Pressure: ${pressure} mb`;
  headerDom.textContent = `${location1} Weather Forecast`;

  //change forecast background image based on temp
  if (currentTempC <= 5) {
    forecastContainer.style.backgroundImage =
      'url("attachments/freezing cold.jpg")';
    
  } else if (currentTempC > 5 && currentTempC <= 15) {
    forecastContainer.style.backgroundImage = 'url("attachments/cold.jpg")';
    
  } else if (currentTempC > 15 && currentTempC <= 25) {
    forecastContainer.style.backgroundImage = 'url("attachments/warm.avif")';

  } else if (currentTempC > 25) {
    forecastContainer.style.backgroundImage = 'url("attachments/hot.jpg")';
  }
  animationHandle()
}

function animationHandle() {
  forecastContainer.classList.remove('animate');
  conditionBox.classList.remove('animate');
  statsDom.classList.remove('animate');

  //setting time out for elements to animate instead of clases instantly switching
  setTimeout(() =>{
    forecastContainer.classList.add('animate');
    conditionBox.classList.add('animate');
    statsDom.classList.add('animate');

  },10);
}

setWeather().then(() => {
  appendToDom();
  switchTemp.addEventListener('click', () => {
    if (displayTemp === 'c') {
      currentTempDom.textContent = `${currentTempF} °F`;
      switchTemp.textContent = '°C'
      displayTemp = 'f'
    } else if (displayTemp === 'f') {
      currentTempDom.textContent = `${currentTempC} °C`;
      switchTemp.textContent = '°F'
      displayTemp = 'c';
    }
  })
});

form.addEventListener('submit', (e) => {
  setWeather(search.value).then(() => {
    appendToDom();
    search.value = '';
  });
  e.preventDefault();
});
