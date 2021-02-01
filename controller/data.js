import { contenedorData } from "../Js/selectores.js";
import { FactoryApi } from "../controller/apiCore.js";
import { HandleData } from "../Js/handleData.js";
import { iniciarData } from "../views/data/data.js";
import { PATH_FLAG } from "../../config/config.js";
import { showSpinner,hiddenSpinner } from "../model/api.js"

const handleData = new HandleData("", "");
const factory = new FactoryApi();

let countries;
let request = {
  country: "",
  status: "",
};
function FactoryDataChart() {

  this.createLabelsChart = (data) => {
    let LabelsChart;
    LabelsChart = data.map((item) => item.Date);
    return LabelsChart;
  };
  this.createDataChart = (type, data) => {
    let dataChart;

    switch (type) {
      case "Active":
        dataChart = data.map((value) => value.Active);
        // dataChart = data.map((value,index,array)=> value.Active - (index === 0 ? 0 : array[index -1].Active))
        break;
      case "Confirmed":
        dataChart = data.map((value, index, array) =>
          value.Confirmed - (index === 0 ? 0 : array[index - 1].Confirmed) < 0
            ? 0
            : value.Confirmed - (index === 0 ? 0 : array[index - 1].Confirmed)
        );
        break;
      case "Deaths":
        dataChart = data.map((value, index, array) =>
          value.Deaths - (index === 0 ? 0 : array[index - 1].Deaths) < 0
            ? 0
            : value.Deaths - (index === 0 ? 0 : array[index - 1].Deaths)
        );
        break;
      case "Recovered":
        dataChart = data.map((value, index, array) =>
          value.Recovered - (index === 0 ? 0 : array[index - 1].Recovered) < 0
            ? 0
            : value.Recovered - (index === 0 ? 0 : array[index - 1].Recovered)
        );
        break;
    }

    return dataChart;
  };
  this.createDataChartCom = (type, data) => {
    let dataChart;

    switch (type) {
      case "Active":
        dataChart = data.map((value) => value.Active);
        break;
      case "Confirmed":
        dataChart = data.map((value) => value.Confirmed);
        break;
      case "Deaths":
        dataChart = data.map((value) => value.Deaths);
        break;
      case "Recovered":
        dataChart = data.map((value) => value.Recovered);
        break;
    }

    return dataChart;
  };

  this.createLabelChart = (type, data) => {
    let labelChart;

    switch (type) {
      case "Active":
        labelChart = "Casos Activos";
        break;
      case "Confirmed":
        labelChart = "Casos Confirmados";
        break;
      case "Deaths":
        labelChart = "Muertos";
        break;
      case "Recovered":
        labelChart = "Recuperados";
        break;
    }

    return labelChart;
  };

  this.totalDeaths = (data) => {
    let res;
    res = data.reduce((acc, value) => acc + value , 0 )
    return res;
  };
  this.totalConfirmed = (data) => {
    let res;
    res = data.reduce((acc, value) => acc + value , 0 )
    
    return res;
  };
}

export class EventosData {
  constructor() {
    this.initEvento();
    this.initCountries();
  }
  initEvento() {
    eventListeners();
    function eventListeners() {
      contenedorData.addEventListener("change", selectChange);
    }
  }
  async initCountries() {
    let data = await getData("summary");
    const { Countries } = data;
    let listCountries = getCountries(Countries);
    let HtmlCountries = ChargeSelectCountries(listCountries);
    iniciarData(HtmlCountries);

    request.country = "chile";
    data = await getData("TotalCountries");

    var factory = new FactoryDataChart();
    let labelsChart = factory.createLabelsChart(data);
    let dataChart = factory.createDataChart(
      document.querySelector("#selectDataStatus").value,
      data
    );
    let labelChart = factory.createLabelChart(
      document.querySelector("#selectDataStatus").value,
      data
    );
    setChart(labelsChart, dataChart, labelChart);
  }
}

const ChargeSelectCountries = (listCountries) => {
  let htmlOption = "",
    selected;
  listCountries.map((element) => {
    selected = element.countryCode === "CL" ? "selected" : "";
    htmlOption += ` <option value="${element.countryCode}" ${selected}>${element.countryName}</option> `;
  });
  return htmlOption;
};

const selectChange = async (e) => {
  e.preventDefault();
  showSpinner();
  console.log(e);
  let { id } = e.target;

  if (
    id === "selectDataStatus" ||
    id === "selectDataCountries" ||
    id === "forDay" ||
    id === "comulative"
  ) {
    const factory = new FactoryDataChart();

    const {
      createLabelsChart,
      createDataChart,
      createDataChartCom,
      createLabelChart,
      totalConfirmed,
      totalDeaths
    } = factory;

    let countryCode = document.querySelector("#selectDataCountries").value;
    let countryName = document.querySelector("#selectDataCountries").selectedOptions[0].text.toLowerCase();
    let forDay = document.querySelector("#forDay").checked;
    let selectDataStatus = document.querySelector("#selectDataStatus").value;
    let comulative = document.querySelector("#comulative").checked;

    document.getElementById(
      "flagSelect"
    ).src = `${PATH_FLAG}/${countryCode}.png`;

    request.country = countryName
    

    let data = await getData("TotalCountries");
    console.log(data);

    let labelsChart = createLabelsChart(data);
    let dataChart = forDay
      ? createDataChart(selectDataStatus, data)
      : createDataChartCom(selectDataStatus, data);
    let labelChart = createLabelChart(selectDataStatus, data);
    let confirmed 
    document.getElementById(
        "lblCoutryStatus"
      ).innerHTML = countryName;

      document.getElementById(
        "lblTotalConfirmed"
      ).innerHTML = totalConfirmed(createDataChart("Confirmed", data));

      document.getElementById(
        "lblTotalDeaths"
      ).innerHTML = totalDeaths(createDataChart("Deaths", data));
    
    setChart(labelsChart, dataChart, labelChart);
    hiddenSpinner()
  }
};

const getCountries = (countries) =>
  countries.map((data) => ({
    countryName: data.Country,
    slug: data.Slug,
    countryCode: data.CountryCode,
  }));

const getData = async (dataType) => {
  const { existData, getData, setData } = handleData;
  let data;
  if (existData(dataType)) {
    data = await getData(dataType);
  } else {
    let url = setUrl(dataType, request);
    data = await factory.getData(url);
    setData(dataType, data);
  }
  return data;
};
const setUrl = (endPoint, request) => {
  let url = factory.setUrl(endPoint, request);
  return url;
};

const setChart = (labels, data, label) => {
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels, //["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: label,
          data: data, //[12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
};
