<script setup lang="ts">
import { ref } from "vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import CategoriesComponent from "../components/CategoriesComponent.vue";
import RecommendedEvents from "../components/RecommendedEvents.vue";
import OurPartners from "../components/OurPartners.vue";
import UnforgettableMoments from "../components/UnforgettableMoments.vue";
import FooterComponent from "../components/FooterComponent.vue";
import UserFeedback from "../components/UserFeedback.vue";
import FilterComponent from "../components/FilterComponent.vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const router = useRouter();

const { t, locale } = useI18n({ useScope: "global" });

const filterComponentRef = ref();

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

window.scrollTo(0, 0);

const gettedCat = ref();
const getEmit = (e: any) => {
  gettedCat.value = e;
  filterComponentRef.value.$el.scrollIntoView({ behavior: "smooth" });
};

const searchValue = ref();
const getSearch = (e: any) => {
  searchValue.value = e;
  filterComponentRef.value.$el.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
  <HeaderComponent v-if="!selectCity" @search="getSearch" />
  <div class="banner">
    <div v-if="!selectCity">
      <h1>{{ $t("TRAVEL") }}</h1>
      <p class="banner__btn" @click="selectCity = true">{{ $t("SELECTCITY") }}</p>
    </div>
    <div v-else class="select-city_block">
      <div class="intro_content">
        <img src="../assets/img/logo.svg" alt="" />
        <p class="intro_content-text">{{ $t("SERVICESEARCH") }}</p>
      </div>
      <div class="select-city">
        <p class="select-city_title">{{ $t("SELECTCITY") }}</p>
        <div class="city_list">
          <p
            @click="city = 'Astana'"
            class="select-city_name"
            :class="{ 'active-city': city === 'Astana' }"
          >
            {{ $t("ASTANA") }}
          </p>
          <p
            @click="city = 'Almaty'"
            class="select-city_name"
            :class="{ 'active-city': city === 'Almaty' }"
          >
            {{ $t("ALMATY") }}
          </p>
          <p
            @click="city = 'Shymkent'"
            class="select-city_name"
            :class="{ 'active-city': city === 'Shymkent' }"
          >
            {{ $t("SHYMKENT") }}
          </p>
          <p
            @click="city = 'Kyzylorda'"
            class="select-city_name"
            :class="{ 'active-city': city === 'Kyzylorda' }"
          >
            {{ $t("KYZYLORDA") }}
          </p>
          <p
            @click="city = 'Atyrau'"
            class="select-city_name"
            :class="{ 'active-city': city === 'Atyrau' }"
          >
            {{ $t("ATYRAU") }}
          </p>
          <p
            @click="city = 'Karagandy'"
            class="select-city_name"
            :class="{ 'active-city': city === 'Karagandy' }"
          >
            {{ $t("KARAGANDY") }}
          </p>
          <p
            @click="city = 'Pavlodar'"
            class="select-city_name"
            :class="{ 'active-city': city === 'Pavlodar' }"
          >
            {{ $t("PAVLODAR") }}
          </p>
          <p
            @click="city = 'Kokshetau'"
            class="select-city_name"
            :class="{ 'active-city': city === 'Kokshetau' }"
          >
            {{ $t("KOKSHETAU") }}
          </p>
        </div>
        <p class="select-btn" @click="setCity">{{ $t("SELECTBTN") }}</p>
      </div>
    </div>
  </div>
  <template v-if="!selectCity">
    <CategoriesComponent @category="getEmit" />
    <RecommendedEvents />
    <FilterComponent :sendCategory="gettedCat" :sendSearch="searchValue" ref="filterComponentRef" />
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
  max-width: 650px;
  margin: 0 auto;
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
  .select-city {
    width: 80%;
  }
  .select-city_title {
    font-weight: 700;
    font-size: 25px;
  }
  .city_list {
    align-items: center;
    gap: 15px;
  }
  .intro_content {
    display: none;
  }
  h1 {
    font-size: 45px;
    max-width: 350px;
  }
  .banner__btn {
    font-size: 16px;
    padding: 5px 20px;
    max-width: 200px;
    margin-top: 30px;
  }
}
</style>
