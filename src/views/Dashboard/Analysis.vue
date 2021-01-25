<template>
  <div>
    <Echarts :option="chartOptions" />
  </div>
</template>
<script>
import random from "lodash/random";
import Echarts from "@/components/Echarts/Column.vue";
export default {
  components: {
    Echarts
  },
  data() {
    return {
      chartOptions: {
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [20, 50, 60, 80, 70, 25, 36]
          }
        ]
      }
    };
  },
  methods: {},
  mounted() {
    this.interval = setInterval(() => {
      this.chartOptions.series[0].data = this.chartOptions.series[0].data.map(
        () => random(100)
      );
      this.chartOptions = { ...this.chartOptions };
    }, 3000);
    this.chartOptions;
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>
