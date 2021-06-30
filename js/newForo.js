"use strict"
document.addEventListener("DOMContentLoaded",iniciarPagina);
function iniciarPagina() { 

    const url = 'https://60da1a6a5f7bf1001754794d.mockapi.io/api/Personajes';

    let botonAgregar = document.querySelector("#btn-agregar");

    botonAgregar.addEventListener("click", agregar);

    const tabla = document.querySelector("#table"); 
        

   obtenerDatos();   
    
   async function obtenerDatos(){
    try{
        let res = await fetch(url);
        let json = await res.json();
        console.log(json);        
        mostrarTabla(json);      
        
    }catch (error){
        console.log("e");
    }  

   }
    async function mostrarTabla(json){               
        tabla.innerHTML = "";        
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
            }
            agregarEventoBorrar();
            agregarEventoCrear(); 
                  
        
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
       obtenerDatos();
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
        }
        );

        }catch(error){
                console.log("error")
        }

        obtenerDatos();                  
    }
    
    function agregarEventoCrear(){
        let botonesEditar = document.querySelectorAll(".buttonrow-Editar");
        botonesEditar.forEach(boton =>{
            boton.addEventListener("click", crearFormEditar);
        }) 

    }

    async function editar(event){
        event.preventDefault();
        let id = event.target.getAttribute("data-atributton");
       
        let editable = document.querySelector ("#divEditable");

        let personajeSinModificar = getbyId(id);
             

        let PersonajeModificado = {

            nombrePersonaje: document.querySelector("#nameEditable").value,
            clase: document.querySelector("#claseEditable").value,
            raza: document.querySelector("#razaEditable").value,
            especializacion: document.querySelector("#especEditable").value,
            lvl: document.querySelector("#lvlEditable").value
        }
        console.log(PersonajeModificado);

        if(PersonajeModificado.nombrePersonaje === ''){
            PersonajeModificado.nombrePersonaje = personajeSinModificar.nombrePersonaje
        }
        if(PersonajeModificado.clase === ''){
            PersonajeModificado.clase = personajeSinModificar.clase
        }
        if(PersonajeModificado.raza === ''){
            PersonajeModificado.raza = personajeSinModificar.clase
        }
        if(PersonajeModificado === ''){
            PersonajeModificado.especializacion = personajeSinModificar.especializacion
        }
        if(PersonajeModificado === ''){
            PersonajeModificado.lvl = personajeSinModificar.lvl
        }
        try{
            let put = await fetch(`${url}/${id}`,{
                'method' : 'PUT',
                'headers': {'Content-Type' : 'application/json'},
                'body' : JSON.stringify(PersonajeModificado)
            })
        }
        catch(e){
            console.log(e)
        }
        obtenerDatos();

        editable.innerHTML = "";       
    }

    //se puede hacer de otra manera, pero anda.
    async function getbyId(id){           
        try{
            let obj = await fetch(url + '/' + id);
            let json = await obj.json();
            return json;
        }
        catch(e){
            console.log(e)
        }               
    }
    function crearFormEditar(event) {
        let id = event.target.parentNode.getAttribute("data-objectID"); 
        let editable = document.querySelector ("#divEditable");        
        editable.innerHTML += 
        `<form >
        <input type="text" id="nameEditable" placeholder="Nombre del personaje">
        <input type="text" id="claseEditable" placeholder="Clase del personaje">
        <input type="text" id="razaEditable" placeholder="Raza del personaje">
        <input type="number" id="lvlEditable" placeholder="Level del personaje">
        <select name="especializacion" id="especEditable" name= "especializacion">
            <option value=""></option>
            <option value="Dps">Dps</option>
            <option value="Tank">Tank</option>
            <option value="Healer">Healer</option>                                    
        </select>
        <button type="submit" id="btn-editado" data-atributton="${id}">
            Editar
        </button> 
        </form>`;       
        
        let botonEditado = document.querySelector("#btn-editado");
        botonEditado.addEventListener("click",editar);
                                    

    }

    let botonFiltro = document.querySelector("#btn-filtrar");
    botonFiltro.addEventListener("click", filtrarBusqueda);
    async function filtrarBusqueda (){
        let filtro = document.querySelector("#filtroBusqueda").value;
        let datosFiltrados = []
        try{
            let res = await fetch (url);
            let json = await res.json ();
            console.log ("aber");
            tabla.innerHTML= "";
            for (const personaje of json) {
                console.log("x");
                if ((filtro.toLowerCase() == personaje.nombrePersonaje.toLowerCase())
                ||(filtro.toLowerCase()  == personaje.clase.toLowerCase())
                ||(filtro.toLowerCase()  == personaje.raza.toLowerCase())
                ||(filtro.toLowerCase()  == personaje.especializacion.toLowerCase())){
                    console.log(personaje);
                    datosFiltrados.push(personaje);               
                }
             if(!datosFiltrados.length == 0){
             mostrarTabla(datosFiltrados);
                }else{
                    mostrarTabla(json)
                }
            }
        }
        catch (e){
            console.log ("error")
        }
    }    
}

       