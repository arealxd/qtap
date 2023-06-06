<script setup lang="ts">
import { ref, watch } from "vue";
import StarRating from "vue-star-rating";
import events from "@/db/events.json";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import axios from "axios";
import type { Location, Image } from "@/types/location";

const formatToKZT = (number: number, ceil: boolean = false): string => {
  return new Intl.NumberFormat("fr-FR").format(ceil ? Math.ceil(number) : number) + " ₸";
};

const { t, locale } = useI18n({ useScope: "global" });

const city = ref(localStorage.getItem("city") || "Almaty");

const router = useRouter();

const showAll = ref(true);
const loopQuantity = ref(4);

const showAllHandler = () => {
  showAll.value = !showAll.value;
  if (showAll.value) {
    loopQuantity.value = 4;
  } else {
    loopQuantity.value = data.length;
  }
};

const favorites = ref<number[]>([]);

favorites.value = JSON.parse(localStorage.getItem("favorites") || "[]");

watch(
  () => favorites,
  (newValue) => {
    localStorage.setItem("favorites", JSON.stringify(newValue.value));
  },
  { deep: true }
);

const data = events;

const eventsData = ref<Location[]>([]);
const getEvents = () => {
  axios
    .get<Location[]>("https://almatap-backend.onrender.com/main/mainPage", {
      params: {
        city: city.value,
      },
    })
    .then((res) => {
      eventsData.value = res.data;
      console.log(eventsData.value);
    })
    .catch((err) => {
      console.log(err);
    });
};

const images = ref<Image[]>([]);

const getImage = () => {
  axios
    .get<Image[]>("https://almatap-backend.onrender.com/main/images")
    .then((res) => {
      images.value = res.data;
      console.log(images.value);
    })
    .catch((err) => {
      console.log(err);
    });
};

getEvents();
getImage();
</script>

<template>
  <div class="rec">
    <div class="header">
      <h1 class="title">{{ $t("RECOMMENDED") }}</h1>
      <div class="view_all" @click="showAllHandler">
        <p class="view_all-text">{{ showAll ? $t("VIEWALL") : $t("HIDE") }}</p>
        <img src="../assets/img/viewAllArrow.png" alt="" />
      </div>
    </div>

    <span v-if="eventsData.length === 0 || images.length === 0" class="loader"></span>
    <div v-else class="cards" v-auto-animate="{ duration: 500 }">
      <!-- <div class="card_image-block" v-for="i in data.slice(0, loopQuantity)" :key="i.id">
        <img class="card_image" :src="i.image" alt="" @click="router.push('/details/' + i.id)" />
        <img
          v-if="!favorites.includes(i.id)"
          @click="favorites.push(i.id)"
          class="nofav_icon"
          src="../assets/img/nofav.png"
          alt=""
        />
        <img
          v-else
          @click="favorites.splice(favorites.indexOf(i.id), 1)"
          class="nofav_icon"
          src="../assets/img/fav.png"
          alt=""
        />
        <div class="card_details" @click="router.push('/details/' + i.id)">
          <p class="texts_title">{{ i.address }}</p>
          <p class="texts_description">
            {{ i.name }}
          </p>
          <star-rating :star-size="15" :read-only="true" v-model:rating="i.rating" />
          <p class="texts_price">{{ i.price }} ₸</p>
        </div>
      </div> -->
      <div class="card_image-block" v-for="i in eventsData.slice(0, loopQuantity)" :key="i.id">
        <img
          class="card_image"
          :src="images.find((img) => img.event.id === i.id)?.image"
          alt=""
          @click="router.push('/details/' + i.id)"
        />
        <img
          v-if="!favorites.includes(i.id)"
          @click="favorites.push(i.id)"
          class="nofav_icon"
          src="../assets/img/nofav.png"
          alt=""
        />
        <img
          v-else
          @click="favorites.splice(favorites.indexOf(i.id), 1)"
          class="nofav_icon"
          src="../assets/img/fav.png"
          alt=""
        />
        <div class="card_details" @click="router.push('/details/' + i.id)">
          <p class="texts_title">{{ i.address }}, {{ i.city }}</p>
          <p class="texts_description">
            {{ i.name }}
          </p>
          <star-rating :star-size="15" :read-only="true" v-model:rating="i.averageRating" />
          <p class="texts_price">{{ formatToKZT(i.price) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loader {
  width: calc(100px - 14px);
  height: 50px;
  position: relative;
  animation: flippx 1s infinite linear;
  margin: 0 auto;
  margin-top: 50px;
}
.loader:before {
  content: "";
  position: absolute;
  inset: 0;
  margin: auto;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ff3d00;
  transform-origin: -14px 50%;
  animation: spin 0.5s infinite linear;
}
@keyframes flippx {
  0%,
  49% {
    transform: scaleX(1);
  }
  50%,
  100% {
    transform: scaleX(-1);
  }
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
.rec {
  margin-top: 90px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.header {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1150px;
  margin: 0 auto;
}
.view_all {
  display: flex;
  align-items: center;
  margin-left: auto;
  cursor: pointer;
}
.view_all::after {
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #f75d37;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}
.view_all:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
.title {
  font-weight: 700;
  font-size: 42px;
  color: #000000;
}
.view_all-text {
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  color: #000000;
}
.cards {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  /* align-items: center; */
  margin: 0 auto;
  margin-top: 20px;
  width: 100%;
  max-width: 1150px;
  gap: 40px;
}
.card_image-block {
  position: relative;
  cursor: pointer;
}
.card_image {
  width: 100%;
  max-width: 250px;
  height: 100vh;
  max-height: 250px;
  border-radius: 20px;
}
.nofav_icon {
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 15px;
}
.card_details {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  max-width: 250px;
  margin-top: 15px;
}
.texts_title {
  font-weight: 400;
  font-size: 12px;
  color: #666666;
}
.texts_description {
  font-weight: 700;
  font-size: 14px;
  color: #000000;
}
.texts_price {
  font-weight: 700;
  font-size: 18px;
  color: #f74e0f;
}

@media screen and (max-width: 575px) {
  .header {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
  .title {
    font-weight: 700;
    font-size: 20px;
    color: #000000;
  }
  .view_all-text {
    font-weight: 700;
    font-size: 14px;
    text-align: center;
    color: #000000;
  }
  .cards {
    align-items: center;
    justify-content: center;
  }
}
</style>
