import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
    meta: {
      title: "美了吗后台管理-登录",
      crumbs: [
        {}
      ]
    }
  },
  {
    path: "/home",
    component: () => import("../views/Home.vue"),
    meta: {
      title: "美了吗后台管理-首页"
    },
    children: [
      {
        path: "", // 后台首页
        component: () => import("../views/HomeContent.vue"),
        meta: {
          path: "/home"
        }
      },
      {
        path: "/home/ordermanage", // 订单管理
        component: () => import("../views/Order/OrderManage.vue"),
        meta: {
          path: "/home/ordermanage"
        }
      },
      {
        path: "/home/orderdetail", // 订单详情
        name: "/home/orderdetail",
        component: () => import("../views/Order/OrderDetail.vue")
      },
      {
        path: "/home/goodslist", // 商品列表
        component: () => import("../views/GoodsManage/GoodsList.vue")
      },
      {
        path: "/home/goodsadd", // 添加商品
        component: () => import("../views/GoodsManage/GoodsAdd.vue")
      },
      {
        path: "/home/goodsedit", // 修改商品
        component: () => import("../views/GoodsManage/GoodsEdit.vue")
      },
      {
        path: "/home/shopmanage", // 店铺管理
        component: () => import("../views/ShopManage.vue")
      },
      {
        path: "/home/accountlist", // 账号列表
        component: () => import("../views/AccountManage/AccountList.vue")
      },
      {
        path: "/home/accountadd", // 账号添加
        component: () => import("../views/AccountManage/AccountAdd.vue")
      },
      {
        path: "/home/accountedit", // 修改账号
        component: () => import("../views/AccountManage/AccountEdit.vue")
      },
      {
        path: "/home/totalgoods", // 商品统计
        component: () => import("../views/MarketTotal/TotalGoods.vue")
      },
      {
        path: "/home/totalorder", // 订单统计
        component: () => import("../views/MarketTotal/TotalOrder.vue")
      },
      {
        path: "/home/personal", // 个人中心
        component: () => import("../views/Personal.vue"),
        meta: {
          title: "美了吗后台管理-个人中心"
        }
      }
    ]
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router;
