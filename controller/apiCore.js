import { Api } from "../model/api.js";
export const FactoryApi = function () {};

FactoryApi.prototype.getData = async (request) => {
  let data = await Api.get(request);
  return data;
};

FactoryApi.prototype.setUrl = (endPoint, request) => {
  console.log(request);
  let url;

  let { country, status } = request;

  switch (endPoint) {
    case "summary":
      url = "/summary";
      break;
    case "countries":
      url = "/countries";
      break;
    case "TotalCountries":// /total/dayone/country/chile
      url = `/total/dayone/country/${country}`;
      break;
    case "dayOneByStatus": // /dayone/country/{{country}}/status/{{status}}
      url = `/dayone/country/${country}/status/${status}`;
      break;
    case "dayOneByAllStatus": // /dayone/country/{{country}
      url = `/dayone/country/${country}/status/${status}`;
      break;
    case "worldTotalWIP": //  /world/total
      url = `/world/total`;
      break;
  }
  return url;
};
