import { contenedorTabla, tableData } from "../../Js/selectores.js";
import { EventosTable } from "../../controller/table.js";
import { FLAG_W20, FLAG_W80, PATH_FLAG } from "../../config/config.js";
let txtVal = "";

// const content = `
// <nav class="navbar navbar-expand-lg navbar-light bg-light">

//   <div class="collapse navbar-collapse" id="navbarSupportedContent">
//     <ul class="navbar-nav mr-auto">

//       <li class="nav-item">
//             <div class="btn-group btn-group-toggle" data-toggle="buttons">
//                 <label class="btn btn-info active">
//                     <input type="radio" name="options" id="confirmed" checked> Confirmado
//                 </label>
//                 <label class="btn btn-info">
//                     <input type="radio" name="options" id="recovered"> Recuperado
//                 </label>
//                 <label class="btn btn-info">
//                     <input type="radio" name="options" id="deaths"> Muertos
//                 </label>
//                 <label class="btn btn-info">
//                 <input type="radio" name="options" id="all"> Todos
//             </label>
//             </div>
//         </li>
//     </ul>
//     <form class="form-inline my-10 my-lg-0">
//       <input id="txtBusquedaTable" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
//       <button id="btnBusquedaTable" class="btn btn-outline-success my-2 my-sm-0"  type="Button">Search</button>
//     </form>
//   </div>
// </nav>

// <div class="container" style="padding-top: 10px;">
// <table id="tableData" class="table">
//   <thead>
//     <tr>
//       <th scope="col">#</th>
//       <th scope="col">First</th>
//       <th scope="col">Last</th>
//       <th scope="col">Handle</th>
//     </tr>
//   </thead>
//   <tbody>
//   </tbody>
// </table>
// </div>
// `;

let inicio = (filter) => {
  return `
<nav class="navbar navbar-expand-lg navbar-light bg-light">

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
   
    <form class="form-inline my-10 my-lg-0">
      <input value="" id="txtBusquedaTable" class="form-control mr-sm-2" autocomplete="off" type="text">
      <button id="btnBusquedaTable" class="btn btn-outline-success my-2 my-sm-0"  type="Button">Search</button>
    </form>
  </div>
</nav>
<div id="resultadoTabla"> </div>
`;
};

export const cargaTabla = (data, filter) => {
  let { Countries, Global } = data;
  if (!!filter) {
    let filterUpper = filter.toUpperCase();
    Countries = Countries.filter(
      (country) => country.Country.toUpperCase().indexOf(filterUpper) > -1
    );
  }

  if (!!Countries) {
    Countries = Array.isArray(Countries)
      ? sortByTotalConfirmed(Countries)
      : JSON.parse(`[${JSON.stringify(Countries)}]`);
  }
  let body = getBody(Countries, Global);
  let table = setearTabla(body);
  let html = inicio(filter.trim()) + table;

  //contenedorTabla.innerHTML = html;
  document.getElementById(
    "resultadoTabla"
  ).innerHTML = table;

  //let evento = new EventosTable();
};

const sortByTotalConfirmed = (Countries) =>
  Countries.sort((a, b) => (a.TotalConfirmed < b.TotalConfirmed ? 1 : -1));

const getBody = (Countries, Global) => {
  let dato = "";

  dato = `
  <tr style="font-weight: bold">
    <td >
      GLOBAL
    </td >
      <td>${Global.TotalConfirmed.toLocaleString('es-CL')}</td>
      <td>${Global.TotalDeaths.toLocaleString('es-CL')} </td>
      <td>${Global.TotalRecovered.toLocaleString('es-CL')} </td>
      <td><div class="container">
             
      <p>NewConfirmed : ${Global.NewConfirmed.toLocaleString('es-CL')}<p>
      <p>NewDeaths : ${Global.NewDeaths.toLocaleString('es-CL')}<p>
      <p>NewRecovered : ${Global.NewRecovered.toLocaleString('es-CL')}<p>
      </div>
</td>
  </tr> 
    
`;

  console.time();
  if (!Countries) {
    return `<tr>
              <td>No se encontro datos para ${txtVal} </td>
          </tr>`;
  }
  Countries.forEach((element) => {
    let flag = element.CountryCode.toLowerCase();
    dato += `
      <tr>
        <td>
          <img src="${PATH_FLAG}/${flag}.png"> ${element.Country}
        </td>
         <td>${element.TotalConfirmed.toLocaleString('es-CL')}</td>
         <td>${element.TotalDeaths.toLocaleString('es-CL')} </td>
         <td>${element.TotalRecovered.toLocaleString('es-CL')} </td>
         <td><div class="container">
             
                <p>NewConfirmed : ${element.NewConfirmed.toLocaleString('es-CL')}<p>
                <p>NewDeaths : ${element.NewDeaths.toLocaleString('es-CL')}<p>
                <p>NewRecovered : ${element.NewRecovered.toLocaleString('es-CL')}<p>
            </div>
          </td>
      </tr> 
    `;
  });
  console.timeEnd();
  return dato;
};

const setearTabla = (body) => {
  return `
  <table id="tableData" class="table table table-striped table-bordered">
  <thead>
    <tr>
      <th scope="col">Country</th>
      <th scope="col">Total Confirmed</th>
      <th scope="col">Total Deaths</th>
      <th scope="col">Total Recovered</th>
      <th scope="col">Last Info</th>
    </tr>
  </thead>
  <tbody>
  ${body}
  </tbody>
</table>
`;
};

export const iniciar = () => {
  console.log("íniciar");
  contenedorTabla.innerHTML = inicio('');
};

