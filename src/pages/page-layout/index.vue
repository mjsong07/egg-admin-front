<template>
  <el-container class="container">
    <el-aside class="aside" :class="{ 'is-collapse': isCollapse }">
      <asideLogo></asideLogo>
      <asideMenu></asideMenu>
    </el-aside>
    <el-container class="header-main">
      <el-header class="header">
        <i
          class="header-folder"
          :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          @click="changeCollapse"
        ></i>
        <headerMenu></headerMenu>
        <div class="header-right">
          <headerSearch></headerSearch>
          <headerTheme></headerTheme>
          <headerFullsceen></headerFullsceen>
          <headerUser></headerUser>
        </div>
      </el-header>
      <el-main class="main">
        <mainTabs></mainTabs>
        <div class="main-view">
          <keep-alive :include="keepAliveList">
            <router-view></router-view>
          </keep-alive>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import asideLogo from "./components/aside-logo";
import asideMenu from "./components/aside-menu";
import headerMenu from "./components/header-menu";
import headerSearch from "./components/header-search";
import headerTheme from "./components/header-theme";
import headerFullsceen from "./components/header-fullscreen";
import headerUser from "./components/header-user";
import mainTabs from "./components/main-tabs";
import { mapGetters } from "vuex";

export default {
  name: "page-layout",
  components: {
    asideLogo,
    asideMenu,
    headerMenu,
    headerSearch,
    headerTheme,
    headerFullsceen,
    headerUser,
    mainTabs
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["isCollapse", "keepAliveList"])
  },
  methods: {
    changeCollapse() {
      this.$store.commit("CHANGE_COLLAPSE");
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/style/theme/base.scss";
</style>
