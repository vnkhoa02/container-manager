import {createApp} from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from "./App.vue";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/es/components/message/style/css'
import './index.css'
import router from './router/router'
import {store} from '@/store'
import './registerServiceWorker'
import mitt from 'mitt';

const emitter = mitt();

const app = createApp(App)

app.config.globalProperties.emitter = emitter;

app.use(VueAxios, axios)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')

