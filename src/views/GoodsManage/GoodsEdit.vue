<template>
  <div class="goods-edit">
    <el-form
      :model="goodsaddForm"
      :rules="goodsaddRules"
      ref="goodsaddForm"
      label-width="100px"
      class="demo-goodsaddForm"
    >
      <!-- 商品名称 -->
      <el-form-item label="商品名称" prop="shopname">
        <el-input v-model="goodsaddForm.shopname"></el-input>
      </el-form-item>

      <!-- 商品分类 -->
      <el-form-item label="商品分类" prop="goodscategory">
        <el-select v-model="goodsaddForm.goodscategory" placeholder="请选择商品分类">
          <el-option label="饮品" value="饮品"></el-option>
          <el-option label="午餐" value="午餐"></el-option>
          <el-option label="早餐" value="早餐"></el-option>
          <el-option label="晚餐" value="晚餐"></el-option>
          <el-option label="烧烤" value="烧烤"></el-option>
          <el-option label="面食" value="面食"></el-option>
          <el-option label="西餐" value="西餐"></el-option>
          <el-option label="火锅" value="火锅"></el-option>
        </el-select>
      </el-form-item>

      <!-- 商品特色 -->
      <el-form-item label="商品特色" prop="goodsfeature">
        <el-checkbox-group v-model="goodsaddForm.goodsfeature">
          <el-checkbox label="新品上市" name="goodsfeature"></el-checkbox>
          <el-checkbox label="第二单半价" name="goodsfeature"></el-checkbox>
          <el-checkbox label="主打产品" name="goodsfeature"></el-checkbox>
          <el-checkbox label="火爆产品" name="goodsfeature"></el-checkbox>
          <el-checkbox label="祖传手艺" name="goodsfeature"></el-checkbox>
          <el-checkbox label="源自四川" name="goodsfeature"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <!-- 商品图片 -->
      <el-form-item label="商品图片">
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5050/goods/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="goodsaddForm.imgUrl" :src="serverApi + goodsaddForm.imgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <!-- 是否促销 -->
      <el-form-item label="是否促销" prop="isPromotion">
        <el-radio-group v-model="goodsaddForm.isPromotion">
          <el-radio label="促销"></el-radio>
          <el-radio label="不促销"></el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 食品规格 -->
      <el-form-item label="食品规格" prop="standard">
        <el-radio-group v-model="goodsaddForm.standard">
          <el-radio label="单规格"></el-radio>
          <el-radio label="多规格"></el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 单规格: 包装费和价格 -->
      <div class="single-box" v-show="flag">
        <el-form-item label="包装费">
          <el-input-number
            size="small"
            v-model="goodsaddForm.packingexpense"
            :min="0"
            :max="20"
            label="描述文字"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="价格">
          <el-input-number size="small" v-model="goodsaddForm.goodsPrice" :min="10" label="描述文字"></el-input-number>
        </el-form-item>
      </div>

      <!-- 多规格: 表格 -->
      <el-form-item v-show="!flag">
        <div class="goodsaddForm-table">
          <el-table :data="goodsaddForm.tableData">
            <el-table-column prop="goodsstandard" label="规格" width="120"></el-table-column>
            <el-table-column prop="packingexpense" label="包装费" width="120"></el-table-column>
            <el-table-column prop="goodsPrice" label="价格" width="120"></el-table-column>
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
          <el-button round class="el-icon-plus add-btn" @click="dialogFormVisible = true"></el-button>
        </div>
      </el-form-item>

      <!-- 商品描述 -->
      <el-form-item label="商品描述" prop="goodsdesc">
        <el-input type="textarea" v-model="goodsaddForm.goodsdesc"></el-input>
      </el-form-item>

      <!-- 按钮 -->
      <el-form-item>
        <el-button type="primary" @click="goodsAddSubmitForm">立即添加</el-button>
        <!-- <el-button @click="resetForm('goodsaddForm')">重置</el-button> -->
      </el-form-item>
    </el-form>

    <!-- 添加规格 模态框 -->
    <el-dialog width="460px" title="添加规格" :visible.sync="dialogFormVisible">
      <el-form :model="addStandardForm" status-icon :rules="addStandardRules" ref="addStandardForm">
        <el-form-item label="规格" label-width="120px" style="width: 320px" prop="goodsstandard">
          <el-input v-model="addStandardForm.goodsstandard" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="包装费" label-width="120px">
          <el-input-number
            size="medium"
            v-model="addStandardForm.packingexpense"
            :min="0"
            :max="20"
            label="描述文字"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="价格" label-width="120px">
          <el-input-number
            size="medium"
            v-model="addStandardForm.goodsPrice"
            :min="10"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="resetAddStandardForm">取 消</el-button>
        <el-button type="primary" @click="addStandard">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { postOfGoodsEdit } from "@/api/goods";
export default {
  mounted() {
    this.getEditInfo();
  },
  data() {
    const validateStandard = (rule, value, callback) => {
      value === "" ? callback(new Error("规格不能为空")) : callback();
    };
    return {
      // 服务器图片地址
      serverApi: "http://127.0.0.1:5050/upload/goods/",
      // 添加商品表单
      goodsaddForm: {
        shopname: "", // 商品名称
        goodscategory: "", // 商品分类
        goodsfeature: [], // 商品特色
        imgUrl: "", // 图片地址
        isPromotion: "", // 是否促销
        standard: "单规格", // 食品规格
        packingexpense: "", // 包装费
        goodsPrice: "", // 价格
        // 多规格表格
        tableData: [
          {
            goodsstandard: "默认", // 规格
            packingexpense: "0", // 包装费
            goodsPrice: "10" // 价格
          }
        ],
        goodsdesc: ""
      },
      // 模态框状态
      dialogFormVisible: false,
      // 模态框表单
      addStandardForm: {
        goodsstandard: "", // 规格
        packingexpense: "0", // 包装费
        goodsPrice: "10" // 价格
      },
      // 验证模态框表单
      addStandardRules: {
        goodsstandard: [{ validator: validateStandard, trigger: "blur" }]
      },
      // 验证规则
      goodsaddRules: {},
      /* goodsaddRules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }, */

      dialogVisible: false
    };
  },
  methods: {
    // 加载时获取页面信息函数
    getEditInfo() {
      let {
        ctime,
        goodscategory,
        goodsdesc,
        goodsfeature,
        goodsname,
        id,
        imgUrl,
        isPromotion,
        standard
      } = JSON.parse(window.sessionStorage.getItem("row2"));
      let goodsFormObj = {
        shopname: goodsname,
        goodscategory,
        goodsfeature: JSON.parse(goodsfeature),
        imgUrl,
        isPromotion,
        standard:
          JSON.parse(standard)[0].goodsstandard === "单规格" &&
          JSON.parse(standard).length === 1
            ? "单规格"
            : "多规格",
        packingexpense:
          JSON.parse(standard)[0].goodsstandard === "单规格" &&
          JSON.parse(standard).length === 1
            ? JSON.parse(standard)[0].packingexpense
            : "",
        goodsPrice:
          JSON.parse(standard)[0].goodsstandard === "单规格" &&
          JSON.parse(standard).length === 1
            ? JSON.parse(standard)[0].goodsPrice
            : "",
        tableData: !(
          JSON.parse(standard)[0].goodsstandard === "单规格" &&
          JSON.parse(standard).length === 1
        )
          ? JSON.parse(standard)
          : [
              {
                goodsstandard: "默认",
                packingexpense: "0",
                goodsPrice: "10"
              }
            ],
        goodsdesc
      };
      this.goodsaddForm = goodsFormObj;
    },
    // 立即添加-提交表单按钮
    async goodsAddSubmitForm() {
      let {
        shopname,
        goodscategory,
        goodsfeature,
        imgUrl,
        isPromotion,
        standard,
        packingexpense,
        goodsPrice,
        tableData,
        goodsdesc
      } = this.goodsaddForm;
      let params = {
        id: JSON.parse(window.sessionStorage.getItem("row2")).id,
        goodsname: shopname,
        goodscategory,
        goodsfeature: JSON.stringify(goodsfeature),
        imgUrl,
        isPromotion,
        standard:
          standard === "单规格"
            ? JSON.stringify([
                { goodsstandard: standard, packingexpense, goodsPrice }
              ])
            : JSON.stringify(tableData),
        goodsdesc
      };
      let { code } = await postOfGoodsEdit(params);
      code === 0 ? this.$router.push("/home/goodslist") : false;
    },
    // 删除多规格
    handleDelete(index, row) {
      this.$confirm("确定删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let gsftd = this.goodsaddForm.tableData;
          if (gsftd.length < 2) {
            this.$message({
              message: "至少留一条规格给奴家嘛~",
              type: "warning",
              duration: 1000
            });
          } else {
            gsftd.splice(index, 1);
          }
        })
        .catch(() => false);
    },
    // 添加规格按钮
    addStandard() {
      this.$refs.addStandardForm.validate(valid => {
        // console.log(valid);
        if (valid) {
          this.goodsaddForm.tableData.unshift({ ...this.addStandardForm });
          this.addStandardForm = {
            goodsstandard: "",
            packingexpense: "0",
            goodsPrice: "10"
          };
          this.dialogFormVisible = false;
        } else {
          return false;
        }
      });
    },
    // 取消===重置添加规格按钮
    resetAddStandardForm() {
      this.$refs.addStandardForm.resetFields();
      this.dialogFormVisible = false;
    },
    // 图片上传成功的回调
    handleAvatarSuccess(res, file) {
      let { code, imgUrl } = res;
      if (code === 0) {
        this.goodsaddForm.imgUrl = imgUrl;
      }
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
    }
  },
  computed: {
    flag() {
      return this.goodsaddForm.standard === "单规格" ? true : false;
    }
  }
};
</script>

<style lang="less">
.goods-edit {
  // 但规格：包装费和价格
  .single-box {
    box-shadow: 0 2px 8px #ebeef5;
    margin: 0 0 30px 35px;
    padding: 25px 0 5px 0;
    width: 320px;
  }
  // 多规格：表格
  .goodsaddForm-table {
    text-align: center;
    margin-left: -65px;
    box-shadow: 0 2px 8px #ebeef5;
    border-radius: 5px;
    width: 500px;
    margin-bottom: 10px;
    .add-btn {
      margin: 20px 0;
      padding: 7px 28px;
      // color: #abb1b9;
    }
  }
  .el-table .cell,
  .el-table th div {
    padding-left: 30px;
  }
  /* 上传图片------------------------------------------------------------------ */
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
  /* 上传图片------------------------------------------------------------------ */
}
</style>