<template>
  <el-container :direction="screenWidth <= 820 ? 'vertical' : 'horizontal'">
    <Sidebar :screen-width="screenWidth" :screen-height="screenHeight"/>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import Sidebar from "@/components/Sidebar";

export default {
  name: "Index",
  components: {
    Sidebar
  },
  data() {
    return {
      screenWidth: 0,
      screenHeight: 0,
    }
  },
  mounted() {
    this.screenWidth = window.innerWidth
    this.screenHeight = window.innerHeight
    window.addEventListener('resize', this.updateScreenWidthHeight)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateScreenWidthHeight)
  },
  methods: {
    updateScreenWidthHeight() {
      this.screenWidth = window.innerWidth
      this.screenHeight = window.innerHeight
    }
  }
}
</script>

<style scoped>

</style>
