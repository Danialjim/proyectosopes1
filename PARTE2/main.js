var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const bodyParser = require('body-parser')
const port = 8080

var messages = [{
  id: 1,
  text: "Hola soy un mensaje",
  author: "Carlos Azaustre"
},
{
  id: 2,
  text: "ppp",
  author: "liz"
},
{
  id: 3,
  text: "ofa",
  author: "a"
}
];

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'));

app.get('/hello', function(req, res) {
  res.status(200).send("Hello World!");
});

io.on('connection', function(socket) {
  var totalTweets=1000;
  var totalUsuarios=2000;
  var totalCategorias=3000;
  var totalImagenes=4000;
  var TopUsuario;
  var TopCategoria;
  setInterval( function(){
    
    totalTweets++;
    totalUsuarios++;
    totalCategorias++;
    totalImagenes++;
    TopUsuario="Juan Perez";
    TopCategoria="selfie";
    var graphvalues=[];
    graphvalues.push({
      label: "selfie",
      y: 20.00
    });
    graphvalues.push({
      label: "cute",
      y: 8.00
    });
    graphvalues.push({
      label: "smile",
      y: 3.00
    });
    graphvalues.push({
      label: "travel",
      y: 16.00
    });
    graphvalues.push({
      label: "tbt",
      y: 6.00
    });
    graphvalues.push({
      label: "love",
      y: 11.00
    });
    graphvalues.push({
      label: "family",
      y: 10.00
    });
    graphvalues.push({
      label: "photooftheday",
      y: 7.00
    });
    graphvalues.push({
      label: "food",
      y: 9.00
    });
    graphvalues.push({
      label: "programming",
      y: 10.00
    });
  
    io.sockets.emit('graph', graphvalues,totalTweets,totalUsuarios,totalCategorias,totalImagenes,TopUsuario,TopCategoria);
  }, 3000);
});

server.listen(8080, function() {
  console.log("Servidor corriendo en http://localhost:8080");
});


