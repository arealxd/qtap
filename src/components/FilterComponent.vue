<!-- eslint-disable vue/no-dupe-v-else-if -->
<script setup lang="ts">
import { ref, watch } from "vue";
import axios from "axios";
import MultiRangeSlider from "multi-range-slider-vue";
import StarRating from "vue-star-rating";
// import events from "@/db/events.json";
import { useRouter } from "vue-router";
import type { Location, Image } from "@/types/location";

const formatToKZT = (number: number, ceil: boolean = false): string => {
  return new Intl.NumberFormat("fr-FR").format(ceil ? Math.ceil(number) : number) + " ₸";
};

const city = ref(localStorage.getItem("city") || "Almaty");
const router = useRouter();

const props = defineProps(["sendCategory", "sendSearch"]);
watch(
  () => props.sendCategory,
  (newValue) => {
    console.log(newValue);
    selectCategory.value = newValue;
    activeCategory.value = "Select categories";
    getEvents();
    getImage();
  }
);

const searchValue = ref();
watch(
  () => props.sendSearch,
  (newValue) => {
    console.log(newValue);
    searchValue.value = newValue;
    doSearch();
    getImage();
  }
);

const categories = ref([
  {
    id: 1,
    name: "All categories",
  },
  {
    id: 2,
    name: "Select categories",
  },
]);

const selectedCity = ref(localStorage.getItem("city") || "Almaty");
const weather = ref<any>({});

axios
  .get(
    "https://api.weatherapi.com/v1/current.json?key=aca5a57d9dda4e64a6754358231704&q=" +
      selectedCity.value
  )
  .then((result) => {
    weather.value = result.data;
  })
  .catch((error) => {
    console.log(error);
  });

const resetFilter = () => {
  selectCategory.value = undefined;
  selectRating.value = undefined;
  barMinValue.value = 0;
  barMaxValue.value = 100000;
  activeCategory.value = "All categories";
  getEvents();
  getImage();
};

const selectCategory = ref();
const selectRating = ref();
const barMinValue = ref(0);
const barMaxValue = ref(100000);
const UpdateValues = (e: any) => {
  barMinValue.value = e.minValue;
  barMaxValue.value = e.maxValue;
};

// const filterEvents = events;

const favorites = ref<number[]>([]);

favorites.value = JSON.parse(localStorage.getItem("favorites") || "[]");

watch(
  () => favorites,
  (newValue) => {
    localStorage.setItem("favorites", JSON.stringify(newValue.value));
  },
  { deep: true }
);

const loopQuantity = ref(9);
// const activePagination = ref<number>(0);

const myElement = ref<any>(null);
// const setPagination = (index: number) => {
//   activePagination.value = index;
//   myElement.value.scrollIntoView({ behavior: "smooth" });
// };

const applyFilter = () => {
  myElement.value.scrollIntoView({ behavior: "smooth" });
  getEvents();
  getImage();
};

const activeCategory = ref("All categories");

const eventsData = ref<Location[]>([]);
const getEvents = () => {
  axios
    .get<Location[]>("https://almatap-backend.onrender.com/main/mainPage", {
      params: {
        city: city.value,
        category: selectCategory.value,
        min: barMinValue.value,
        max: barMaxValue.value,
        rating: selectRating.value,
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

const favEventsData = ref<Location[]>([]);
const justGetEventsForFav = () => {
  axios
    .get<Location[]>("https://almatap-backend.onrender.com/main/mainPage", {
      params: {
        city: city.value,
      },
    })
    .then((res) => {
      favEventsData.value = res.data;
      localStorage.setItem("data", JSON.stringify(favEventsData.value));
    })
    .catch((err) => {
      console.log(err);
    });
};

justGetEventsForFav();

const images = ref<Image[]>([]);

const getImage = () => {
  axios
    .get<Image[]>("https://almatap-backend.onrender.com/main/images")
    .then((res) => {
      images.value = res.data;
      console.log(images.value);
      localStorage.setItem("images", JSON.stringify(images.value));
    })
    .catch((err) => {
      console.log(err);
    });
};

const doSearch = () => {
  let formData = new FormData();
  formData.append("name", searchValue.value);
  axios
    .post("https://almatap-backend.onrender.com/main/search", formData)
    .then((res) => {
      eventsData.value = res.data;
      console.log(eventsData.value);
    })
    .catch((err) => {
      console.log(err);
    });
};

getEvents();
getImage();
</script>

<template>
  <div class="filter">
    <hr class="filter__hr" />
    <div class="filter__banner"></div>
    <div class="filter__main" ref="myElement">
      <div class="filter__main-header">
        <div class="filter__main-header_filter">
          <div class="filter__main-header_reset">
            <p>Filters</p>
            <button type="button" @click="resetFilter">Reset</button>
          </div>
          <div class="filter__main-header_selects" v-if="activeCategory !== 'All categories'">
            <div class="sub-cat">
              <p class="sub-cat-header">{{ activeCategory }}</p>
              <div class="sub-cat-checkbox">
                <input
                  type="radio"
                  name="cat"
                  v-model="selectCategory"
                  value="LEISURE"
                  id="theater"
                /><label for="theater">LEISURE</label>
              </div>
              <div class="sub-cat-checkbox">
                <input
                  type="radio"
                  name="cat"
                  v-model="selectCategory"
                  value="CULTURAL RECREATION"
                  id="cinema"
                /><label for="cinema">CULTURAL RECREATION</label>
              </div>
              <div class="sub-cat-checkbox">
                <input
                  type="radio"
                  v-model="selectCategory"
                  value="HOTELS"
                  name="cat"
                  id="concerts"
                /><label for="concerts">HOTELS</label>
              </div>
              <div class="sub-cat-checkbox">
                <input
                  type="radio"
                  name="cat"
                  v-model="selectCategory"
                  value="SHOPPING CENTERS"
                  id="exhibitions"
                /><label for="exhibitions">SHOPPING CENTERS</label>
              </div>
              <div class="sub-cat-checkbox">
                <input
                  type="radio"
                  name="cat"
                  v-model="selectCategory"
                  value="TOURS"
                  id="theater1"
                /><label for="theater1">TOURS</label>
              </div>
              <div class="sub-cat-checkbox">
                <input
                  type="radio"
                  name="cat"
                  v-model="selectCategory"
                  value="FOOD"
                  id="theater2"
                /><label for="theater2">FOOD</label>
              </div>
              <div class="sub-cat-checkbox">
                <input
                  type="radio"
                  name="cat"
                  v-model="selectCategory"
                  value="UNUSUAL PLACES"
                  id="theater3"
                /><label for="theater3">UNUSUAL PLACES</label>
              </div>
              <div class="sub-cat-checkbox">
                <input
                  type="radio"
                  name="cat"
                  v-model="selectCategory"
                  value="FORESTS"
                  id="theater4"
                /><label for="theater4">FORESTS</label>
              </div>
              <div class="sub-cat-checkbox">
                <input
                  type="radio"
                  name="cat"
                  v-model="selectCategory"
                  value="GARDENS"
                  id="theater5"
                /><label for="theater5">GARDENS</label>
              </div>
              <div class="sub-cat-checkbox">
                <input
                  type="radio"
                  name="cat"
                  v-model="selectCategory"
                  value="ZOOS"
                  id="theater6"
                /><label for="theater6">ZOOS</label>
              </div>
              <div class="sub-cat-checkbox">
                <input
                  type="radio"
                  v-model="selectCategory"
                  value="BEEKEEPING"
                  name="cat"
                  id="master7"
                /><label for="master7">BEEKEEPING</label>
              </div>
              <div class="sub-cat-checkbox">
                <input
                  type="radio"
                  v-model="selectCategory"
                  value="FLOWER GARDENS"
                  name="cat"
                  id="master8"
                /><label for="master8">FLOWER GARDENS</label>
              </div>
            </div>
          </div>
          <div class="filter__main-header_price" v-if="false">
            <div class="price">
              <p class="price-header">Choose a date</p>
              <input class="choose_date" type="date" />
            </div>
          </div>
          <div class="filter__main-header_price">
            <div class="price">
              <p class="price-header">Price Range</p>
              <div class="price-block">
                <p>
                  from &nbsp;<span>{{ barMinValue }} ₸</span>
                </p>
                <p>
                  to &nbsp;<span>{{ barMaxValue }} ₸</span>
                </p>
              </div>

              <MultiRangeSlider
                style="width: 235px; border: none"
                :baseClassName="'multi-range-slider'"
                :min="0"
                :max="100000"
                :step="100"
                :ruler="true"
                :label="true"
                :minValue="barMinValue"
                :maxValue="barMaxValue"
                @input="UpdateValues"
              />
            </div>
          </div>
          <div class="filter__main-header_rating">
            <div class="rating">
              <p class="rating-header">Rating</p>
              <div class="rating-checkbox">
                <input type="radio" v-model="selectRating" value="5" name="cat" id="5star" /><img
                  src="/images/filterStar.png"
                  alt=""
                /><label for="5star">5 Star</label>
              </div>
              <div class="rating-checkbox">
                <input type="radio" v-model="selectRating" value="4" name="cat" id="4star" /><img
                  src="/images/filterStar.png"
                  alt=""
                /><label for="4star">4 Star</label>
              </div>
              <div class="rating-checkbox">
                <input type="radio" v-model="selectRating" value="3" name="cat" id="3star" /><img
                  src="/images/filterStar.png"
                  alt=""
                /><label for="3star">3 Star</label>
              </div>
              <div class="rating-checkbox">
                <input type="radio" v-model="selectRating" value="2" name="cat" id="2star" /><img
                  src="/images/filterStar.png"
                  alt=""
                /><label for="2star">2 Star</label>
              </div>
              <div class="rating-checkbox">
                <input type="radio" v-model="selectRating" value="1" name="cat" id="1star" /><img
                  src="/images/filterStar.png"
                  alt=""
                /><label for="1star">1 Star</label>
              </div>
            </div>
          </div>
          <button class="apply_filter" @click="applyFilter">Apply</button>
          <div class="filter__main-header_weather">
            <p class="its_weather">It’s Weather</p>
            <p class="city_country">
              {{ weather?.location?.name + ", " + weather?.location?.country }}
            </p>
            <div class="gradus">
              <img :src="weather?.current?.condition?.icon" alt="" />
              <div class="gradus_data">
                <p>{{ Math.floor(weather?.current?.feelslike_c) }} ℃</p>
                <p>{{ weather?.current?.condition?.text }}</p>
              </div>
            </div>
            <div class="params">
              <div class="params_one">
                <p>Pressure</p>
                <p>{{ weather?.current?.pressure_mb }} mb</p>
              </div>
              <div class="params_one">
                <p>Visibility</p>
                <p>{{ weather?.current?.vis_km }} km</p>
              </div>
              <div class="params_one">
                <p>Humandity</p>
                <p>{{ weather?.current?.humidity }}%</p>
              </div>
            </div>
          </div>
        </div>
        <div class="right-block">
          <div class="filter__main-header-cats">
            <div
              class="one-cat"
              v-for="cat in categories"
              @click="activeCategory = cat.name"
              :key="cat.id"
              :class="{ 'active-cat': cat.name === activeCategory }"
            >
              <div></div>
              <p>{{ cat.name }}</p>
            </div>
          </div>
          <div v-if="eventsData.length === 0 && images.length === 0" class="loader"></div>
          <h2 class="no-results" v-else-if="eventsData.length < 1 && images.length !== 0">
            No results
          </h2>
          <div v-else class="events">
            <!-- <div
              class="card_image-block"
              v-for="i in filterEvents.slice(0, loopQuantity)"
              :key="i.id"
            >
              <img
                class="card_image"
                :src="i.image"
                alt=""
                @click="router.push('/details/' + i.id)"
              />
              <img
                v-if="!favorites.includes(i.id)"
                @click="(e) => favorites.push(i.id)"
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

            <div
              class="card_image-block"
              v-for="i in eventsData.slice(0, loopQuantity)"
              :key="i.id"
            >
              <img
                class="card_image"
                :src="images.find((img) => img.event.id === i.id)?.image"
                alt=""
                @click="router.push('/details/' + i.id)"
              />
              <img
                v-if="!favorites.includes(i.id)"
                @click="(e) => favorites.push(i.id)"
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
      </div>
    </div>
    <!-- <div class="pagination">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14.4142 16L19.7071 21.2929L18.2929 22.7071L11.5858 16L18.2929 9.29289L19.7071 10.7071L14.4142 16Z"
          fill="#F3692E"
        />
      </svg>
      <p
        :class="{ active: index === activePagination }"
        @click="setPagination(index)"
        v-for="(i, index) in filterEvents.slice(0, Math.ceil(filterEvents.length / 9))"
        :key="index"
      >
        {{ index + 1 }}
      </p>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M17.5858 16L12.2929 10.7071L13.7071 9.29289L20.4142 16L13.7071 22.7071L12.2929 21.2929L17.5858 16Z"
          fill="#F3692E"
        />
      </svg>
    </div> -->
  </div>
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
.no-results {
  color: #727272;
  margin: 0 auto;
  font-size: 34px;
  text-align: center;
  margin-top: 30px;
}
.choose_date {
  border: 2px solid #109be9;
  border-radius: 4px;
  color: #515151;
  font-size: 16px;
  font-weight: 600;
  padding: 5px 15px;
  outline: none;
  cursor: pointer;
}
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 40px;
  margin-bottom: 10px;
  svg {
    transition: all 0.3s ease;
    border-radius: 20px;
    cursor: pointer;
  }
  svg:hover {
    background: #d4d4d4;
  }
  p {
    font-size: 16px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #515151;
    padding: 7px 11px;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 4px;
  }
  p:hover {
    background: #d4d4d4;
  }
  .active {
    background: #f3692e;
    color: #ffffff;
  }
}
.events {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 20px 0px 0px 20px;
  gap: 40px 20px;
}
.card_image-block {
  position: relative;
  cursor: pointer;
}
.card_image {
  width: 100%;
  // max-width: 250px;
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
.apply_filter {
  width: 100%;
  padding: 15px 0px;
  background: #2079ff;
  border: 1px solid #2079ff;
  box-sizing: border-box;
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: white;
  margin-top: 20px;
  transition: all 0.3s ease;
}
.apply_filter:hover {
  background: #0055d4;
  border: 1px solid #0055d4;
}
.filter {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1150px;
  margin: 0 auto;
  margin-top: 35px;
}
.filter__hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 1em 0;
  padding: 0;
}
.filter__banner {
  margin-top: 35px;
  width: 100%;
  height: 200px;
  background-image: url("/images/filterBanner.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  border-radius: 10px;
}
.filter__main {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
}
.filter__main-header {
  display: flex;
}
.filter__main-header_reset {
  border: 1px solid #e1e1e1;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 80px;
  :nth-child(1) {
    font-weight: 700;
    font-size: 24px;
    line-height: 120%;
    color: #11142d;
  }
  :nth-child(2) {
    font-weight: 600;
    font-size: 16px;
    line-height: 120%;
    text-align: center;
    color: #9a9ab0;
    padding: 10.5px 24px;
    border: 2px solid #e1e1e1;
    border-radius: 8px;
    background: white;
    transition: all 0.3s ease-in-out;
  }
  :nth-child(2):hover {
    background: #f75d37;
    border: 2px solid #f75d37;
    color: white;
  }
}
.right-block {
  width: 100%;
}
.filter__main-header-cats {
  border: 1px solid #e1e1e1;
  padding: 22px 15px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  max-height: 150px;
  .one-cat {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    div {
      width: 40px;
      height: 40px;
      background: #f2f2f2;
      border-radius: 8px;
    }
    p {
      font-weight: 700;
      font-size: 16px;
      color: #9a9ab0;
    }
  }
  .active-cat {
    div {
      background: #109be9;
    }
    p {
      color: #109ae9;
    }
  }
}
.filter__main-header_selects {
  display: flex;
  flex-direction: column;
  border: 1px solid #e1e1e1;
  .sub-cat {
    padding: 24px 26px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .sub-cat-header {
    font-weight: 700;
    font-size: 16px;
    color: #11142d;
  }
  .sub-cat-checkbox {
    display: flex;
    align-items: center;
    gap: 15px;
    cursor: pointer;
    input {
      cursor: pointer;
      width: 20px;
      height: 20px;
      accent-color: #109be9;
      border: 2px solid #109ae9;
    }
    label {
      cursor: pointer;
      font-weight: 600;
      font-size: 16px;
      color: #515151;
    }
  }
}
.filter__main-header_price {
  display: flex;
  flex-direction: column;
  border: 1px solid #e1e1e1;
  .price {
    padding: 24px 26px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .price-header {
    font-weight: 700;
    font-size: 16px;
    color: #11142d;
  }
  .price-block {
    display: flex;
    width: 100%;
    gap: 15px;
    p {
      padding: 4px 7px;
      border: 2px solid #109be9;
      border-radius: 4px;
      width: 100%;
      font-weight: 600;
      font-size: 13px;
      color: #9a9ab0;
      white-space: nowrap;
      span {
        color: #515151;
        font-size: 15px;
        white-space: nowrap;
      }
    }
  }
}
.filter__main-header_rating {
  display: flex;
  flex-direction: column;
  border: 1px solid #e1e1e1;
  .rating {
    padding: 24px 26px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .rating-header {
    font-weight: 700;
    font-size: 16px;
    color: #11142d;
  }
  .rating-checkbox {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    input {
      cursor: pointer;
      width: 20px;
      height: 20px;
      accent-color: #109be9;
      border: 2px solid #109ae9;
    }
    label {
      cursor: pointer;
      font-weight: 600;
      font-size: 16px;
      color: #515151;
    }
  }
}
.filter__main-header_weather {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 40px;
  p {
    color: black;
  }
  .gradus {
    display: flex;
    align-items: center;
    gap: 16px;
    .gradus_data {
      :nth-child(1) {
        font-weight: 600;
        font-size: 32px;
        color: #262626;
      }
      :nth-child(2) {
        font-weight: 400;
        font-size: 16px;
        text-transform: capitalize;
        color: #727272;
      }
    }
  }
  .params {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .params_one {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 10px;
    transition: all 0.3s ease;
    border-radius: 16px;
    background: #f7f7f7;
    backdrop-filter: blur(2px);
    cursor: pointer;
    gap: 6px;
    :nth-child(1) {
      font-weight: 400;
      font-size: 14px;
      text-align: center;
      text-transform: capitalize;
      color: #727272;
    }
    :nth-child(2) {
      font-weight: 500;
      font-size: 16px;
      text-align: center;
      color: #262626;
    }
  }
  .params_one:hover {
    background: #f75d37;
    :nth-child(1) {
      color: #f6f8fe;
    }
    :nth-child(2) {
      color: #f6f8fe;
    }
  }
  .its_weather {
    font-weight: 500;
    font-size: 18px;
    color: #262626;
    padding-left: 10px;
  }
  .city_country {
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    text-transform: capitalize;
    color: #727272;
    padding-left: 10px;
  }
}

@media screen and (max-width: 575px) {
  .filter__banner {
    display: none;
  }
  .filter__hr {
    display: none;
  }
  .filter {
    margin-top: 0px;
  }
  .filter__main-header {
    display: flex;
    flex-direction: column;
    gap: 20px;
    .filter__main-header_selects {
      width: 100%;
    }
    .filter__main-header_price {
      width: 100%;
    }
    .filter__main-header_rating {
      width: 100%;
    }
    .filter__main-header_weather {
      width: 100%;
    }
  }
  .filter__main-header_weather {
    align-items: center;
  }
  .filter__main-header-cats {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    border: none;
    margin-bottom: 40px;
  }
  .events {
    justify-content: center;
    align-items: flex-start;
    grid-template-columns: repeat(2, 1fr);
    padding: 10px;
  }
  .card_image {
    object-fit: cover;
  }
  .apply_filter {
    margin: 0 auto;
    width: 90%;
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
}
</style>
