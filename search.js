// const key = "842f9a929871abcc76d7499e17593f22";
let container = document.querySelector(".card-container");

function unixTimeToNormal(unix){

    let date = new Date(unix * 1000);
    let hours;
    if(date.getHours() > 9){
        hours = date.getHours();
    }
    else{
        hours = "0"+date.getHours();
    }
    let minutes;
    if(date.getMinutes() > 9){
        minutes = date.getMinutes();
    }
    else{
        minutes = "0" + date.getMinutes();
    }
    let time  = hours + ":" + minutes;
    return time;
}
function convertToUTCWithOffset(customOffset) {

    const offsetInMilliseconds = customOffset * 1000;
    const currentDate = new Date();
    const customTimeZoneTime = new Date(currentDate.getTime() + offsetInMilliseconds);
    const offsetHours = Math.floor(customOffset / 3600);
    const offsetMinutes = Math.floor((customOffset % 3600) / 60);
    const utcTimeString = customTimeZoneTime.toLocaleString('en-US', {
      timeZoneName: 'short',
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
  
    const utcOffsetString = `${offsetHours >= 0 ? '+' : ''}${offsetHours}:${offsetMinutes}`;
    return `${utcTimeString} UTC${utcOffsetString}`;
  }



function getWeather(city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    .then(response=>response.json())
    .then((response) =>{
        console.log(response);
    
        if(response.cod!=200){
        container.innerHTML = 
            `
        <div class="card boxes" >
                <div class="card-content">

                    <div class="box-main">
                        <br>
                        <h1>${city}</h1>
                        <div class="box-weather-icon">
                            <img src="forNotFound.png" alt="">
                        </div>
                        <br>
                        <h1>${response.message}</h1>
                        <br>
                        <h2>Try something else</h2>
                    </div>
                </div>
            </div>
        `;
        }
        weatherBg(response.weather[0].main);
        document.querySelector(".hero-section").style.transition = "background 3s";

        container.innerHTML = `
        <div class="card-container" id="container">
            <div class="card card1">
                <div class="card-content">
                    <div class="temp-card">
                        <div class="box1">
                            <div class="main-temp">
                                <span> ${tempIcon((response.main.temp - 273.15).toFixed(2))} </i>
                                ${(response.main.temp - 273.15).toFixed(2)}&deg; C
                                </span>
                                <p>${response.name}, ${response.sys.country}</p>
                            </div>
                            <div class="weather-status-icon">
                                <img src="icons/${response.weather[0].main}.png" alt="">
                                <p>${response.weather[0].main}</p>
                            </div>
                        </div>
                        <div class="other-temp">
                            <div class="temp-feel">
                                <h2><i class="fa-solid fa-cloud"></i> Feels like: ${(response.main.feels_like - 273.15).toFixed(2)}&deg; C </h3>
                            </div>
                            <div class="min-max">
                                <h3> <i class="fa-solid fa-temperature-arrow-up"></i> Minimum temperature : ${(response.main.temp_min - 273.15).toFixed(2)}&deg; C </h3>
                                <h3> <i class="fa-solid fa-temperature-arrow-down"></i> Maximum temperature : ${(response.main.temp_max - 273.15).toFixed(2)}&deg; C</h3>
                            </div>
                        </div>
                    </div>
    
                    <div class="wind-card">
                        <div class="visibility">
                            <h2> Description : ${response.weather[0].description}</h2>
                        </div>
                        <div class="visibility">
                            <h2><i class="fa-regular fa-eye"></i> Visibility : ${response.visibility/1000} km</h2>
                        </div>
                        
                        <div class="wind1">
                            <h2><i class="fa-solid fa-wind"></i> Wind Speed : ${response.wind.speed} kmph</h2>
                        </div>
                        <div class="wind2">
                            <h2><i class="fa-solid fa-arrow-trend-up"></i> Wind degrees : ${response.wind.deg} </h2>
                        </div>
                    </div>
                </div>  
            </div>
    
            <div class="card card2">
                <div class="card-content">
                    <div class="card-title">
                        <div class="tz">
                            <h2>Time-Zone: </h2>
                            <p>${convertToUTCWithOffset(response.timezone)}</p>
                        </div>
                        <div class="humi">
                            <h2> <i class="fa-solid fa-droplet"></i> Humidity: ${response.main.humidity} %</h2>
                        </div>
                        <div class="press">
                            <h2>Pressure: ${response.main.pressure} mb</h2>
                        </div>
                        <div class="press">
                            <h2>Cloud Cover : ${response.clouds.all} %</h2>
                        </div>
                        <div class="sun">
                            <h2>
                                Sunrise : ${unixTimeToNormal(response.sys.sunrise)}
                            </h2>
                            <br/>
                            <h2>
                                Sunset : ${unixTimeToNormal(response.sys.sunset)}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    });
}


const cityName = document.querySelector("#city-name");
const btn = document.querySelector("#btn");
btn.addEventListener("click",(e) =>{
    e.preventDefault();
    getWeather(cityName.value);
})
document.querySelector('#city-name').addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && cityName.value != "") {
        e.preventDefault();
        getWeather(cityName.value);
    }
});

function tempIcon(temperature){

    
    if(temperature<5){
        return `<i class="fa-solid fa-temperature-empty"></i>`;
    }
    else if( temperature < 15){
        return `<i class="fa-solid fa-temperature-low"></i>`;

    }
    else if(temperature < 25){
        return `<i class="fa-solid fa-temperature-half"></i>`;
    }
    else  if(temperature < 35){
        return `<i class="fa-solid fa-temperature-three-quarters"></i>`;
    }
    else if (temperature > 35){
        return `<i class="fa-solid fa-temperature-high"></i>`;
    }
}

function weatherBg(weather){
    if ( weather == "Clouds"){
        document.querySelector(".hero-section").style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url("bg/Clouds.jpg")`;
    }
    else if ( weather == "Fog"){
        document.querySelector(".hero-section").style.backgroundImage =  `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url("bg/Fog.jpg")`;
    }
    else if(weather == "Clear"){
        document.querySelector(".hero-section").style.backgroundImage =  `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url("bg/Clear.jpg")`;
    }
    else if(weather == "Smoke"){
        document.querySelector(".hero-section").style.backgroundImage =  `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url("bg/Smoke.jpg!d")`;
    }
    else if(weather == "Snow"){
        document.querySelector(".hero-section").style.backgroundImage =  `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url("bg/Snow.jpg")`;
    }
    else if(weather == "Rain"){
        document.querySelector(".hero-section").style.backgroundImage =  `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url("bg/rain.jpg")`;
    }
    else if(weather == "Haze"){
        document.querySelector(".hero-section").style.backgroundImage =  `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url("bg/Haze.jpg")`;
    }
}

