<script setup lang="ts">
import { ref } from "vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";

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
      <h1 class="title">About us</h1>
    </div>
    <div class="about" v-auto-animate="{ duration: 500 }">
      <div class="about__facts">
        <div class="about__facts-fact">
          <img src="/images/about1.png" alt="" />
          <h2 class="about__facts-title">Our goal</h2>
          <p class="about__facts-description">
            Our project was created to make life easier for both tourists and residents of our
            country, helping them quickly and easily choose places for recreation and entertainment,
            depending on their preferences and budget. We aim to become a leader in the travel
            industry by offering new and innovative opportunities to our clients.
          </p>
        </div>
        <div class="about__facts-fact">
          <img src="/images/about2.png" alt="" />
          <h2 class="about__facts-title">Our team</h2>
          <p class="about__facts-description">
            Our team consists of experienced developers, testers, designers and marketers who work
            together to create the best possible user experience. We are constantly improving our
            product to ensure that our service is easy to use, informative and useful for all our
            users.
          </p>
        </div>
        <div class="about__facts-fact">
          <img src="/images/about3.png" alt="" />
          <h2 class="about__facts-title">Our mission</h2>
          <p class="about__facts-description">
            We strive for complete transparency and openness in our work, and we are always ready to
            listen to the feedback and suggestions of our users. If you have any questions or
            suggestions, please contact us through our contact page.
          </p>
        </div>
      </div>
    </div>
    <div class="subscribe">
      <p class="subscribe__title">Subcribe to get new info</p>
      <p class="subscribe__description">
        Don't want to miss something? Subscribe now and get the latest news about tourist places and
        locations
      </p>
      <form @submit.prevent="subscribe" class="subscribe__form">
        <input v-model="email" type="email" required placeholder="Type your  email here" />
        <button>Subscribe</button>
        <p class="subscribe__form-success" v-if="successSubscribe">
          You have successfully subscribed
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
    background: #109be9;
    border-radius: 27.5px;
    color: #dfdfdf;
    transition: all 0.3s ease;
    outline: none;
    border: none;
    width: 100%;
    max-width: 580px;
  }
  button:hover {
    background: #0e7db8;
  }
  .subscribe__form-success {
    margin-bottom: -10px;
    font-weight: 500;
    font-size: 16px;
    text-align: center;
    color: #aaffaf;
  }
}
</style>
