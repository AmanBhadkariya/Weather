const key = "842f9a929871abcc76d7499e17593f22";
// Recommended cities weather 
const recCities = ["London", "Tokyo", "Delhi" , "Chicago", "Mumbai","Moscow"];
let cities = document.querySelector('.cities');


let recCitiesHtml = "";

for(let i = 0; i<6; i++){
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${recCities[i]}&appid=${key}`)
    .then(response=>response.json())
    .then((response) =>{
        console.log(response);
        cities.innerHTML += 
        `
        <div class="card boxes" >
                <div class="card-content">

                    <div class="box-main">
                        <div class="box-weather-icon">
                            <img src="icons/${response.weather[0].main}.png" alt="">
                        </div>
                        <span>${response.weather[0].main}</span>
                        <p>${(response.main.temp - 273.15).toFixed(2)} &deg;C</p>
                        <span>${response.name}, ${response.sys.country}</span>

                        <h4><i class="fa-solid fa-wind"></i> Wind speed : ${response.wind.speed} km/h</h4>
                        <h4> <i class="fa-sharp fa-solid fa-droplet"></i> Humidity : ${response.main.humidity} %</h4>
                    </div>
                </div>
            </div>
        `;

    });
}





  

  