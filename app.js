'use strict'

const express = require('express');
const app = express();
var mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))

// previous state: app.use(bodyParser.urlencoded({extended: false}))

// post -> create new Player
app.post('/postPlayerData', (req, res) => {
  console.log(req.body);
    const name = req.body.name;
    const age = req.body.age;
    const email = req.body.email;
    const schoolYear = req.body.schoolYear;
    const sex = req.body.sex;
    console.log("Send to insert: " + name + " " + age + " " + email + " " + schoolYear + " " + sex );

    const connection = mysql.createConnection
    ({
      host: 'localhost',
      user: 'unity',
      password: 'abcd4321.',
      database: 'mygamestats'
    })

    const queryString = "INSERT INTO jugador (email, nombre, genero, edad, gradoEscolar) VALUES (?, ?, ?, ?, ?)"
    connection.query(queryString, [email, name, sex, age, schoolYear], (err, results, fields) => {
      if (err)
      {
        console.log("Failed to insert PlayerData1: " + err)
        res.sendStatus(500)
        return
      }
      //console.log("Inserted a new PlayerData with identifier email: ", res.json(results.email));
      //res.redirect('/getPlayerId/' + email);
      res.json({
        status: 'success',
        email: results.email
      });
    })
  connection.end();
})

app.get('/getGenderStats', (req, res) => {
    console.log("I'm in.")
    const connection = mysql.createConnection
    ({
      host: 'localhost',
      user: 'unity',
      password: 'abcd4321.',
      database: 'mygamestats'
    })
  
    const queryString = "Select genero, count(email) as numeroPersonas from jugador Group By genero"
    connection.query(queryString, (err, rows, fields) => {
      if (err)
      {
        console.log("Failed to query for userData: " + err);
      }
      console.log("I think we fetched succesfuly");
      // the header is created. res.end() comes implicit.
      res.json(rows);
    });
    connection.end()
  })

  //Get player id on url to use it un unity post form
  app.get('/getPlayerId/:email', (req, res) => {
    console.log("I'm in.")
    let playerId = req.params.email;
    console.log(playerId);
    //"SELECT nombre FROM jugador where email = ?
    getConnection().query("SELECT * FROM jugador where email = ?",
     [playerId],
     (err,result) => {
      if (err)
      {
        console.log("Failed to query for userData: " + err);
        res.sendStatus(500)
        return
      }else{
          res.json(result);
      }
      });
  })

  app.get('/getProfileResponses/:email', (req, res) => {
    console.log("Entramos a profile responses")
    let playerId = req.params.email;
    console.log(playerId);
    //"SELECT nombre FROM jugador where email = ?
    getConnection().query('SELECT pregunta.tema, count(preguntasrespondidas.idPreguntaPR) as "TotalRespondidas" FROM ((preguntasrespondidas inner join pregunta on pregunta.idpregunta = preguntasrespondidas.idPreguntaPR) inner join jugador on jugador.email = preguntasrespondidas.idJugadorPR) where idJugadorPR = ? GROUP BY tema;',
      [playerId],
     (err,result) => {
      if (err)
      {
        console.log("Failed to query for userData: " + err);
        res.sendStatus(500)
        return
      }else{
        console.log(result.body);
        res.json(result);
      }
      });
  })

  function getConnection(){
      return mysql.createConnection({
        host: 'localhost',
        user: 'unity',
        password: 'abcd4321.',
        database: 'mygamestats'
      })
  }
  //Unity

function connectToDB()
{
    // Change the data to match your configuration.
    try{
        return mysql.createConnection({host:'localhost', user:'unity', password:'abcd4321.', database:'mygamestats'});
    }
    catch(error){
        console.log(error);
    }
}

  app.post('/gamedata', (req, res)=>{
    console.log("I'm in from Unity.")
    console.log(req.body);
    getConnection().query("INSERT INTO preguntasrespondidas set ?", 
     [req.body],
     (err,result) => {
      if (err)
      {
        console.log("Failed to query for preguntasrespondidas: " + err);
        res.sendStatus(500)
        return
      }else{
          res.send(result);
      }
      });
});
app.get('/getLevelDiff', (req, res) => {
  console.log("entro a dificultad");
  const connection = mysql.createConnection
  ({
    host: 'localhost',
    user: 'unity',
    password: 'abcd4321.',
    database: 'mygamestats'
  })
/*Mai  const queryString = 'Select nivel.nombreNivel, (count(idPreguntaPR)*100/(select count(idPreguntaPR) from preguntasRespondidas)) as "PorcentajeAciertos" From((preguntasRespondidas inner join preguntas on preguntas.idPregunta = preguntasRespondidas.idPreguntaPR) inner join nivel on preguntas.nivelPregunta = nivel.idNivel) where contestoBien = 1 Group By nivel.nombreNivel;'*/

  const queryString = 'Select nivel.nombre, (count(idPreguntaPR)*100/(select count(idPreguntaPR) from preguntasrespondidas)) as "porcentajeAciertos" From((preguntasrespondidas inner join pregunta on pregunta.idpregunta = preguntasrespondidas.idPreguntaPR) inner join nivel on pregunta.nivelPregunta = nivel.idNivel) where contestoBien = 1 Group By nivel.nombre;'
  connection.query(queryString, (err, rows, fields) => {
    if (err)
    {
      console.log("Failed to query: " + err);
    }
    console.log("Sacamos query dificultad");
    res.json(rows);
  })
  connection.end()
})

app.get('/getSchoolYear', (req, res) => {
  const connection = mysql.createConnection
  ({
    host: 'localhost',
    user: 'unity',
    password: 'abcd4321.',
    database: 'mygamestats'
  })

  const queryString = 'select jugador.gradoEscolar, count(email) as "numJugadores" from jugador group by gradoEscolar;'
  connection.query(queryString, (err, rows, fields) => {
    if (err)
    {
      console.log("Failed to query: " + err);
    }
    console.log("I think we fetched succesfuly");
    res.json(rows);
  })
  connection.end()
})

app.get('/countPeople', (req, res) => {
  const connection = mysql.createConnection
  ({
    host: 'localhost',
    user: 'unity',
    password: 'abcd4321.',
    database: 'mygamestats'
  })

  const queryString = 'select count(email) from jugador;'
  connection.query(queryString, (err, rows, fields) => {
    if (err)
    {
      console.log("Failed to query: " + err);
    }
    console.log("I think we fetched succesfuly");
    res.json(rows);
  })
  connection.end()
})

app.listen(5000, () => {
  console.log('REST API running on port 5000')
});
