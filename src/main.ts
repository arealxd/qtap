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

import { languages } from "./i18n";
import { defaultLocale } from "./i18n";
import { createI18n, useI18n } from "vue-i18n";

const localStorageLang = localStorage.getItem("lang");

const messages = Object.assign(languages);
const i18n = createI18n({
  legacy: false,
  locale: localStorageLang || defaultLocale,
  fallbackLocale: "ru",
  messages,
});

const app = createApp(App, {
  setup() {
    const { t } = useI18n();
    return { t };
  },
});

// const app = createApp(App);

app.use(i18n);
app.use(Antd);
app.use(VueAxios, axios);
app.use(createPinia());
app.use(router);
app.use(autoAnimatePlugin);

app.mount("#app");
