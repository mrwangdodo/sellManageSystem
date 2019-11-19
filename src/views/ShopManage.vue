<template>
  <div class="shop-manage">
    <!-- <el-card class="box-card"> -->
    <!-- :rules="goodsaddRules" -->
    <el-form
      :model="shopmanageForm"
      ref="shopmanageForm"
      label-width="100px"
      class="demo-shopmanageForm"
      :disabled="isDisabled"
    >
      <!-- 商品名称 -->
      <el-form-item label="商品名称" prop="shopname">
        <el-input v-model="shopmanageForm.shopname" class="inputWidth"></el-input>
      </el-form-item>

      <!-- 详细地址 -->
      <el-form-item label="详细地址" prop="address">
        <el-input v-model="shopmanageForm.address" class="inputWidth"></el-input>
      </el-form-item>

      <!-- 联系电话 -->
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="shopmanageForm.phone" class="inputWidth"></el-input>
      </el-form-item>

      <!-- 店铺简介 -->
      <el-form-item label="店铺简介" prop="shopdesc">
        <el-input v-model="shopmanageForm.shopdesc" class="inputWidth"></el-input>
      </el-form-item>

      <!-- 店铺标语 -->
      <el-form-item label="店铺标语" prop="slogan">
        <el-input v-model="shopmanageForm.slogan" class="inputWidth"></el-input>
      </el-form-item>

      <!-- 商品分类 -->
      <el-form-item label="商品分类" prop="category">
        <el-select v-model="shopmanageForm.category" placeholder="请选择商品分类">
          <el-option label="热销" value="热销"></el-option>
          <el-option label="咖啡" value="咖啡"></el-option>
          <el-option label="热菜" value="热菜"></el-option>
          <el-option label="凉菜" value="凉菜"></el-option>
          <el-option label="饮品" value="饮品"></el-option>
          <el-option label="火锅" value="火锅"></el-option>
        </el-select>
      </el-form-item>

      <!-- 店铺特色 -->
      <el-form-item label="商品特色" prop="feature">
        <el-checkbox-group v-model="shopmanageForm.feature">
          <el-checkbox label="品牌保证" name="goodsfeature"></el-checkbox>
          <el-checkbox label="蜂鸟专送" name="goodsfeature"></el-checkbox>
          <el-checkbox label="新店开张" name="goodsfeature"></el-checkbox>
          <el-checkbox label="外卖保单" name="goodsfeature"></el-checkbox>
          <el-checkbox label="准时达" name="goodsfeature"></el-checkbox>
          <el-checkbox label="开发票" name="goodsfeature"></el-checkbox>
          <el-checkbox label="保质保量" name="goodsfeature"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <!-- 包装费 -->
      <el-form-item label="包装费">
        <el-input-number v-model="shopmanageForm.packingexpense" :min="1" :max="20" label="描述文字"></el-input-number>
      </el-form-item>

      <!-- 起送价 -->
      <el-form-item label="起送价">
        <el-input-number v-model="shopmanageForm.minprice" :min="20" :max="999" label="描述文字"></el-input-number>
      </el-form-item>

      <!-- 营业时间 -->
      <el-form-item label="营业时间">
        <el-time-picker
          is-range
          v-model="shopmanageForm.date"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </el-form-item>

      <!-- 店铺头像 -->
      <el-form-item label="店铺头像" prop="shopAvatar">
        <el-upload
          class="avatar-uploader"
          :action="actionApi"
          :show-file-list="false"
          :on-success="handleAvatarSuccess1"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="shopmanageForm.shopAvatar"
            :src="serverApi + shopmanageForm.shopAvatar"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <!-- 营业执照 -->
      <el-form-item label="营业执照" prop="businessLicenseImg">
        <el-upload
          class="avatar-uploader"
          :action="actionApi"
          :show-file-list="false"
          :on-success="handleAvatarSuccess2"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="shopmanageForm.businessLicenseImg"
            :src="serverApi + shopmanageForm.businessLicenseImg"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <!-- 餐饮服务许可证 -->
      <el-form-item label="餐饮服务许可证" prop="cateringServiceLicenseImg">
        <el-upload
          class="avatar-uploader"
          :action="actionApi"
          :show-file-list="false"
          :on-success="handleAvatarSuccess3"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="shopmanageForm.cateringServiceLicenseImg"
            :src="serverApi + shopmanageForm.cateringServiceLicenseImg"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <!-- 优惠活动 -->
      <el-form-item label="优惠活动">
        <el-select @change="specialOfferChange" v-model="specialOffer" placeholder="请选择优惠活动">
          <el-option label="满减优惠" value="满减优惠"></el-option>
          <el-option label="特惠大酬宾" value="特惠大酬宾"></el-option>
          <el-option label="新用户立减" value="新用户立减"></el-option>
          <el-option label="领券双折扣" value="领券双折扣"></el-option>
        </el-select>
      </el-form-item>

      <!-- 模态框 -->
      <el-dialog width="520px" title :visible.sync="dialogFormVisible">
        <el-form :model="dialogForm">
          <el-form-item label="请输入活动详情" label-width="140px" style="width: 395px">
            <el-input v-model="dialogForm.detail" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogBtnFalse">取 消</el-button>
          <el-button type="primary" @click="dialogBtn">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 优惠活动表格 -->
      <el-form-item>
        <div class="goodsaddForm-table">
          <el-table :data="shopmanageForm.tableData">
            <el-table-column prop="activityTitle" label="活动标题" width="150"></el-table-column>
            <el-table-column prop="activityName" label="活动名称" width="150"></el-table-column>
            <el-table-column prop="activityDetail" label="活动详情" width="150"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>
    </el-form>
    <!-- 按钮 -->
    <el-button
      v-if="isShowBtn"
      class="editeFormBtn el-icon-edit"
      type="primary"
      @click="editeBtn"
      circle
    ></el-button>
    <el-button v-else class="saveFormBtn el-icon-s-claim" @click="saveBtn" circle></el-button>
  </div>
</template>

<script>
import { getOfShopInfo, postOfShopEdit } from "@/api/shop";
export default {
  created() {
    this.getShopInfo();
  },
  data() {
    return {
      actionApi: "http://127.0.0.1:5050/shop/upload",
      serverApi: "http://127.0.0.1:5050/upload/shop/",
      shopmanageForm: {
        shopname: "", // 商品名称
        address: "", // 详细地址
        phone: "", // 联系电话
        shopdesc: "", // 店铺简介
        slogan: "", // 店铺标语
        category: "", // 店铺分类
        feature: [], // 店铺特色
        packingexpense: "", // 包装费
        minprice: "", // 起送价
        date: [], // 营业时间
        shopAvatar: "", // 店铺头像
        businessLicenseImg: "", // 营业执照
        cateringServiceLicenseImg: "", // 餐饮许可
        // 优惠活动表格
        tableData: [
          {
            activityTitle: "",
            activityName: "",
            activityDetail: ""
          }
        ]
      },
      specialOffer: "", // 优惠活动 -------------
      // 模态框
      dialogForm: { detail: "" },
      dialogFormVisible: false,
      isDisabled: true, // 控制表单可否编辑状态
      isShowBtn: true // 切换保存和编辑按钮
      // 表单验证
      /* goodsaddRules: {
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }, */
    };
  },
  methods: {
    // 优惠活动下拉框值改变时
    specialOfferChange() {
      // 判断优惠表格是否已经有了此优惠项
      let flag = true;
      // 遍历循环优惠活动表格 every filter
      flag = this.shopmanageForm.tableData.every(
        item => item.activityName !== this.specialOffer
      );
      if (flag) {
        this.dialogFormVisible = true;
      } else {
        this.$message({
          type: "warning",
          message: "你已经添加了此优惠活动，如需修改请先删除后再重新添加 emmm",
          duration: 2000
        });
        this.specialOffer = "";
      }
    },
    // 模态框的确定按钮
    dialogBtn() {
      let obj = {
        activityTitle: this.specialOffer.slice(0, 1),
        activityName: this.specialOffer,
        activityDetail: this.dialogForm.detail
      };

      this.shopmanageForm.tableData.unshift(obj);
      this.dialogForm.detail = "";
      this.specialOffer = "";
      this.dialogFormVisible = false;
    },
    // 模态框取消按钮
    dialogBtnFalse() {
      this.dialogForm.detail = "";
      this.specialOffer = "";
      this.dialogFormVisible = false;
    },
    // 优惠活动表格 - 删除按钮
    handleDelete(index, row) {
      this.$confirm("确定要删除吗", "提示", {
        confirmButtonText: "取消",
        cancelButtonText: "确定",
        type: "warning"
      })
        .then(() => false)
        .catch(() => {
          this.shopmanageForm.tableData.splice(index, 1);
        });
    },
    // 保存按钮
    async saveBtn() {
      let {
        shopname,
        address,
        phone,
        shopdesc,
        slogan,
        category,
        feature,
        packingexpense,
        minprice,
        date,
        shopAvatar,
        businessLicenseImg,
        cateringServiceLicenseImg,
        tableData
      } = this.shopmanageForm;
      let params = {
        shopname,
        address,
        phone,
        shopdesc,
        slogan,
        category,
        feature: JSON.stringify(feature),
        packingexpense,
        minprice,
        date: JSON.stringify(date),
        shopAvatar,
        businessLicenseImg,
        cateringServiceLicenseImg,
        tableData: JSON.stringify(tableData)
      };
      // console.log(params);
      await postOfShopEdit(params);
      this.isShowBtn = true;
      this.isDisabled = true;
    },
    // 修改按钮
    editeBtn() {
      // 判断现在的时间是否大于之前设置的时间
      let nowTime = new Date().getTime();
      let setTime = window.sessionStorage.getItem("saveTime");
      if (setTime) {
        if (nowTime < setTime) {
          this.$message({
            type: "warning",
            message: "请不要频繁操作! 请稍后再试!",
            duration: 1000
          });
          return;
        }
      }
      this.isShowBtn = false;
      this.isDisabled = false;
      // 设置一个时间
      window.sessionStorage.setItem(
        "saveTime",
        JSON.stringify(new Date().getTime() + 20000)
      );
    },
    // 获取店铺信息
    async getShopInfo() {
      let { data } = await getOfShopInfo();
      for (let key in data) {
        key === "date" || key === "feature" || key === "tableData"
          ? (data[key] = JSON.parse(data[key]))
          : false;
      }
      this.shopmanageForm = data;
    },
    // 图片上传成功回调
    handleAvatarSuccess1(res, file) {
      this.shopmanageForm.shopAvatar = res.imgUrl;
    },
    handleAvatarSuccess2(res, file) {
      this.shopmanageForm.businessLicenseImg = res.imgUrl;
    },
    handleAvatarSuccess3(res, file) {
      this.shopmanageForm.cateringServiceLicenseImg = res.imgUrl;
    },
    // 图片上传前的处理函数
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
    }
  }
};
</script>

<style lang="less">
.shop-manage {
  padding-top: 10px;
  width: 750px;
  // 改变输入框宽度
  /* .inputWidth {
    width: 400px;
  } */
  // 提交了修改按钮 - 定位
  .editeFormBtn,
  .saveFormBtn {
    position: fixed;
    bottom: 60px;
    right: 70px;
    font-size: 24px;
  }
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  // 优惠活动--表格
  .goodsaddForm-table {
    text-align: center;
    margin-left: -65px;
    box-shadow: 0 2px 8px #ebeef5;
    border-radius: 5px;
    width: 560px;
    margin-bottom: 10px;
    .add-btn {
      margin: 20px 0;
      padding: 7px 28px;
      // color: #abb1b9;
    }
    // 优惠活动 表格
    tbody {
      tr {
        td {
          &:first-child {
            div {
              background-color: #fd416315;
              color: #fd4163;
              width: 30px;
              line-height: 30px;
              margin-left: 30px;
              text-align: center;
              padding: 0;
              border-radius: 20px;
            }
          }
        }
        &:nth-child(1) {
          td {
            &:first-child {
              div {
                background-color: #fd416315;
                color: #fd4163;
              }
            }
          }
        }
        &:nth-child(2) {
          td {
            &:first-child {
              div {
                background-color: #7048fd15;
                color: #7048fd;
              }
            }
          }
        }
        &:nth-child(3) {
          td {
            &:first-child {
              div {
                background-color: #0acd5e15;
                color: #0acd5e;
              }
            }
          }
        }
        &:nth-child(4) {
          td {
            &:first-child {
              div {
                background-color: #f45fa715;
                color: #f45fa7;
              }
            }
          }
        }
      }
    }
  }
  .el-table .cell,
  .el-table th div {
    padding-left: 30px;
  }
}
</style>