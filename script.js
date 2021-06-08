var inputValue = document.querySelector('.inputValue');
var btn = document.querySelector('.btn');
var specification = document.querySelector('.description');
var name = document.querySelector('.appname');
var condition = document.querySelector('.temperature');

 btn.addEventlistener('click', function(){
     
 fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=e804bf95f74f6c83cc2b0b1b747130ab');
        
 then(Response => Response.json())
 .then(data => console.log(data))
 .catch (err => alert("wrong town"))
 })




// you will need to add https at the beginning of your query string


//then you will need to have variables for the city that you put into that string

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

//so {city name} needs to be replaced with a variable or you could hard code a city name in there for now to test

//and {API key} will also need to be replaced with your api key

//you can test that the query string is working by placing it into the search bar of your browser tab