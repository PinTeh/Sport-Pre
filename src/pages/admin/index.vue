<template>
  <div class="admin-container" element-loading-background="transparent">
    <el-container style="height:100%;">
      <el-aside>
        <div class="el-aside-logo">
          <div v-if="!isCollapse">
            体育馆
            <i>管理系统</i>
          </div>
          <div style="margin-left:-15px;" v-else>
            <i>S</i>
          </div>
        </div>
        <el-menu
          unique-opened	
          :default-active="activeIndex"
          class="el-menu-vertical"
          @select="handleSelect"
          text-color="rgb(191, 203, 217)"
          active-text-color="rgb(64, 158, 255)"
          :collapse="isCollapse"
        >
          <div v-for="item in menu" :key="item.path">
            <el-submenu :index="item.path" v-if="item.children && item.children.length > 0">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.label}}</span>
              </template>
              <div class="el-group-self">
                <el-menu-item v-for="sub in item.children" :key="sub.path" :index="sub.path">
                  <i :class="sub.icon"></i>
                  <span slot="title">{{sub.label}}</span>
                </el-menu-item>
              </div>
                
            </el-submenu>
            <el-menu-item v-else :key="item.path" :title="item.label" :index="item.path">
              <i :class="item.icon"></i>
              <span slot="title">{{item.label}}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header>
          <div class="header-div">
            <!-- Ant
            <i>Live</i>-->
            
            <el-dropdown @command="handleCommand" class="header-dropdown">
              <span class="el-dropdown-link">
                <el-avatar
                  size="small"
                  style="vertical-align:middle;margin-top:-8px;"
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                ></el-avatar>管理员
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">个人信息</el-dropdown-item>
                <el-dropdown-item command="c" divided>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>@CopyRight PinTeh</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import screenfull from "screenfull";
export default {
  name: "admin-index",
  data() {
    return {
      isCollapse: false,
      activeIndex: "charts",
      select_title: "首页",
      menu: [
        {
          index: 1,
          icon: "el-icon-data-board",
          path: "charts",
          label: "首页"
        },
        {
          index: 2,
          icon: "el-icon-user",
          path: "user-manage",
          label: "用户中心"
        },
        {
          index: 3,
          icon: "el-icon-user",
          path: "gym-manage",
          label: "场馆中心"
        },
        {
          index: 4,
          icon: "el-icon-user",
          path: "order-manage",
          label: "订单中心"
        },
        {
          index: 5,
          icon: "el-icon-user",
          path: "place-manage",
          label: "场地中心"
        },
                {
          index: 6,
          icon: "el-icon-user",
          path: "store-manage",
          label: "收藏管理"
        },
                {
          index: 7,
          icon: "el-icon-user",
          path: "city-manage",
          label: "城市管理"
        },
      ],
      loading:true
    };
  },
  mounted() {

  },
  methods: {
    handleScreenfull() {
      screenfull.toggle();
    },
    handleSelect(key) {
      this.activeIndex = key;
      this.menu.map(v => {
        if (v.path == key) {
          this.select_title = v.title;
          return;
        }
      });
      this.$router
        .push({
          path: "/admin/" + key
        })
        .catch(() => {});
    },
    handleFold() {
      this.isCollapse = !this.isCollapse;
      console.log("click");
    },
    handleCommand(command) {
      this.$message("click on item " + command);
    }
  }
};
</script>

<style lang="less">
.admin-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .el-breadcrumb-nav {
    margin: 10px 0px 10px 5px;
  }
  .header-dropdown {
    float: right;
  }
  .el-submenu__title:hover {
    background-color: #263445 !important;
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    background: rgb(48, 65, 86);
    border: none;
  }
  .header-div {
    border-bottom: 1px solid #e0e0e0;
    padding: 0px 20px 0px 20px;
    i {
      color: rgb(102, 102, 102);
      font-style: normal;
    }
  }
  .el-header {
    background-color: #fff;
    line-height: 45px;
    height: auto !important;
    padding: 0px;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  }
  .el-footer {
    background: #fff;
    color: #333;
    text-align: center;
    line-height: 35px;
    height: 35px !important;
    font-size: 12px;
    border-top: solid 2px rgb(245, 245, 245);
  }
  .el-aside {
    color: #333;
    // line-height: 200px;
    width: auto !important;
    background: rgb(48, 65, 86);
  }
  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    padding: 10px 5px 0px 5px;
  }
  .el-menu {
    border: none;
    background-color: rgb(48, 65, 86) !important;
  }
  .el-group-self .el-menu-item {
    background-color: #202b3a !important;
  }
  .el-menu-item:focus,
  .el-menu-item:hover {
    background-color: #263445 !important;
  }
  .el-aside-logo {
    line-height: 60px;
    height: 60px;
    padding-left: 40px;
    color: rgb(221, 221, 221);
    background-color: rgb(38, 52, 70);
    i {
      color: lightcoral;
      font-style: normal;
    }
  }
}
</style>