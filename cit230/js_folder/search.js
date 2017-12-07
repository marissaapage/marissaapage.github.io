let object

// Search cities
$('#query').keyup(function() {
    var value = $('#query').val();
    var rExp = new RegExp(value, "i");
    document.getElementById("searchResults").style.display = "inherit";
    $.getJSON("//autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function(data) {
        console.log(data); // test for JSON received
        // Begin building output
        object = data;

        var output = '<ol>';
        $.each(data.RESULTS, function(key, val) {
            if (val.name.search(rExp) != -1) {
                output += '<li>';
                output += '<a href="//www.wunderground.com' + val.l + '" title="See results for ' + val.name + '">' + val.name + '</a>';
                output += '</li>';
            }
        }); // end each
        output += '</ol>';
        $("#searchResults").html(output); // send results to the page
    }); // end getJSON
}); // end onkeyup

// Get the data from the wunderground API
function getData(input){
    $.ajax({
        url : "https://api.wunderground.com/api/11c33fe5e1c8a83a/geolookup/conditions/forecast/q/" + input + ".json",
        dataType : "jsonp",
        success : function(data) {
            var location_c = data['location']['city'];
            var location_s = data['location']['state'];
            var temp_f = data['current_observation']['temp_f'];
            var overview = data['current_observation']['weather'];
            var imgrep = data['current_observation']['icon_url'];
            var blow = data['current_observation']['wind_mph'];
            var direc = data['current_observation']['wind_dir'];
            var rain = data.forecast.simpleforecast.forecastday[1].pop;
            var temp_high = data.forecast.simpleforecast.forecastday[0].high.fahrenheit;
            var temp_low = data.forecast.simpleforecast.forecastday[0].low.fahrenheit;

            console.log(data);

            console.log(temp_high, temp_low);

            $("#city-name-add").prepend(location_c + ', ' + location_s);

            $("#where").html(location_c + ', ' + location_s);

            let round = Math.round(temp_f);
            $("#currentTemp").html(round + '&deg;F');

            //            $("#outlook").html('<span> <img src=' + imgrep + '><b>' + overview + '</b></span>');
            $("#temp").html('<span> <b>' + overview + '</b></span>');
            $("#temp").prepend('<img src='+ imgrep +'>');

            $("#wind").html('<b>Wind: </b>' + direc + ' ' + blow + ' mph');

            $("#precipitation").html('<b>Precipitation: </b>' + rain + ' %');

            $("#summary").html('<b>' + temp_high + '&deg;F / ' + temp_low + '&deg;F</b>')
        }
    });
}

// Intercept the menu link clicks
$("#searchResults").on("click", "a", function (evt) {
    evt.preventDefault();

    document.getElementById("searchResults").style.display = "none";
    // With the text value get the needed value from the weather.json file
    var jsonCity = $(this).text(); // Franklin, etc...
    console.log(jsonCity);

    var index = $(this).index("a");

    console.log(index);

    var zmw = object.RESULTS[index - 5].zmw;

    getData(zmw);
});


// A function for changing a string to TitleCase
function toTitleCase(str){
    return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
