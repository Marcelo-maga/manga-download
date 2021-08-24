const express = require('express')

const app = express()
const functions = require('./functions')

app.get('/', (req, res) => {
  res.send('Oi, você vem sempre aqui??')
})

app.get("/caps/:id/", async (req, res) => {
  functions.getCaps()
});

app.listen(3000, () => {
  console.log("Server is open")
})