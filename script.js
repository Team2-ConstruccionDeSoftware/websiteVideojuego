
'use strict'

//let Chart = require('chart.js'); if this is uncommented, an error prompts in console because require can't be found somehow.

function propsAsString(obj)
{
  return Object.keys(obj).map((k) => k + ":" + obj[k]).join(", ")
}

function signUp(){
    let theString = '<div id = "form-wrapper"><form class = "theForm" onsubmit="getFormValue(event);login();"><div class="txt-field" id = "name"><label>Nombre: </label><input placeholder = "Escribe tu nombre aqui" id = "create_name" class = "the-input"></div><div class="txt-field" id = "age"><label>Edad: </label><input placeholder="¿Cuantos años tienes?" id = "create_age" class = "the-input"></div><div class="txt-field" id = "email"><label>Email: </label><input placeholder="Pon aqui tu mail" id = "create_email" class = "the-input"></div><label>¿En qué grado vas?</label><div id = "circles"><div class = "circle-input" id = "primerosecu"><!-- name attribute must be alike so only one option can be selected--><input type = "radio" id = "1secu" name = "create_school_year" value="Primero secundaria"><label for="vehicle1"> 1° Secundaria</label><br></div><div class = "circle-input"  id="segundosecu"><input type = "radio" id="2secu" name = "create_school_year" value="Segundo secundaria"><label for="vehicle2"> 2° Secundaria</label><br></div><div class="circle-input" id="tercerosecu"><input type="radio" id="3secu" name = "create_school_year" value="Tercero secundaria"><label for="vehicle3"> 3° Secundaria</label></div><div class="circle-input" id="primeroprepa"><input type="radio" id="1prepa" name = "create_school_year" value="Primero prepa"><label for="vehicle1"> 1° Prepa</label><br></div><div class="circle-input" id="segundoprepa"><input type="radio" id="2prepa" name = "create_school_year" value="Segundo prepa"><label for="vehicle2"> 2° Prepa</label><br></div><div class="circle-input" id="terceroprepa"><input type = "radio" id="3prepa" name = "create_school_year" value="Tercero prepa"><label for="vehicle3"> 3° Prepa</label></div></div><label for="genero">¿Cuál es tu género?</label><select id="create_sex" id="genero"><option value="femenino">Femenino</option><option value="masculino">Masculino</option><option value="otro">otro</option></select><div><input type = "submit" value = "Siguiente paso"></div></form></div>';
    document.getElementById("form").innerHTML = theString;
}
function login(){
    let theString = '<div id="form-wrapper"><div class="txt-field" id = "email"><label>Confirma tu email: </label><input placeholder="email" name = "create_email" id="create_email" class = "the-input"></div></form><button onclick="givePlayerId();">Mostrar Juego</button></div></div>';
     document.getElementById("form").innerHTML = theString;
}
function getSchoolYear(){
  var ele = document.getElementsByName('create_school_year');
  let theSchoolYear;
  for(let i = 0; i < ele.length; i++) {
     if(ele[i].checked){
      theSchoolYear = ele[i].value;
      console.log("valor school year: " + theSchoolYear);
     }
  }
  return theSchoolYear;
}
async function getFormValue(event){
  event.preventDefault();
  const name = document.getElementById('create_name').value;
  const age = document.getElementById('create_age').value;
  const email = document.getElementById('create_email').value;
  const schoolYear = getSchoolYear();
  const sex = document.getElementById('create_sex').value;
  const data = {name, age, email, schoolYear, sex};
  console.log(data);
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  const response = await fetch('http://localhost:5000/postPlayerData', options);
  let json = await response.json();
  console.log(json);
  //experimentoz
  /*
  var elmnt = document.getElementById("unity");
  elmnt.innerHTML = '<div id="unityContainer" style="width: 1280px; height: 720px; margin: auto"></div>';
  elmnt.scrollIntoView();
  var unityInstance = UnityLoader.instantiate("unityContainer", "UnityBuild/Build/UnityBuild.json");
  unityInstance.SendMessage("api", "getPlayerId", json);*/
}
/* --include the chart using chart.js for better data visualization-- */
async function showStats()
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
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Pie Chart: cantidad de jugadores mujeres vs hombres'
          }
        }
      },
    };

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

async function givePlayerId(){
    let email = document.getElementById('create_email').value;
    console.log(email);
    //Display Unity
    var elmnt = document.getElementById("unity");
    elmnt.innerHTML = '<div id="unityContainer" style="width: 1280px; height: 720px; margin: auto"></div>';
    elmnt.scrollIntoView();
    //var unityInstance = UnityLoader.instantiate("unityContainer", "UnityBuild/Build/UnityBuild.json");
    let unityInstance = UnityLoader.instantiate("unityContainer", "UnityBuild/Build/UnityBuild.json", 
    { 
        Module: 
        {
            onRuntimeInitialized: async function () {
              const response = await fetch('http://localhost:5000/getPlayerId/' + email, {
                method: 'GET'});
                //Send playerId to unity
                if (response.ok)
                {
                  let json = await response.json();
                  console.log(json);
                  document.getElementById('Bienvenida').innerHTML = "Hola " + json[0].nombre + " !";
                  unityInstance.SendMessage("api", "getPlayerId", json[0].email);
                }
                else
                {
                  alert("HTTP-Error: " + response.status);
                  console.log(response.status);
                }
            }
        }
      });
}
/* Shows dropdown menu */
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
