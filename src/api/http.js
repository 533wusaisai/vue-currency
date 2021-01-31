// vue + 请求拦截
// qs 转换为对象格式
import axios from "axios";
import qs from "qs";
// import { notification } from "ant-design-vue";
export function request(config) {
  let service = axios.create({
    // 全局变量路径 process.env.VUE_APP_API
    baseURL: "http://localhost:8080",
    timeout: 5000
  });
  // 响应之前拦截
  service.interceptors.request.use(
    function(config) {
      if (config.method === "post") {
        config.data = qs.stringify(config.data);
      } else if (config.method === "file") {
        config.method = "post";
        if (config.data && config.data instanceof Object) {
          let params = new FormData();
          for (let key in config.data) {
            params.append(key, config.data[key]);
          }
          config.data = params;
        }
      }
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );
  // 响应之后拦截
  service.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {
      return Promise.reject(error);
    }
  );
  return service.request(config).then(res => res.data);
}
