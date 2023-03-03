<template>
  <el-drawer v-model="isShow"
             title="Menu"
             direction="ttb"
             size="90%"
             @close="onClose"
  >
    <SidebarMenu/>
  </el-drawer>
</template>

<script>
import SidebarMenu from "@/components/Menu";
export default {
  name: "SidebarMobile",
  components: {SidebarMenu},
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
