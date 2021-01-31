<template>
  <div style="">
    <a-menu
      :selected-keys="selectKeys"
      :open-keys.sync="openKeys"
      mode="inline"
      :theme="theme"
      :inline-collapsed="collapsed"
      overflowedIndicator="<span>···</span>"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="() => $router.push({ path: item.path, query: $route.query })"
        >
          <a-icon :type="item.meta.icon" v-if="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import subMenu from "./SubMenu";
import { check } from "../utils/auth";
export default {
  props: {
    theme: {
      type: String,
      default: "dark"
    }
  },
  created() {
    console.log(this.menuData);
  },
  watch: {
    "$route.path": function(val) {
      this.selectKeys = this.selectKeysMap[val];
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
    }
  },
  components: {
    subMenu
  },
  data() {
    this.selectKeysMap = {};
    this.openKeysMap = {};
    // this.$router.options.routes 获取当前路由信息中的所有信息
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      collapsed: false,
      menuData,
      selectKeys: this.selectKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path]
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    getMenuData(routes = [], parentKeys = [], selectKey) {
      const menuData = [];
      // 权限菜单显示
      for (let item of routes) {
        if (item.meta && item.meta.authority && !check(item.meta.authority)) {
          break;
        }
        // routes.forEach(item=>{ })
        if (item.name && !item.hidenInMenu) {
          this.openKeysMap[item.path] = parentKeys;
          this.selectKeysMap[item.path] = [selectKey || item.path];

          // 不改变原数据
          const newItem = { ...item };
          // 先清除当前
          delete newItem.children;
          if (item.children && !item.hideChildrenMenu) {
            // 递归调用
            newItem.children = this.getMenuData(item.children, [
              ...parentKeys,
              item.path
            ]);
          } else {
            this.getMenuData(
              item.children,
              selectKey ? parentKeys : [...parentKeys, item.path],
              selectKey || item.path
            );
          }
          menuData.push(newItem);
        } else if (
          !item.hidenInMenu &&
          !item.hideChildrenMenu &&
          item.children
        ) {
          menuData.push(
            ...this.getMenuData(item.children, [...parentKeys, item.path])
          );
        }
      }
      return menuData;
    }
  }
};
</script>
