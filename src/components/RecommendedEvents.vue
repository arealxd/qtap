<script setup lang="ts">
import { ref } from "vue";
import StarRating from "vue-star-rating";

const rating = ref(5);
const showAll = ref(true);
const loopQuantity = ref(4);
const fav = ref(false);

const showAllHandler = () => {
  showAll.value = !showAll.value;
  if (showAll.value) {
    loopQuantity.value = 4;
  } else {
    loopQuantity.value = data.length;
  }
};

const favorites = ref<Number[]>([]);

const data = [
  {
    id: 1,
    address: "Baizakova 70, Almaty",
    name: "Exhibition «Van Gogh. Living canvases». Museum Lumiere-Hall",
    rating: 4,
    price: "10 000",
    image: "/images/event1.jpg",
  },
  {
    id: 2,
    address: "Abaya 70A, Almaty",
    name: 'Stand-up solo performance "Better than it seems"',
    rating: 5,
    price: "5 000",
    image: "/images/event2.jpg",
  },
  {
    id: 3,
    address: "Tole bi 237, Almaty",
    name: "Big Stand Up Concert",
    rating: 3,
    price: "4 000",
    image: "/images/event3.jpg",
  },
  {
    id: 4,
    address: "Al-Farabi 40/4, Almaty",
    name: "Exhibition «Klimt and Schiele. Modern Gold»",
    rating: 4,
    price: "9 000",
    image: "/images/event4.jpg",
  },
  {
    id: 5,
    address: "Manasa 34, Almaty",
    name: "The Beatles in Jazz - Saule Zharmenova Trio",
    rating: 3,
    price: "10 500",
    image: "/images/event5.jpg",
  },
  {
    id: 6,
    address: "Saina 18, Almaty",
    name: 'Open microphone "Sanych Standup Show"',
    rating: 4,
    price: "17 000",
    image: "/images/event6.jpg",
  },
  {
    id: 7,
    address: "Zharokova 117a, Almaty",
    name: "All stars jam session - Jazz music and improvisation",
    rating: 3,
    price: "4 500",
    image: "/images/event7.jpg",
  },
  {
    id: 8,
    address: "Medeu, Almaty",
    name: "Barber Festival SHARPLINES",
    rating: 4,
    price: "4 000",
    image: "/images/event8.jpg",
  },
  {
    id: 9,
    address: "Abaya 14a, Astana",
    name: "Metal Cover Nights",
    rating: 2,
    price: "12 000",
    image: "/images/event9.jpg",
  },
  {
    id: 10,
    address: "Sharipova 34, Astana",
    name: "Dancing on Stones — R.E.D. Trio",
    rating: 5,
    price: "11 000",
    image: "/images/event10.jpg",
  },
  {
    id: 11,
    address: "Gogol 34, Astana",
    name: "Festival stories — Irena Aravina and JAZZ HOUSE",
    rating: 4,
    price: "17 000",
    image: "/images/event11.jpg",
  },
  {
    id: 12,
    address: "Nazarbayeva 34, Astana",
    name: "Khomenkov band – Mainstream & Fusion",
    rating: 3,
    price: "9 000",
    image: "/images/event12.jpg",
  },
];
</script>

<template>
  <div class="rec">
    <div class="header">
      <h1 class="title">Recommended Events</h1>
      <div class="view_all" @click="showAllHandler">
        <p class="view_all-text">{{ showAll ? "View all Events" : "Hide" }}</p>
        <img src="../assets/img/viewAllArrow.png" alt="" />
      </div>
    </div>

    <div class="cards" v-auto-animate="{ duration: 500 }">
      <div class="card_image-block" v-for="i in data.slice(0, loopQuantity)" :key="i.id">
        <img class="card_image" :src="i.image" alt="" />
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
        <div class="card_details">
          <p class="texts_title">{{ i.address }}</p>
          <p class="texts_description">
            {{ i.name }}
          </p>
          <star-rating :star-size="15" :read-only="true" v-model:rating="i.rating" />
          <p class="texts_price">{{ i.price }} ₸</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  justify-content: space-between;
  /* align-items: center; */
  margin: 0 auto;
  margin-top: 40px;
  width: 100%;
  max-width: 1150px;
  gap: 40px;
}
.card_image-block {
  position: relative;
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
</style>
