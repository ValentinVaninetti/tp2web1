"use strict"
document.addEventListener("DOMContentLoaded",iniciarPagina);
function iniciarPagina() {    
    const url = 'https://60da1a6a5f7bf1001754794d.mockapi.io/api/Personajes';
    let botonAgregar = document.querySelector("#btn-agregar");
    botonAgregar.addEventListener("click", agregar);
    const tabla = document.querySelector("#table"); 

   mostrarTabla();
    async function mostrarTabla(){               
        tabla.innerHTML = "";
        try{
            let res = await fetch(url);
            let json = await res.json();
            console.log(json);
            for (const item of json){                
                let nombre = item.nombrePersonaje;
                let clase = item.clase;
                let raza = item.raza;
                let especializacion = item.especializacion;
                let lvl = item.lvl                
                if (lvl == 60) {                    
                    tabla.innerHTML +=     
                        `<tr class="tablaResaltada"><td>${nombre}</td>
                                <td>${clase}</td>
                                <td>${raza}</td>
                                <td>${especializacion}</td>
                                <td>${lvl}</td>
                                <td data-objectId="${item.id}">
                                    <button 
                                        class="buttonrow-Borrar"
                                        type="button"                                        
                                    >
                                    Borrar
                                    </button>
                                    <button
                                        class="buttonrow-Editar"
                                        type="button"                                        
                                    >Editar
                                    </button>
                                </td>                                
                        </tr>`
                 }
                else {
                    tabla.innerHTML +=
                        `<tr><td>${nombre}</td>
                                    <td>${clase}</td>
                                    <td>${raza}</td>
                                    <td>${especializacion}</td>
                                    <td>${lvl}</td>
                                    <td data-objectId="${item.id}"><button 
                                        class="buttonrow-Borrar" 
                                        type="button"                                       
                                    >
                                    Borrar
                                     </button>                                     
                                    <button
                                        class="buttonrow-Editar"
                                        type="button"                                        
                                    >Editar
                                    </button>
                            </td>
                        </tr>`                       

                }              
            }
            agregarEventoBorrar();
            agregarEventoEditar();       
        }catch (error){
            console.log("e");
        }  
    }      
    async function agregar(event){
        event.preventDefault();
        let newPersonaje = {
            nombrePersonaje: document.querySelector("#nombre").value,
            clase: document.querySelector("#clase").value,
            raza: document.querySelector("#raza").value,
            especializacion: document.querySelector("#especializacion").value,
            lvl: document.querySelector("#lvl").value,
        }
        try{
         let Post = await fetch(url,{
            'method' : 'POST',
            'headers': {'Content-Type' : 'application/json'},
            'body' : JSON.stringify(newPersonaje)
            });
                if (Post.ok) {
                console.log(r);
            }
        }catch(error){
            console.log("e");            
       } 
       mostrarTabla();
    }
    function agregarEventoBorrar(){        
        let botonesBorrar = document.querySelectorAll(".buttonrow-Borrar");         
        botonesBorrar.forEach(boton => {            
            boton.addEventListener("click", borrar);            
            
        });
    }        
    async function borrar(event){
        //obtiene el atributo ligado al padre que contiene el boton Borrar que dispara el evento de esta funcion.
        //El padre tiene el id del Objeto referenciado en el atributo, en este caso data-objectID.
        let id = event.target.parentNode.getAttribute("data-objectId");        
        console.log(id);
        try{
            let del = await fetch(`${url}/${id}`,{
                'method' : 'DELETE'
        });
        }catch(error){
                console.log("error")
        }
        mostrarTabla();

            
    }
    function agregarEventoEditar(){
        let botonesEditar = document.querySelectorAll(".buttonrow-Editar");
        botonesEditar.forEach(boton =>{
            boton.addEventListener("click",editar);
        })
            
    }
    /*async function editar(event){
        console.log("AA")
        let id = event.target.getAttribute("data-editar");
        console.log(id);
        try{
            let edit = await fetch(`${url}/${id}`,{
                'method' : 'PUT'
            })
        }
    }*/

}
 
       