'use strict'

const express = require('express');
const app = express();
var mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))

// previous state: app.use(bodyParser.urlencoded({extended: false}))

/* post -> create new Player */
app.post('/postPlayerData', (req, res) => {
    const name = req.body.create_name
    const age = req.body.create_age
    const email = req.body.create_email
    const schoolYear = req.body.create_school_year
    const sex = req.body.create_sex
    const connection = mysql.createConnection
    ({
      host: 'localhost',
      user: 'dbUser',
      password: 'akr26-98hs',
      database: 'mygamestats'
    })

    const queryString = "INSERT INTO jugador (email, nombre, sexo, edad, gradoEscolar) VALUES (?, ?, ?, ?, ?)"
    connection.query(queryString, [email, name, sex, age, schoolYear], (err, results, fields) => {
      if (err)
      {
        console.log("Failed to insert PlayerData1: " + err)
        res.sendStatus(500)
        return
      }
      console.log("Inserted a new Player to the DB");
      res.end()
    })
  connection.end();
})

app.get('/getGenderStats', (req, res) => {
  const connection = mysql.createConnection
  ({
    host: 'localhost',
    user: 'dbUser',
    password: 'akr26-98hs',
    database: 'mygamestats'
  })

  const queryString = "Select sexo, (Count(sexo)* 100 / (Select Count(*) From jugador)) as Porcentaje From jugador Group By sexo"
  connection.query(queryString, (err, rows, fields) => {
    if (err)
    {
      console.log("Failed to query: " + err);
    }
    console.log("I think we fetched succesfuly");
    res.json(rows);   // the header is created. res.end() comes implicit.
  })
  connection.end()
})

app.get('/getLevelDiff', (req, res) => {
  const connection = mysql.createConnection
  ({
    host: 'localhost',
    user: 'dbUser',
    password: 'akr26-98hs',
    database: 'mygamestats'
  })
  /* Didi DB query 'Select nivel.nombre, (count(idPreguntaPR)*100/(select count(idPreguntaPR) from preguntasrespondidas)) as "Porcentaje de aciertos" From((preguntasrespondidasinner join pregunta on pregunta.idPregunta = preguntasrespondidas.idPreguntaPR) inner join nivel on pregunta.nivelPregunta = nivel.idNivel) where contestoBien = 1 Group By nivel.nombre;' */

  const queryString = 'Select nivel.nombreNivel, (count(idPreguntaPR)*100/(select count(idPreguntaPR) from preguntasRespondidas)) as "PorcentajeAciertos" From((preguntasRespondidas inner join preguntas on preguntas.idPregunta = preguntasRespondidas.idPreguntaPR) inner join nivel on preguntas.nivelPregunta = nivel.idNivel) where contestoBien = 1 Group By nivel.nombreNivel;'
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

app.get('/getSchoolYear', (req, res) => {
  const connection = mysql.createConnection
  ({
    host: 'localhost',
    user: 'dbUser',
    password: 'akr26-98hs',
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

app.listen(3000, () => {
  console.log('REST API running on port 3000')
});
