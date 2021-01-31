import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 时间处理
import moment from "moment";
import "moment/locale/zh-cn";

// mock 数据
// eslint-disable-next-line no-unused-vars
import mock from "../mock/index";
Vue.filter("formDate", val => {
  return moment(val).format("dddd");
});
import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Form,
  Input,
  Checkbox,
  Dropdown,
  Table,
  Tag,
  Divider,
  Alert
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
Vue.use(Checkbox);
Vue.use(Dropdown);
Vue.use(Table);
Vue.use(Tag);
Vue.use(Divider);
Vue.use(Alert);

// 图标处理
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2348052_kqmrswa2wr.js"
});
Vue.component("IconFont", IconFont);

Vue.config.productionTip = false;
//权限注册
Vue.component("Authorized", Authorized);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
