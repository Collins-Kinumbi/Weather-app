// Declaring variables for reference
const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector("div.icon img");
const forecast = new Forecast();

// 3. Updating the UI
const updatingUI = (data) => {
  // // 1. Making local variables
  // const cityDetails = data.cityDetails;
  // const weather = data.weather;

  // // 2. Destructure properties
  const { cityDetails, weather } = data;

  //update details html template
  details.innerHTML = `
  <h5 class="my-3">${cityDetails.EnglishName}</h5>
          <div class="my-3">${weather.WeatherText}</div>
          <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&degc</span>
          </div>
  `;

  // update the night and day icon images
  let timeSrc = null;
  if (weather.IsDayTime) {
    timeSrc = `images/day.svg`;
  } else {
    timeSrc = `images/night.svg`;
  }
  time.setAttribute("src", timeSrc);

  // update icons
  const iconSrc = `images/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  //Remove the display class if present
  if (card.classList.contains("display")) {
    card.classList.remove("display");
  }
};

// // 2. Updating the city value with each input and using the value
// const updateCity = async (city) => {
//   // console.log(city);

//   const cityDetails = await getCity(city);
//   const weather = await getWeather(cityDetails.Key);

//   //returning the city and weather details, since thats all we want
//   return {
//     cityDetails: cityDetails,
//     weather: weather,

//     // //Shorthand version (Object Shorthand Notation)
//     // cityDetails,
//     // weather,
//   };
// };

// 1. Getting input data from the form input
cityForm.addEventListener("submit", (e) => {
  //get city value from the form
  const city = cityForm.city.value.trim();

  //reset the input bar after submission
  cityForm.reset();

  // update the ui with new city
  forecast
    .updateCity(city)
    .then((data) => {
      // console.log(data);
      updatingUI(data);
    })
    .catch((error) => {
      console.log(error);
    });

  // Set local storage
  localStorage.setItem("city", city);

  //Prevent default action
  e.preventDefault();
});

// Checking if there is a city in local storage
if (localStorage.getItem("city")) {
  forecast
    .updateCity(localStorage.getItem("city"))
    .then((data) => {
      updatingUI(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
