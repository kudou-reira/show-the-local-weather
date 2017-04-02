

$(document).ready(function(){
  var api_key = "862c3471056cc86bc7b8e0e128946ed0";
  var response;
  var fahren = false;
  var receive;
  
  function shownTemp(num, check){
    if (check) {
      return Math.round((num *9/5) + 32) + " °F";
    }
    return Math.round(num) + " °C";
  }
  
  function putOut(receive, fahren){
    var nowLocation = receive.name;
    var nowCountry = receive.sys.country;
    var nowWeather = receive.weather[0].description;
    var nowTemp = shownTemp(receive.main.temp, fahren);
    var iconID = receive.weather[0].icon;
    
    $("#nowLocation").html(nowLocation);  
    $("#nowTemp").html(nowTemp);
    $("#nowWeather").html(nowWeather);
      
    var iconLink = "http://openweathermap.org/img/w/" + iconID + ".png";
    $("#nowWeather").append('<img src =' + iconLink + '>');
  }
  
  $.getJSON("http://ipinfo.io/", function(data){
    response = data.loc.split(",");
    
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?&units=metric&lat=" + response[0] + "&lon=" + response[1]  + "&appid=" + api_key, function(apiData){
      
    receive = apiData;
    putOut(apiData, fahren);
      
    $("#toggle").click(function(){
      fahren = !fahren;
      putOut(receive, fahren);
    })
    
    });
            });
  
});