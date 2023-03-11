<template>
  <el-menu default-active="0"
           :collapse="isCollapse"
           :style="{
             width: !isCollapse ? '300px': 'min-content'
           }"
  >
    <RouterLink to="/">
      <el-menu-item index="0" class="menu_item">
        <el-icon>
          <Menu/>
        </el-icon>
        <template #title>
          <span>Dashboard</span>
        </template>
      </el-menu-item>
    </RouterLink>
    <el-sub-menu index="1" class="menu_item">
      <template #title>
        <el-icon>
          <Tools/>
        </el-icon>
        <span>Build</span>
      </template>
      <RouterLink to="/build/new">
        <el-menu-item index="1-1">
          <el-icon>
            <Plus/>
          </el-icon>
          <template #title>
            <span>New</span>
          </template>
        </el-menu-item>
      </RouterLink>
      <RouterLink to="/build/template">
        <el-menu-item index="1-2">
          <el-icon>
            <Notebook/>
          </el-icon>
          <template #title>
            <span>Template</span>
          </template>
        </el-menu-item>
      </RouterLink>
    </el-sub-menu>
    <RouterLink to="/manage">
      <el-menu-item index="2" class="menu_item">
        <el-icon>
          <Setting/>
        </el-icon>
        <template #title>
          <span>Manage</span>
        </template>
      </el-menu-item>
    </RouterLink>
    <RouterLink to="/about">
      <el-menu-item index="3" class="menu_item">
        <el-icon>
          <QuestionFilled/>
        </el-icon>
        <template #title>
          <span>About</span>
        </template>
      </el-menu-item>
    </RouterLink>
  </el-menu>
</template>

<script>
import {Menu, Notebook, Plus, QuestionFilled, Setting, Tools} from '@element-plus/icons-vue'

export default {
  name: "SidebarMenu",
  components: {
    Tools,
    Menu,
    Notebook,
    QuestionFilled,
    Setting,
    Plus
  },
  data() {
    return {
      isCollapse: false
    }
  },
  mounted() {
    this.receiver()
  },
  methods: {
    receiver() {
      this.emitter.on("collapseScreen", () => {
        this.isCollapse = !this.isCollapse
      });
    },
  }
}
</script>

<style scoped>

.el-menu--collapse {
  width: fit-content;
}
</style>
