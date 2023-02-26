<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const searchValue = ref("");

const doSearch = () => {
  console.log(searchValue.value);
};
</script>

<template>
  <div class="header">
    <div class="header__left">
      <p class="header__item" @click="router.push('/')">Home</p>
      <p class="header__item">About Us</p>
      <p class="header__item">Blog</p>
      <p class="header__item">Category</p>
      <p class="header__item">Contact Us</p>
    </div>
    <img class="header__logo" src="../assets/img/logo.svg" alt="" @click="router.push('/')" />
    <div class="header__right">
      <form class="header__search-form" @submit.prevent="doSearch">
        <input
          v-model="searchValue"
          class="header__search"
          type="text"
          placeholder="&#xF002;  Search..."
          style="font-family: Arial, FontAwesome"
        />
        <input type="submit" hidden />
      </form>
      <select class="header__city" name="cities" id="cities">
        <option hidden>City</option>
        <option value="Astana">Astana</option>
        <option value="Almaty">Almaty</option>
        <option value="Shymkent">Shymkent</option>
        <option value="Aktau">Aktau</option>
      </select>
      <img class="header__user-icon" src="../assets/img/userIcon.svg" alt="" />
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header__left {
  display: flex;
  align-items: center;
  gap: 36px;
}
.header__right {
  display: flex;
  align-items: center;
  gap: 19px;
}
.header__search-form {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0;
}
.header__search {
  width: 100%;
  border-radius: 100px;
  background: #ffb3a0;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  color: black;
  font-weight: 500;
  outline: none;
}
.header__search::placeholder {
  color: rgb(107, 107, 107);
  font-weight: 500;
}
.header__city {
  border-radius: 100px;
  background: #dddddd;
  border: none;
  padding: 10px 12px;
  font-size: 1rem;
  color: black;
  font-weight: 500;
  outline: none;
  border-right: 10px solid transparent;
  cursor: pointer;
}
.header__item {
  font-size: 1rem;
  color: black;
  font-weight: 600;
  cursor: pointer;
}

.header__item::after {
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
.header__item:hover {
  transition: all 0.3s ease-out;
  color: #f75d37;
}
.header__item:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
.header__logo {
  cursor: pointer;
}
.header__user-icon {
  width: 45px;
  cursor: pointer;
}
</style>
