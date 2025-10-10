import axios from "axios";

//Component
import { ShowToast } from "../components/toast"
//Constant
import {
  asyncStorageGet,
  readJsonValueAsync,
  STORE_KEY,
} from "../utils/asyncStorage";
import { API_REQUEST_METHOD, toastTypes } from "../utils/app-enum";
import { globalNavigate } from "../utils/helper-navigation";
import { APP } from "../utils/constants";
import { SCREEN } from "../utils/screen-name";
import LocalizeText from "../utils/text-localize";

const DOMAIN = {
  //Local server
  // url: 'http://192.168.31.230:3000',

  //Staging server
  // url: "https://husm-api-production-66ae.up.railway.app",

  //Live server
  url: "https://us-central1-husm-mongo-api.cloudfunctions.net",
};

const API = {
  baseURL: `${DOMAIN.url}/api/`,
  baseImageURL: `${DOMAIN.url}/api/`,
  driveBaseURL: `${DOMAIN.url}/api/v1/`,
  parentFolderId: "1sytlh-UpHHGvlvXPM4olRl_IycSFtslv", // Copy of Fado
};

const REQ_TYPE = {
  reqPostWHeader: "postWHeader",
  reqGet: "reqGet",
  reqGetWHeader: "reqGetWHeader",
};

const TRAIL_URLS = {
  //Sheet
  getSheetData: "v3/sheet/getAllRows",
  startConnection: "v3/users/startConnection",

  // Monthly
  entriesSummery: "v3/monthly/summery",
  monthlyFund: "v3/monthly/funds",
  addMonthlyFund: "v3/monthly/add",
  monthlyExpenses: "v3/monthly/expenses",
  monthlyStatistics: "v3/monthly/statistics",
  addMonthlyExpenses: "v3/monthly/expenses/add",

  //Gaushala
  gausalaSummery: "v3/gaushala/summery",
  gausalaFund: "v3/gaushala/funds",
  gausalaExpenses: "v3/gaushala/expenses",
  gausalaStatistics: "v3/gaushala/statistics",
  addGaushalaFund: "v3/gaushala/add",
  updateGaushalaFund: "v3/gaushala/update",
  addGaushalaExpenses: "v3/gaushala/expenses/add",

  //Generic
  genericGetAll: "v3/generic/get",
  genericSummery: "v3/generic/summery",
  genericAdd: "v3/generic/add",
  genericUpdate: "v3/generic/update",
  genericStatistics: "v3/generic/statistics",
};

var postRequestController = new AbortController();
var getRequestController = new AbortController();

const commonHeader = async (userToken) => {
  var fcmToken = await asyncStorageGet(STORE_KEY.FCM_TOKEN);
  var deviceInfo = await readJsonValueAsync(STORE_KEY.DEVICE_INFO);

  var headerData = {
    device_type: deviceInfo.deviceType,
    fcm_token: fcmToken,
    device_name: deviceInfo.deviceName,
    device_version: deviceInfo.deviceModel,
    software_version: deviceInfo.systemVersion,
    app_version: deviceInfo.appVersion,
  };

  if (userToken) {
    headerData.Authorization = `Bearer ${userToken}`;
  }
  return headerData;
};

const postRequest = async (trailUrl, data, headers) => {
  const apiUrl = API.baseURL + trailUrl;
  const localHeader = await commonHeader();
  var headerData = {
    ...headers,
    ...localHeader,
  };

  if (APP.SHOW_LOG) {
    console.log("=====API======");
    console.log("URL:", apiUrl);
    console.log("PARAM", JSON.stringify(data));
    console.log("METHOD:", API_REQUEST_METHOD.POST);
    console.log("HEADERS:", headerData);
    console.log("==============");
  }

  return await axios({
    method: API_REQUEST_METHOD.POST,
    data: data,
    url: apiUrl,
    headers: headerData,
    signal: postRequestController.signal,
  })
    .then((res) => res.data)
    .catch((error) => handleError(error, apiUrl, true));
};

const authPostRequest = async (
  trailUrl,
  data,
  avoidNavigation = false,
  avoidErrorMessage = false
) => {
  if (postRequestController) {
    postRequestController = new AbortController();
  }
  var userToken = await asyncStorageGet(STORE_KEY.LOGIN_TOKEN);
  const headerData = await commonHeader(userToken);

  const apiUrl = API.baseURL + trailUrl;
  if (APP.SHOW_LOG) {
    console.log("=====API======");
    console.log("URL:", apiUrl);
    console.log("PARAM", JSON.stringify(data));
    console.log("HEADERS", JSON.stringify(headerData));
    console.log("METHOD:", API_REQUEST_METHOD.POST);
    console.log("==============");
  }

  return await axios({
    method: API_REQUEST_METHOD.POST,
    data: data,
    url: apiUrl,
    headers: headerData,
    signal: postRequestController.signal,
  })
    .then((res) => res.data)
    .catch((error) =>
      handleError(error, apiUrl, avoidNavigation, avoidErrorMessage)
    );
};

const authGetRequest = async (trailUrl, params) => {
  const apiUrl = API.baseURL + trailUrl;

  var userToken = await asyncStorageGet(STORE_KEY.LOGIN_TOKEN);
  const headerData = await commonHeader(userToken);

  if (APP.SHOW_LOG) {
    console.log("=====API======");
    console.log("URL:", apiUrl);
    console.log("METHOD:", API_REQUEST_METHOD.GET);
    console.log("PARAM:", params ? params : `No Param`);
    console.log("HEADERS:", headerData);
    console.log("==============");
  }

  return await axios({
    method: API_REQUEST_METHOD.GET,
    data: params,
    url: apiUrl,
    headers: headerData,
  })
    .then((res) => res.data)
    .catch((e) => handleError(e, apiUrl, false));
};

const getRequest = async (trailUrl, avoidNavigation = false) => {
  let apiUrl = API.baseURL + trailUrl;
  if (trailUrl.includes("google")) {
    apiUrl = API.driveBaseURL + trailUrl;
  }

  var userToken = await asyncStorageGet(STORE_KEY.LOGIN_TOKEN);
  const headerData = await commonHeader(userToken);
  const params = null;

  if (APP.SHOW_LOG) {
    console.log("=====API======");
    console.log("URL:", apiUrl);
    console.log("METHOD:", API_REQUEST_METHOD.GET);
    console.log("PARAM:", params ? params : `No Param`);
    console.log("HEADERS:", headerData);
    console.log("==============");
  }

  return await axios({
    method: API_REQUEST_METHOD.GET,
    data: params,
    url: apiUrl,
    headers: headerData,
  })
    .then((res) => res.data)
    .catch((e) => handleError(e, apiUrl, avoidNavigation));
};

const postRequestWithHeader = async (
  trailUrl,
  data,
  avoidNavigation = false,
  isUpdate = false
) => {
  if (postRequestController) {
    postRequestController = new AbortController();
  }
  var userToken = await asyncStorageGet(STORE_KEY.LOGIN_TOKEN);
  const headerData = await commonHeader(userToken);

  const apiUrl = API.baseURL + trailUrl;
  if (APP.SHOW_LOG) {
    console.log("=====API======");
    console.log("URL:", apiUrl);
    console.log("PARAM", JSON.stringify(data));
    console.log("HEADERS", JSON.stringify(headerData));
    console.log(
      "METHOD:",
      isUpdate == true ? API_REQUEST_METHOD.PUT : API_REQUEST_METHOD.POST
    );
    console.log("==============");
  }

  return await axios({
    method: isUpdate == true ? API_REQUEST_METHOD.PUT : API_REQUEST_METHOD.POST,
    data: data,
    url: apiUrl,
    headers: headerData,
    signal: postRequestController.signal,
  })
    .then((res) => res.data)
    .catch((error) => handleError(error, apiUrl, avoidNavigation));
};

const deleteRequest = async (trailUrl, params, avoidToast = false) => {
  let apiUrl = API.baseURL + trailUrl;
  if (trailUrl.includes("google")) {
    apiUrl = API.driveBaseURL + trailUrl;
  }

  var userToken = await asyncStorageGet(STORE_KEY.LOGIN_TOKEN);
  const headerData = await commonHeader(userToken);

  if (APP.SHOW_LOG) {
    console.log("=====API======");
    console.log("URL:", apiUrl);
    console.log("METHOD:", API_REQUEST_METHOD.DELETE);
    console.log("PARAM:", params ? params : `No Param`);
    console.log("HEADERS:", headerData);
    console.log("==============");
  }

  return await axios({
    method: API_REQUEST_METHOD.DELETE,
    data: params,
    url: apiUrl,
    headers: headerData,
  })
    .then((res) => res.data)
    .catch((e) => handleError(e, apiUrl, false, avoidToast));
};

const multiFormRequestWithHeader = async (trailUrl, data, isUpdate) => {
  var userToken = await asyncStorageGet(STORE_KEY.LOGIN_TOKEN);
  const localHeader = await commonHeader(userToken);
  var headerData = {
    "Content-Type": "multipart/form-data",
    ...localHeader,
  };

  var methodName = "POST";
  if (isUpdate == true) {
    methodName = "PUT";
  }

  let apiUrl = API.baseURL + trailUrl;
  if (trailUrl.includes("google")) {
    apiUrl = API.driveBaseURL + trailUrl;
  }

  if (APP.SHOW_LOG) {
    console.log("=====API======");
    console.log("URL:", apiUrl);
    console.log("PARAM", JSON.stringify(data));
    console.log("HEADERS", JSON.stringify(headerData));
    console.log("METHOD:", methodName);
    console.log("==============");
  }

  const config = {
    method: methodName,
    headers: headerData,
    body: data,
  };

  return await fetch(apiUrl, config)
    .then((response) => response.json())
    .then((result) => {
      if (result.code == 200) {
        return result;
      } else {
        console.log("result.code", result.code);
        if (
          //result.code == 400 ||
          result.code == 401 // || errorResponse.status == 404
        ) {
          setTimeout(() => {
            // ShowToast(toastTypes.error, LocalizeText.alerts.session_expired);
          }, 200);
          globalNavigate(SCREEN.LandingScreen, "RESET");
        }
        return result;
      }
    })
    .catch((error) => handleError(error, apiUrl, false));
};

const customAPI = async (
  api_url = "",
  data = {},
  method = "POST",
  headers = {}
) => {
  const apiUrl = api_url;
  var headerData = {
    // authorization: `Bearer ${APP.STRIPE_SECRETE_KEY}`,
    ...headers,
  };

  if (APP.SHOW_LOG) {
    console.log("=====API======");
    console.log("URL:", apiUrl);
    console.log("PARAM", JSON.stringify(data));
    console.log("HEADERS", JSON.stringify(headerData));
    console.log("METHOD:", method);
    console.log("==============");
  }

  return await axios({
    method: method,
    url: apiUrl,
    data: data,
    headers: headerData,
  })
    .then((res) => res.data)
    .catch((error) => handleError(error, apiUrl));
};

const cancelLastRequest = async (type) => {
  if (type === REQ_TYPE.reqPostWHeader) {
    console.log("*** Post with header CANCELING:", postRequestController);
    postRequestController.abort("Cancel previous request.");
    console.log("*** End of abort");
  } else if (type === REQ_TYPE.reqGetWHeader) {
    console.log("*** GET with header CANCELING:", getRequestController);
    getRequestController.abort();
  }
};

const handleError = (e, error, avoidNavigation, avoidErrorMessage = false) => {
  if (APP.SHOW_LOG) {
    console.log("Error handler:*****", JSON.stringify(e));
  }
  const errorResponse = e.response;
  if (APP.SHOW_LOG) {
    console.log("API Error:*****", JSON.stringify(errorResponse?.data));
  }
  if (errorResponse) {
    if (avoidNavigation == false) {
      console.log("Check for session");
      if (errorResponse.status == 401) {
        setTimeout(() => {
          console.log("ERROR");
          ShowToast(toastTypes.error, LocalizeText.alerts.session_expired);
        }, 200);
        globalNavigate(SCREEN.LandingScreen, "RESET");
        return;
      }
    }
    if (avoidErrorMessage == false) {
      let errorMessage = errorResponse.data?.message;
      if (errorMessage == null) {
        errorMessage = errorResponse.data?.errorMessage;
      }

      ShowToast(toastTypes.error, errorMessage);
      return e;
    }
    return;
  }

  if (e.message) {
    ShowToast(toastTypes.error, e.message);
  }
  return e; //console.log(finalMessage, e);
};

export {
  API,
  TRAIL_URLS,
  REQ_TYPE,
  authGetRequest,
  getRequest,
  postRequest,
  postRequestWithHeader,
  deleteRequest,
  multiFormRequestWithHeader,
  customAPI,
  cancelLastRequest,
  authPostRequest,
};
