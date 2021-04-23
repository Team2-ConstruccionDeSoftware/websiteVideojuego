
//const { response } = require("express");

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
async function showStats()
{
  // the endpoint requests the info from the server.
  const response = await fetch('http://localhost:3000/getWomen', {
    method: 'GET'});

  /* if HTTP-status is 200-299
  get the response body (the method explained below) */
  if (response.ok)
  {
    // json are the results, but still in JSON format.
    let json = await response.json();
    let resultsString = '<table><tr><th>First name</th><th>Last name</th><th>Email</th></tr>';
  
    for(let user in json){
        resultsString += "<tr><td>";
        resultsString += json[user].userId;
        resultsString += "</td><td>";
        resultsString += json[user].firstName;
        resultsString += "</td><td>";
        resultsString += json[user].lastName;
        resultsString += "</td><td>";
        resultsString += json[user].email;
        resultsString += "</td></tr>";

    }

    document.getElementById('userinfo').innerHTML = resultsString;
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
