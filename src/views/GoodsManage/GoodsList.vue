<template>
  <div class="goods-list">
    <el-table :data="goodsListTableData" style="width: 100%" height="460">
      <el-table-column type="expand">
        <template slot-scope="props">
          <!-- 展开内容 -->
          <el-form label-position="left" inline class="demo-table-expand down-list">
            <el-form-item label="商品ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <span>
                <img
                  width="100"
                  height="100"
                  style="border-radius: 4px"
                  :src="serveApi + props.row.imgUrl"
                />
              </span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.goodsname }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.goodscategory }}</span>
            </el-form-item>
            <el-form-item label="商品特色">
              <span>{{ props.row.goodsfeature | filterFeature}}</span>
            </el-form-item>
            <el-form-item label="是否促销">
              <span>{{ props.row.isPromotion }}</span>
            </el-form-item>
            <el-form-item label="商品规格">
              <span>{{ props.row.standard | filterStandard }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.goodsdesc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品 ID" prop="id"></el-table-column>
      <el-table-column label="商品名称" prop="goodsname"></el-table-column>
      <el-table-column label="描述" prop="goodsdesc"></el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="totalPage"
      layout="prev, pager, next"
    ></el-pagination>
  </div>
</template>

<script>
import { getOfGoodsList, getOfGoodsDel } from "@/api/goods";
import local from "@/utils/local";
export default {
  created() {
    this.getGoodsList();
  },
  data() {
    return {
      serveApi: "http://127.0.0.1:5050/upload/goods/",
      goodsListTableData: [
        {
          id: 1,
          imgUrl: "",
          goodsname: "",
          goodscategory: "",
          goodsfeature: "",
          isPromotion: "",
          standard: "",
          goodsdesc: ""
        }
      ],
      currentPage: 1, // 当前页码
      pageSize: 6, // 每页条数
      totalPage: 0 // 总条数
    };
  },
  methods: {
    // 当前页改变时
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getGoodsList();
    },
    // 获取商品列表
    async getGoodsList() {
      let { total, data } = await getOfGoodsList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
      if (!data.length && this.currentPage > 1) {
        this.currentPage--;
        this.getGoodsList();
      }
      this.goodsListTableData = data;
      this.totalPage = total;
    },
    // 编辑按钮
    handleEdit(index, row) {
      window.sessionStorage.setItem("row2", JSON.stringify(row));
      this.$router.push("/home/goodsedit");
    },
    // 删除按钮
    handleDelete(index, { id }) {
      let role = local.get("role");
      if (role === "super") {
        this.$confirm("确定要删除吗", "提示", {
          confirmButtonText: "取消",
          cancelButtonText: "确定",
          type: "warning"
        })
          .then(() => false)
          .catch(async () => {
            await getOfGoodsDel({ id });
            this.getGoodsList();
          });
      } else {
        this.$message({
          type: "warning",
          message: "暂无此权限",
          duration: 1000
        });
      }
    }
  },
  filters: {
    filterFeature(f) {
      return JSON.parse(f).join(" / ");
    },
    filterStandard(s) {
      return JSON.parse(s)
        .map(
          item =>
            `${item.goodsstandard} - ${item.packingexpense} - ${item.goodsPrice}`
        )
        .join("  /  ");
    }
  }
};
</script>

<style lang="less">
.goods-list {
  .el-table::before {
    height: 0;
  }
  // 分页器
  .el-pagination {
    margin-top: 20px;
    text-align: center;
  }
  // 展开详情
  .down-list {
    .el-form-item {
      display: block;
      margin-bottom: 6px;
      .el-form-item__label {
        display: inline-block;
        width: 75px;
        text-align: center;
        background-color: #f5f8fa;
        border-radius: 40px;
        color: #98a7b9;
        font-size: 12px;
        line-height: 30px;
        padding: 0;
        vertical-align: middle;
        margin-right: 15px;
      }
      .el-form-item__content {
        vertical-align: middle;
      }
    }
  }
}
</style>