<template>
  <div class="total-goods">
    <!-- 选择时间 -->
    <div class="block block-time">
      <span class="demonstration" style="color: #606266; font-size: 14px; margin-right: 12px;">选择时间</span>
      <el-date-picker
        size="small"
        v-model="dateScope"
        value-format="yy-MM-dd HH:mm:ss"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        style="margin-right: 20px; margin-top: -4px;"
      ></el-date-picker>
      <!-- 提交 -->
      <el-button size="small" type="primary" @click="onSubmit">查询</el-button>
    </div>
    <!-- echarts盒子 -->
    <div class="data-total">
      <div id="myChart" class="echarts-box"></div>
    </div>
  </div>
</template>

<script>
import { getOfIndexcharts } from "@/api/order";
export default {
  mounted() {
    this.getDate();
  },
  data() {
    return {
      dateScope: ""
    };
  },
  methods: {
    drawLine(date, orderNum, amount) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "商品统计表"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["当日订单量", "当日销售额"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "当日订单量",
            type: "line",
            stack: "总量",
            data: orderNum
          },
          {
            name: "当日销售额",
            type: "line",
            stack: "总量",
            data: amount
          }
        ]
      });
    },
    // 获取报表数据
    async getDate() {
      let { data, date } = await getOfIndexcharts();
      this.drawLine(date, data.orderNum, data.amount);
    },
    onSubmit() {
      this.getDate();
    }
  }
};
</script>

<style lang="less" scoped>
.total-goods {
  box-shadow: 0 2px 8px #ebeef5;
  padding: 40px 50px;
  border-radius: 5px;
  margin-top: 20px;
  // echarts线
  .data-total {
    margin-top: 60px;
    // overflow: hidden;
    // padding: 25px 30px;
    .echarts-box {
      height: 300px;
      width: 100%;
    }
  }
}
</style>