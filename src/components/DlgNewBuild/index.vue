<template>
  <el-dialog
      v-model="isShow"
      @close="onClose"
      :close-on-click-modal="false"
      width="90%"
      top="10px"
      title="Create"
  >
    <el-space direction="vertical" alignment="normal">
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-scrollbar>
            <el-card v-for="container in formData"
                     :key="container.key"
                     shadow="hover"
                     class="box-card">
              <template #header>
                <div class="card-header">
                  <span>{{ container.label }}</span>
                  <el-button :icon="Tools">Configure</el-button>
                </div>
              </template>
              <span>{{ container.label }}</span>
            </el-card>
          </el-scrollbar>
        </el-col>
      </el-row>
    </el-space>
  </el-dialog>
</template>

<script>
import {Tools} from '@element-plus/icons-vue'
import {mapComputed} from "@/util";
import {BaseLoading} from "@/constant/Constant";
import HubService from "@/constant/HubService";

export default {
  name: "DlgNewBuild",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Array
    }
  },
  data() {
    return {
      Tools
    }
  },
  computed: {
    isShow: mapComputed('visible')
  },
  watch: {},
  methods: {
    onClose() {
      this.isShow = false
    },
    async getTags(library) {
      const loading = this.$loading(BaseLoading)
      try {
        const response = await HubService.returnTagsFromLibrary(library)
        const tags = response.data.tags
        console.log(tags)
      } catch (e) {
        console.error(e)
      } finally {
        loading.close()
      }
    },
  }
}
</script>

<style scoped>

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  width: 250px;
  margin-left: 10px;
}
</style>
