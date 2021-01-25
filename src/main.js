import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// import Antd from "ant-design-vue";
// Vue.use(Antd);
import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Form,
  Input
} from "ant-design-vue";
// 引入注册权限控制
import Authorized from "@/components/Authorized.vue"; // 权限
// 引入css文件样式 使用less
import "ant-design-vue/dist/antd.less";
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Form);
Vue.use(Input);
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2348052_kqmrswa2wr.js"
});
Vue.config.productionTip = false;
Vue.component("Authorized", Authorized);
Vue.component("IconFont", IconFont);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
