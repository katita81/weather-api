
var date = new dayjs().format("DD/MM/YYYY");

const cities =[];
var city;

function clickCityButton(city) {
    cityWeather(city);
}

function cityWeather(clickedCity=null){
    if (clickedCity === null) {
        var cityE = document.getElementById("inputSearch").value;
    } else {
        var cityE = clickedCity;
    }

    const weatherAPIIconBaseUrl = "https://openweathermap.org/img/wn/";
    
    // make a call to our 5day forecast using the city name
    fetch('http://api.openweathermap.org/data/2.5/forecast/?q='+ cityE +'&units=metric&limit=1&appid=4e1ecc4c7571d54e3ab83751a04818fd')
        .then(function(response) {
            response.json().then(function (data) {
            cityE = cityE.charAt(0).toUpperCase() + cityE.slice(1);
    
            for(var j=0, i=0; j<= 39, i<=5; j=j+7, i++){

                var weatherIconEl = $("#wicon"+i)[0];
                weatherIconEl.src = weatherAPIIconBaseUrl + data.list[j].weather[0].icon + ".png";

            }

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



            document.getElementById("city").textContent =  cityOutput +"("+date+")";



            document.getElementById("temp").textContent ="Temp: "+roundTemp +"°C";

            document.getElementById("humid").textContent ="Humidity: "+cityHumid +"%";

            document.getElementById("wind").textContent ="Wind: "+ roundWind +" Km/h";


            //document.getElementById("image").textContent = wIcon;
            
            for(var j=0, i=1; j<= 39, i<=5; j=j+7, i++){

                var cityTime = data.list[j].dt_txt;
                cityTime = JSON.stringify(cityTime);               
                
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

            if (cityE === '' || !response.ok || cities.includes(cityE) ) {
                return }

            
            var b = document.createElement("button");
            document.getElementById("history").appendChild(b);
            b.setAttribute("id", "cityH " + cityE);
            b.setAttribute("class","chosenCities");
            b.addEventListener('click', function () {
                clickCityButton(cityE);
            });
            
            b.innerText = cityE;
            //convert cityE to first capital letter again
            cities.push(cityE);
            console.log(cities);
            
            }
            )
        })
    }      

cityWeather();
document.getElementById("inputSearch").value = "";