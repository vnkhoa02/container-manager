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
          <el-button>Create</el-button>
        </el-row>
      </el-col>
    </el-row>
  </el-space>
</template>

<script>
import HubService from "@/constant/HubService";
import {BaseLoading} from "@/constant/Constant";

export default {
  name: "NewBuild",
  props: {},
  data() {
    return {
      containers: [],
      selectedContainers: []
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
                label: container.name
              }
          )
        }
      } catch (e) {
        console.error(e)
      } finally {
        loading.close()
      }
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
    searchContainer(query, item) {
      return item.label.toLowerCase().includes(query.toLowerCase())
    }
  }
}
</script>

<style scoped>

</style>
