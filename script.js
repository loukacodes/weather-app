
var weather;
var fah = false;

function render(weather) {
      loc = weather.name + ", " + weather.sys.country;
      temp = CtoK(weather.main.temp, fah);
      description = weather.weather[0].description;
      wind = weather.wind.speed + " mps";
      humidity = weather.main.humidity + " %";
      icon = weather.weather[0].icon;
      
      $("#location").html(loc);
      $("#temperature").html(temp);
      $("#description").html(description);
      $("#wind").html(wind);
      $("#humidity").html(humidity);
      $("#icon").attr("src","http://openweathermap.org/img/w/"+ icon + ".png");
      
}

function CtoK(cdegree, f) {
  if (fah) return Math.floor((cdegree*(9/5) + 32)) + ' &deg;F';
  return cdegree + ' &deg;C';
}

$(document).ready(function() {
  var lat, lon;
  var loc,temp,description,wind,humidity,icon;
  
  $.getJSON("http://ip-api.com/json", function(locData) {
    lat = locData.lat;
    lon = locData.lon;
    
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat 
      + "&lon=" + lon 
      + "&&APPID=ff4d2c62dc64effa3941c6debcae69bc" 
      + "&&units=metric", function(apiData) {
      
    weather = apiData;
    render(weather,fah);

    $(".toggle").on("click",function() {
      fah = !fah;
      $(this).toggleClass("active");
      return render(weather, fah);
      
    })
   })
  })
 })
