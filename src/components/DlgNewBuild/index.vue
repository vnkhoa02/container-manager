<template>
  <el-dialog
      v-model="isShow"
      @close="onClose"
      :close-on-click-modal="false"
      width="90%"
      top="10px"
      title="Create"
  >
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div style="display: flex; flex-wrap: wrap">
          <el-card v-for="container in containers"
                   :key="container.key"
                   shadow="hover"
                   class="box-card">
            <template #header>
              <div class="card-header">
                <span>{{ container.label }}</span>
                <el-button :icon="Tools" @click="onEditConfig(container)">Config</el-button>
              </div>
            </template>
            <el-scrollbar max-height="300" min-size="200" v-if="container.config">
              <el-descriptions
                  title="Specs"
                  :column="1"
                  size="small"
                  border
              >
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      Image
                    </div>
                  </template>
                  {{ container.config.image }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      Container's name
                    </div>
                  </template>
                  {{ container.config.container_name }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      Restart
                    </div>
                  </template>
                  {{ container.config.restart }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      Network mode
                    </div>
                  </template>
                  {{ container.config.network_mode }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      Ports
                    </div>
                  </template>
                  {{ container.config.ports }}
                </el-descriptions-item>
              </el-descriptions>
            </el-scrollbar>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <DlgEditConfig
        v-model:visible="isShowDlgEditConfig"
        :container="tempContainer"
        @importConfig="importConfig"
    />

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCreate" type="primary">Create</el-button>
        <el-button @click="onClose">Cancel</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {Tools} from '@element-plus/icons-vue'
import {mapComputed} from "@/util";
import DlgEditConfig from "@/components/DlgEditConfig";
import {ElMessageBox} from "element-plus";

export default {
  name: "DlgNewBuild",
  components: {DlgEditConfig},
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
      Tools,
      containers: [],
      tempContainer: null,
      isShowDlgEditConfig: false
    }
  },
  computed: {
    isShow: mapComputed('visible')
  },
  watch: {
    isShow(newVal, val) {
      if (newVal) {
        this.containers = this.formData
      } else {
        this.containers = []
      }
    }
  },
  methods: {
    onClose() {
      this.isShow = false
    },
    onEditConfig(container) {
      this.tempContainer = container
      this.isShowDlgEditConfig = true
    },
    onCreate() {
      const message = 'Create containers?'
      ElMessageBox.confirm(
          message,
          {
            confirmButtonText: 'Import',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
      ).then(() => {
        this.onClose()
      })
    },
    importConfig(config) {
      for (let i = 0; i < this.containers.length; i++) {
        if (this.containers[i].key === config.key) {
          this.containers[i].config = config
          break
        }
      }
    }
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
