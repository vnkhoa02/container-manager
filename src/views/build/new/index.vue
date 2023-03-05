<template>
  <el-space direction="vertical" alignment="normal">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-transfer
            v-model="selectedContainers"
            filterable
            :filter-method="searchContainer"
            filter-placeholder="Centos"
            :data="containers"
            :titles="['Containers', 'Selected']"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-row>
          <el-button>View Compose Sample Preview</el-button>
          <el-button @click="onCreate" :disabled="selectedContainers.length === 0">Create</el-button>
        </el-row>
      </el-col>
    </el-row>

    <DlgNewBuild
        v-model:visible="isShowDlgAddEdit"
        :form-data="formData"
    />
  </el-space>
</template>

<script>
import HubService from "@/constant/HubService";
import {BaseLoading} from "@/constant/Constant";
import DlgNewBuild from "@/components/DlgNewBuild";

export default {
  name: "NewBuild",
  components: {DlgNewBuild},
  props: {},
  data() {
    return {
      containers: [],
      selectedContainers: [],
      formData: [],
      isShowDlgAddEdit: false
    }
  },
  created() {
    this.getContainers()
  },
  methods: {
    async getContainers() {
      const loading = this.$loading(BaseLoading)
      try {
        const response = await HubService.getFullList()
        const containers = response.data.results
        for (const container of containers) {
          this.containers.push(
              {
                key: container.name,
                label: container.name,
                data: container
              }
          )
        }
      } catch (e) {
        console.error(e)
      } finally {
        loading.close()
      }
    },
    onCreate() {
      for (const name of this.selectedContainers) {
        for (const container of this.containers) {
          if (container.label === name) {
            this.formData.push(container)
            break;
          }
        }
      }
      this.isShowDlgAddEdit = true
    },
    searchContainer(query, item) {
      return item.label.toLowerCase().includes(query.toLowerCase())
    }
  }
}
</script>

<style scoped>

</style>
