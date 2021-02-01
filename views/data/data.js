import { contenedorTabla, tableData } from "../../Js/selectores.js";
import { PATH_FLAG } from "../../config/config.js";

const body = (OptionCountries) => `
<div class="card">
    <div class="card-header">
        Datos Covid-19
    </div>
    <div class="card-body">
        <form>
            <div class="form-row">


                <div class="col">

                    <div class="input-group">
                        <select class="custom-select" id="selectDataStatus"
                            aria-label="Example select with button addon">
                            <option selected value="Active">Activos</option>
                            <option value="Confirmed">Confirmados</option>
                            <option value="Deaths">Muertos</option>
                            <option value="Recovered">Recuperados</option>
                        </select>
                    </div>

                </div>
                <div class="col">
                    <div class="input-group">
                        <div class="input-group-append">
                            <span class="input-group-text"><img id="flagSelect" src="${PATH_FLAG}/cl.png"></span>
                        </div>
                        <select class="custom-select" id="selectDataCountries"
                            aria-label="Example select with button addon">
                            ${OptionCountries}
                        </select>
                    </div>
                </div>
                <div class="col">

                    <div class="btn-group btn-group-toggle align-middle" data-toggle="buttons">
                        <label class="btn btn-info active">
                            <input type="radio" name="options" id="forDay" checked=""> Por día
                        </label>
                        <label class="btn btn-info">
                            <input type="radio" name="options" id="comulative"> Acomulado
                        </label>
                        </label>
                    </div>
                    
                </div>
            </div>
        </form>
      <hr />
        <form>
            <div class="form-row">
                <div class="col-3">
                    <h3>
                        Situación de <span class="text-capitalize" id="lblCoutryStatus">  </span>
                       <hr />
                    </h3>

                    <br />
                    <h2>
                        <span id="lblTotalConfirmed">  </span>
                        <br /> <small class="text-muted">Casos Confirmados</small>
                    </h2>
                    <br /><br />
                    <h2>
                        <span id="lblTotalDeaths">  </span>
                        <br /> <small class="text-muted">Muertes</small>
                    </h2>

                </div>
                <div class="col-9">

                    <div id="ChartCovid">
                        <canvas id="myChart" width="200" height="120px"></canvas>
                    </div>

                </div>
            </div>
        </form>
    </div>
</div>

`;

const cargaContenedor = (html) => {
  contenedorTabla.innerHTML = html;
};
export const iniciarData = (selectOption) => {
  console.log("íniciar");
  cargaContenedor(body(selectOption));
};
