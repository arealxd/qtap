<script setup lang="ts">
import HeaderComponent from "../components/HeaderComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";
import { ref, watch } from "vue";
import StarRating from "vue-star-rating";
import events from "@/db/events.json";

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

const onlyFavs = ref(data.filter((item) => favorites.value.includes(item.id)));

const deleteFav = (id: number) => {
  favorites.value.splice(favorites.value.indexOf(id), 1);
  for (let i = 0; i < onlyFavs.value.length; i++) {
    if (onlyFavs.value[i].id === id) {
      onlyFavs.value.splice(i, 1);
    }
  }
};

window.scrollTo(0, 0);
</script>

<template>
  <HeaderComponent />
  <div class="rec">
    <div class="header">
      <h1 class="title">Favorites</h1>
    </div>
    <div class="cards" v-auto-animate="{ duration: 500 }" v-if="onlyFavs.length > 0">
      <div class="card_image-block" v-for="i in onlyFavs" :key="i.id">
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
          @click="deleteFav(i.id)"
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
    <div class="null-fav" v-else>
      <img src="/images/notexistfav.png" alt="" />
      <h1>No favorites yet</h1>
    </div>
  </div>
  <FooterComponent />
</template>

<style scoped lang="scss">
.null-fav {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 50px;
  img {
    max-width: 200px;
    border-radius: 30px;
    margin-bottom: 10px;
  }
  h1 {
    color: #797979;
  }
}
.rec {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 100px;
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

.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 0 auto;
  margin-top: 10px;
  width: 100%;
  max-width: 1260px;
  gap: 40px;
}
.card_image-block {
  position: relative;
}
.card_image {
  width: 100%;
  /* max-width: 250px; */
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
  .title {
    font-size: 32px;
    margin: 0 auto;
  }
  .null-fav {
    img {
      max-width: 150px;
    }
    h1 {
      font-size: 22px;
    }
  }
  .cards {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    margin: 0 auto;
    margin-top: 30px;
    width: 100%;
    max-width: 1260px;
    gap: 35px;
    padding: 0 30px;
  }
}
</style>
