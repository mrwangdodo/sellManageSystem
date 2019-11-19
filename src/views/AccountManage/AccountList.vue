<template>
  <div class="account-list">
    <h3 class="title">账号列表 Account list</h3>
    <div class="al-box">
      <!-- 账号列表表格 -->
      <el-table
        ref="AccountListTable"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        height="360"
      >
        <!-- 选框 -->
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- 姓名 -->
        <el-table-column prop="account" label="账号" width="150"></el-table-column>
        <!-- 用户组 -->
        <el-table-column prop="userGroup" label="用户组" width="150"></el-table-column>
        <!-- 创建日期 -->
        <el-table-column label="创建日期" width="350">
          <template slot-scope="scope">{{ scope.row.ctime | timeFormat }}</template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 批量操作 -->
      <div class="isSelecteAll" style="margin-top: 20px">
        <el-button size="small" class="selecteAll" @click="handleDeleteBatch">批量删除</el-button>
        <el-button size="small" @click="setCurrent" class="noSelecte">取消选择</el-button>
      </div>
      <!-- 分页器 -->
      <!-- @size-change="handleSizeChange" -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="totalPage"
        layout="prev, pager, next"
      >
        <!-- "total, sizes, prev, pager, next, jumper" -->
      </el-pagination>

      <!-- 模态框 -->
      <el-dialog width="480px" title="修改账号" :visible.sync="dialogFormVisible">
        <el-form :model="dialogAccountForm">
          <el-form-item label="账号" :label-width="formLabelWidth" style="width: 341px">
            <el-input v-model="dialogAccountForm.account" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户组" :label-width="formLabelWidth">
            <el-select v-model="dialogAccountForm.userGroup" placeholder="请选择用户组">
              <el-option label="Super超管" value="Super超管"></el-option>
              <el-option label="普通管理员" value="普通管理员"></el-option>
              <el-option label="Vip贵宾组" value="Vip贵宾组"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="yesEdit">确定修改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// 引入封装的请求函数
import {
  getOfAccountList,
  getOfAccountdel,
  getOfAccountdelbatch,
  postOfAccountedit
} from "@/api/account";
// 引入moment
import moment from "moment";
export default {
  created() {
    this.getAccountList();
  },
  data() {
    return {
      // 账号列表
      tableData: [
        {
          name: "",
          userGroup: "",
          date: ""
        }
      ],
      currentPage: 1, // 当前页码
      pageSize: 5, // 每页条数
      totalPage: 0, // 总条数
      selection: [], // 被选中的账号们
      // ids: [] //被选中的账号id们
      dialogFormVisible: false,
      dialogAccountForm: {
        account: "",
        userGroup: "",
        id: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    // 获取账号列表请求
    async getAccountList() {
      let { total, data } = await getOfAccountList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
      // console.log(total, data);

      if (!data.length && this.currentPage > 1) {
        this.currentPage--;
        this.getAccountList();
      }

      this.tableData = data;
      this.totalPage = total;
    },
    // 当选择项变化时
    handleSelectionChange(val) {
      this.selection = val;
    },
    // 取消选择
    setCurrent() {
      this.$refs.AccountListTable.clearSelection();
    },
    // 当前页码改变时
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAccountList();
    },
    // 单行删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该条用户数据?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { id } = row;
          await getOfAccountdel({ id });
          this.getAccountList();
        })
        .catch();
      /* () => {
          this.$message({
            type: "info",
            message: "已取消删除",
            duration: 800
          });
        } */
    },
    // 批量删除
    handleDeleteBatch() {
      let ids = this.selection.map(item => item.id);

      if (!ids.length) {
        this.$message({
          type: "warning",
          message: "你并没有做出选择!!",
          duration: 1000
        });
        return;
      }

      this.$confirm("此操作将永久删除该条用户数据?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await getOfAccountdelbatch({
            ids: JSON.stringify(ids)
          });
          this.getAccountList();
        })
        .catch();
    },
    // 编辑
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.dialogAccountForm = { ...row };
    },
    // 确认修改
    async yesEdit() {
      let { id, account, userGroup } = this.dialogAccountForm;
      await postOfAccountedit({ id, account, userGroup });
      this.dialogFormVisible = false;
      this.getAccountList();
    }
  },
  filters: {
    timeFormat(time) {
      return moment(time).format("YYYY-MM-DD hh:mm:ss");
    }
  },
  computed: {}
};
</script>

<style lang="less">
  
  .account-list {
    .title { 
      color: #8693bb; margin: 10px 0 30px 0; text-indent: 20px; font-weight: 600;
    }
    .al-box {
      box-shadow: 0 2px 8px #EBEEF5; border-radius: 5px; overflow: hidden; padding: 10px 30px 30px 30px;
    }
    .el-table::before { display: none;}
    .el-table {
      td {
         padding: 16px 0;
      }
    }
    .el-pagination {
      margin-top: 20px; text-align: center;
    }
    .isSelecteAll {
      .el-button {
        border: none; padding: 11px 11px; border-radius: 5px; background-color: #EDE8FE; color: #744DFE;
        &:hover {
          background-color: #744DFE; box-shadow: 0 3px 7px #744DFE90; color: white;
        }
      }
      .noSelecte {
        margin-left: 20px;
      }
    }
  }
</style>