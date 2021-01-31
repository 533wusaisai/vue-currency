import Axios from "axios";
import { notification } from "ant-design-vue";
// let lazyImg = document.querySelector(".load");
export function request(url, method = "get", data = {}, config = {}) {
  // lazyImg.style.display = "block";
  return axiosRequest(url, method, data, config);
}
function axiosRequest(url, method, data, config) {
  if (method.toLowerCase() === "post") {
    if (data instanceof Object) {
      // 浏览器兼容 es6转es5
      let params = new URLSearchParams();
      for (let key in data) {
        params.append(key, data[key]);
      }
      data = params;
    }
  } else if (method.toLowerCase() === "file") {
    method = "post";
    if (data instanceof Object) {
      let params = new FormData();
      for (let key in data) {
        params.append(key, data[key]);
      }
      data = params;
    }
  }
  let axiosConfig = {
    url: url,
    method: method.toLowerCase(),
    data: data
  };
  // 上传文件进度条
  if (config instanceof Object) {
    for (let key in config) {
      axiosConfig[key] = config[key];
    }
  }
  return Axios(axiosConfig)
    .then(res => {
      // lazyImg.style.display = "none";
      return res.data;
    })
    .catch(error => {
      if (error) {
        notification.error({
          message: "请求失败",
          description: "请检查路径"
        });
      }
    });
}
