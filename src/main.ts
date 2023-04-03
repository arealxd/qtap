import { createApp } from "vue";
import { createPinia } from "pinia";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(Antd);
app.use(VueAxios, axios);
app.use(createPinia());
app.use(router);
app.use(autoAnimatePlugin);

app.mount("#app");
