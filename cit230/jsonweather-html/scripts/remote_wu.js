// Current Location Scripts
$(function () {

  var status = $('#status');

  (function getGeoLocation() {
    status.text('Getting Location...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        // Call the getData function, send the lat and long
        getData(lat, long);

      });
    } else {
      status.text("Your browser doesn't support Geolocation or it is not enabled!");
    }

  })();

  // Get the data from the wunderground API
  function getData(lat, long){
    $.ajax({
        url: "http://api.wunderground.com/api/ea91c475df27c47a/geolookup/conditions/q/" + lat + "," + long + ".json"
        dataType : "jsonp",
        success : function(parsed_json) {
        var location = parsed_json['location']['city'];
        var temp_f = parsed_json['current_observation']['temp_f'];
        console.log("Current temperature in " + location + " is: " + temp_f);

        var cityName = data["location"]["city"];
        var cityState = data["location"]["state"];
        var humidity = data['current_observation']['relative_humidity'];
        var windMph = data['current_observation']['wind_mph'];
        var temp_f = data['current_observation']['temp_f'];
        var summary_w = data['current_observation']['weather'];
        var feelslike = data['current_observation']['feelslike_f'];

        console.log("city: " + cityName + ", humidity: " + humidity + ", windMPH: " + windMph + ", temp: " + temp_f + ", summary:" + summary_w + ", feels like: " + feelslike);

        var orgTitle = document.getElementById("title").innerHTML;
        var city = document.getElementById("cityDisplay");
        var temp = document.getElementById("currentTemp");
        var weatherSum = document.getElementById("summary");
        var areaHumid = document.getElementById("add1");
        var areaMph = document.getElementById("add2");
        var truetemp = document.getElementById("add3");
        var newTitle = document.getElementById("title");



        newTitle.innerHTML = cityName + ", " + cityState + " | " + orgTitle;
        city.innerHTML = cityName + ", " + cityState;
        areaHumid.innerHTML = "Humidity: " + humidity;
        areaMph.innerHTML = "Wind: " + windMph + " mph";
        temp.innerHTML = Math.round(temp_f) + ("&#176") ;
        weatherSum.innerHTML = summary_w;
        $("#cover").fadeOut(250);
        truetemp.innerHTML = "Feels Like: " + feelslike + ("&#176");


      $("#cover").fadeOut(250);
    }
           });

  }

  // A function for changing a string to TitleCase
  function toTitleCase(str){
    return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
});
