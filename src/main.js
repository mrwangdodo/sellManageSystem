import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui"; // element-ui js
import "element-ui/lib/theme-chalk/index.css"; // element-ui css
import "./assets/css/reset.css"; // 重置样式
import "./assets/fonts/iconFont/iconfont.css"; // iconfont字体图标
import echarts from "echarts"; // 引入echarts
import local from "@/utils/local";

Vue.use(ElementUI); // 使用elemnt-ui
Vue.prototype.$echarts = echarts; // 挂载echarts方法

// 中央事件处理总线 === 中介
const bus = new Vue();
Vue.prototype.$bus = bus;

/* 路由守卫 */
router.beforeEach((to, from, next) => {
  // 判断显示title
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  let token = local.get("token");
  // console.log(token);
  // 先判断是否携带token
  // 再判断是否前往的是登陆页 === 避开登录页
  token ? next() : to.path === "/login" ? next() : next("/login");
});

// 阻止启动生产消息 -- 不懂就度娘
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
