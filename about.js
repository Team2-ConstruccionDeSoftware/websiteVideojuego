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
