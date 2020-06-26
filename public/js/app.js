const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const location = search.value
  console.log(location)

  messageOne.textContent = "loading..."

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageTwo.textContent = data.error
      } else {
        messageOne.textContent = data.forecastData
        messageTwo.textContent = data.address
      }
    })
  })
})
