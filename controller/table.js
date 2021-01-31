import { FactoryApi } from "../controller/apiCore.js";
import {  contenedorTabla } from "../Js/selectores.js";
import { cargaTabla } from "../views/table/table.js";
import { HandleData } from "../Js/handleData.js";


const handleData = new HandleData("", "");
let country = ""
let status = "";
let queryType = "";
let data = null;
let txtStatus= 0;

const factory = new FactoryApi();

let request = {
  country: "",
  status: "",
};
let params = {
  from: "2020-03-01T00:00:00Z",
  to: "2020-04-01T00:00:00Z",
};

export class EventosTable {
  constructor() {
    this.initEvento();
    this.initToggle();
    this.initTable();
   
  }
  initEvento() {
    eventListeners();
    function eventListeners() {
      contenedorTabla.addEventListener("click", contenedorTablaClick);
      contenedorTabla.addEventListener("change", txtBusquedaTableChange);
    
     // contenedorTabla.addEventListener("focusin", txtBusquedaTableChange);
      // contenedorTabla.addEventListener("mouseup", txtBusquedaTableChange);
    }
  }
 
  async initTable() {
    const { existData } = handleData;
  
    if (existData("summary")) {
      data = handleData.getData("summary");
    } else {
      let url = setUrl("summary", request);
      data = await get(url);
      console.log(data);
    }
  }

  initToggle() {
    $(".btn-info").click(function () {
      $(".btn-info").removeClass("active");
      $(this).addClass("active");
    });
  }
}

function txtBusquedaTableChange(e) {
  e.preventDefault();
 // debugger;
  const { value, id } = e.target;
  if (id === "txtBusquedaTable") {
    //value = keyAlphaNumeric(e)? value + e.key: value;
    country = value ? value : "";
    //let dataSummary = handleData.getData("summary");
    //let filter = country.trim() !== "" ? country : "";
    //cargaTabla(dataSummary, filter);
 //   e.target.focus()
    
  }
}
const keyAlphaNumeric = (event) =>{
  var keyCode = event.keyCode || event.which
  // Don't validate the input if below arrow, delete and backspace keys were pressed 
  if (keyCode == 8 || (keyCode >= 35 && keyCode <= 40)) { // Left / Up / Right / Down Arrow, Backspace, Delete keys
      return;
  }
  
  var regex = new RegExp("^[a-zA-Z0-9]+$");
  var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);

  if (!regex.test(key)) {
      event.preventDefault();
      return false;
  }
  return true
}
function contenedorTablaClick(e) {
  e.preventDefault();

  const { name, value, tagName, id } = e.target;
  country = country ? country : "";

  if (tagName === "LABEL") {
    status = e.target.children.options.id;
    console.log(status);
  }
  if (id === "btnBusquedaTable") {
    let dataSummary =handleData.getData("summary")
    let filter= country.trim() !== "" ? country : ""
    cargaTabla(dataSummary, filter)
    
    //llamarApi();
  }
  // if(e.target.classList.contains('borrar-curso') ) {
  //      // e.target.parentElement.parentElement.remove();
  //      const curso = e.target.parentElement.parentElement;
  //      const cursoId = curso.querySelector('a').getAttribute('data-id');

  //      // Eliminar del arreglo del carrito
  //      articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

  //      carritoHTML();
  // }
}

const setUrl = (endPoint, request) => {
  let url = factory.setUrl(endPoint, request);
  return url;
};

const get = async (request) => {
  const { setData, getData } = handleData;
  let data = await factory.getData(request);
  handleData.key = "summary";
  handleData.value = JSON.stringify(data);
  setData();

  let dataForCountry = getData("summary");
  const { Countries } = dataForCountry;
  dataForCountry = countries(Countries);
  handleData.key = "countries";
  handleData.value = JSON.stringify(dataForCountry);
  setData();
  return data;
};
const countries = (countries) =>
  countries.map((data) => ({
    countryName: data.Country,
    slug: data.Slug,
    countryCode: data.countryCode
  }));

// const getSandwichOrdersByProperty = ({ type = ''}) => sandwichOrders.map(
//   sandwichOrder =>
//     ({
//       type: sandwichOrder[type],
//       protein: sandwichOrder.protein
//     })
// )
function llamarApi() {
  queryType = "summary";
  setUrl(queryType, request);

  // if (!country) {
  //   setUrl("summary", request);
  // } else if (!status) {
  //   request.country = country;
  //   request.status = status;
  //   setUrl("dayOneByStatus", request);
  // } else {
  //   request.country = country;
  //   setUrl("dayOneByAllStatus", request);
  // }
}
