const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Daniel ",
  })
})

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Daniel",
  })
})

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Call us for any help",
    name: "Daniel",
  })
})

app.get("/weather", (req, res) => {
  const address = req.query.address

  if (!address) {
    return res.send({
      errorMessage: "Unable to find location. Try another search",
    })
  }

  geocode(address, (error, { latitude, longitude } = {}) => {
    if (error) {
      return res.send({
        error,
      })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        })
      }
      res.send({
        forecastData,
        address,
      })
    })
  })
})

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    errorMessage: "Help Article Not Found",
    name: "Daniel",
  })
})

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    errorMessage: "Page Not Found",
    name: "Daniel",
  })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(" server running successfully on port" + port)
})
