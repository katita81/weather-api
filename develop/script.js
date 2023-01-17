
var date = new dayjs().format("DD/MM/YYYY");
var cities = [];
//returns an even handler for when clicking on the buttons
function clickCityButton(city) {
    function handler() {
        cityWeather(city);
    }
    return handler;
}
//cityWeather function returns the current weather for the searched city and the next five days
function cityWeather(clickedCity=null){
    //receives a city parameter. It is null if none given, and the input becomes the city
    if (clickedCity === null) {
        var cityE = document.getElementById("inputSearch").value;
    } else {//otherwise the clicked city becomes the argument for the cityWeather function
        var cityE = clickedCity;
    }

    const weatherAPIIconBaseUrl = "https://openweathermap.org/img/wn/";//icon weather api
    
    // make a call to our current and 5day forecast using the city name
    fetch('http://api.openweathermap.org/data/2.5/forecast/?q='+ cityE +'&units=metric&limit=1&appid=4e1ecc4c7571d54e3ab83751a04818fd')
        .then(function(response) {
            response.json().then(function (data) {
            //to convert first character to capital letter
            cityE = cityE.charAt(0).toUpperCase() + cityE.slice(1);
            //to assign the corresponding weather icon to the day in the html file
            for(var j=0, i=0; j<= 39, i<=5; j=j+7, i++){

                var weatherIconEl = $("#wicon"+i)[0];
                weatherIconEl.src = weatherAPIIconBaseUrl + data.list[j].weather[0].icon + ".png";

            }
            //Initializing variables for city name, temperature humidity and wind to hold the data from the API
            var cityOutput= data.city.name;

            var cityTempC = data.list[0].main.temp;
            var roundTemp =  Math.round(cityTempC * 10) / 10;

            var cityHumid = data.list[0].main.humidity;

            var cityWind = (data.list[0].wind.speed)*3.6;
            var roundWind =  Math.round(cityWind * 10) / 10;


            

            cityOutput= JSON.stringify(cityOutput);
            cityOutput = cityOutput.slice(1,-1);
            roundTemp = JSON.stringify(roundTemp);
            cityHumid = JSON.stringify(cityHumid);
            roundWind = JSON.stringify(roundWind);


            //adding the data from the API to the html elements
            document.getElementById("city").textContent =  cityOutput +"("+date+")";



            document.getElementById("temp").textContent ="Temp: "+roundTemp +"°C";

            document.getElementById("humid").textContent ="Humidity: "+cityHumid +"%";

            document.getElementById("wind").textContent ="Wind: "+ roundWind +" Km/h";


            //getting the dates and weather data for the next five days weather
            for(var j=0, i=1; j<= 39, i<=5; j=j+7, i++){

                var cityTime = data.list[j].dt_txt;
                cityTime = JSON.stringify(cityTime);               
                //formating date to be displayed
                day1=cityTime.substr(1, 10);

                var day1, d, m, y;
                
                y=day1.substr(0,4);
                m=(day1.substr(5,6)).substr(0,2);
                d=day1.substr(8,9);

                day1= d+"/"+m+"/"+y;
                document.getElementById("d"+i).textContent= day1;


                var daysTemp =data.list[j].main.temp;
                daysTemp = JSON.stringify(daysTemp);
                daysTemp= Math.round(daysTemp * 10) / 10;
                document.getElementById("day"+ i + "_temp").textContent = "Temp: "+daysTemp +"°C";

                var daysHum = data.list[j].main.humidity;
                daysHum = JSON.stringify(daysHum);
                document.getElementById("day"+ i + "_humid").textContent = "Humidity: "+daysHum +"%";

                var daysWind = data.list[j].wind.speed;
                daysTemp = (JSON.stringify(daysWind))*3.6;
                document.getElementById("day"+ i + "_wind").textContent = "Wind: "+daysWind +" Km/h";
            }
            //If input is null or the response is faulty or the city has already been search through
            //input the do nothing
            if (cityE === '' || !response.ok || cities.includes(cityE) ) {
                return }

            //otherwise create a cityname button and add the new city anme to the array of cities
            // already searched and save it in local storage
            var b = document.createElement("button");
            document.getElementById("history").appendChild(b);
            b.setAttribute("id", "cityH " + cityE);
            
            //When clicking on the citybutton the clickCityButton function is called
            //using a function handler to call the cityWeather function on the clicked city name
            b.addEventListener('click', clickCityButton(cityE));
            
            b.innerText = cityE;
            cities.push(cityE);
            localStorage.setItem('cities', JSON.stringify(cities));
            console.log(cities);
            }
            )
        })
    }      
//to get the cityButtons that have been saved in local storage
function loadCities() {
    cities = localStorage.getItem('cities');
    if (cities === null) {
        cities = [];
    } else {
        cities = JSON.parse(cities);
    }

    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];
        var b = document.createElement("button");
        document.getElementById("history").appendChild(b);
        b.setAttribute("id", "cityH " + city);
        b.addEventListener('click', clickCityButton(city));
        
        b.innerText = city;
    }
}

loadCities();
cityWeather();
document.getElementById("inputSearch").value = "";