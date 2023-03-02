<template>
  <el-container direction="vertical">
    <Header ref="header" v-if="screenWidth > 820"/>
    <el-container :direction="screenWidth <= 820 ? 'vertical' : 'horizontal'">
      <Sidebar :screen-width="screenWidth" :screen-height="screenHeight"/>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default {
  name: "Index",
  components: {
    Header,
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
      this.screenHeight = window.innerHeight - 60 // by default header has height = 60px
    }
  }
}
</script>

<style scoped>

</style>
