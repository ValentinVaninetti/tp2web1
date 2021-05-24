"use strict";

let inputDiscusion = document.querySelector("#input-discusion");
let elfeed = document.querySelector(".feed");
inputDiscusion.addEventListener("click", verComentario);
let btnpublicar = document.querySelector("#btn_publicar");
btnpublicar.addEventListener("click", publicarComentario);

function verComentario() {   
    
elfeed.innerHTML = inputDiscusion.value;

}

function publicarComentario() {
    let feed = document.createElement("div");
    feed.className = "feed";
    let span = document.createElement("span");
    span.innerHTML = "Murloc dice:";
    let coment = document.createElement("p");
    coment.innerHTML = inputDiscusion.value;
    feed.appendChild(span);
    feed.appendChild(coment);
    elfeed.appendChild(feed);
    

}