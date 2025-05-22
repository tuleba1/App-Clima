const apiKey = cawpsPygf2MZFXob;
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');


searchBtn.addEventListener('click',getWeather);

function getWeather(){
    const city = cityInput.value;

    fetch('https://geocode.maps.co/search?q=${city}')
    .then(response => response.json())
    .then(geoData => {
        if (geoData === 0){
            alert('Cidade não encontrada!');
            return;
        }

        const lat = geoData[0].lat;
        const lon = geoData[0].lon;
        fetchMeteoData(lat, lon, city);
    })
    .catch(() => alert('Erro na geolocalização'));
}

function fetchMeteoData(lat, lon, city) {
    const url = 'https://my.meteoblue.com/packages/current?apikey=cawpsPygf2MZFXob&lat=47.0&lon=7.0&format=json';
    
    fetch(url)
    .then(response => response.json())
    .then(data => updateWeather(data, city))
    .catch(() => alert('Erro ao obter dados climáticos.'));
}

function updateWeather(data, city) {
  const temp = data.data_current.temperature;
  const desc = data.data_current.icon_name; // ex.: 'rain', 'clear', 'snow'

  document.getElementById('city').textContent = city;
  document.getElementById('temp').textContent = `${Math.round(temp)}°C`;
  document.getElementById('desc').textContent = desc;

  document.body.className = ''; // limpa classes anteriores

  if(desc.includes('rain')) {
    document.body.classList.add('rainy');
    addRain();
  } else if(desc.includes('cloud')) {
    document.body.classList.add('cloudy');
    clearAnimation();
  } else if(desc.includes('snow')) {
    document.body.classList.add('snowy');
    clearAnimation();
  } else if(desc.includes('clear') || desc.includes('sun')) {
    document.body.classList.add('sunny');
    clearAnimation();
  } else {
    document.body.classList.add('cloudy');
    clearAnimation();
  }
}

// Adiciona gotas de chuva
function addRain() {
  clearAnimation();
  const animation = document.getElementById('animation');
  
  for(let i = 0; i < 100; i++) {
    const drop = document.createElement('div');
    drop.classList.add('drop');
    drop.style.left = Math.random() * 100 + 'vw';
    drop.style.animationDuration = (Math.random() + 0.5) + 's';
    animation.appendChild(drop);
  }
}

function clearAnimation() {
  const animation = document.getElementById('animation');
  animation.innerHTML = '';
}