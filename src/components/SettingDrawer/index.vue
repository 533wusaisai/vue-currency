<template>
  <div>
    <a-drawer
      title="主题定制"
      placement="right"
      :closable="false"
      :visible="visible"
      @close="onClose"
      width="300px"
    >
      <template v-slot:handle>
        <div class="handle" @click="visible = !visible">
          <a-icon :type="IconType"></a-icon>
        </div>
      </template>
      <div>
        <template>
          <div>
            <h2>整体风格定制</h2>
            <a-radio-group
              :value="$route.query.navTheme || 'dark'"
              name="radioGroup"
              @change="e => handleSettingChange('navTheme', e.target.value)"
            >
              <a-radio value="dark">
                黑色
              </a-radio>
              <a-radio value="light">
                白色
              </a-radio>
            </a-radio-group>
            <h2>导航模式</h2>
            <a-radio-group
              name="radioGroup"
              :value="$route.query.navLayout || 'left'"
              @change="e => handleSettingChange('navLayout', e.target.value)"
            >
              <a-radio value="left">
                左侧
              </a-radio>
              <a-radio value="top">
                顶部
              </a-radio>
            </a-radio-group>
          </div>
        </template>
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      navTheme: "dark",
      navLayout: "left"
    };
  },
  computed: {
    IconType() {
      return this.visible ? "close" : "setting";
    }
  },
  methods: {
    onClose() {
      this.visible = false;
    },
    handleSettingChange(type, value) {
      this.$router.push({
        query: {
          ...this.$route.query,
          [type]: value
        }
      });
    }
  }
};
</script>
<style lang="less">
.handle {
  position: absolute;
  top: 240px;
  right: 300px;
  width: 48px;
  height: 48px;
  background: #1890ff;
  color: #fff;
  text-align: center;
  line-height: 48px;
  font-size: 20px;
}
</style>
