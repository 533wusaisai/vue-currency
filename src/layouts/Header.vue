<template lang="">
  <div class="header">
    {{ date | formDate }}
    <a-dropdown>
      <a-menu slot="overlay">
        <a-menu-item key="1">@{{ name }} </a-menu-item>
        <a-menu-item key="2">个人中心</a-menu-item>
        <a-menu-item key="3" @click="loginOut">退出登录 </a-menu-item>
      </a-menu>
      <a-button type="link" style="margin-left: 8px">
        {{ name }} <a-icon type="down" />
      </a-button>
    </a-dropdown>
  </div>
</template>
<script>
export default {
  data() {
    return {
      date: new Date(),
      name: localStorage["userName"]
    };
  },
  methods: {
    loginOut() {
      localStorage.clear();
      this.$router.push({
        path: "/login"
      });
    }
  }
};
</script>
<style lang="less">
.header {
  float: right;
}
</style>
