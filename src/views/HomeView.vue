<script setup lang="ts">
import { ref } from "vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import CategoriesComponent from "../components/CategoriesComponent.vue";
import RecommendedEvents from "../components/RecommendedEvents.vue";
import OurPartners from "../components/OurPartners.vue";
import UnforgettableMoments from "../components/UnforgettableMoments.vue";
import FooterComponent from "../components/FooterComponent.vue";
import UserFeedback from "../components/UserFeedback.vue";

const selectCity = ref(true);
if (localStorage.getItem("city") !== null) {
  selectCity.value = false;
}

const city = ref("");

const setCity = () => {
  if (city.value !== "") {
    localStorage.setItem("city", city.value);
    selectCity.value = false;
  }
};
</script>

<template>
  <HeaderComponent v-if="!selectCity" />
  <div class="banner">
    <div v-if="!selectCity">
      <h1>Travel Around<br />the Kazakhstan</h1>
      <p class="banner__btn">Select your location</p>
    </div>
    <div v-else class="select-city_block">
      <div class="intro_content">
        <img src="../assets/img/logo.svg" alt="" />
        <p class="intro_content-text">Service for searching impressions in Kazakhstan</p>
      </div>
      <div class="select-city">
        <p class="select-city_title">Select your city</p>
        <div class="city_list">
          <p
            @click="city = 'Astana'"
            class="select-city_name"
            :class="{ 'active-city': city === 'Astana' }"
          >
            Astana
          </p>
          <p
            @click="city = 'Almaty'"
            class="select-city_name"
            :class="{ 'active-city': city === 'Almaty' }"
          >
            Almaty
          </p>
          <p
            @click="city = 'Shymkent'"
            class="select-city_name"
            :class="{ 'active-city': city === 'Shymkent' }"
          >
            Shymkent
          </p>
          <p
            @click="city = 'Kyzylorda'"
            class="select-city_name"
            :class="{ 'active-city': city === 'Kyzylorda' }"
          >
            Kyzylorda
          </p>
          <p
            @click="city = 'Atyrau'"
            class="select-city_name"
            :class="{ 'active-city': city === 'Atyrau' }"
          >
            Atyrau
          </p>
          <p
            @click="city = 'Karagandy'"
            class="select-city_name"
            :class="{ 'active-city': city === 'Karagandy' }"
          >
            Karagandy
          </p>
          <p
            @click="city = 'Pavlodar'"
            class="select-city_name"
            :class="{ 'active-city': city === 'Pavlodar' }"
          >
            Pavlodar
          </p>
          <p
            @click="city = 'Kokshetau'"
            class="select-city_name"
            :class="{ 'active-city': city === 'Kokshetau' }"
          >
            Kokshetau
          </p>
        </div>
        <p class="select-btn" @click="setCity">Select</p>
      </div>
    </div>
  </div>
  <template v-if="!selectCity">
    <CategoriesComponent />
    <RecommendedEvents />
    <OurPartners />
    <UnforgettableMoments />
    <UserFeedback />
    <FooterComponent />
  </template>
</template>

<style scoped>
.banner {
  background-image: url("../assets/img/banner.png");
  padding-top: clamp(1rem, 15vw + 1rem, 15rem);
  padding-bottom: clamp(1rem, 20vw + 1rem, 20rem);
  background-position: center;
  background-size: cover;
  flex-grow: 1;
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

.intro_content {
  margin-top: -140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
}

.intro_content-text {
  font-weight: 500;
  font-size: 18px;
  color: #000000;
  text-align: center;
  margin-top: 5px;
}

.select-city {
  background: #ffffff;
  box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 35px 49px;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
}

.select-city_title {
  font-weight: 500;
  font-size: 32px;
  line-height: 48px;
  color: #202020;
  text-align: center;
}

.city_list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.select-city_name {
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: #202020;
  cursor: pointer;
}

.select-city_name:hover {
  transition: all 0.3s ease-out;
  text-decoration: underline;
  text-underline-offset: 8px;
  text-decoration-thickness: 2px;
  color: #cf350e;
}

.active-city {
  text-decoration: underline;
  text-underline-offset: 8px;
  text-decoration-thickness: 2px;
  color: #cf350e;
}

.select-btn {
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #ffffff;
  padding: 10px 0px;
  width: 100%;
  max-width: 174px;
  text-align: center;
  margin: 0 auto;
  background: #009580;
  border-radius: 12px;
  margin-top: 25px;
  cursor: pointer;
}

.select-btn:hover {
  transition: all 0.3s ease-out;
  background: #007a6a;
}

@media screen and (max-width: 575px) {
  h1 {
    font-size: 45px;
  }
  .banner__btn {
    font-size: 16px;
    padding: 5px 20px;
    max-width: 200px;
    margin-top: 30px;
  }
}
</style>
