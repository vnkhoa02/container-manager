<template>
  <el-header id="header">
    <el-row align="middle">
      <el-col :span="8">
        <el-button :icon="Fold"
                   @click="onOpenMenu"
                   size="large"
        />
      </el-col>
      <el-col :span="8">
        <el-row justify="center">
          <el-image style="width: 150px; height: 60px; background: transparent"
                    src="https://dynamic.brandcrowd.com/asset/logo/3cfd6b07-267e-456b-9bb7-d5029cc6bb52/logo-search-grid-1x?logoTemplateVersion=1&v=637654796499570000"
                    fit="fill"/>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row justify="end">
          <el-dropdown trigger="click">
            <el-button
                :icon="ArrowDown"
                size="large"
            >
              Account
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="onLogout">Logout</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-row>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
import {ArrowDown, Expand, Fold} from '@element-plus/icons-vue'

export default {
  name: "Header",
  data() {
    return {
      Fold,
      Expand,
      ArrowDown
    }
  },
  methods: {
    onOpenMenu() {
      this.emitter.emit("collapseScreen");
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

#header {
  margin: 0;
  padding: 0;
  background-color: #089d9d;
}
</style>
