'use strict'

var i = 0;
var txt = 'Estadisticas del juego'; /* The text */
var speed = 130; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("titulo").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
let isMenuSelected = false;
function showMenu(){
    let menu = document.getElementById('menuHere');
    if(isMenuSelected){
        menu.innerHTML = '';
        isMenuSelected = false;
    }
    else{
        menu.innerHTML = '<div id="menu"><div class="link"><div class="circleMenu" id="gameCircle"><img class="menuIcon" src="images/sofia.png" alt="icono"></div><a href="index.html" class="menuLabel">Juego</a></div><div class="link"><div class="circleMenu" id="statsCircle"><img class="menuIcon" src="images/stats.png" alt="icono"></div><a href="estadisticas.html" class="menuLabel">Estadisticas generales</a></div><div class="link"><div class="circleMenu" id="aboutCircle"><img class="menuIcon" src="images/thinking.png" alt="icono"></div><a href="about.html" class="menuLabel">Sobre nosotros</a></div><div class="link"><div class="circleMenu" id="myStatsCricle"><img class="menuIcon" src="images/you.png" alt="icono"></div><a href="yourProfile.html" class="menuLabel">Tu perfil</a></div></div>';
        isMenuSelected = true;
    }
}

async function showGenderStat()
{
  // the endpoint requests the info from the server.
  const response = await fetch('http://localhost:5000/getGenderStats', {
    method: 'GET'});

  /* if HTTP-status is 200-299
  get the response body (the method explained below) */
  if (response.ok)
  {
    // json are the results, but still in JSON format.
    let json = await response.json();
    console.log(json);
    /* Access json's data */
    let sexFem = json[0].genero;
    console.log(sexFem);
    let sexMasc = json[1].genero;
    console.log(sexMasc);

    let howManyWomen = json[0].numeroPersonas;
    console.log(howManyWomen);
    let howManyMen = json[1].numeroPersonas;
    console.log(howManyMen);
    let colorA = '#BB86FC';
    let colorB = '#CF6679';

    /* chart setup */
    const DATA_COUNT = 2;   // only two variables.
    const data = {
      labels: [sexFem, sexMasc],
      datasets: [
        {
          label: 'Dataset 1',
          data: [howManyWomen, howManyMen],
          //backgroundColor: Object.values(Utils.CHART_COLORS),
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
            //text: 'Pie Chart: Porcentaje de jugadores mujeres vs hombres',
            font: {
                //family: "Georgia",
                size: 10
            }
          }
        }
      },
    };

    // make the default font size = 20
    Chart.defaults.font.size = 18;

    /* show graph in HTML page */
    var myChart = new Chart(
      document.getElementById('genderChart'),
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
  const response = await fetch('http://localhost:5000/getLevelDiff', {
    method: 'GET'});

  if (response.ok)
  {
    /* json are the results, but still in JSON format */
    let json = await response.json();
    console.log("Entro a dificultad" + json);

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
  const response = await fetch('http://localhost:5000/getSchoolYear', {
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
            display: false
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
async function countPeople(){
    const response = await fetch('http://localhost:5000/countPeople',{
                method: 'GET'});
    if (response.ok)
    {
        // json are the results, but still in JSON format.
        let json = await response.json();
        console.log(json);
        document.getElementById('countPeople').innerHTML = json.count(email);
    }
    else{
        alert("HTTP-Error: " + response.status);
    }
}