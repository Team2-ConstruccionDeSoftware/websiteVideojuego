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
        menu.innerHTML = '<div id="menu"><div class="link" onclick="window.location=\'index.html\';"><div class="circleMenu" id="gameCircle"><img class="menuIcon" src="images/sofia.png" alt="icono"></div><div class="menuLabel">Juego</div></div><div class="link"><div class="circleMenu" id="statsCircle" onclick="window.location=\'estadisticas.html\';"><img class="menuIcon" src="images/stats.png" alt="icono"></div><div class="menuLabel">Estadisticas generales</div></div><div class="link"><div class="circleMenu" id="aboutCircle" onclick="window.location=\'about.html\';"><img class="menuIcon" src="images/thinking.png" alt="icono"></div><div class="menuLabel">Sobre nosotros</div></div><div class="link"><div class="circleMenu" id="myStatsCricle" onclick="window.location=\'ESTEAUNNOLOTENGO\';"><img class="menuIcon" src="images/you.png" alt="icono"></div><div class="menuLabel">Tu perfil</div></div></div>';
        isMenuSelected = true;
    }
}
//Se crean las chart con la info del api
'use strict'
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