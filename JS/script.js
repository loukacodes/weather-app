
var weather;
var fah = false;
var skycons = new Skycons({"color": "#a94b08"});

function render(weather) {

      temp = CtoK(Math.round(weather.currently.temperature), fah);
      description = weather.currently.summary;
      wind = Math.round(weather.currently.windSpeed) + " m/s";
      humidity = weather.currently.humidity*100 + " %";
      icon =  weather.currently.icon;
      realFeel = "Feels like " + CtoK(weather.currently.apparentTemperature.toFixed(1), fah);

      $("#temperature").html(temp);
      $("#description").html(description);
      $("#wind").html(wind);
      $("#humidity").html(humidity);
      $("canvas").attr("id",icon);
      $("#realFeel").html(realFeel);

      switch (icon) {
        case "rain":
        skycons.add(document.getElementById("rain"), Skycons.RAIN);
        break;

        case "clear-day":
        skycons.add(document.getElementById("clear-day"), Skycons.CLEAR_DAY);
        break;

        case "clear-night":
        skycons.add(document.getElementById("clear-night"), Skycons.CLEAR_NIGHT);
        break;

        case "partly-cloudy-day":
        skycons.add(document.getElementById("partly-cloudy-day"), Skycons.PARTLY_CLOUDY_DAY);
        break;

        case "partly-cloudy-night":
        skycons.add(document.getElementById("partly-cloudy-night"), Skycons.PARTLY_CLOUDY_NIGHT);
        break;

        case "cloudy":
        skycons.add(document.getElementById("cloudy"), Skycons.CLOUDY);
        break;

        case "sleet":
        skycons.add(document.getElementById("sleet"), Skycons.SLEET);
        break;

        case "snow":
        skycons.add(document.getElementById("snow"), Skycons.SNOW);
        break;

        case "wind":
        skycons.add(document.getElementById("wind"), Skycons.WIND);
        break;

        case "fog":
        skycons.add(document.getElementById("fog"), Skycons.FOG);
        break;

        default:
        skycons.add(document.getElementById("clear-day"), Skycons.CLEAR_DAY);
        break;

      }
        skycons.play();

}

function CtoK(cdegree, f) {
  if (fah) return Math.floor((cdegree*(9/5) + 32)) + '&deg;F';
  return cdegree + '&deg;C';
}

$(document).ready(function() {

  var lat, lon;
  var loc,temp,description,wind,humidity,icon,realFeel;


  $.getJSON("https://freegeoip.net/json/?callback=?", function(locData) {
    lat = locData.latitude;
    lon = locData.longitude;
    loc = locData.city + ", " + locData.country_name;
    $("#location").html(loc);

    $.getJSON("https://api.darksky.net/forecast/6f4a37a8abd3a1edddff9e36e0fd6d56/"
      + lat + "," + lon
      + "?callback=?&units=si", function(apiData) {

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
