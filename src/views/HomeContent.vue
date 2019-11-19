<template>
  <div class="home-content">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple-1">
          <h4>
            <span class="icon-bg">
              <i class="iconfont icon-icon"></i>
            </span>
            项目一
          </h4>
          <p>
            <span class="money">￥</span>9425712.00
          </p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-2">
          <h4>
            <span class="icon-bg">
              <i class="iconfont icon-wodebaozhang"></i>
            </span>
            项目二
          </h4>
          <p>
            <span class="money">￥</span>9834324.00
          </p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-3">
          <h4>
            <span class="icon-bg">
              <i class="iconfont icon-zuanshi"></i>
            </span>
            项目三
          </h4>
          <p>
            <span class="money">￥</span>32454658.00
          </p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-4">
          <h4>
            <span class="icon-bg">
              <i class="iconfont icon-shuidianmei"></i>
            </span>
            项目四
          </h4>
          <p>
            <span class="money">￥</span>32456778.00
          </p>
        </div>
      </el-col>
    </el-row>
    <div class="data-total">
      <div id="myChart" class="echarts-box"></div>
    </div>
  </div>
</template>

<script>
import { getOfOrderTotal, getOfIndexcharts } from "@/api/order";
import moment from "moment";
export default {
  mounted() {
    this.getData();
  },
  data() {
    return {
      date: []
    };
  },
  methods: {
    drawLine(xArr, yArr, orderNum) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "数据统计"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["当日销售额", "当日订单量"]
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
          data: xArr
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "当日销售额",
            type: "line",
            stack: "总量",
            data: yArr
          },
          {
            name: "当日订单量",
            type: "line",
            stack: "总量",
            data: orderNum
          }
        ]
      });
    },
    async getData() {
      let { data } = await getOfOrderTotal({ date: JSON.stringify(this.date) });
      let res = await getOfIndexcharts();
      let orderNum = res.data.orderNum;
      let dataObj = {};
      data.forEach(item => {
        item.orderTime = moment(item.orderTime).format("YYYY-MM-DD");
        !dataObj[item.orderTime]
          ? (dataObj[item.orderTime] = item.orderAmount)
          : (dataObj[item.orderTime] += item.orderAmount);
      });
      let xArr = [];
      let yArr = [];
      for (let key in dataObj) {
        xArr.push(key);
        yArr.push(dataObj[key]);
      }
      this.drawLine(xArr, yArr, orderNum);
    }
  }
};
</script>

<style lang="less" scoped>
.home-content {
  // echarts线
  .data-total {
    box-shadow: 0 2px 8px #ebeef5;
    border-radius: 5px;
    overflow: hidden;
    padding: 25px 30px;
    .echarts-box {
      height: 300px;
      width: 100%;
    }
  }
  .el-row {
    margin-bottom: 35px;
    margin-top: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-1 {
    background-image: linear-gradient(to right, #46e0d6, #1099d1);
  }
  .bg-purple-2 {
    background-image: linear-gradient(to right, #9270ff, #fd5d9f);
  }
  .bg-purple-3 {
    background-image: linear-gradient(to right, #f8cf8b, #f35969);
  }
  .bg-purple-4 {
    background-image: linear-gradient(to right, #764ffd, #a7cdfe);
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    position: relative;
    overflow: hidden;
    padding: 20px;
    &::after {
      content: "";
      display: block;
      height: 76px;
      width: 76px;
      position: absolute;
      background: url("http://localhost:8080/images/logo_bg.png") no-repeat
        center;
      background-size: auto 100%;
      right: -10px;
      top: 50%;
      margin-top: -38px;
      opacity: 0.2;
    }
    h4 {
      color: white;
      font-size: 12px;
      .icon-bg {
        display: inline-block;
        width: 36px;
        height: 36px;
        text-align: center;
        line-height: 36px;
        background-color: #ffffff40;
        border-radius: 30px;
        margin-right: 5px;
        .iconfont {
          color: white;
          font-size: 18px;
        }
      }
    }
    p {
      color: #fff;
      margin-top: 14px;
      .money {
        font-size: 20px;
      }
    }
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
}
</style>