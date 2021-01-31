import { contenedorTabla, tableData } from "../../Js/selectores.js";
import { PATH_FLAG } from "../../config/config.js";

const body = (OptionCountries) => `

<div class="card">
  <div class="card-header">
    Quote
  </div>
  <div class="card-body">
  <form>
  <div class="form-row">
    <div class="col">

          <div class="input-group">
                  <select class="custom-select" id="selectDataStatus" aria-label="Example select with button addon">
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
                <select class="custom-select" id="selectDataCountries" aria-label="Example select with button addon">
                      ${OptionCountries}
                </select>
            </div>
    </div>
  </div>
</form>
  </div>
  <div id="ChartCovid">
    <canvas id="myChart" width="200" height="80px"></canvas>
  </div>
</div>

</div>`;

const cargaContenedor = (html) => {
  contenedorTabla.innerHTML = html;
};
export const iniciarData = (selectOption) => {
  console.log("íniciar");
  cargaContenedor(body(selectOption));
};
