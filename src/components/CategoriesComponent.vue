<script setup lang="ts">
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const emit = defineEmits(["category"]);

const { t, locale } = useI18n({ useScope: "global" });

const showAll = ref(true);
const catNumber = ref(0);

const categoriesShows = () => {
  if (catNumber.value === 0) {
    catNumber.value = 6;
    showAll.value = false;
  } else {
    catNumber.value = 0;
    showAll.value = true;
  }
};

const selectedCategory = ref();

watch(selectedCategory, () => {
  sendEmit();
});

const sendEmit = () => {
  emit("category", selectedCategory.value);
};
</script>

<template>
  <div class="categories">
    <div class="categories__header">
      <div class="categories__title">{{ $t("SELECTMOOD") }}</div>
      <div class="categories__view-all" @click="categoriesShows">
        {{ showAll ? $t("VIEWALL") : $t("HIDE") }}
      </div>
    </div>
    <div class="categories__list" v-auto-animate="{ duration: 500 }">
      <div class="categories__category" @click="selectedCategory = 'LEISURE'">
        <img class="categories__category-image" src="../assets/img/cat_1.png" alt="" />
        <p class="categories__category-name">LEISURE</p>
      </div>
      <div class="categories__category" @click="selectedCategory = 'CULTURAL RECREATION'">
        <img class="categories__category-image" src="../assets/img/cat_2.png" alt="" />
        <p class="categories__category-name">CULTURAL RECREATION</p>
      </div>
      <div class="categories__category" @click="selectedCategory = 'HOTELS'">
        <img class="categories__category-image" src="../assets/img/cat_3.png" alt="" />
        <p class="categories__category-name">HOTELS</p>
      </div>
      <div class="categories__category" @click="selectedCategory = 'SHOPPING CENTERS'">
        <img class="categories__category-image" src="../assets/img/cat_4.png" alt="" />
        <p class="categories__category-name">SHOPPING CENTERS</p>
      </div>
      <div class="categories__category" @click="selectedCategory = 'TOURS'">
        <img class="categories__category-image" src="../assets/img/cat_5.png" alt="" />
        <p class="categories__category-name">TOURS</p>
      </div>
      <div class="categories__category" @click="selectedCategory = 'FOOD'">
        <img class="categories__category-image" src="../assets/img/cat_6.png" alt="" />
        <p class="categories__category-name">FOOD</p>
      </div>
      <div
        v-if="!showAll"
        class="categories__category"
        @click="selectedCategory = 'UNUSUAL PLACES'"
      >
        <img class="categories__category-image" src="../assets/img/cat_7.png" alt="" />
        <p class="categories__category-name">UNUSUAL PLACES</p>
      </div>
      <div v-if="!showAll" class="categories__category" @click="selectedCategory = 'FORESTS'">
        <img class="categories__category-image" src="../assets/img/cat_8.png" alt="" />
        <p class="categories__category-name">FORESTS</p>
      </div>
      <div v-if="!showAll" class="categories__category" @click="selectedCategory = 'GARDENS'">
        <img class="categories__category-image" src="../assets/img/cat_9.png" alt="" />
        <p class="categories__category-name">GARDENS</p>
      </div>
      <div v-if="!showAll" class="categories__category" @click="selectedCategory = 'ZOOS'">
        <img class="categories__category-image" src="../assets/img/cat_10.png" alt="" />
        <p class="categories__category-name">ZOOS</p>
      </div>
      <div v-if="!showAll" class="categories__category" @click="selectedCategory = 'BEEKEEPING'">
        <img class="categories__category-image" src="../assets/img/cat_11.png" alt="" />
        <p class="categories__category-name">BEEKEEPING</p>
      </div>
      <div
        v-if="!showAll"
        class="categories__category"
        @click="selectedCategory = 'FLOWER GARDENS'"
      >
        <img class="categories__category-image" src="../assets/img/cat_12.png" alt="" />
        <p class="categories__category-name">FLOWER GARDENS</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.categories {
  background: #ffffff;
  border-width: 8px 8px 0px 8px;
  border-style: solid;
  border-color: #008ece;
  box-shadow: 0px 0px 26px rgba(143, 143, 143, 0.423733);
  border-radius: 30px 30px 2px 2px;
  width: 100%;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  border-bottom: 1px solid #dadada;
  margin-top: -180px;
}
.categories__header {
  display: flex;
  width: 100%;
  align-items: center;
  padding: 20px 30px;
}
.categories__title {
  margin-right: auto;
  font-weight: 500;
  font-size: 18px;
  line-height: 30px;
  color: #2a2a2a;
}
.categories__view-all {
  margin-left: auto;
  font-weight: 500;
  font-size: 16px;
  line-height: 30px;
  color: #b5b5b5;
  cursor: pointer;
  white-space: nowrap;
}
.categories__view-all:hover {
  transition: all 0.5s ease;
  color: black;
}
.categories__list {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}
.categories__category {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding-bottom: 25px;
  padding-top: 25px;
  border-top: 1px solid #dadada;
  border-right: 1px solid #dadada;
}
.categories__category:hover .categories__category-name {
  color: black;
}
.categories__category-image {
  margin-bottom: 15px;
  height: 65px;
}

.categories__category-name {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  text-transform: uppercase;
  color: #9e9e9e;
  max-width: 98px;
}
@media screen and (max-width: 575px) {
  .categories {
    margin-top: -30px;
  }
  .categories__list {
    grid-template-columns: repeat(2, 1fr);
  }
  .categories__view-all:hover {
    transition: all 0.5s ease;
    color: #b5b5b5;
  }
}
</style>
