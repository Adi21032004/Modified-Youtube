require('dotenv').config()
const express = require('express')
const app = express() // just like Math function
const port = 4000

app.get('/twitter', (req, res) => {
  res.send('Hello World!')
})
app.get('/login',(req,res) => {
    res.send('<h1>please login</h1>')
})
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`)
})