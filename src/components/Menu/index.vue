<template>
  <el-menu default-active="0">
    <RouterLink to="/">
      <el-menu-item index="0" class="menu_item">
        <span>Dashboard</span>
      </el-menu-item>
    </RouterLink>
    <el-sub-menu index="1" class="menu_item">
      <template #title>
        <span>Build</span>
      </template>
      <RouterLink to="/build/new">
        <el-menu-item index="1-1">
          <span>New</span>
        </el-menu-item>
      </RouterLink>
      <RouterLink to="/build/template">
        <el-menu-item index="1-2">
          <span>Template</span>
        </el-menu-item>
      </RouterLink>
    </el-sub-menu>
    <RouterLink to="/manage">
      <el-menu-item index="2" class="menu_item">
        <span>Manage</span>
      </el-menu-item>
    </RouterLink>
    <RouterLink to="/about">
      <el-menu-item index="3" class="menu_item">
        <span>About</span>
      </el-menu-item>
    </RouterLink>
  </el-menu>
</template>

<script>
export default {
  name: "SidebarMenu"
}
</script>

<style scoped>

</style>
