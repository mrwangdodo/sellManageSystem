<template>
  <div class="home">
    <el-container>
      <!-- 左侧 -->
      <HomeLeft></HomeLeft>
      <!-- 右侧 -->
      <el-container>
        <!-- 右侧头部 -->
        <HomeRightHeader></HomeRightHeader>
        <!-- 右侧内容 -->
        <HomeRightContent></HomeRightContent>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  components: {
    HomeLeft: () => import("../components/Layout/HomeLeft.vue"),
    HomeRightHeader: () => import("../components/Layout/HomeRightHeader.vue"),
    HomeRightContent: () => import("../components/Layout/HomeRightContent.vue")
  }
};
</script>

<style lang="less" scoped>
    .home {
        height: 100%;
        .el-container { height: 100%;
          .el-container { 
             display: flex; flex-direction: column;
          }
        }
    }
</style>