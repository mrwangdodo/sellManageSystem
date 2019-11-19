<template>
  <div class="account-add">
    <div class="al-box" :style="bgStyle">
      <!--  :style="bgStyle" -->
      <p class="bg-light"></p>
      <!-- 表单 -->
      <el-form
        :model="AddAccountForm"
        status-icon
        :rules="rules"
        ref="AddAccountForm"
        label-width="100px"
        class="demo-AddAccountForm"
      >
        <h3 class="title">
          添加账号
          <span class="title-small">Add account</span>
        </h3>
        <p></p>
        <!-- 添加账号表单 -->
        <el-form-item prop="account">
          <!-- label="账号"  -->
          <el-input
            type="text"
            v-model="AddAccountForm.account"
            autocomplete="off"
            placeholder="账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <!--  label="密码" -->
          <el-input
            type="password"
            v-model="AddAccountForm.pwd"
            autocomplete="off"
            placeholder="密码"
            @focus="changeBg"
            @blur="bgStyle = {}"
          ></el-input>
        </el-form-item>

        <!--  label="用户组" -->
        <el-form-item prop="userGroup">
          <el-select v-model="AddAccountForm.userGroup" placeholder="请选择用户组">
            <el-option label="Super超管" value="Super超管组"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
            <el-option label="Vip贵宾组" value="Vip贵宾组"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提 交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 引入工具函数-正则
import { userReg, pwdReg } from "../../utils/regular";
// 引入添加账号接口api
import { PostOfAddAcount } from "@/api/account";

export default {
  mounted() {
    this.preload();
  },
  data() {
    // 验证用户组
    var validateUserGroup = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户组不能为空"));
      } else {
        callback();
      }
    };
    // 验证密码
    var validatePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      setTimeout(() => {
        if (!pwdReg().test(value)) {
          callback(new Error("请输入6-12位字母或数字"));
        } else {
          callback();
        }
      }, 1000);
    };
    // 验证账号
    var validateAccount = (rule, value, callback) => {
      if (!value) {
        // console.log(this);
        return callback(new Error("请输入账号"));
      }
      setTimeout(() => {
        if (!userReg().test(value)) {
          callback(new Error("请输入2到12位字符或下划线"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      AddAccountForm: {
        account: "",
        pwd: "",
        userGroup: ""
      },
      rules: {
        account: { validator: validateAccount, trigger: "blur" },
        pwd: { validator: validatePwd, trigger: "blur" },
        userGroup: { validator: validateUserGroup, trigger: "change" }
      },
      bgStyle: {}
    };
  },
  methods: {
    // 图片预加载
    preload() {
      let image = new Image();
      image.src = "http://localhost:8080/images/bili0.png";
    },
    // 输入密码时改变背景
    changeBg() {
      this.bgStyle = {
        background:
          "url('http://localhost:8080/images/bili0.png') no-repeat bottom",
        backgroundSize: "100%"
      };
    },
    // 提交表单
    submitForm() {
      this.$refs.AddAccountForm.validate(async valid => {
        if (valid) {
          let { code } = await PostOfAddAcount(this.AddAccountForm);
          if (code === 0) {
            this.$router.push("/home/accountlist");
          }
        } else {
          return false;
        }
      });
    },
    // 重置表单
    resetForm() {
      this.$refs.AddAccountForm.resetFields();
      // console.log(this);
    }
  }
};
</script>

<style lang="less">
.account-add {
  .title {
    color: #5794ff;
    margin: 10px 0 30px 0;
    -text-indent: 20px;
    font-size: 22px;
    .title-small {
      color: #c4bdd1;
      font-size: 13px;
      margin-left: 8px;
    }
  }
  .al-box {
    box-shadow: 0 2px 8px #ebeef5;
    border-radius: 5px;
    overflow: hidden;
    padding: 50px 30px 20px 30px;
    background: url("http://localhost:8080/images/bili1.png") no-repeat bottom;
    background-size: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
    position: relative;
    .el-form {
      .el-form-item {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        .el-form-item__label {
          color: #8f9cc7;
          text-align: left;
          line-height: 30px;
        }
        .el-form-item__content {
          margin-left: 0 !important;
          text-align: right;
          .el-button--primary {
            width: 100%;
            border-radius: 30px;
            background-color: #5794ff;
            margin-top: 20px;
            -transition: 0.1s linear;
            box-shadow: 0 5px 10px #5794ff70;
            -transform: translate(0, -2px);
            &:hover {
              background-color: #629bfd;
            }
          }
          .el-button--default {
            border: none;
            color: #99a8b5;
            padding: 2px;
            &:hover {
              background-color: #fff;
              color: #5794ff;
            }
          }
        }
        .el-input {
          width: 300px;
        }
      }
    }
  }
}
</style>