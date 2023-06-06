<script setup lang="ts">
import { ref } from "vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";
import { useRoute } from "vue-router";
import StarRating from "vue-star-rating";
// import events from "@/db/events.json";
import type { Location, Image } from "@/types/location";
import axios from "axios";

const formatToKZT = (number: number, ceil: boolean = false): string => {
  return new Intl.NumberFormat("fr-FR").format(ceil ? Math.ceil(number) : number) + " ₸";
};

const setRating = ref(0);
// const data = events;
const route = useRoute();
// const detail = data.find((item) => item.id === Number(route.params.id));

const rated = ref(false);
const sendRating = () => {
  console.log(setRating.value);
  rated.value = true;
};

window.scrollTo(0, 0);

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

const detailData = ref<Location>();
const getDetail = () => {
  axios
    .get<Location>("https://almatap-backend.onrender.com/main/event/" + route.params.id, {})
    .then((res) => {
      detailData.value = res.data;
      console.log(detailData.value);
    })
    .catch((err) => {
      console.log(err);
    });
};

getDetail();
getImage();
</script>

<template>
  <HeaderComponent />
  <div class="rec">
    <span v-if="detailData === undefined || images.length === 0" class="loader"></span>
    <div v-else class="details" v-auto-animate="{ duration: 500 }">
      <div class="details__header">
        <img :src="images.find((img) => img.event.id === Number(route.params.id))?.image" alt="" />
        <div class="details__info">
          <p class="details__info-name">{{ detailData?.name }}</p>
          <div class="details__info-address">
            <img src="/images/address-location-map-svgrepo-com.svg" alt="" />
            <p>{{ detailData?.address }}, {{ detailData?.city }}</p>
          </div>
          <div class="details__info-address">
            <img src="/images/time-svgrepo-com.svg" alt="" />
            <p>{{ detailData?.expireAt }}</p>
          </div>
          <div class="details__info-address">
            <img src="/images/price-ui-svgrepo-com.svg" alt="" />
            <p class="details__info-price">{{ formatToKZT(Number(detailData?.price)) }}</p>
          </div>
          <!-- <div class="details__info-rating">
            <img src="/images/star-svgrepo-com.svg" alt="" />
            <p>{{ detailData?.averageRating }}.0</p>
          </div> -->
        </div>
      </div>
      <div class="details__description">
        <div class="details__description-text">
          <p class="details__description-title">Description</p>
          <p class="details__description-content">
            {{ detailData?.description }}
          </p>
          <form class="details__description-form" @submit.prevent="sendRating">
            <star-rating
              class="star"
              :star-size="30"
              :read-only="rated"
              v-model:rating="setRating"
            />
            <button :class="{ ratedClass: rated }">{{ !rated ? "Rate" : "Rated" }}</button>
          </form>
        </div>
        <div class="details__description-map">
          <p class="details__description-map-title">Geolocation</p>
          <iframe
            width="100%"
            height="420"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            :src="`https://maps.google.com/maps?width=100%25&amp;height=420&amp;hl=en&amp;q=${detailData?.lat},${detailData?.longM}&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
  <FooterComponent />
</template>

<style scoped lang="scss">
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
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 200px;
}
.details {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  max-width: 1260px;
  gap: 10px;
}
.details__header {
  display: flex;
  align-items: flex-start;
  gap: 30px;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    max-width: 500px;
    max-height: 500px;
    border-radius: 20px;
  }
  .details__info {
    display: flex;
    flex-direction: column;
    gap: 15px;
    &-name {
      font-size: 30px;
      font-weight: 700;
      color: black;
      max-width: 500px;
    }
    &-address {
      display: flex;
      align-items: center;
      gap: 10px;
      img {
        max-width: 20px;
      }
      p {
        font-size: 18px;
        font-weight: 500;
        color: black;
      }
    }
    &-price {
      font-size: 18px;
      font-weight: 500;
      color: black;
    }
    &-rating {
      display: flex;
      align-items: center;
      gap: 10px;
      img {
        max-width: 20px;
      }
      p {
        font-size: 18px;
        font-weight: 500;
        color: black;
      }
    }
  }
}
.details__description {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 20px;
}
.details__description-text {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  .details__description-title {
    font-size: 25px;
    font-weight: 700;
    color: black;
  }
  .details__description-content {
    font-size: 18px;
    font-weight: 400;
    color: black;
    max-width: 520px;
  }
}
.details__description-form {
  margin-top: 20px;
  button {
    background: #ff6b00;
    border: none;
    border-radius: 10px;
    padding: 5px 20px;
    color: white;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 500;
    cursor: pointer;
    width: 100%;
    max-width: 150px;
    margin-top: 10px;
    transition: all 0.3s ease;
    &:hover {
      background: #ff8800;
    }
  }
  .ratedClass {
    cursor: default;
    background: #1a9900;
    &:hover {
      background: #1a9900;
    }
  }
}

.details__description-map {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
  .details__description-map-title {
    font-size: 25px;
    font-weight: 700;
    color: black;
  }
  iframe {
    border: none;
    border-radius: 20px;
    max-height: 310px;
  }
}

@media screen and (max-width: 575px) {
  .details__header {
    flex-direction: column;
    align-items: center;
    gap: 15px;
    padding: 0 20px;
    .details__info {
      align-items: flex-start;
      gap: 10px;
      &-name {
        font-size: 20px;
        font-weight: 700;
        color: black;
      }
      &-address {
        display: flex;
        align-items: center;
        gap: 10px;
        img {
          max-width: 20px;
        }
        p {
          font-size: 16px;
          font-weight: 500;
          color: black;
        }
      }
      &-price {
        font-size: 16px;
        font-weight: 500;
        color: black;
      }
      &-rating {
        display: flex;
        align-items: center;
        gap: 10px;
        img {
          max-width: 20px;
        }
        p {
          font-size: 16px;
          font-weight: 500;
          color: black;
        }
      }
    }
  }
  .details__description {
    flex-direction: column;
    align-items: center;
    gap: 45px;
    margin-top: 30px;
    padding: 0 20px;
  }
  .details__description-title {
    font-size: 22px !important;
  }
  .details__description-content {
    font-size: 16px !important;
  }
  .details__description-map-title {
    margin: 0 auto;
    font-size: 22px !important;
  }
  .rec {
    margin-bottom: 100px;
  }
  .details__description-form {
    .star {
      width: 100%;
      margin: 0 auto;
      justify-content: center;
    }
    margin-top: 0 auto;
    button {
      max-width: 100%;
    }
  }
}
</style>
