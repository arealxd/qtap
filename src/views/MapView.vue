<script setup lang="ts">
import { ref } from "vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n({ useScope: "global" });

const googleMapsUrl = ref(
  "https://www.google.com/maps/d/embed?mid=10A9IFKcW8EJap5qEmTKFY9PDHx0u-wI&ehbc=2E312F"
);
</script>

<template>
  <HeaderComponent />
  <div class="rec">
    <div class="header">
      <h1 class="title">{{ $t("MAPOF") }}</h1>
    </div>
    <div class="map" v-auto-animate="{ duration: 500 }">
      <iframe :src="googleMapsUrl" width="100%" height="600"></iframe>
    </div>
  </div>
  <FooterComponent />
</template>

<style scoped lang="scss">
.rec {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 70px;
}
.header {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1260px;
  margin: 0 auto;
}
.title {
  font-weight: 700;
  font-size: 30px;
  color: #000000;
  margin: 0 auto;
}
.map {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-top: 20px;
  width: 100%;
  max-width: 1260px;
  height: 100%;
  max-height: 600px;
}

@media screen and (max-width: 575px) {
  .title {
    font-size: 24px;
    padding: 0 10px;
    text-align: center;
  }
}
</style>
