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
      //console.log("Inserted a new PlayerData with identifier email: ", results.email);
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
        console.log("Failed to query for userData: " + err);
      }
      console.log("I think we fetched succesfuly");
      res.json(rows);   // the header is created. res.end() comes implicit.
    })
    connection.end()
  })
/*
// put -> update Player
app.put('/updateUser/:id/:email', (req,res) => {
  console.log("entramos")
  let id = req.params.id
  let email = req.params.email
  console.log(id)
  console.log(email)

  const connection = mysql.createConnection
  ({
    // update for a new db user?
    host: 'localhost',
    user: 'dbUser',
    password: 'akr26-98hs',
    database: 'myGameStats'
  })

  const queryString = "UPDATE userData SET email = ? WHERE userId = ?"
  connection.query(queryString, [email, id], (err,result) => {
    if (err)
    {
      console.log("Failed to update the information: " + err)
      res.sendStatus(500)
      return
    }
    else
    {
      console.log("Update successful")
      res.send(result);
    }
  })
  connection.end();
})
*/
app.listen(3000, () => {
  console.log('REST API running on port 3000')
});
