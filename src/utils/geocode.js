const request = require("request")

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZGFuaWVsMDYiLCJhIjoiY2tiZ3licGlhMDA2MjJxbDlzamxzeGJhcSJ9.6FwwBW2XQpyhYw6zSBS7NQ&limit=1"
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to fetch weather data from server", undefined)
    } else if (response.body.features.length === 0) {
      callback(
        "Provide the appropriate location to obtain the weather data",
        undefined
      )
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[0],
        longitude: response.body.features[0].center[1],
      })
    }
  })
}

module.exports = geocode
