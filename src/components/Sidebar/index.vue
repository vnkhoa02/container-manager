<template>
  <el-aside v-if="screenWidth > 820"
            id="sidebar"
            :style="{
                height: screenHeight,
                minHeight: '100vh'
              }"
  >
    <el-menu
        default-active="0"
    >
      <RouterLink to="/">
        <el-menu-item index="0" class="menu_item">
          <span>Dashboard</span>
        </el-menu-item>
      </RouterLink>
      <RouterLink to="/build">
        <el-menu-item index="1" class="menu_item">
          <span>Build</span>
        </el-menu-item>
      </RouterLink>
      <el-menu-item index="2" class="menu_item" @click="onLogout">
        <span>Logout</span>
      </el-menu-item>
    </el-menu>
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

export default {
  name: "index",
  components: {SidebarMobile},
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
    },
    onLogout() {
      this.$store.dispatch('logout')
      this.$message.success('Logout success!')
      this.$router.push({path: '/login', replace: true})
    }
  }
}
</script>

<style scoped>
#sidebar {
  border: 1px solid black;
}

.menu_item {
  width: 100%;
  border-bottom: 1px solid gray;
  text-decoration: none !important;
  font-size: 16px;
}

#header {
  margin: 0;
  padding: 0;
  background-color: #089d9d;
  height: fit-content;
}
</style>
