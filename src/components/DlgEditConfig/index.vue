<template>
  <el-dialog
      v-model="isShow"
      @close="onClose"
      :close-on-click-modal="false"
      width="80%"
      top="20px"
      :title="`Config ${container?.label.toUpperCase()}`"
  >
    <el-form
        ref="formConfig"
        :model="containerConfig"
        :rules="ruleFormConfig"
        label-width="135px"
        label-position="left"
    >
      {{ containerConfig }}
      <el-row :gutter="10">
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <el-form-item label="Tag" prop="tag">
            <el-select v-model="containerConfig.tag"
                       filterable
                       :loading="isLoadingTags"
                       clearable
                       style="width: 100%;"
                       placeholder="Tag">
              <el-option
                  v-for="tag in tags"
                  :key="tag"
                  :label="tag"
                  :value="tag"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <el-form-item label="Container name" prop="container_name">
            <el-input v-model="containerConfig.container_name"
                      placeholder="Nginx"
                      clearable
            />
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <el-form-item label="Restart" prop="restart">
            <el-input v-model="containerConfig.restart"
                      placeholder=""
                      clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <el-form-item label="Ports" prop="ports">
            <el-input-tag
                v-model:value="containerConfig.ports"
                placeholder="80"
                size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <el-form-item label="Network mode" prop="network_mode">
            <el-input v-model="containerConfig.network_mode"
                      placeholder="bridge"
                      clearable
            />
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <el-form-item label="Depends on" prop="depends_on">
            <el-input v-model="containerConfig.depends_on"
                      placeholder=""
                      clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <el-form-item label="Volumes" prop="volumes">
            <el-input-tag
                v-model:value="containerConfig.volumes"
                size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <el-form-item label="Environment" prop="environment">
            <el-input-tag
                v-model:value="containerConfig.environment"
                size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <el-form-item label="DNS" prop="dns">
            <el-input-tag
                v-model:value="containerConfig.dns"
                size="small"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <el-form-item label="Health Check" prop="healthcheck">
            <el-input-tag
                v-model:value="containerConfig.healthcheck"
                size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form-item label="Command" prop="command">
            <el-input v-model="containerConfig.command"
                      placeholder=""
                      type="textarea"
                      rows="4"
                      resize="none"
                      clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onAutofill" type="success" :loading="isLoadingAutofill">Autofill</el-button>
        <el-button @click="onImportConfig" type="primary" :loading="isLoadingAutofill">Import</el-button>
        <el-button @click="onClose">Cancel</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {mapComputed} from "@/util";
import HubService from "@/constant/HubService";
import {ElMessageBox} from "element-plus";
import cloneDeep from "clone-deep";
import ElInputTag from "@/components/ElInputTag";

export default {
  name: "DlgEditConfig",
  components: {ElInputTag},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    container: {
      type: Object
    }
  },
  data() {
    return {
      ruleFormConfig: {
        tag: {required: true, message: 'Tag required', trigger: ['blur', 'change']},
        container_name: {required: true, message: 'Name required', trigger: ['blur', 'change']},
        restart: {required: true, message: 'Restart required', trigger: ['blur', 'change']},
        ports: {required: true, message: 'Ports required', trigger: ['blur', 'change']},
      },
      containerConfig: cloneDeep(DEFAULT_CONFIG),
      isLoadingTags: false,
      isLoadingAutofill: false,
      tags: []
    }
  },
  computed: {
    isShow: mapComputed('visible')
  },
  watch: {
    isShow(newVal, val) {
      if (newVal) {
        this.getTags(this.container.key)
      } else {
        this.containerConfig = cloneDeep(DEFAULT_CONFIG)
        setTimeout(() => {
          this.$refs.formConfig.clearValidate()
        }, 50)
      }
    }
  },
  methods: {
    async getTags(library) {
      this.isLoadingTags = true
      try {
        const response = await HubService.returnTagsFromLibrary(library)
        this.tags = response.data.tags
      } catch (e) {
        console.error(e)
      } finally {
        this.isLoadingTags = false
      }
    },
    onImportConfig() {
      const message = 'Import config?'
      this.$refs.formConfig.validate((valid) => {
        if (!valid) return;
        ElMessageBox.confirm(
            message,
            {
              confirmButtonText: 'Import',
              cancelButtonText: 'Cancel',
              type: 'warning',
            }
        ).then(() => {
          this.containerConfig.key = this.container.key
          this.containerConfig.image = this.container.key
          this.$emit('importConfig', this.containerConfig)
          this.onClose()
        })
      })
    },
    async onAutofill() {
      this.isLoadingAutofill = true
      try {
        const response = await HubService.autofillConfig(this.container.key)
        if (response.data !== {}) {
          this.containerConfig = Object.assign(this.containerConfig, response.data)
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.isLoadingAutofill = false
      }
    },
    onClose() {
      this.isShow = false
    },
  }
}

const DEFAULT_CONFIG = {
  key: '',
  image: '',
  tag: '',
  container_name: '',
  restart: '',
  network_mode: '',
  ports: [],
  volumes: [],
  environment: [],
  dns: [],
  healthcheck: [],
  command: '',
  depends_on: ''
}
</script>

<style scoped>

</style>
