const request = require("request")

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=0ddfc1dad344afa8a16d5a00f6681df1&query=" +
    latitude +
    "," +
    longitude +
    "&units=m"
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to server to fetch waether data", undefined)
    } else if (body.error) {
      callback(
        "Provide the appropriate search word to obtain your data for the weather results",
        undefined
      )
    } else {
      callback(
        undefined,
        body.current.weather_descriptions +
          ":" +
          " It is currently " +
          body.current.temperature +
          "." +
          " It  feels like " +
          body.current.feelslike +
          " degrees out."
      )
    }
  })
}

module.exports = forecast
