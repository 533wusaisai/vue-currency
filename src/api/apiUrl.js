import config from "./config";

const API_URL = {
  loginIn: `${config.baseUrl}/login.json`,
  loginOut: `${config.baseUrl}/loginOut.json`
};

export default API_URL;
