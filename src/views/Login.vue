<template>
  <div class="login">
    <transition name="el-fade-in-linear">
      <div class="login-box" v-show="show">
        <div class="form-box">
          <div>
            <h3 class="title">登&nbsp;录</h3>
            <!-- melemnt-ui 登录表单 -->
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="用户名" prop="user">
                <el-input type="text" v-model.number="ruleForm.user"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input
                  @keyup.enter.native="enter"
                  type="password"
                  v-model="ruleForm.pass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登&nbsp;录</el-button>
                <!-- 添加回车键事件 -->
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// 引入正则工具函数
import { userReg, pwdReg } from "../utils/regular";
// 引入本地存储工具函数
import local from "@/utils/local";
// 引入请求函数
import { postOfLogincheck } from "@/api/account";

export default {
  created() {},
  mounted() {
    setTimeout(() => {
      this.show = true;
    }, 600);
  },
  data() {
    // 验证用户名
    var checkUser = (rule, value, callback) => {
      if (!value) {
        // console.log(this);
        return callback(new Error("用户名不能为空"));
      }
      setTimeout(() => {
        if (!userReg().test(value)) {
          callback(new Error("请输入4到16位字母或数字"));
        } else {
          callback();
        }
      }, 500);
    };
    // 验证密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      setTimeout(() => {
        if (!pwdReg().test(value)) {
          callback(new Error("请输入6-12个字符，至少1个小写字母和数字"));
        } else {
          callback();
        }
      }, 500);
    };
    return {
      show: false,
      ruleForm: {
        user: "",
        pass: ""
      },
      rules: {
        user: [{ validator: checkUser, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs.ruleForm.validate(async valid => {
        // 获取表单.validate()
        if (valid) {
          let { code, token, role } = await postOfLogincheck(this.ruleForm);
          if (code === 0) {
            local.set("token", token);
            local.set("role", role);
            this.$router.push("/home");
          }
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    enter() {
      this.submitForm();
    }
  }
};
</script>

<style lang="less">
.login {
  height: 100%;
  background: #00a0fb url("/images/bg1.png") no-repeat center;
  background-size: 100% auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    background: #fff url("/images/bg3.png") no-repeat;
    background-size: 40%;
    background-position: 34px center;
    width: 720px;
    height: 400px;
    box-shadow: 0 12px 24px 0 #0061f960;
    border-top-right-radius: 125px;
    border-bottom-left-radius: 125px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    /* 登录表单 */
    .form-box {
      width: 270px;
      height: 300px;
      margin-right: 80px;
      margin-top: -10px;
      .title {
        color: #0385f8;
        font-weight: 600;
        text-align: center;
        font-size: 22px;
        margin-bottom: 20px;
      }
      .el-form {
        .el-form-item {
          margin-bottom: 10px;
          .el-form-item__label {
            color: #94bbce;
            float: none;
            font-size: 14px;
            margin-left: 15px;
            line-height: 32px;
          }
          .el-form-item__content {
            margin-left: 0 !important;
            .el-input {
              .el-input__inner {
                border: none;
                background-color: #e5f5ff;
                border-radius: 7px;
              }
            }
            .el-button {
              margin-top: 35px;
              width: 100%;
              background-color: #00b1fd;
              border-radius: 0px;
              border-top-right-radius: 23px;
              border-bottom-left-radius: 23px;
              height: 46px;
              box-shadow: 0 10px 18px 0 #b7d6fd;
            }
          }
        }
      }
    }
  }
}
</style>