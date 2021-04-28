'use strict'
//const { response } = require("express");
//let Chart = require('chart.js'); if this is uncommented, an error prompts in console because require can't be found somehow.

function propsAsString(obj)
{
  return Object.keys(obj).map((k) => k + ":" + obj[k]).join(", ")
}

function signUp(){
    let theString = '<div id = "form-wrapper"><form class = "theForm" action = "http://localhost:3000/postPlayerData" method = "POST"><div class="txt-field" id = "name"><label>Nombre: </label><input placeholder = "Escribe tu nombre aqui" name = "create_name" class = "the-input"></div><div class="txt-field" id = "age"><label>Edad: </label><input placeholder="¿Cuantos años tienes?" name = "create_age" class = "the-input"></div><div class="txt-field" id = "email"><label>Email: </label><input placeholder="Pon aqui tu mail" name = "create_email" class = "the-input"></div><label>¿En qué grado vas?</label><div id = "circles"><div class = "circle-input" id = "primerosecu"><!-- name attribute must be alike so only one option can be selected--><input type = "radio" id = "1secu" name = "create_school_year" value="Primero secundaria"><label for="vehicle1"> 1° Secundaria</label><br></div><div class = "circle-input"  id="segundosecu"><input type = "radio" id="2secu" name = "create_school_year" value="Segundo secundaria"><label for="vehicle2"> 2° Secundaria</label><br></div><div class="circle-input" id="tercerosecu"><input type="radio" id="3secu" name = "create_school_year" value="Tercero secundaria"><label for="vehicle3"> 3° Secundaria</label></div><div class="circle-input" id="primeroprepa"><input type="radio" id="1prepa" name = "create_school_year" value="Primero prepa"><label for="vehicle1"> 1° Prepa</label><br></div><div class="circle-input" id="segundoprepa"><input type="radio" id="2prepa" name = "create_school_year" value="Segundo prepa"><label for="vehicle2"> 2° Prepa</label><br></div><div class="circle-input" id="terceroprepa"><input type = "radio" id="3prepa" name = "create_school_year" value="Tercero prepa"><label for="vehicle3"> 3° Prepa</label></div></div><label for="genero">¿Cuál es tu género?</label><select name="create_sex" id="genero"><option value="femeninio">Femeninio</option><option value="masculino">Masculino</option><option value="otro">otro</option></select><div><input type = "submit" value = "Mostrar juego" onclick = "showScrollGame()"></div></form></div>';
    document.getElementById("form").innerHTML = theString;
}

function login(){
    let theString = '<div id="form-wrapper"><form class = "theForm" action = "http://localhost:3000/postUser" method="POST"><div class="txt-field" id = "email"><label>Email: </label><input placeholder="email" name = "create_email" class = "the-input"></div></form><input type="submit" value="Mostrar juego" onclick="showScrollGame()"></div></form></div>';
    document.getElementById("form").innerHTML = theString;
}

/* --include the chart using chart.js for better visualization of the data-- */
async function showStats()
{
  /* the endpoint requests the info from the server */
  const response = await fetch('http://localhost:3000/getGenderStats', {
    method: 'GET'});

  /* if HTTP-status is 200-299 get the response body (the method explained below) */
  if (response.ok)
  {
    /* json are the results, but still in JSON format */
    let json = await response.json();
    //console.log(json);

    /* Access json's data */
    let sexFem = json[0].sexo;
    //console.log(sexFem);
    let sexMasc = json[1].sexo;
    //console.log(sexMasc);

    let howManyWomen = json[0].Porcentaje;
    let howManyMen = json[1].Porcentaje;

    let colorA = '#ff6384';
    let colorB = '#8463ff';

    /* chart setup */
    const DATA_COUNT = 2;   // only two variables.
    const data = {
      labels: [sexFem, sexMasc],
      datasets: [
        {
          label: 'Dataset 1',
          data: [howManyWomen, howManyMen],
          backgroundColor: [colorA, colorB]
        }
      ]
    };

    /* chart configuration */
    const config = {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Pie Chart: Porcentaje de jugadores mujeres vs hombres',
            font: {
              size: 25
            }
          }
        }
      },
    };

    // make the default font size = 20
    Chart.defaults.font.size = 25;
    /* show graph in HTML page */
    var myChart = new Chart(
      document.getElementById('myChart'),
      config
    );
  }

  else
  {
    alert("HTTP-Error: " + response.status);
    document.getElementById('userinfo').innerHTML = response.status;
  }
}

async function showDifficulty()
{
  const response = await fetch('http://localhost:3000/getLevelDiff', {
    method: 'GET'});

  if (response.ok)
  {
    /* json are the results, but still in JSON format */
    let json = await response.json();
    //console.log(json);

    // access json's data
    let levelNameA = json[0].nombreNivel;
    //console.log(levelNameA);
    let difficultyA = Math.floor(json[0].PorcentajeAciertos);
    //console.log(difficultyA);

    let colorA = '#ff6384';
    let colorB = '#6116F5';

    // Chart setup
    const DATA_COUNT = 2;       // for now only level 1
    const labels = [levelNameA, 'nivel 2', 'nivel 3'];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Dificultad del Nivel',
          data: [difficultyA, 30, 50],
          borderColor: [colorB, colorA, colorB],
          backgroundColor: [colorA, colorB, colorA],
        },
      ],
    };

    // Chart configuration
    const config = {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            type: 'linear',
            grace: '25%'
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Bar Chart: Porcentaje de Dificultad de cada nivel del juego',
            font: {
              size: 20
            }
          }
        }
      },
    };

    /* show graph in HTML page */
    Chart.defaults.font.size = 20;
    var myChart = new Chart(
      document.getElementById('myBarChart'),
      config
    );
  }

  else
  {
    alert("HTTP-Error: " + response.status);
    document.getElementById('userinfo').innerHTML = response.status;
  }
}

async function showSchoolYear()
{
  const response = await fetch('http://localhost:3000/getSchoolYear', {
    method: 'GET'});

  if (response.ok)
  {
    /* json are the results, but still in JSON format */
    let json = await response.json();
    //console.log(json);

    // access json's data
    let prep1 = json[3].gradoEscolar;
    let jugadoresPrep1 = json[3].numJugadores;
    //console.log(jugadoresPrep1);

    let secu1 = json[2].gradoEscolar;
    let jugadoresSecu1 = json[2].numJugadores;
    //console.log(jugadoresSecu1);

    let secu2 = json[1].gradoEscolar;
    let jugadoresSecu2 = json[1].numJugadores;
    //console.log(jugadoresSecu2);

    let secu3 = json[0].gradoEscolar;
    let jugadoresSecu3 = json[0].numJugadores;
    //console.log(jugadoresSecu3);

    let colorA = '#18E3E0';
    let colorB = '#E3187A';
    let colorC = '#FFC300';
    let colorD = '#9776E5';

    // Chart Setup
    const DATA_COUNT = 1;
    const data = {
      datasets: [
        {
          // cuando haya mas de 20 jugadores para cada categoria, remplzar
          label: prep1,
          data: [{x: jugadoresPrep1, y: 2, r: 20}],
          borderColor: colorA,
          backgroundColor: colorA,
        },
        {
          label: secu3,
          data: [{x: jugadoresSecu3, y: -2, r: 20}],
          borderColor: colorB,
          backgroundColor: colorB,
        },
        {
          label: secu2,
          data: [{x: jugadoresSecu2, y: 3, r: 20}],
          borderColor: colorC,
          backgroundColor: colorC,
        },
        {
          label: secu1,
          data: [{x: jugadoresSecu1, y: -3, r: 20}],
          borderColor: colorD,
          backgroundColor: colorD,
        }
      ]
    };

    // Chart configuration
    const config = {
      type: 'bubble',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'linear',
            grace: '5'
          },
          y: {
            type: 'linear',
            grace: '5'
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Bubble Chart: Cantidad de jugadores de acuerdo a su año escolar'
          }
        }
      },
    };

    Chart.defaults.font.size = 20;
    var myChart = new Chart(
      document.getElementById('myBubbleChart'),
      config
    );
  }

  else
  {
    alert("HTTP-Error: " + response.status);
    document.getElementById('userinfo').innerHTML = response.status;
  }
}
/*function showScrollGame(){
    var elmnt = document.getElementById("unity");
    elmnt.innerHTML = '<div id="unityContainer" style="width: 1280px; height: 720px; margin: auto"></div>';
    elmnt.scrollIntoView();
    UnityLoader.instantiate("unityContainer", "Build/Build.json");
}*/
