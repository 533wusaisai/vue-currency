<template>
  <div ref="main" style="height:600px"></div>
</template>
<script>
import echarts from "echarts";
import { addListener, removeListener } from "resize-detector";
import debounce from "lodash/debounce";
export default {
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    // 值改变
    option(val) {
      this.myChart.setOption(val);
    }

    // 深度监听  消耗性能
    // option: {
    //   handler(val) {
    //     this.myChart.setOption(val);
    //   },
    //   deep: true
    // }
  },
  created() {
    // 防抖
    this.resize = debounce(this.resize, 3000);
  },
  mounted() {
    this.renderChart();
    addListener(this.$refs.main, this.resize);
  },
  beforeDestroy() {
    removeListener(this.$refs.main, this.resize);
    this.myChart.dispose();
    this.myChart = null;
  },
  methods: {
    resize() {
      this.myChart.resize();
    },
    renderChart() {
      this.myChart = echarts.init(this.$refs.main);
      this.myChart.setOption(this.option);
    }
  }
};
</script>
