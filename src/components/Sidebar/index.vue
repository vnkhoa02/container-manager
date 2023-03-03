<template>
  <el-aside v-if="screenWidth > 820"
            id="sidebar"
            :style="{
                height: screenHeight,
                minHeight: '100vh'
              }"
  >
    <SidebarMenu/>
  </el-aside>
  <el-header v-else id="header">
    <el-row justify="start">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-button :icon="Menu"
                   @click="onOpenMenu"
                   size="large"
        />
      </el-col>
    </el-row>
  </el-header>
  <SidebarMobile
      v-if="isOpenMenu"
      :visible="isOpenMenu"
      @close="isOpenMenu = false"
  />
</template>

<script>
import {Menu} from '@element-plus/icons-vue'
import SidebarMobile from "@/components/SidebarMobile";
import SidebarMenu from "@/components/Menu";

export default {
  name: "index",
  components: {SidebarMenu, SidebarMobile},
  props: {
    screenWidth: {
      type: Number
    },
    screenHeight: {
      type: Number
    }
  },
  data() {
    return {
      Menu,
      isOpenMenu: false
    }
  },
  methods: {
    onOpenMenu() {
      this.isOpenMenu = true
    }
  }
}
</script>

<style scoped>
#sidebar {
  border: 1px solid black;
  border-top: 0;
}

#header {
  margin: 0;
  padding: 0;
  background-color: #089d9d;
  height: fit-content;
}
</style>
