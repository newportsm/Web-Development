var apiKey = 'fa7d80c48643dfadde2cced1b1be6ca1';

document.addEventListener('DOMContentLoaded', activateSubmit);


function activateSubmit() {
	document.getElementById('submit').addEventListener('click', function (event) {
		var zipCode = document.getElementById('zipCode').value;
		var cityName = document.getElementById('cityName').value;
		var req = new XMLHttpRequest();
		if (zipCode) {
			req.open("GET", "http://api.openweathermap.org/data/2.5/weather?zip=" +
				zipCode + "&units=Imperial" + "&appid=" + apiKey, true);
		} else if (cityName) {
			req.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" +
				cityName + "&units=Imperial" + "&appid=" + apiKey, true);
		}
		
        req.addEventListener('load', function () {
			var response = JSON.parse(req.responseText);
			console.log(JSON.parse(req.responseText));
			document.getElementById('city').textContent = response.name;
			for (var i = 0; i < response.weather.length; ++i) {
				document.getElementById('describe').textContent = response.weather[i].description.toUpperCase();
			}
			document.getElementById('temp').textContent = response.main.temp + " F";
			document.getElementById('humid').textContent = response.main.humidity + "%";		
		})
		req.send(null);
		event.preventDefault();		
		}
	)
}