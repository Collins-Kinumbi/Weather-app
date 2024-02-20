//API provider for this project
//https://developer.accuweather.com/home

class Forecast {
  constructor() {
    this.key = "4dfT3NJhEBMHSuO0gnjx5ftw22pjopFh";
    this.weatherURL = `http://dataservice.accuweather.com/currentconditions/v1/`;
    this.cityURL =
      "http://dataservice.accuweather.com/locations/v1/cities/search";
  }
  async updateCity(city) {
    const cityDetails = await this.getCity(city);
    const weather = await this.getWeather(cityDetails.Key);

    //returning the city and weather details, since thats all we want
    return {
      cityDetails: cityDetails,
      weather: weather,

      // //Shorthand version (Object Shorthand Notation)
      // cityDetails,
      // weather,
    };
  }
  async getCity(city) {
    // Making requests
    const query = `?apikey=${this.key}&q=${city}`;

    // Fetching resources
    const response = await fetch(this.cityURL + query);
    const data = await response.json();

    /*console.log(data[0]); //the zero index ensures we get the closest match 
  if there's a list of cities with similar names*/

    return data[0];
  }
  async getWeather(cityKey) {
    const query = `${cityKey}?apikey=${this.key}`;

    // Fetching resources
    const response = await fetch(this.weatherURL + query);
    const data = await response.json();

    // console.log(data[0]); //the zero ensures we get the first index which contains the info we need
    return data[0];
  }
}

// // accuweather api key variable
// const key = "	oSjsrAA9bnCLx0khGJ47rIwRBjz4kAFP";

// //2. Get weather info
// const getWeather = async (cityKey) => {
//   // making reguests
//   const base = `http://dataservice.accuweather.com/currentconditions/v1/`;
//   const query = `${cityKey}?apikey=${key}`;

//   // Fetching resources
//   const response = await fetch(base + query);
//   const data = await response.json();

//   // console.log(data[0]); //the zero ensures we get the first index which contains the info we need
//   return data[0];
// };

// //1. Get city info
// const getCity = async (city) => {
//   // Making requests
//   const base = `http://dataservice.accuweather.com/locations/v1/cities/search`;
//   const query = `?apikey=${key}&q=${city}`;

//   // Fetching resources
//   const response = await fetch(base + query);
//   const data = await response.json();

//   /*console.log(data[0]); //the zero index ensures we get the closest match
//   if there's a list of cities with similar names*/

//   return data[0];
// };
// // getCity("Nakuru"); for the console log

// // // TESTING STUFF
// // getCity("Nakuru")
// //   .then((data) => {
// //     // console.log(data);
// //     return getWeather(data.Key);
// //   })
// //   .then((data) => {
// //     console.log(data);
// //   })
// //   .catch((error) => {
// //     console.log(error);
// //   });

// // // getWeather("225560");
