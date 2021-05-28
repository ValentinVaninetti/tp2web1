"use strict";
document.addEventListener("DOMContentLoaded",iniciarPagina)
function iniciarPagina(){    
    let userTable = [
        {
            "nombrePersonaje": "BadMadafaca",
            "clase": "Warrior",
            "raza": "Tauren",
            "especializacion": "Tank",
            "lvl": 60,           
        },
        {
            "nombrePersonaje": "Zhinne",
            "clase": "Druid",
            "raza": "Tauren",
            "especializacion": "Tank",
            "lvl": 60,
        }
    ];
    mostrarTabla();
    function mostrarTabla(){
        let tabla = document.querySelector("#table");        
        tabla.innerHTML='';
        for (let i=0; i<userTable.length; i++){
            if(userTable[i].lvl==60){                
                console.log(userTable[i].lvl=60)
                tabla.innerHTML += 
                            `<tr class="tablaResaltada"><td>${userTable[i].nombrePersonaje}</td>
                            <td>${userTable[i].clase}</td>
                            <td>${userTable[i].raza}</td>
                            <td>${userTable[i].especializacion}</td>
                            <td>${userTable[i].lvl}</td></tr>`
            }
            else {
                tabla.innerHTML +=
                            `<tr><td>${userTable[i].nombrePersonaje}</td>
                                <td>${userTable[i].clase}</td>
                                <td>${userTable[i].raza}</td>
                                <td>${userTable[i].especializacion}</td>
                                <td>${userTable[i].lvl}</td></tr>`
            }
        }
    }


    document.querySelector("#btn-agregar").addEventListener("click",agregar);    
    function agregar(event){ 
        event.preventDefault();
        
        let newUser ={        
            "nombrePersonaje": document.querySelector("#nombre").value,
            "clase": document.querySelector("#clase").value,
            "raza": document.querySelector("#raza").value,
            "especializacion": document.querySelector("#especializacion").value,
            "lvl": Number(document.querySelector("#lvl").value),
        }
        userTable.push(newUser);  
        mostrarTabla();
           
        
    }
        /*document.querySelector("#btn-borrar").addEventListener("click", borrar);
        function borrar(){
            userTable.pop();
            mostrarTabla();   

        }*/

    document.querySelector("#btn-borrar").addEventListener("click", limpiarTodo);
    function limpiarTodo(event){
       event.preventDefault();
       userTable = [];
       mostrarTabla();

    }

    let nombresRandom = ["PwnStar","Thrall","GoodMadafaca","MugrisioMacri","NuevedeOrco","Invivo","JuanRogue232","Bocakpo22","Alpachirlo","abcDario"] //arreglo de string

    let clasesRandom = ["Druid", "Warrior", "Mage", "Paladin", "Death Knight", "Demon Hunter", "Warlock", "Priest","Rogue", "Monk", "Shaman", "Hunter"]
    
    let razasRandom =  ["Orc","Tauren","Undead","Troll","Blood Elf","Pandaren","Goblin","Human","Night Elf","Dwarf","Draenei","Gnome","Wargen"]

    let specRandom = ["Dps","Tank","healer"]

    document.querySelector("#btn-random").addEventListener("click" , agregarRandom);

    function agregarRandom(event){
        event.preventDefault();
        let maxRandom = 3;
                for(let i = 0; i < maxRandom; i++){

                    let nombreR = Math.floor(Math.random()* nombresRandom.length);  //agarro un nombre random del arreglo                 
                      console.log(nombreR);        
                    let claseR = Math.floor(Math.random()* clasesRandom.length);   //agarro una clase random del arreglo                
                                          
                    let razaR = Math.floor(Math.random()* razasRandom.length);      //agarro una raza random del arreglo              
                               
                    let specR = Math.floor(Math.random()* specRandom.length);     //agarro una clase random del arreglo

                    let personajeR = generarRandom(nombreR,claseR,razaR,specR)    //creo un personaje random con esos arreglos, llamando al metodo generarRandom
                    
                    userTable.push(personajeR); //agrego el personaje

                    mostrarTabla();                    
                    
                }                  

        }

        function generarRandom(nombreR ,claseR, razaR, specR){ //creo un objeto
           
            return {
                "nombrePersonaje": nombresRandom[nombreR],
                "clase": clasesRandom[claseR],
                "raza": razasRandom[razaR],
                "especializacion": specRandom[specR],
                "lvl": ((Math.floor(Math.random()*61)))

            }
        }

       
        let buttons_admin_rights = document.querySelectorAll(".botonAdmin");
        let btn_send = document.querySelector("#validateUser");
        btn_send.addEventListener("click" , validateUser); 

        function validateUser(event) {
            event.preventDefault();
            let user_input = document.querySelector("#adm").value;
            let pass_input = document.querySelector("#pass").value;
            if((user_input == 'admin')&&(pass_input == 'admin')){
                console.log(buttons_admin_rights);
                for(let i = 0; i< buttons_admin_rights.length; i++){
                    buttons_admin_rights[i].classList.remove('botonAdmin');
                                }
               
            }
            else{
                console.log("vos no sos admin flaco");
            }

        }
    
}

   
   



    

    

    

    
    
    






