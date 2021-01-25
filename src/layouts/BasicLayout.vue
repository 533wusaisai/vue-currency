<template>
  <div :class="[`nav-theme-${themeNav}`, `nav-theme-${themeLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        v-if="themeLayout === 'left'"
        v-model="collapsed"
        collapsible
        :trigger="null"
        :theme="themeNav"
      >
        <div class="logo">
          <!-- <Logo /> -->
        </div>
        <SiderMenu :theme="themeNav" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon @click="handleClick" class="icon" :type="menuType"></a-icon>
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view />
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <Authorized :authority="['admin']">
      <setting-drawer />
    </Authorized>
  </div>
</template>
<script>
// import Logo from "@/assets/logo.svg";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import SiderMenu from "@/layouts/SiderMenu";
import SettingDrawer from "../components/SettingDrawer";
export default {
  components: {
    Footer,
    Header,
    SiderMenu,
    SettingDrawer
    // Logo
  },
  computed: {
    // 图标风格
    menuType() {
      return this.collapsed ? "menu-unfold" : "menu-fold";
    },
    // 主题风格
    themeNav() {
      return this.$route.query.navTheme || "dark";
    },
    // 布局风格
    themeLayout() {
      return this.$route.query.navLayout || "left";
    }
  },
  data() {
    return {
      collapsed: false
    };
  },
  methods: {
    handleClick() {
      this.collapsed = !this.collapsed;
    }
  }
};
</script>
<style lang="less">
// logo 样式
#components-layout-demo-side .logo {
  // background: rgba(255, 255, 255, 0.2);
  text-align: center;
  margin: 16px;
}
.icon {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
}
.icon:hover {
  background-color: #eee;
}
</style>
