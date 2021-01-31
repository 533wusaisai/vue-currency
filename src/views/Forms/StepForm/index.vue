<template>
  <div>
    <icon-font type="icon-auto" />
    <img :src="logo" alt="" />
    <Logo></Logo>
  </div>
</template>
<script>
import logo from "../../../assets/logo.svg";
import Logo from "../../../assets/logo.svg";
export default {
  components: {
    Logo
  },
  data() {
    return {
      logo
    };
  }
};
</script>
