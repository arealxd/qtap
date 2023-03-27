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
    loopQuantity.value = 12;
  }
};
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
      <div class="card_image-block" v-for="i in loopQuantity" :key="i">
        <img class="card_image" src="../assets/img/event.jpg" alt="" />
        <img
          v-if="!fav"
          @click="fav = true"
          class="nofav_icon"
          src="../assets/img/nofav.png"
          alt=""
        />
        <img v-else @click="fav = false" class="nofav_icon" src="../assets/img/fav.png" alt="" />
        <div class="card_details">
          <p class="texts_title">Baizakova 70, Almaty</p>
          <p class="texts_description">
            Exhibition «Van Gogh. Living canvases». Museum Lumiere-Hall
          </p>
          <star-rating :star-size="15" :read-only="true" v-model:rating="rating" />
          <p class="texts_price">15 000 ₸</p>
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
  align-items: center;
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
