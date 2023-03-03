<template>
  <el-row>
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <el-transfer
          v-model="selectedContainers"
          filterable
          :filter-method="searchContainer"
          filter-placeholder="Centos 7"
          :data="containers"
          :titles="['Containers', 'Selected']"
      />
    </el-col>
  </el-row>
</template>

<script>
import HubService from "@/constant/HubService";

export default {
  name: "NewBuild",
  props: {},
  data() {
    return {
      containers: [],
      selectedContainers: []
    }
  },
  mounted() {
    this.getContainers()
  },
  methods: {
    async getContainers() {
      const data = await HubService.getFullList()
      console.log(data)
    },
    searchContainer(query, item) {
      console.log(query)
      console.log(item)
      // return item.initial.toLowerCase().includes(query.toLowerCase())
    }
  }
}
</script>

<style scoped>

</style>
