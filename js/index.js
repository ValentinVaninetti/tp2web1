"use strict";
document.addEventListener("DOMContentLoaded",iniciarPagina)
function iniciarPagina(){  
  let boton_nav = document.querySelector("#button-navBar");
  boton_nav.addEventListener("click", displayNav)
  function displayNav(){
    let navItems = document.querySelector("#navItems")
    navItems.classList.toggle('showNav')
  }  
  
   
}
