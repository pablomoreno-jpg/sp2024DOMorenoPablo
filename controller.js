import * as clase from './clases.js'

var lista;
var spiner = $("spinner");
var api = 'https://examenesutn.vercel.app/api/VehiculoAutoCamion';


function $(ID){return document.getElementById(ID)}

function filtrar(arg){


    if(typeof(arg) == "string"){

        lista = JSON.parse(arg);

    }
    else{

        lista = lista.map( obj => {

            if(obj.cantidadPuertas != undefined){

                return new clase.Auto(obj.id,obj.modelo,obj.anoFabricacion,obj.velMax,obj.cantidadPuertas,obj.asientos);

            }
            else if(obj.carga != undefined){

                return new clase.Camion(obj.id,obj.modelo,obj.anoFabricacion,obj.velMax,obj.carga,obj.autonomia);

            }
            else{

                return new clase.Auto(obj.id,obj.modelo,obj.anoFabricacion,obj.velMax);
            }

        })


    }

    return lista;
}

function generarTabla(lista){

    let claves = [];
    let tabla = document.createElement("table");
    let cabezera = document.createElement("tr");
    let eliminar = document.createElement("td");
    let modificar = document.createElement("td");

    eliminar.innerText = "Eliminar";
    modificar.innerText = "Modificar";


    lista.forEach(obj  => {
        
        Object.keys(obj).forEach(clave => {


            if(!claves.includes(clave)){
                claves.push(clave);
                let titulo = document.createElement("td");
                titulo.appendChild(document.createTextNode(clave))
                cabezera.appendChild(titulo);
            }
        
        }); 
        
    })

    cabezera.appendChild(modificar);
    cabezera.appendChild(eliminar);

    tabla.appendChild(cabezera);

    // index para modificar o eliminar 
    lista.forEach((obj, index)=> {

        let contenido = document.createElement("tr");
        let eliminar = document.createElement("td");
        let modificar = document.createElement("td");
        
        let btE = document.createElement("button");
        let btM = document.createElement("button");

        btE.innerText = "Eliminar";
        btM.innerText = "Modificar";

        btE.setAttribute("id","eliminar");
        btM.setAttribute("id","modificar");
        
        modificar.appendChild(btM);
        eliminar.appendChild(btE);


        modificar.addEventListener("click",() =>{ 
            spiner.style.display = 'block';
            tabla.style.display = 'none';
            modificarAuto(contenido,index);
        
        })
           


        for(let [i,clave] of claves.entries()){

            let caja = document.createElement("td");

            if(Object.keys(obj).includes(clave)){

                let valor = obj[clave];
                
                if(typeof(valor) != String){

                    caja.appendChild(document.createTextNode(valor.toString()));
                    caja.setAttribute(clave,valor.toString());

                }   
                else{

                    caja.appendChild(document.createTextNode(valor));
                    caja.setAttribute(clave,valor.toString());

                }


                if(clave == "cantidadPuertas"){    

                    contenido.setAttribute("clase","auto");

                }
                else if (clave == "carga"){

                    contenido.setAttribute("clase","camion");

                }
                else{
                    contenido.setAttribute("clase","veiculo");
                }


            }
            else{

                caja.appendChild(document.createTextNode("N/A"));
            }


            
            contenido.appendChild(caja);

            if(i == claves.length -1){

                contenido.appendChild(modificar);
                contenido.appendChild(eliminar);

            }

        }

        tabla.appendChild(contenido);
    })

    return tabla;

}

function cargarTabla(){

    let tabla = generarTabla(lista);
    let boton = document.createElement("button");

    boton.setAttribute("id","agregar");

    boton.innerText = "Agregar";

    tabla.appendChild(boton);

    return tabla;

}

export function solitudGet(){

    spiner.style.display = 'block';
    let https = new XMLHttpRequest();
    let div = $("tabla");


    try{

        https.onreadystatechange = function(){


            if(https.status == 200 ){

                spiner.style.display = 'none';
                lista = filtrar(https.response);
                div.appendChild(cargarTabla());
                div.style.display = 'block'
                

            }
 

        }

         
        https.open("GET",api,false);
        https.send();

    }
    catch(Error){

        alert("Error, no se pudo acceder al servidor");
        spiner.style.display = 'none';

    }



}


function generarAbm(){

    let abm = $("abm");
    let persona = ['modelo','anoFabricacion','velMax'];

    if(abm.childNodes.length > 0){

        abm.replaceChildren();
    }


    persona.forEach(clave =>{

        let cartel = document.createElement("label");
        let caja = document.createElement("input");
        let salto = document.createElement("br");

        caja.setAttribute("type","text");
        caja.setAttribute("id",clave);

        cartel.innerText = clave;
        abm.appendChild(cartel);
        abm.appendChild(caja);
        abm.appendChild(salto);

    });

    return abm;

}

function validacion(){

    //let div = $("abm");
    let salto = document.createElement("br");
    let amb = generarAbm();
    let barra = document.createElement("select");
    let opciones = ['Veiculo','Auto','Camion'];
    let cancelar = document.createElement("button");
    let aceptar = document.createElement("button");

    cancelar.innerText = "cancelar";
    aceptar.innerText = "Aceptar";

    for(let i = 0; i < 3; i++){
        
        let valor = document.createElement("option");
        valor.setAttribute("value",(i+1).toString());
        valor.innerText = opciones[i];

        barra.appendChild(valor);
    }

    amb.appendChild(barra);
    amb.appendChild(salto);
    amb.appendChild(aceptar);
    amb.appendChild(cancelar);    

    let tipos = function(){
    
        let cartel1 = document.createElement("label");
        let cartel2 = document.createElement("label");

        let caja1 = document.createElement("input");
        let caja2 = document.createElement("input");
    
        caja1.setAttribute("type","text");
        caja2.setAttribute("type","text");

        caja1.setAttribute("id","caja1");
        caja2.setAttribute("id","caja2");


        switch(barra.value){
            case '1':
               amb.replaceChildren();
               amb = generarAbm();
               amb.appendChild(barra);
               amb.appendChild(salto);

               amb.appendChild(aceptar);
               amb.appendChild(cancelar);
                break;
            case '2':

                amb.replaceChildren();
                amb = generarAbm();
                amb.appendChild(barra);
                amb.appendChild(salto);

                
                cartel1.innerText = "Cantidad Puertas";
                cartel2.innerText= "Asientos";
                
                amb.appendChild(salto);
                amb.appendChild(cartel1);
                amb.appendChild(caja1);
                amb.appendChild(salto);
                amb.appendChild(cartel2);
                amb.appendChild(caja2);
                amb.appendChild(salto);


                amb.appendChild(aceptar);
                amb.appendChild(cancelar);
                break;
            case '3':

                amb.replaceChildren();
                amb = generarAbm();
                amb.appendChild(barra);

                cartel1.innerText = "Carga";
                cartel2.innerText= "Autonomia";

                amb.appendChild(cartel1);
                amb.appendChild(caja1);
                amb.appendChild(salto);
                amb.appendChild(cartel2);
                amb.appendChild(caja2);
                amb.appendChild(salto);

                amb.appendChild(aceptar);
                amb.appendChild(cancelar);

                break;

        }

    }

    //div.appendChild(amb);
    amb.style.display= 'block';
    spiner.style.display = 'none';

    barra.addEventListener("change", tipos);

    
    cancelar.addEventListener("click",()=>{
        let div = $("tabla");

        spiner.style.display = 'block';
        amb.style.display = 'none';
        div.style.display = 'block';


    });

    aceptar.addEventListener('click',()=> {

        spiner.style.display = 'block';

        let modelo = $('modelo');
        let anofav = $('anoFabricacion');
        let velmax = $('velMax');
        let exito = false;
        let mensaje;
        let auto;

        let id;

        switch(barra.value){
            case "1":
                mensaje="debe ser un Auto o un Camion";

            case "2":
                if(modelo.value != "" && (anofav.value != "" && !isNaN(anofav.value)) &&  (velmax.value != "" && !isNaN(velmax.value)) 
                && (caja1.value != "" && !isNaN(caja1.value)) && (caja2.value != "" && !isNaN(caja2.value))){

                    if(parseInt(anofav.value) > 1985 && parseInt(velmax.value) > 0 && parseInt(caja1.value) > 2 && parseInt(caja2.value) > 2){

                        auto = new clase.Auto(id,modelo.value,parseInt(anoFabricacion.value),parseInt(velmax.value),parseInt(caja1.value),parseInt(caja2.value));
                        exito = true;

                    }
                    else{

                         mensaje = "el año de fabricacion debe ser despues de 1985 y la velocidad maxima debe ser un numero mayor a 0\n°los autos deben tener mas de 2 asiento y 2 puertas ";
                    }


                }
                else{

                     mensaje = "corrobore si no quedo algun campo vacio o si lleno un campo numerico con letras";

                }
                break;
            case "3":
                if(modelo.value != "" && (anofav.value != "" && !isNaN(anofav.value)) &&  (velmax.value != "" && !isNaN(velmax.value)) 
                    && (caja1.value != "" && !isNaN(caja1.value)) && (caja2.value != "" && !isNaN(caja2.value))){
    
                        if(parseInt(anofav.value) > 1985 && parseInt(velmax.value) > 0 && parseInt(caja1.value) > 0 && parseInt(caja2.value) > 0){
    
                           auto = new clase.Camion(id,modelo.value,parseInt(anoFabricacion.value),parseInt(velmax.value),parseInt(caja1.value),parseInt(caja2.value));
                            exito = true;
    
                        }
                        else{
    
                             mensaje = "el año de fabricacion debe ser despues de 1985 y la velocidad maxima debe ser un numero mayor a 0\n°la autonomia y la carga de un camion no debe ser 0 ";
                        }
    
    
                    }
                    else{
    
                         mensaje = "corrobore si no quedo algun campo vacio o si lleno un campo numerico con letras";
    
                    }
                break;

        }

        if(exito){

            solicitudPost(auto);
        }
        else{

            alert(mensaje);
            spiner.style.display = 'none';
        }


    })


}

async function solicitudPost(nuevo){

    let tabla = $('tabla');
    let amb = $('abm');
    try{

        let respuesta = await fetch(api,{

            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers:{
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(nuevo),

        })

        if(!respuesta.ok){

            throw new Error(`Error en la solicitud: ${respuesta.status} - ${respuesta.statusText}`);

        }
        
        let salida = await respuesta.json();


        nuevo.id = salida.id;
        lista.push(nuevo);
        tabla.replaceChildren(cargarTabla());
        spiner.style.display = 'none';
        amb.style.display = 'none';
        tabla.style.display = 'block';
        validacion();


    

    }
    catch(Error){

        alert(Error)

    }

}

function modificarAuto(contenido, index){
    
    let tabla = $('tabla');
    let amb = generarAbm();
    let salto = document.createElement("br");
    let barra = document.createElement("select");
    let opciones = ['Veiculo','Auto','Camion'];
    let cancelar = document.createElement("button");
    let aceptar = document.createElement("button");
    let id = contenido.children[0].innerText;


    idsAmb.forEach((nombre,i) => {
        
        let text = $(nombre);

        text.value = contenido.children[i+1].innerText;

    });

    caja1.setAttribute("type","text");
    caja2.setAttribute("type","text");

    caja1.setAttribute("id","caja1");
    caja2.setAttribute("id","caja2");


    let tipos = function(){
    

        cartel1.innerText = "";
        cartel2.innerText = "";

        caja1.value = "";
        caja2.value = "";

        switch(barra.value){
            case '1':

               amb.removeChild(cartel1);
               amb.removeChild(cartel2);
               amb.removeChild(caja1);
               amb.removeChild(caja2);
               amb.removeChild(aceptar);
               amb.removeChild(cancelar);

        
               amb.appendChild(barra);
               amb.appendChild(salto);

               amb.appendChild(aceptar);
               amb.appendChild(cancelar);
                break;
            case '2':

                
                cartel1.innerText = "cantidad Puertas";
                cartel2.innerText= "asientos";
                
                amb.appendChild(salto);
                amb.appendChild(cartel1);
                amb.appendChild(caja1);
                amb.appendChild(salto);
                amb.appendChild(cartel2);
                amb.appendChild(caja2);
                amb.appendChild(salto);


                amb.appendChild(aceptar);
                amb.appendChild(cancelar);
                break;
            case '3':

                cartel1.innerText = "carga";
                cartel2.innerText= "autonomia";

                amb.appendChild(cartel1);
                amb.appendChild(caja1);
                amb.appendChild(salto);
                amb.appendChild(cartel2);
                amb.appendChild(caja2);
                amb.appendChild(salto);

                amb.appendChild(aceptar);
                amb.appendChild(cancelar);

                break;

        }

    }

    
    cancelar.innerText = "cancelar";
    aceptar.innerText = "Aceptar";
    
    amb.appendChild(barra);

    barra.addEventListener("change",tipos)


    for(let i = 0; i < 3; i++){

        
        let valor = document.createElement("option");
        valor.setAttribute("value",(i+1).toString());
        valor.innerText = opciones[i];

        barra.appendChild(valor);
    }


    spiner.style.display = "none";


    cancelar.addEventListener("click",()=>{

        amb.style.display = 'none';
        tabla.style.display = 'block';

    });

    aceptar.addEventListener("click",()=> {

        spiner.style.display = 'block';

        let modelo = $('modelo');
        let anofav = $('anoFabricacion');
        let velmax = $('velMax');
        let exito = false;
        let mensaje;
        let auto;



        switch(barra.value){
            case "1":
                mensaje="debe ser un Auto o un Camion";

            case "2":
                if(modelo.value != "" && (anofav.value != "" && !isNaN(anofav.value)) &&  (velmax.value != "" && !isNaN(velmax.value)) 
                && (caja1.value != "" && !isNaN(caja1.value)) && (caja2.value != "" && !isNaN(caja2.value))){

                    if(parseInt(anofav.value) > 1985 && parseInt(velmax.value) > 0 && parseInt(caja1.value) > 2 && parseInt(caja2.value) > 2){

                        auto = new clase.Auto(id,modelo.value,parseInt(anoFabricacion.value),parseInt(velmax.value),parseInt(caja1.value),parseInt(caja2.value));
                        exito = true;

                    }
                    else{

                         mensaje = "el año de fabricacion debe ser despues de 1985 y la velocidad maxima debe ser un numero mayor a 0\n°los autos deben tener mas de 2 asiento y 2 puertas ";
                    }


                }
                else{

                     mensaje = "corrobore si no quedo algun campo vacio o si lleno un campo numerico con letras";

                }
                break;
            case "3":
                if(modelo.value != "" && (anofav.value != "" && !isNaN(anofav.value)) &&  (velmax.value != "" && !isNaN(velmax.value)) 
                    && (caja1.value != "" && !isNaN(caja1.value)) && (caja2.value != "" && !isNaN(caja2.value))){
    
                        if(parseInt(anofav.value) > 1985 && parseInt(velmax.value) > 0 && parseInt(caja1.value) > 0 && parseInt(caja2.value) > 0){
    
                           auto = new clase.Camion(id,modelo.value,parseInt(anoFabricacion.value),parseInt(velmax.value),parseInt(caja1.value),parseInt(caja2.value));
                            exito = true;
    
                        }
                        else{
    
                             mensaje = "el año de fabricacion debe ser despues de 1985 y la velocidad maxima debe ser un numero mayor a 0\n°la autonomia y la carga de un camion no debe ser 0 ";
                        }
    
    
                    }
                    else{
    
                         mensaje = "corrobore si no quedo algun campo vacio o si lleno un campo numerico con letras";
    
                    }
                break;

        }

        if(exito){

            //solicitudPost(auto);
            solicitudPut(auto)
            .then(data => {

                spiner.style.display = 'none';
                lista[index] = auto;
                tabla.replaceChildren(cargarTabla());
                amb.style.display = 'none';
                tabla.style.display = 'block';

            }) 

            
        }
        else{

            alert(mensaje);
            spiner.style.display = 'none';
        }


    })

}

function solicitudPut(contenido){

    return new Promise((resolve,reject)=> {

        fetch(api,{

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: contenido.id
            
        })

        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })

        .then(data => resolve(data))
        .catch(error => reject(error));
    })




}


export function agregar(){

    let agregar = $('agregar');
    let tabla = $("tabla");

    agregar.addEventListener("click",()=>{

        tabla.style.display = 'none';
        validacion();

    })

}

