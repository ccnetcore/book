<template>
  <div class="main">
   <el-breadcrumb v-show="$route.path!='/home'" separator-class="el-icon-arrow-right">
           <span class="line">|</span>
  <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
  <el-breadcrumb-item v-show="$route.path=='/bookinfo'||$route.path=='/booktype'" >图书信息管理</el-breadcrumb-item>
  <el-breadcrumb-item v-show="$route.path=='/kucunsearch'||$route.path=='/rukusearch'||$route.path=='/chukusearch'">库存信息管理</el-breadcrumb-item>
  <el-breadcrumb-item  :to="{path:$route.path}">{{$route.meta.title}}</el-breadcrumb-item>
</el-breadcrumb>
    <router-view></router-view>
  </div>
</template>
<style scoped>
.el-breadcrumb{
        height: 10px;
        padding: 15px;
        border-radius: 5px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin-bottom: 10px;
}
.line{
        position: absolute;
        color: white;
        border-left:3px solid red ;
        left: 10px;
}
</style>