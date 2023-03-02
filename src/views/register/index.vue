<template>
  <div>
    <h1 style="text-align: center">Register</h1>
    <el-container id="container">
      <el-main id="main">
        <el-form
            ref="formLogin"
            :model="formLogin"
            :rules="ruleFormLogin"
            label-width="100px"
        >
          <el-row justify="center">
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="Username" prop="username">
                <el-input v-model="formLogin.username"
                          placeholder="Username"
                          clearable
                          size="large"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row justify="center">
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="Password" prop="password">
                <el-input
                    v-model="formLogin.password"
                    type="password"
                    placeholder="Password"
                    show-password
                    size="large"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10" justify="center">
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" :offset="1">
              <el-button type="primary" @click="onRegister">Register</el-button>
              <el-button @click="onLogin">Back to Login</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  name: "Register",
  data() {
    return {
      ruleFormLogin: {
        username: {required: true, message: 'Username required', trigger: 'blur'},
        password: {required: true, message: 'Password required', trigger: 'blur'}
      },
      formLogin: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onRegister() {
      this.$refs.formLogin.validate((valid) => {
        if (!valid) return;

        this.$message.success('Register success!')
        this.$router.push({path: '/login', replace: true})
      })
    },
    onLogin() {
      this.$router.push({path: '/login', replace: true})
    }
  }
}
</script>

<style scoped>
#container {
  width: 100%;
  height: 100%;
  margin-top: -5vh;
}

#main {
  margin-top: 10vh;
}
</style>
