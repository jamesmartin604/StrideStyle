let lat;
let lon;
let apiKey = "4d7cdd2af95414593ff647ba977d07cf";

document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', function(event) {
        event.preventDefault(); // prevent the default form submission
        const city = document.getElementById('city').value;
        const country = document.getElementById('country').value;
        fetchCoords(city,country);
    })
}) 



async function fetchCoords(city, country) {


    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        if(!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log(data);

        if(data.length>0) {
            lat = data[0].lat;
            lon = data[0].lon;

            document.getElementById("coords").innerText = `Weather for: ${city}, ${country}`;
        } else {
            throw new Error("No data found for the specified location");
        } 
    } catch(error) {
        console.error("Error fetching coordinates: ",error);
        document.getElementById("coords").innerText = "Error: Enter a valid location";
    }
}



async function fetchWeather() {
    
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const feelsLike = data.main.feels_like;
        const windSpeed = data.wind.speed;

        document.getElementById("weather").innerText = `Temperature: ${temp}°C, ${description}, Feels Like: ${feelsLike}°C Wind Speed: ${windSpeed} m/s`;
    } catch (error) {
        console.error("Error fetching weather:", error);
        document.getElementById("weather").innerText = "Loading...";
    }
}



fetchWeather();
setInterval(fetchWeather, 5000); //updates every 5 seconds




