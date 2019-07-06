const bodyParser = require('body-parser')
const port = 8080
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mysql = require('mysql');

var connectionMySql = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'proyectofinalsopes1'
});

connectionMySql.connect(function(error){
  if(!!error){
    console.log('Error');
  }else{
    console.log('Conectado a base de datos.');
  }
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'));

var user = "";
var name = "";
var category = "";
var message = "";
var tupla = [];

//Estadisticas
var totalTweets = 0;
var lusers = [];
var lnumusers = [];
var listaUsuarios = [];
listaUsuarios[0] = lusers;
listaUsuarios[1] = lnumusers;

var lcategorias = [];
var lnumCategorias = [];
var listaCategorias = [];
listaCategorias[0] = lcategorias;
listaCategorias[1] = lnumCategorias;

/***************/
var TopUsuario = "";
var TopCategoria="";
var totalUsuarios=0;
var totalCategorias=0;
var totalImagenes=0;

var solo1Hilo = 1;

app.post('/', (req, res) => {
  const { username, password } = req.body;

  console.log(req.body);
  
  //console.log(arrayCadenas);
  var v = req.body.datos;
  var arrayCadenas = v.split("&");
  for(var i=0; i<arrayCadenas.length; i++){
    var individual = arrayCadenas[i].split("=");
    tupla[i] = individual[1];
  }

  if(listaUsuarios[0].includes(tupla[0])){
    var index = listaUsuarios[0].indexOf(tupla[0]);
    var l = listaUsuarios[1];
    var N = l[index]++;
    l[index] = N+1;
  }else{
    listaUsuarios[0].push(tupla[0]);
    listaUsuarios[1].push(1);
  }

  //Hashtags
  var Q = tupla[2].match("#([a-zA-Z]|[0-9])+");
  if(listaCategorias[0].includes(Q[0])){
    var index = listaCategorias[0].indexOf(Q[0]);
    var l = listaCategorias[1];
    var N = l[index]++;
    l[index] = N+1;
  }else{
    listaCategorias[0].push(Q[0]);
    listaCategorias[1].push(1);
  }

  connectionMySql.query("INSERT INTO `data`(`usr`, `name`, `text`, `category`) VALUES ('"+tupla[0]+"','"+tupla[1]+"', '"+tupla[2]+"', '"+Q[0]+"')", function(error, rows, fields){
    if(!!error){
      console.log('Error in the query');
    }else{
      //console.log('Successful query');
      //console.log(rows);
    }
  });

  totalTweets++;

  if(solo1Hilo == 1){

    setInterval( function(){
      //    totalTweets++;
      //    totalUsuarios++;
      //    totalCategorias++;
          totalImagenes++;
      //    TopUsuario="Juan Perez";
      //    TopCategoria="selfie";
          var graphvalues=[];
      
          var totalHashtags = 0;
          for(var i=0; i<listaCategorias[1].length; i++){
            totalHashtags = totalHashtags + listaCategorias[1][i];
          }
          for(var i=0; i<listaCategorias[1].length; i++){
            graphvalues.push({
              label:listaCategorias[0][i],
              y: (listaCategorias[1][i]/totalHashtags)*100
            });
          }
      
          var max = Math.max.apply(null,listaUsuarios[1]);
          var indexTopUsuario = listaUsuarios[1].indexOf(max);
          TopUsuario = listaUsuarios[0][indexTopUsuario];
          totalUsuarios = listaUsuarios[1].length;
        
          var max2 = Math.max.apply(null,listaCategorias[1]);
          var indexTopCategoria = listaCategorias[1].indexOf(max2);
          TopCategoria = listaCategorias[0][indexTopCategoria];
          totalCategorias = listaCategorias[1].length;
      
          io.sockets.emit('graph', graphvalues,totalTweets,totalUsuarios,totalCategorias,totalImagenes,TopUsuario,TopCategoria);
      
        }, 3000);
        solo1Hilo = 0;
  }
  res.send('OK');
});

server.listen(port, () => console.log(`Example app listening on port ${port}!`))