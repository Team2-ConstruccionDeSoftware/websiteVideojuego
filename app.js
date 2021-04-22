'use strict'

const express = require('express');
const app = express();
var mysql = require('mysql');
const cors = require('cors');

app.use(cors());

// post -> create new Player
app.post('/postPlayerData', (req, res) => {
    const email = req.body.create_email
    const name = req.body.create_name
    const sex = req.body.create_sex
    const age = req.body.create_age
    const schoolYear = req.body.create_school_year

    const connection = mysql.createConnection
    ({
      // update for a new db user?
      host: 'localhost',
      user: 'dbUser',
      password: 'akr26-98hs',
      database: 'myGameStats'
    })

    const queryString = "INSERT INTO userData (email, nombre, sexo, edad, añoEscolar) VALUES (?, ?, ?, ?, ?)"
    connection().query(queryString, [email, name, sex, age, schoolYear], (err, results, fields) => {
      if (err)
      {
        console.log("Failed to insert PlayerData1: " + err)
        res.sendStatus(500)
        return
      }
      console.log("Inserted a new PlayerData with identifier email: ", results.insertEmail);
      res.end()
    })
  connection.end();
})

// put -> update Player
/*app.put('/updateUser/:id/:email', (req,res) => {
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
  connection().query(queryString, [email, id], (err,result) => {
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

app.listen(3000, () => {
  console.log('REST API running on port 3000')
});*/
