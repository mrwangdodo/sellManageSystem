<template>
  <div class="personal">
    <el-card class="box-card">
      <div slot="header" class="clearfix" style="text-align: center;">
        <span>管理员信息</span>
      </div>
      <!-- 表单 -->
      <el-form
        ref="personalForm"
        :model="personalForm"
        label-width="100px"
        size="small"
        style="padding: 0 20px;"
      >
        <!-- 管理员ID -->
        <el-form-item label="管理员ID">
          <span class="bind-span" v-text="personalForm.id"></span>
        </el-form-item>
        <!-- 账号 -->
        <el-form-item label="账号">
          <span class="bind-span" v-text="personalForm.account"></span>
        </el-form-item>
        <!-- 用户组 -->
        <el-form-item label="用户组">
          <span class="bind-span" v-text="personalForm.userGroup"></span>
        </el-form-item>
        <!-- 创建时间 -->
        <el-form-item label="创建时间">
          <span class="bind-span">{{ personalForm.ctime | filtersCtime }}</span>
        </el-form-item>
        <!-- 管理员头像 -->
        <el-form-item label="管理员头像">
          <el-upload
            class="avatar-uploader"
            :action="actionApi"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="personalForm.imgUrl" :src="serverApi + personalForm.imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-button type="primary" plain @click="updateHeader">修改头像</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getOfPersonalInfo, getOfUpdateHeader } from "@/api/account";
import moment from "moment";
export default {
  created() {
    this.getPersonalInfo();
  },
  data() {
    return {
      actionApi: "http://127.0.0.1:5050/account/upload", // 图片自带上传的地址
      serverApi: "http://127.0.0.1:5050/upload/account/", // 从服务器返回的图片地址
      personalForm: {
        id: "",
        account: "",
        userGroup: "",
        ctime: [],
        imgUrl: ""
      }
    };
  },
  methods: {
    // 修改头像按钮
    async updateHeader() {
      let { code } = await getOfUpdateHeader({
        imgUrl: this.personalForm.imgUrl
      });
      this.$bus.$emit("updateHeader");
    },
    // 获取个人中心信息
    async getPersonalInfo() {
      let { accountInfo } = await getOfPersonalInfo();
      this.personalForm = accountInfo;
    },
    // 上传图片前的处理函数
    beforeAvatarUpload(file) {
      const isPNG = file.type === "image/png";
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!(isJPG || isPNG)) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return (isJPG || isPNG) && isLt2M;
    },
    // 图片上传成功的回调
    handleAvatarSuccess(res, file) {
      let { code, imgUrl } = res;
      if (code === 0) {
        this.personalForm.imgUrl = imgUrl;
      }
    }
  },
  computed: {},
  filters: {
    filtersCtime(c) {
      return moment(c).format("HH:mm:ss");
    }
  }
};
</script>

<style lang="less">
.personal {
  .bind-span {
    line-height: 33px;
  }
  /* 上传图片------------------------------------------------------------- */
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
  /* 上传图片------------------------------------------------------------- */
}
</style>