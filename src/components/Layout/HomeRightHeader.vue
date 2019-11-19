<template>
  <!-- 右侧头部 -->
  <el-header>
    <el-col>
      <el-col :span="7" class="title">
        <!-- 展示：slogen -->
        <h3></h3>
        <!-- 展示：面包屑 -->
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top:10px;">
          <el-breadcrumb-item :to="{ path: '/' }">
            <i class="home-icon"></i>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="/">活动管理</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        </el-breadcrumb> -->
      </el-col>
      <el-col :span="12" class="nav">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router>
          <!-- 遍历出nav列表 -->
          <div class="active-line" :class="$route.path.slice(6, 10)"></div>
          <el-menu-item v-for="(item, index) in navIcons" :key="index" :index="item.path">
            <span :style="item.bgc" :title="item.name">
              <i class="iconfont" :class="item.icon" :style="item.iconColor"></i>
            </span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="5" class="account">
        <span class="name">{{ account }}</span>
        <!-- 触发下拉 -->
        <el-dropdown placement="bottom" @command="handleCommand">
          <div class="el-dropdown-link">
            <img v-if="imgUrl" class="headerPicture-img" :src="serveApi + imgUrl" alt="头像" />
            <!-- <p class="headerPicture"></p> -->
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus" command="personal">个人中心</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus-outline" command="manage">管理权限</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check" command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
  </el-header>
</template>

<script>
import loacl from "@/utils/local";
import { getOfPersonalInfo } from "@/api/account";
export default {
  created() {
    this.getAccountInfo();
    this.$bus.$on("updateHeader", () => {
      this.getAccountInfo();
    });
    console.log(this.$route);
  },
  data() {
    return {
      // 右侧头部导航数据
      navIcons: [
        // 后台首页
        {
          path: "/home",
          bgc: "background-color: #7048FD20;",
          icon: "icon-31wangwangxuanzhong",
          iconColor: "color: #7048FD;",
          name: "后台首页"
        },
        // 订单管理
        {
          path: "/home/ordermanage",
          bgc: "background-color: #FD416320;",
          icon: "icon-31guanzhu1xuanzhong",
          iconColor: "color: #FD4163;",
          name: "订单管理"
        },
        // 商品列表
        {
          path: "/home/goodslist",
          bgc: "background-color: #6581FF20;",
          icon: "icon-shengriliwu",
          iconColor: "color: #6581FF;",
          name: "商品"
        },
        // 店铺管理
        {
          path: "/home/shopmanage",
          bgc: "background-color: #0ACD5E20;",
          icon: "icon-aliyouxi",
          iconColor: "color: #0ACD5E;",
          name: "店铺管理"
        },
        // 账号列表
        {
          path: "/home/accountlist",
          bgc: "background-color: #F4676D20;",
          icon: "icon-qinmifu",
          iconColor: "color: #F4676D;",
          name: "账号"
        },
        // 销售统计
        {
          path: "/home/totalgoods",
          bgc: "background-color: #F45FA720;",
          icon: "icon-lvyoutehui",
          iconColor: "color: #F45FA7;",
          name: "统计"
        }
      ],
      serveApi: "http://127.0.0.1:5050/upload/account/",
      account: "",
      imgUrl: ""
    };
  },
  methods: {
    // 获取个人信息
    async getAccountInfo() {
      let { accountInfo } = await getOfPersonalInfo();
      let { account, imgUrl } = accountInfo;
      this.account = account;
      this.imgUrl = imgUrl;
    },
    // 退出登录
    handleCommand(command) {
      if (command === "logout") {
        this.$confirm("客官，你要走了吗? 🙁🙁🙁", "提示", {
          confirmButtonText: "取消",
          cancelButtonText: "狠心离开",
          type: "warning"
        })
          .then()
          .catch(() => {
            loacl.remove("token");
            this.$message({
              type: "success",
              message: "期待与你的再次相遇!"
            });
            setTimeout(() => {
              this.$router.push("/login");
              // this.$router.push({path: "/login"});
            }, 1000);
          });
      }
      if (command === "personal") {
        this.$router.push("/home/personal");
      }
    }
  },
  watch: {
    $route(to, from) {
      console.log("这是", this.$route);
    }
  }
};
</script>

<style lang="less" scoped>
.el-header {
  border-bottom: solid 1px #eef1f2;
  height: 100px !important;
  display: flex;
  align-items: center;
  padding-left: 50px;
  padding-right: 50px;
  .home-icon {
    display: inline-block;
    background-color: red;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-top: -3px;
    background: url(/images/logo2.png) no-repeat;
    background-size: auto 100%;
  }
  a {
    text-decoration: none;
  }
  .el-col {
    line-height: 60px;
    margin-top: 20px;
    .account {
      display: flex;
      align-items: center;
      margin-top: 8px;
      .name {
        font-size: 14px;
        color: #676b77;
      }
      .el-dropdown {
        .el-dropdown-link {
          display: flex;
          align-items: center;
          margin-left: 10px;
          .headerPicture {
            width: 46px;
            height: 46px;
            border-radius: 30px;
            background: url("/images/header.png") no-repeat;
            background-size: 100%;
            transition: 0.5s;
            &:hover {
              background-size: 108%;
            }
          }
          .headerPicture-img {
            width: 46px;
            height: 46px;
            border-radius: 30px;
          }
        }
      }
    }
    .title {
      h3 {
        height: 36px;
        background: url(/images/titile.png) no-repeat center;
        background-size: 100%;
        margin-right: 75px;
        margin-top: 4px;
      }
    }
    .nav {
      -border: solid 1px red;
      height: 60px;
      .active-line {
        height: 3px;
        width: 36px;
        border-radius: 10px;
        position: absolute;
        bottom: 0;
        z-index: 100;
        transition: 0.1s;
        transform: translate(10px);
        background-color: #7048fd;
        &.orde {
          transform: translate(66px);
          background-color: #fd4163;
        }
        &.good {
          transform: translate(122px);
          background-color: #6581ff;
        }
        &.shop {
          transform: translate(178px);
          background-color: #0acd5e;
        }
        &.acco {
          transform: translate(234px);
          background-color: #f4676d;
        }
        &.tota {
          transform: translate(290px);
          background-color: #f45fa7;
        }
      }
      .el-menu {
        height: 100%;
        display: flex;
        border: none;
        .el-menu-item {
          height: 100%;
          padding: 0;
          padding-left: 0 !important;
          margin: 0 10px;
          background-color: #fff;
          &:hover {
            background-color: #fff;
          }
          span {
            display: inline-block;
            width: 36px;
            height: 36px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 20px;
            i {
              font-size: 22px;
            }
          }
        }
      }
    }
  }
}
</style>