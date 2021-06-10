var inputValue = document.getElementById("inputValue");
var btn = document.getElementById("btn");

//Moment.js Code Structure
const currentDateTime = moment().format("MMM Do YYYY");
const forecast1 = moment().add(1, "days").format("MMM Do");
const forecast2 = moment().add(2, "days").format("MMM Do");
const forecast3 = moment().add(3, "days").format("MMM Do");
const forecast4 = moment().add(4, "days").format("MMM Do");
const forecast5 = moment().add(5, "days").format("MMM Do");

let searchCityData = [];
// returns local storage search history
function getItems() {
  var storedCities = JSON.parse(localStorage.getItem("searchCityData"));
  if (storedCities !== null) {
    searchCityData = storedCities;
  }

  for (i = 0; i < searchCityData.length; i++) {
    if (i == 6) {
      break;
    } else {
      let listCity = $("<a>").attr({
        class: "list-group-item list-group-item-action",
        href: "#",
      });
      // appends history city
      listCity.text(searchCityData[i]);
      $(".list-city").append(listCity);
    }
  }
}
getItems();

let API_Key = "e804bf95f74f6c83cc2b0b1b747130ab";

btn.addEventListener("click", getInput);

function getInput(event) {
  event.preventDefault();
  let city = inputValue.value;
  let checkData = searchCityData.includes(city);
  if (checkData) {
    return;
  } else {
    searchCityData.push(city);
    localStorage.setItem("searchCityData", JSON.stringify(searchCityData));
    let listCity = $("<a>").attr({
      class: "list-group-item list-group-item-action",
      href: "#",
    });
    listCity.text(city);
    $(".list-city").append(listCity);
  }

  showWeatherData(city);
}

function showWeatherData(city) {
  $("#currentWeather .card-body").empty();
  $("#oneDay .card-body").empty();
  $("#twoDay .card-body").empty();
  $("#threeDay .card-body").empty();
  $("#fourDay .card-body").empty();
  $("#fiveDay .card-body").empty();

  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let lat = data.coord.lat;
      let lon = data.coord.lon;
      let h2 = $("<h2>").addClass("card-title").text(city);
      $("#currentWeather .card-body").append(h2);
      retriveData(lat, lon);
    });
}

function retriveData(lat, lon) {
  let queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
    exclude=currnet&units=imperial&appid=${API_Key}`;

  fetch(queryURL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let temp = $("<p>")
        .addClass("card-text")
        .text(`Current Weather: ${data.current.temp}°F`);

      let Weather = data.current.weather[0].icon;
      let imgURL = `http://openweathermap.org/img/wn/${Weather}@2x.png`;
      let icon = $("<img>").attr("src", imgURL);

      let Humidity = $("<p>")
        .addClass("card-text")
        .text(`Humidity: ${data.current.humidity}`);

      let Wind = $("<p>")
        .addClass("card-text")
        .text(`Wind Speed: ${data.current.wind_speed}`);

      let UVI = $("<p>").addClass("uvi").text(`UV Index: ${data.current.uvi}`);

      $("#currentWeather .card-body").append(
        currentDateTime,
        icon,
        temp,
        Humidity,
        Wind,
        UVI
      );

      //UVI
      let uvIndex = data.current.uvi;
      if (uvIndex <= 2) {
        UVI.css("background-color", "green");
      } else if (uvIndex <= 5) {
        UVI.css("background-color", "yellow");
      } else if (uvIndex <= 6) {
        UVI.css("background-color", "orange");
      } else {
        UVI.css("background-color", "red");
      }

      //First Forecast

      let date1 = $("<h4>").addClass("card-title").text(forecast1);

      let OneWeatherIcon = data.daily[0].weather[0].icon;
      let imgURLOne = `http://openweathermap.org/img/wn/${OneWeatherIcon}@2x.png`;
      let iconOne = $("<img>").attr("src", imgURLOne);

      let OneWeather = $("<p>")
        .addClass("card-text")
        .text(`Temp: ${data.daily[0].temp.day}°F`);

      let OneHumidity = $("<p>")
        .addClass("card-text")
        .text(`Humidity: ${data.daily[0].humidity}`);

      $("#oneDay .card-body").append(date1, iconOne, OneWeather, OneHumidity);

      //Second Forecast

      let date2 = $("<h4>").addClass("card-title").text(forecast2);

      let TwoWeatherIcon = data.daily[1].weather[0].icon;
      let imgURLTwo = `http://openweathermap.org/img/wn/${TwoWeatherIcon}@2x.png`;
      let iconTwo = $("<img>").attr("src", imgURLTwo);

      let TwoWeather = $("<p>")
        .addClass("card-text")
        .text(`Temp: ${data.daily[1].temp.day}°F`);

      let TwoHumidity = $("<p>")
        .addClass("card-text")
        .text(`Humidity: ${data.daily[1].humidity}`);

      $("#twoDay .card-body").append(date2, iconTwo, TwoWeather, TwoHumidity);

      //Third Forecast

      let date3 = $("<h4>").addClass("card-title").text(forecast3);

      let ThreeWeatherIcon = data.daily[2].weather[0].icon;
      let imgURLThree = `http://openweathermap.org/img/wn/${ThreeWeatherIcon}@2x.png`;
      let iconThree = $("<img>").attr("src", imgURLThree);

      let ThreeWeather = $("<p>")
        .addClass("card-text")
        .text(`Temp: ${data.daily[2].temp.day}°F`);

      let ThreeHumidity = $("<p>")
        .addClass("card-text")
        .text(`Humidity: ${data.daily[2].humidity}`);

      $("#threeDay .card-body").append(
        date3,
        iconThree,
        ThreeWeather,
        ThreeHumidity
      );

      //Fourth Forecast

      let date4 = $("<h4>").addClass("card-title").text(forecast4);

      let FourWeatherIcon = data.daily[3].weather[0].icon;
      let imgURLFour = `http://openweathermap.org/img/wn/${FourWeatherIcon}@2x.png`;
      let iconFour = $("<img>").attr("src", imgURLFour);

      let FourWeather = $("<p>")
        .addClass("card-text")
        .text(`Temp: ${data.daily[3].temp.day}°F`);

      let FourHumidity = $("<p>")
        .addClass("card-text")
        .text(`Humidity: ${data.daily[3].humidity}`);

      $("#fourDay .card-body").append(
        date4,
        iconFour,
        FourWeather,
        FourHumidity
      );

      //Fifth Forecast

      let date5 = $("<h4>").addClass("card-title").text(forecast5);

      let FiveWeatherIcon = data.daily[4].weather[0].icon;
      let imgURLFive = `http://openweathermap.org/img/wn/${FiveWeatherIcon}@2x.png`;
      let iconFive = $("<img>").attr("src", imgURLFive);

      let FiveWeather = $("<p>")
        .addClass("card-text")
        .text(`Temp: ${data.daily[4].temp.day}°F`);

      let FiveHumidity = $("<p>")
        .addClass("card-text")
        .text(`Humidity: ${data.daily[4].humidity}`);

      $("#fiveDay .card-body").append(
        date5,
        iconFive,
        FiveWeather,
        FiveHumidity
      );
    });
}

// clear all the local storage(not working after a page refresh)

function deleteCity() {
  window.localStorage.clear();
  location.reload();
  return false;
}

//fetch failed to work even after following guide from LA as seen below.

// you will need to add https at the beginning of your query string

//then you will need to have variables for the city that you put into that string

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

//so {city name} needs to be replaced with a variable or you could hard code a city name in there for now to test

//and {API key} will also need to be replaced with your api key

//you can test that the query string is working by placing it into the search bar of your browser tab
