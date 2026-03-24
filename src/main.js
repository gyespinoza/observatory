//import './assets/main.css'

// new styles
import "@/assets/css/bootstrap.css";
import "@/assets/css/revolution-slider.css";
import "@/assets/css/style.css";
import "@/assets/css/responsive.css";


import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import 'devextreme/dist/css/dx.light.css';

// Import Bootstrap
/*import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'*/

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
