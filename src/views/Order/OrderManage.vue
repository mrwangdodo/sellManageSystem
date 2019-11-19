<template>
  <div class="order-manage">
    <!-- 条件查询 -->
    <el-form size="mini" :inline="true" :model="searchForm" class="demo-form-inline">
      <!-- 订单号 -->
      <el-form-item label="订单号">
        <el-input v-model="searchForm.orderNo" placeholder="订单号"></el-input>
      </el-form-item>
      <!-- 收货人 -->
      <el-form-item label="收货人">
        <el-input v-model="searchForm.consignee" placeholder="收货人"></el-input>
      </el-form-item>
      <!-- 手机号 -->
      <el-form-item label="手机号">
        <el-input v-model="searchForm.phone" placeholder="手机号"></el-input>
      </el-form-item>
      <!-- 订单状态 -->
      <el-form-item label="订单状态">
        <el-select v-model="searchForm.orderState" placeholder="订单状态">
          <el-option label="已受理" value="已受理"></el-option>
          <el-option label="配送中" value="配送中"></el-option>
          <el-option label="已完成" value="已完成"></el-option>
        </el-select>
      </el-form-item>
      <!-- 选择时间 -->
      <div class="block block-time">
        <span class="demonstration" size="mini" style="color: #606266; font-size: 14px;">选择时间</span>
        <el-date-picker
          size="mini"
          v-model="searchForm.date"
          value-format="yy-MM-dd HH:mm:ss"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
      <!-- 提交 -->
      <el-form-item class="button">
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm('thisForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="orderData" border style="width: 100%" height="360">
      <el-table-column prop="orderNo" label="订单号" width="160"></el-table-column>
      <el-table-column prop="orderTime" label="下单时间" width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="160"></el-table-column>
      <el-table-column prop="consignee" label="收货人" width="160"></el-table-column>
      <el-table-column prop="deliverAddress" label="配送地址" width="220"></el-table-column>
      <el-table-column prop="deliveryTime" label="送达时间" width="180"></el-table-column>
      <el-table-column prop="remarks" label="用户备注" width="160"></el-table-column>
      <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>
      <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="totalPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
// 引入接口函数api
import { getOfOrderlist } from "@/api/order";
// 时间格式化
import moment from "moment";

export default {
  created() {
    this.getOrderList();
  },
  data() {
    return {
      searchForm: {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: []
      },
      orderData: [
        {
          orderNo: "",
          orderTime: "",
          phone: "",
          consignee: "",
          deliverAddress: "",
          deliveryTime: "",
          remarks: "",
          orderAmount: "",
          orderState: ""
        }
      ],
      currentPage: 1,
      pageSize: 5,
      totalPage: 10
    };
  },
  methods: {
    // 查看详情
    handleClick(row) {
      // console.log(row);
      // 1 路由传参
      /* this.$router.push({
        path: "/home/orderdetail",
        query: {
          id: row.id
        }
      }); */
      /* this.$router.push({
        name: "/home/orderdetail",
        params: {
          row
        }
      }); */
      // 2 本地存储
      window.sessionStorage.setItem("row", JSON.stringify(row));
      this.$router.push("/home/orderdetail")
    },
    // 获取订单列表
    async getOrderList() {
      // 参数聚合
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        orderNo: this.searchForm.orderNo,
        consignee: this.searchForm.consignee,
        phone: this.searchForm.phone,
        orderState: this.searchForm.orderState,
        date: JSON.stringify(this.searchForm.date)
      };
      let { total, data } = await getOfOrderlist(params);
      this.totalPage = total;
      data.map(item => {
        item.orderTime = moment(item.orderTime).format("YYYY-MM-DD HH:mm:ss");
        item.deliveryTime = moment(item.deliveryTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      });
      this.orderData = data;
    },
    // 查询
    onSubmit() {
      if (
        this.searchForm.orderNo ||
        this.searchForm.consignee ||
        this.searchForm.phone ||
        this.searchForm.orderState ||
        this.searchForm.date.length
      ) {
        this.currentPage = 1;
        this.getOrderList();
      } else {
        // this.$message.error("你的搜索什么都没有( •̀ ω •́ )")
        this.$message({
          type: "warning",
          message: "你的搜索什么都没有( •̀ ω •́ )",
          duration: 800
        });
      }
    },
    // 重置
    resetForm() {
      this.searchForm = {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: []
      };
    },
    /* handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    }, */
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getOrderList();
    }
  }
};
</script>

<style lang="less">
  .order-manage {
    .el-form {
     margin: 12px 0; 
    }
    // 分页居中
    .el-pagination {
      text-align: center; margin-top: 30px;
    }
    // 选择时间
    .block-time {
      display: inline-block;
    }
    // 输入框
    .el-form-item__content {
      width: 150px;
    }
    .el-form-item--mini.el-form-item {
      margin-right: 30px;
    }
    .el-form-item__label {
      padding-right: 10px;
    }
    .el-range-editor.el-input__inner {
      margin-left: 10px;
    }
    .button {
      .el-form-item__content {
        margin-left: 20px;
      }
    }
    .el-table__header {
      tr > th {
        border-bottom: solid 2px rgb(245, 246, 248);
      }
    }
    .order-manage, .el-pagination {
      margin-top: 14px;
    }
    .el-table td {
      padding: 10px 0;
    }
  }
</style>