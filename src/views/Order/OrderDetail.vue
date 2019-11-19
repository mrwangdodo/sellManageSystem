<template>
  <div class="order-detail">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
        <el-button
          style="float: right; padding: 8px 12px; border: none"
          :type="flag ? 'text' : 'success'"
          @click="changBtn"
          plain
          size="small"
          :disabled="binddisabled"
        >{{ btnText }}</el-button>
      </div>
      <!-- 表单 -->
      <el-form
        ref="orderDetailForm"
        :model="orderDetailForm"
        label-width="80px"
        size="small"
        style="padding: 0 250px;"
      >
        <!-- 订单号 -->
        <el-form-item label="订单号" prop="orderNo">
          <span class="bind-span" v-if="flag" v-text="orderDetailForm.orderNo"></span>
          <el-input v-else v-model.number="orderDetailForm.orderNo"></el-input>
        </el-form-item>
        <!-- 下单时间 -->
        <el-form-item label="下单时间">
          <span class="bind-span" v-if="flag" v-text="orderDetailForm.orderTime"></span>
          <el-date-picker
            v-else
            v-model="orderDetailForm.orderTime"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item label="手机号" prop="phone">
          <span class="bind-span" v-if="flag" v-text="orderDetailForm.phone"></span>
          <el-input v-else v-model.number="orderDetailForm.phone"></el-input>
        </el-form-item>
        <!-- 收货人 -->
        <el-form-item label="收货人" prop="consignee">
          <span class="bind-span" v-if="flag" v-text="orderDetailForm.consignee"></span>
          <el-input v-else v-model="orderDetailForm.consignee"></el-input>
        </el-form-item>
        <!-- 配送地址 -->
        <el-form-item label="配送地址" prop="deliverAddress">
          <span class="bind-span" v-if="flag" v-text="orderDetailForm.deliverAddress"></span>
          <el-input v-else v-model="orderDetailForm.deliverAddress"></el-input>
        </el-form-item>
        <!-- 送达时间 -->
        <el-form-item label="送达时间">
          <span class="bind-span" v-if="flag" v-text="orderDetailForm.deliveryTime"></span>
          <el-date-picker
            v-else
            v-model="orderDetailForm.deliveryTime"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <!-- 用户备注 -->
        <el-form-item label="用户备注" prop="remarks">
          <span class="bind-span" v-if="flag" v-text="orderDetailForm.remarks"></span>
          <el-input v-else v-model="orderDetailForm.remarks"></el-input>
        </el-form-item>
        <!-- 订单金额 -->
        <el-form-item label="订单金额" prop="orderAmount">
          <span class="bind-span" v-if="flag" v-text="orderDetailForm.orderAmount"></span>
          <el-input v-else v-model.number="orderDetailForm.orderAmount"></el-input>
        </el-form-item>
        <!-- 订单状态 -->
        <el-form-item label="订单状态" prop="orderState">
          <span class="bind-span" v-if="flag" v-text="orderDetailForm.orderState"></span>
          <el-select v-else v-model="orderDetailForm.orderState" placeholder="请选择活动区域">
            <el-option label="已受理" value="已受理"></el-option>
            <el-option label="配送中" value="配送中"></el-option>
            <el-option label="已完成" value="已完成"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getOfOrderedit } from "@/api/order";
export default {
  mounted() {
    this.getOrderDetail();
  },
  data() {
    return {
      getOrderDetail() {
        // 1 接收路由传递来的参数
        // let data = this.$route.query;
        // let data = this.$route.params;
        // console.log(data);

        // 2 获取本地存储
        let detailObj = JSON.parse(window.sessionStorage.getItem("row"));
        this.orderDetailForm = detailObj;
      },
      orderDetailForm: {},
      flag: true,
      binddisabled: false
    };
  },
  methods: {
    async changBtn() {
      this.flag = !this.flag;
      if (this.flag) {
        let { code } = await getOfOrderedit(this.orderDetailForm);
        if (code === 0) {
          setTimeout(() => {
            this.$router.push("/home/ordermanage");
          }, 800);
        }
      }
    }
  },
  computed: {
    btnText() {
      return this.flag ? "编辑按钮" : "保存修改";
    }
  }
};
</script>

<style lang="less" scoped>
    .order-detail {
        .bind-span {
            line-height: 33px;
        }
    }
</style>