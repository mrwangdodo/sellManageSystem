<template>
  <div class="home-leftnav">
    <el-aside width="200px">
      <h2 class="logo">
        <router-link to="/home">
          <img src="/images/logo.png" alt="logo" />
        </router-link>
      </h2>
      <el-menu
        :default-active="pathActive"
        class="el-menu-vertical-demo"
        unique-opened
        router
        background-color="#F6F8FC"
        text-color="#656D92"
        active-text-color="#FFFFFF"
      >
        <!-- 遍历出nav列表 -->
        <template v-for="(item, index) in menuItems">
          <!-- 没有子菜单 -->
          <el-menu-item v-if="!(item.children)" :index="item.path" :key="index">
            <i class="iconfont" :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
          <!-- 有子菜单 -->
          <el-submenu v-else :index="item.path" :key="index">
            <template slot="title">
              <i class="iconfont" :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item v-for="(item, index) in item.children" :key="index" :index="item.path">
              <i class="iconfont" :class="item.icon"></i>
              {{ item.title }}
            </el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import local from "@/utils/local";
export default {
  created() {
    let role = local.get("role");
    this.getMenu(role);
  },
  data() {
    return {
      role: "",
      // nav列表
      items: [
        // 后台首页
        {
          path: "/home",
          icon: "icon-happy-f",
          title: "后台首页",
          meta: ["super", "general"]
        },
        // 订单管理
        {
          path: "/home/ordermanage",
          icon: "icon-check-f",
          title: "订单管理",
          meta: ["super", "general"]
        },
        // 商品管理
        {
          path: "/home/3",
          icon: "icon-yingyonglingyu",
          title: "商品管理",
          children: [
            {
              path: "/home/goodslist",
              icon: "icon-shangpinliebiao",
              title: "商品列表",
              meta: ["super", "general"]
            },
            {
              path: "/home/goodsadd",
              icon: "icon-tianjiashangpin",
              title: "添加商品",
              meta: ["super", "general"]
            }
          ],
          meta: ["super", "general"]
        },
        // 店铺管理
        {
          path: "/home/shopmanage",
          icon: "icon-jinrudianpu",
          title: "店铺管理",
          meta: ["super", "general"]
        },
        // 账号管理
        {
          path: "/home/5",
          icon: "icon-eqxiuboy",
          title: "账号管理",
          children: [
            {
              path: "/home/accountlist",
              icon: "icon-renwu",
              title: "账号列表",
              meta: ["super"]
            },
            {
              path: "/home/accountadd",
              icon: "icon-kafei",
              title: "添加账号",
              meta: ["super"]
            },
            {
              path: "/home/accountedit",
              icon: "icon-shafa",
              title: "修改密码",
              meta: ["super", "general"]
            }
          ],
          meta: ["super", "general"]
        },
        // 销售统计
        {
          path: "/home/6",
          icon: "icon-tongji",
          title: "销售统计",
          children: [
            {
              path: "/home/totalgoods",
              icon: "icon-jisutuikuan",
              title: "商品统计"
            },
            {
              path: "/home/totalorder",
              icon: "icon-kuaidi",
              title: "订单统计"
            }
          ],
          meta: ["super"]
        }
      ],
      menuItems: []
    };
  },
  methods: {
    getMenu(role) {
      if (role === "super") {
        this.menuItems = this.items.filter(item => item.meta.includes("super"));
      } else if (role === "general") {
        this.menuItems = this.items.filter(item =>
          item.meta.includes("general")
        );
        this.menuItems.forEach(i => {
          if (i.children) {
            i.children = i.children.filter(item =>
              item.meta.includes("general")
            );
          }
        });
      }
    }
  },
  computed: {
    pathActive() {
      if (this.$route.path === "/home/orderdetail") {
        return "/home/ordermanage";
      } else if (this.$route.path === "/home/goodsedit") {
        return "/home/goodslist";
      } else {
        return this.$route.path;
      }
    }
  },
  filters: {}
};
</script>

<style lang="less">
// scoped
.home-leftnav {
  background-color: #f6f8fc;
  .el-aside {
    user-select: none;
    // 控制每一项的背景
    // 可用
    /* .el-menu-vertical-demo {
        .el-menu-item {
          background-color: red !important;
        }
      } */
    .logo {
      height: 120px;
      text-align: center;
      line-height: 120px;
      a {
        img {
          width: 142px;
          margin-top: 40px;
        }
      }
    }
    .el-menu {
      // .el-menu-item { font-size: 13px !important;}
      border: none;
      .is-active {
        background-color: #744dfe !important;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        .iconfont {
          color: white;
        }
      } //#744DFE 7696ff 3AA0FE
    }
    // 展开的子选项
    .el-submenu {
      .el-menu-item {
        padding-left: 44px !important;
      } // font-size: 13px !important;
    }
    .el-menu-item i,
    .el-submenu__title i {
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 16px;
      vertical-align: middle;
      color: #656d92;
    }
    // 展开的子选项 - 图标
    .el-menu--inline {
      .el-menu-item {
        // background-color: red !important; 可用
        .iconfont {
          color: #656d92;
        }
      }
      .is-active {
        .iconfont {
          color: white;
        }
      }
    }
    .el-submenu__title {
      // font-size: 13px !important;
      .iconfont {
        color: #656d92 !important;
      }
    }
  }
}
</style>