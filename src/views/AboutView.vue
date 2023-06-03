<script setup lang="ts">
import { ref } from "vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n({ useScope: "global" });

const successSubscribe = ref(false);
const email = ref("");

const subscribe = () => {
  successSubscribe.value = true;
  setTimeout(() => {
    successSubscribe.value = false;
    email.value = "";
  }, 2000);
};

window.scrollTo(0, 0);
</script>

<template>
  <HeaderComponent />
  <div class="rec">
    <div class="header">
      <h1 class="title">{{ $t("ABOUTUS") }}</h1>
    </div>
    <div class="about" v-auto-animate="{ duration: 500 }">
      <div class="about__facts">
        <div class="about__facts-fact">
          <img src="/images/about1.png" alt="" />
          <h2 class="about__facts-title">{{ $t("OURGOAL") }}</h2>
          <p class="about__facts-description">
            {{ $t("OURGOALTEXT") }}
          </p>
        </div>
        <div class="about__facts-fact">
          <img src="/images/about2.png" alt="" />
          <h2 class="about__facts-title">{{ $t("OURTEAM") }}</h2>
          <p class="about__facts-description">
            {{ $t("OURTEAMTEXT") }}
          </p>
        </div>
        <div class="about__facts-fact">
          <img src="/images/about3.png" alt="" />
          <h2 class="about__facts-title">{{ $t("OURMISSION") }}</h2>
          <p class="about__facts-description">
            {{ $t("OURMISSIONTEXT") }}
          </p>
        </div>
      </div>
    </div>
    <div class="subscribe">
      <p class="subscribe__title">{{ $t("TOGET") }}</p>
      <p class="subscribe__description">
        {{ $t("NEWS") }}
      </p>
      <form @submit.prevent="subscribe" class="subscribe__form">
        <input v-model="email" type="email" required :placeholder="$t('TYPEEMAIL')" />
        <button>{{ $t("SUBSCRIBE") }}</button>
        <p class="subscribe__form-success" v-if="successSubscribe">
          {{ $t("SUBSCRIBED") }}
        </p>
      </form>
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
  font-size: 42px;
  color: #000000;
}
.about {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin: 0 auto;
  width: 100%;
  max-width: 1260px;
  gap: 10px;
}
.about__facts {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 50px;
  margin-top: 40px;
}
.about__facts-fact {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  img {
    width: 84px;
    height: 84px;
  }
  .about__facts-title {
    font-weight: 600;
    font-size: 48px;
    text-align: center;
    color: #000000;
    margin-top: 25px;
    margin-bottom: 13px;
    white-space: nowrap;
  }
  .about__facts-description {
    font-weight: 500;
    font-size: 18px;
    text-align: center;
    color: #878787;
    max-width: 395px;
  }
}
.subscribe {
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0px;
  background: #f75d37;
}
.subscribe__title {
  font-weight: 600;
  font-size: 50px;
  text-align: center;
  color: #ffffff;
}
.subscribe__description {
  font-weight: 500;
  font-size: 18px;
  text-align: center;
  color: #ffffff;
  max-width: 600px;
  margin-top: 25px;
  margin-bottom: 50px;
}
.subscribe__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  width: 100%;
  input {
    font-weight: 500;
    font-size: 16px;
    line-height: 34px;
    color: #000000;
    border: none;
    outline: none;
    background: #ffffff;
    border-radius: 34.5px;
    padding: 10px 26px;
    width: 100%;
    max-width: 580px;
  }
  input::placeholder {
    color: #797979;
  }
  button {
    font-weight: 500;
    font-size: 18px;
    text-align: center;
    padding: 8px 25px;
    background: #7c3bed;
    border-radius: 27.5px;
    color: #dfdfdf;
    transition: all 0.3s ease;
    outline: none;
    border: none;
    width: 100%;
    max-width: 580px;
  }
  button:hover {
    background: #7616f4;
  }
  .subscribe__form-success {
    margin-bottom: -10px;
    font-weight: 500;
    font-size: 16px;
    text-align: center;
    color: #aaffaf;
  }
}

@media screen and (max-width: 575px) {
  .rec {
    margin-bottom: 50px;
  }
  .title {
    font-size: 35px;
    margin: 0 auto;
  }
  .about__facts {
    flex-direction: column;
    align-items: center;
    gap: 40px;
    padding: 0px 20px;
    margin-top: 60px;
  }
  .about__facts-title {
    font-size: 28px !important;
  }
  .about__facts-description {
    font-size: 16px !important;
  }
  .subscribe {
    padding: 60px 20px;
  }
  .subscribe__title {
    font-size: 30px;
    font-weight: 700;
    line-height: 1.2;
  }
  .subscribe__description {
    font-size: 16px;
    margin-top: 20px;
    margin-bottom: 40px;
  }
}
</style>
