<script setup lang="ts">
import HeaderComponent from "../components/HeaderComponent.vue";
import CategoriesComponent from "../components/CategoriesComponent.vue";
</script>

<template>
  <HeaderComponent />
  <div class="banner">
    <h1>Travel Around<br />the Kazakhstan</h1>
    <p class="banner__btn">Select your location</p>
  </div>
  <CategoriesComponent />
</template>

<style scoped>
.banner {
  margin-top: 1rem;
  background-image: url("../assets/img/banner.png");
  padding-top: 250px;
  padding-bottom: 380px;
}
h1 {
  font-weight: 700;
  font-size: 80px;
  text-align: center;
  color: #2a2a2a;
  text-shadow: 10px 7px 16px rgba(127, 127, 127, 0.299661);
  line-height: 1;
}
.banner__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  padding: 10px 20px;
  background: #f75d37;
  border-radius: 100px;
  margin-top: 48px;
  max-width: 260px;
}
.banner__btn:hover {
  transition: all 0.3s ease-in-out;
  background: #cf350e;
}
</style>
