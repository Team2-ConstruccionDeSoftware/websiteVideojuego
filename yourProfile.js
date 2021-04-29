
var i = 0;
var txt = 'Estadisticas personalizadas'; /* The text */
var speed = 130; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("titulo").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
function register(){
    let theString = '<div id="form-wrapper"><div class="txt-field" id = "email"><label>Confirma tu email: </label><input placeholder="email" id="create_email" class = "the-input"></div></form><button onclick="showTable()">Mostrar Juego</button></div></div>';
    document.getElementById("registerForm").innerHTML = theString;
}
    
async function showTable(){
    let email = document.getElementById('create_email').value;
    console.log("El email para mandar: " + email);
    const response = await fetch('http://localhost:5000/getProfileResponses/' + email, {
                method: 'GET'});
    if (response.ok)
    {
        // json are the results, but still in JSON format.
        let json = await response.json();
        console.log(json);
        let resultsString = '<table><tr><th>Tema</th><th>Numero de preguntas Respondidas</th></tr>';
        for(let user in json){
            resultsString += "<tr><td>";
            resultsString += json[user].tema;
            resultsString += "</td><td>";
            resultsString += json[user].TotalRespondidas;
            resultsString += "</td></tr>";
        }
        document.getElementById('theTable').innerHTML = resultsString;
    }
    else
    {
        alert("HTTP-Error: " + response.status);
        document.getElementById('theTable').innerHTML = response.status;
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
        menu.innerHTML = '<div id="menu"><div class="link"><div class="circleMenu" id="gameCircle"><img class="menuIcon" src="images/sofia.png" alt="icono"></div><a href="index.html" class="menuLabel">Juego</a></div><div class="link"><div class="circleMenu" id="statsCircle"><img class="menuIcon" src="images/stats.png" alt="icono"></div><a href="estadisticas.html" class="menuLabel">Estadisticas generales</a></div><div class="link"><div class="circleMenu" id="aboutCircle"><img class="menuIcon" src="images/thinking.png" alt="icono"></div><a href="about.html" class="menuLabel">Sobre nosotros</a></div><div class="link"><div class="circleMenu" id="myStatsCricle"><img class="menuIcon" src="images/you.png" alt="icono"></div><a href="youtProfile.html" class="menuLabel">Tu perfil</a></div></div>';
        isMenuSelected = true;
    }
}
