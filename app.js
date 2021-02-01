
import { iniciar } from "./views/table/table.js"
import { EventosTable } from "./controller/table.js"
import { EventosData } from "./controller/data.js"
import { btnVerTabla, btnVerDatos } from "./Js/selectores.js";


const iniciaTabla = (e) =>{
    e.preventDefault();
    // console.log('carga tabla')
     iniciar()  
    let evento= new EventosTable()
}
const iniciaDatos= (e) =>{
    e.preventDefault();
    let evento= new EventosData()
}



btnVerTabla.addEventListener("click", iniciaTabla);
btnVerDatos.addEventListener("click", iniciaDatos)

const menu = document.querySelector('#menuSuperior');

if(menu.children.item(0).children.item(0).classList.contains("active")){ 
    iniciar()
    let evento= new EventosTable()
} else {
   // iniciaDatos();
    let evento= new EventosData()    
}






