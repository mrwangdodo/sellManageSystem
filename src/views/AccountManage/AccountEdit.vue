<template>
  <div class="account-edit">
    <div class="al-box">
      <p class="bg-light"></p>
      <!-- 表单 -->
      <el-form
        :model="editPwdForm"
        status-icon
        :rules="rules"
        ref="editPwdForm"
        label-width="100px"
        class="demo-editPwdForm"
      >
        <h3 class="title">
          修改密码
          <span class="title-small">Change password</span>
        </h3>
        <p></p>
        <!-- 添加账号表单 -->

        <!-- label="原密码""  -->
        <el-form-item prop="oldPwd">
          <el-input
            type="password"
            v-model="editPwdForm.oldPwd"
            placeholder="原密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <!--  label="新密码" -->
        <el-form-item prop="newPwd">
          <el-input
            :type="isOpen ? `text` : `password`"
            @input="newPwdInput"
            v-model="editPwdForm.newPwd"
            placeholder="新密码"
            autocomplete="off"
          ></el-input>
          <i
            class="iconfont"
            :class="isHidden ? false : isOpen ? 'icon-yanjing' : 'icon-yanjing1' "
            @mousedown="isOpen = true"
            @mouseup="isOpen = false"
            @mouseleave="isOpen = false"
          ></i>
        </el-form-item>

        <!--  label="确认密码" -->
        <el-form-item prop="isNewPwd">
          <el-input
            :type="isOpen2 ? `text` : `password`"
            @input="isNewPwdInput"
            v-model="editPwdForm.isNewPwd"
            placeholder="确认新密码"
            autocomplete="off"
          ></el-input>
          <i
            class="iconfont"
            :class="isHidden2 ? false : isOpen2 ? 'icon-yanjing' : 'icon-yanjing1' "
            @mousedown="isOpen2 = true"
            @mouseup="isOpen2 = false"
            @mouseleave="isOpen2 = false"
          ></i>
        </el-form-item>

        <!-- 按钮 -->
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
import local from "@/utils/local";
// 引入请求接口api
import { getOfCheckoldpwd, postOfPasswordedit } from "@/api/account";

export default {
  data() {
    // 验证原密码
    var validateOldPwd = async (rule, value, callback) => {
      let { code } = await getOfCheckoldpwd({
        oldPwd: this.editPwdForm.oldPwd
      });
      console.log(code);
      if (value === "") {
        callback(new Error("请输入原密码"));
      } else {
        if (code === "11") {
          callback(new Error("原密码错误"));
        } else {
          callback();
        }
      }
    };
    // 验证新密码
    var validateNewPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      }
      setTimeout(() => {
        if (!pwdReg().test(value)) {
          callback(new Error("请输入6-12位字母和数字"));
        } else {
          if (this.editPwdForm.isNewPwd !== "") {
            this.$refs.editPwdForm.validateField("isNewPwd");
          }
          callback();
        }
      }, 500);
    };
    // 确认新密码
    var validateIsNewPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请确认新密码"));
      }
      setTimeout(() => {
        if (value != this.editPwdForm.newPwd) {
          callback(new Error("两次输入的新密码不一致"));
        } else {
          callback();
        }
      }, 500);
    };
    return {
      editPwdForm: {
        oldPwd: "",
        newPwd: "",
        isNewPwd: ""
      },
      rules: {
        oldPwd: { validator: validateOldPwd, trigger: "blur" },
        newPwd: { validator: validateNewPwd, trigger: "blur" },
        isNewPwd: { validator: validateIsNewPwd, trigger: "blur" }
      },
      isOpen: false,
      isHidden: true,
      isOpen2: false,
      isHidden2: true
    };
  },
  /* 做一个
  
  
    bilibili那样的登录眼睛
  
  
  */
  methods: {
    // 输入内容才显示眼睛
    newPwdInput() {
      if (this.editPwdForm.newPwd) {
        this.isHidden = false;
      } else {
        this.isHidden = true;
        this.isOpen = false;
      }
    },
    isNewPwdInput() {
      if (this.editPwdForm.isNewPwd) {
        this.isHidden2 = false;
      } else {
        this.isHidden2 = true;
        this.isOpen2 = false;
      }
    },
    // 提交表单
    submitForm() {
      this.$refs.editPwdForm.validate(async valid => {
        if (valid) {
          let { code } = await postOfPasswordedit({
            newPwd: this.editPwdForm.newPwd
          });
          if (code === 0) {
            local.remove("token"); // 清楚本地存储的token
            setTimeout(() => {
              this.$router.push("/login");
            }, 800);
          }
        } else {
          return false;
        }
      });
    },
    // 重置表单 并 隐藏眼睛
    resetForm() {
      this.$refs.editPwdForm.resetFields();
      this.isHidden = true;
      this.isHidden2 = true;
      // console.log(this);
    }
  }
};
</script>

<style lang="less">
  .account-edit {
    .title { 
      color: #5794FF; margin: 10px 0 30px 0; -text-indent: 20px; font-size: 22px;
      .title-small {
        color: #c4bdd1; font-size: 13px; margin-left: 8px;
      }
    }
    .al-box {
      box-shadow: 0 2px 8px #EBEEF5; border-radius: 5px; overflow: hidden; padding: 50px 30px 20px 30px; background: url("/images/b1.png") no-repeat; background-size: auto 100%; display: flex; justify-content: flex-end; margin-top: 30px; position: relative;;
      .bg-light {
        width: 43px; height: 92px; background: url("/images/b2.png") no-repeat; position: absolute; top: 0; right: 30px; background-size: auto 100%;
      }
      .el-form {
        margin-right: 100px;
        .el-form-item {
          .iconfont { // 输入框眼睛
            position: absolute; right: -26px; top: 10px; -border: solid 1px red; width: 20px; height: 20px; text-align: center; line-height: 20px; color: #8d8d8d;
          }
          display: flex; flex-direction: column; margin-bottom: 20px;
          .el-form-item__label {
            color: #8F9CC7; text-align: left; line-height: 30px;
          }
          .el-form-item__content {
            margin-left: 0 !important; text-align: right;
            .el-button--primary {
              width: 100%; border-radius: 30px; background-color: #5794FF; margin-top: 20px; -transition: .1s linear; box-shadow:0 5px 10px #5794FF70; -transform: translate(0, -2px);
              &:hover {
                background-color: #629bfd;
              }
            }
            .el-button--default {
              border: none; color: #99A8B5; padding: 2px;
              &:hover { 
                background-color: #fff; color: #5794FF;
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