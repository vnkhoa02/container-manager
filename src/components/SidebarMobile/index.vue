<template>
  <el-drawer v-model="isShow"
             title="Menu"
             direction="ttb"
             size="90%"
             @close="onClose"
  >
    <el-menu
        default-active="0"
        @click="onClose"
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
  </el-drawer>
</template>

<script>
export default {
  name: "SidebarMobile",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    isShow() {
      return this.visible;
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout')
      this.$message.success('Logout success!')
      this.$router.push({path: '/login', replace: true})
    },
    onClose() {
      this.$emit('close', false)
    }
  }
}
</script>

<style scoped>

.menu_item {
  width: 100%;
  border-bottom: 1px solid gray;
  text-decoration: none !important;
  font-size: 16px;
}
</style>
