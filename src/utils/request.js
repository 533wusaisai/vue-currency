import axios from "axios";
import { notification } from "ant-design-vue";

// jsx
// 安装 npm install @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props
// .babelrc {'presets': ['@vue/babel-preset-jsx']}
function request(options) {
  return axios(options)
    .then(res => {
      return res;
    })
    .catch(error => {
      const {
        response: { status, statusText }
      } = error;
      notification.error({
        message: status,
        description: statusText
      });
      return Promise.reject(error);
    });
}

export default request;
