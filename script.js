const input = document.querySelector('.input');
const submit = document.querySelector('.submit');

const sectionTrue = document.querySelector('.app__main');
const content = document.querySelectorAll('.content');

const loc = document.querySelector('.location');
const time = document.querySelector('.time');
const image = document.querySelector('.image img');
const temp = document.querySelector('.temp');
const weather = document.querySelector('.weather');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

submit.onclick = () => {
  search();
}


input.addEventListener('keypress', event => {
  if (event.key.toLowerCase() === 'enter') {
    search();
  }
})


const search = function() {
  let q = input.value;
  
  const apiKey = 'd81cb1596aa346d49c8213421232107';
  const query = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${q}`
  
  fetch(query).then(response => response.json())
    .then(data => {
      console.log(data)
      content[0].style.display = 'flex';
      content[1].style.display = 'none';

      sectionTrue.style.height = '580px'

      content.forEach(block => {
        block.style.opacity = '0';
        block.style.scale = '60%';
      });

      let dataLoc = data.location.name;
      let dataTime = data.location.localtime.split(' ')[1];
      let dataTemp = `${data.current.temp_c}°C`;
      let dataCondition = data.current.condition.text;
      let dataHumidity = `Humidity: ${data.current.humidity}%`;
      let dataWind = `Wind: ${data.current.wind_kph}km/h`;


      
      setTimeout(() => {
        loc.innerText = dataLoc;
        time.innerText = dataTime;
        temp.innerText = dataTemp;
        weather.innerText = dataCondition;
        humidity.innerText = dataHumidity;
        wind.innerText = dataWind;


        if (data.current.is_day === 0) {
          switch (data.current.condition.text) {
            case 'Partly cloudy':
              image.src = './img/Partly Cloudy (1).png'
              break;
            case 'Cloudy':
              image.src = './img/Cloudy (1).png';
              break
            case 'Overcast':
              image.src = './img/Overcast (1).png';
              break
            case 'Light rain shower':
              image.src = './img/Light rain (1).png';
              break
            case 'Patchy light rain':
              image.src = './img/Light rain (1).png';
              break
            case 'Partly cloudy':
              image.src = './img/Partly Cloudy (1).png';
              break
            default: image.src = './img/Clear.png';
              break;
          }
        } else {
          switch (data.current.condition.text) {
            case 'Partly cloudy':
              image.src = './img/Partly Cloudy.png'
              break;
            case 'Cloudy':
              image.src = './img/Cloudy.png';
              break
            case 'Overcast':
              image.src = './img/Overcast.png';
              break
            case 'Light rain shower':
              image.src = './img/Light rain.png';
              break
            case 'Patchy light rain':
              image.src = './img/Light rain.png';
              break
            case 'Partly cloudy':
              image.src = './img/Partly Cloudy.png';
              break
            default: image.src = './img/Sunny.png';
              break;
          }
        }
      }, 850)
      

      setTimeout(() => {
        content.forEach(block => {
          block.style.opacity = '1';
          block.style.scale = '100%';
        });
      }, 1000);

    }).catch(error => {
      console.log(error);

      sectionTrue.style.height = '400px'

      content.forEach(block => {
        block.style.opacity = '0';
        block.style.scale = '60%';
      });

      setTimeout(() => {
        content.forEach(block => {
          block.style.opacity = '1';
          block.style.scale = '100%';
        });
      }, 500);

      content[0].style.display = 'none';
      content[1].style.display = 'flex';
    })
}