
//const { response } = require("express");

function propsAsString(obj)
{
  return Object.keys(obj).map((k) => k + ":" + obj[k]).join(", ")
}

function signUp(){
    let theString = '<div id="form-wrapper"><form class = \"theForm\" action = \"http://localhost:3000/postUser\" method=\"POST\"><div class=\"txt-field\" id = \"name\"><label>Nombre: </label><input placeholder="nombre" name = "create_name" class = "the-input"></div><div class="txt-field" id = "age"><label>Edad: </label><input placeholder="¿Cuantos años tienes?" name = "create_age" class = "the-input"></div><div class="txt-field" id = "email"><label>Email: </label><input placeholder="email" name = "create_email" class = "the-input"></div><label>¿En qué grado vas?</label><div id="checkboxes"><div class="check-field" id="primerosecu"><input type="checkbox" id="1secu" name="1secu" value="Primero secundaria"><label for="vehicle1"> 1° Secundaria</label><br></div><div class="check-field" id="segundosecu"><input type="checkbox" id="2secu" name="2secu" value="Segundo secundaria"><label for="vehicle2"> 2° Secundaria</label><br></div><div class="check-field" id="tercerosecu"><input type="checkbox" id="3secu" name="3secu" value="Tercero secundaria"><label for="vehicle3"> 3° Secundaria</label></div><div class="check-field" id="primeroprepa"><input type="checkbox" id="1prepa" name="1secu" value="Primero prepa"><label for="vehicle1"> 1° Prepa</label><br></div><div class="check-field" id="segundoprepa"><input type="checkbox" id="2prepa" name="2secu" value="Segundo prepa"><label for="vehicle2"> 2° Prepa</label><br></div><div class="check-field" id="terceroprepa"><input type="checkbox" id="3prepa" name="3secu" value="Tercero prepa"><label for="vehicle3"> 3° Prepa</label></div></div><label for="genero">¿Cuál es tu género?</label><select name="genero" id="genero"><option value="femeninio">Femeninio</option><option value="masculino">Masculino</option><option value="otro">otro</option></select><div><input type="submit" value="Mostrar juego" onclick="showScrollGame()"></div></form></div>';
    document.getElementById("form").innerHTML = theString;
}
function login(){
    let theString = '<div id="form-wrapper"><form class = "theForm" action = "http://localhost:3000/postUser" method="POST"><div class="txt-field" id = "email"><label>Email: </label><input placeholder="email" name = "create_email" class = "the-input"></div></form><input type="submit" value="Mostrar juego" onclick="showScrollGame()"></div></form></div>';
    document.getElementById("form").innerHTML = theString;
}
function showScrollGame(){
    var elmnt = document.getElementById("unity");
    /*elmnt.innerHTML = '<div id="unityContainer" style="width: 1280px; height: 720px; margin: auto"></div>'*/
    elmnt.scrollIntoView();
}
