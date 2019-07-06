const express = require('express')
const bodyParser = require('body-parser')

const port = 8080
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/', (req, res) => {
  const { username, password } = req.body;

  console.log(req.body);

  if (username && password) {
    res.send('OK'); // ALL GOOD
  } else {
    res.status(400).send('You need to provide Username & password'); // BAD REQUEST 
  }
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))