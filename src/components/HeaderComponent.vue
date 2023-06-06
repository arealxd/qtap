<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n({ useScope: "global" });
const router = useRouter();
const searchValue = ref("");

const emit = defineEmits(["search"]);

const doSearch = () => {
  navOpen.value = false;
  emit("search", searchValue.value);
  searchValue.value = "";
};

const navOpen = ref(false);
const profilePopup = ref(false);
const authorized = localStorage.getItem("userState") === "authorized";

const profileClick = () => {
  if (localStorage.getItem("userState") === "authorized") {
    profilePopup.value = !profilePopup.value;
  } else {
    router.push("/auth/login");
  }
};

// const userName = localStorage.getItem("name") + " " + localStorage.getItem("surname");
// const userEmail = localStorage.getItem("email");

const city = ref(localStorage.getItem("city"));

const setNewCity = (newCity: string | null) => {
  localStorage.setItem("city", newCity?.toString() ?? "");
};

const logout = () => {
  localStorage.setItem("userState", "unauthorized");
  profilePopup.value = false;
  router.push("/auth/login");
};

const goDown = () => {
  router.push("/");
  setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, 100);
};

const token = localStorage.getItem("token");
const myProfile = ref();

axios
  .get("https://almatap-backend.onrender.com/users", {
    headers: { Authorization: `Bearer ${token}` },
  })
  .then((res) => {
    myProfile.value = res.data;
  })
  .catch((err) => {
    console.log(err);
  });

const lang = ref(localStorage.getItem("lang") ?? "en");

const setLang = (newLang: string | null) => {
  localStorage.setItem("lang", newLang?.toString() ?? "");
  locale.value = newLang?.toString() ?? "";
};
</script>

<template>
  <div class="header">
    <div class="header__container container">
      <div class="header__left">
        <p class="header__item" @click="router.push('/')">{{ $t("HOME") }}</p>
        <p class="header__item" @click="router.push('/about')">{{ $t("ABOUTUS") }}</p>
        <!-- <p class="header__item">Blog</p> -->
        <!-- <p class="header__item">Category</p> -->
        <p class="header__item" @click="goDown">{{ $t("CONTACTUS") }}</p>
        <p class="header__item" @click="router.push('/map')">{{ $t("MAP") }}</p>
      </div>
      <img class="header__logo" src="../assets/img/logo.svg" alt="" @click="router.push('/')" />
      <div class="header__right">
        <form class="header__search-form" @submit.prevent="doSearch">
          <input
            v-model="searchValue"
            class="header__search"
            type="text"
            :placeholder="'&#xF002;  ' + $t('SEARCH') + '...'"
            style="font-family: Arial, FontAwesome"
          />
          <input type="submit" hidden />
        </form>
        <select
          @change="setNewCity(city)"
          v-model="city"
          class="header__city"
          name="cities"
          id="cities"
        >
          <option hidden>City</option>
          <option value="Astana">{{ $t("ASTANA") }}</option>
          <option value="Almaty">{{ $t("ALMATY") }}</option>
          <option value="Shymkent">{{ $t("SHYMKENT") }}</option>
          <option value="Kyzylorda">{{ $t("KYZYLORDA") }}</option>
          <option value="Atyrau">{{ $t("ATYRAU") }}</option>
          <option value="Karagandy">{{ $t("KARAGANDY") }}</option>
          <option value="Pavlodar">{{ $t("PAVLODAR") }}</option>
          <option value="Kokshetau">{{ $t("KOKSHETAU") }}</option>
        </select>
        <select
          @change="setLang(lang)"
          v-model="lang"
          class="header__city"
          name="cities"
          id="cities"
        >
          <option hidden>Language</option>
          <option value="en">English</option>
          <option value="ru">Русский</option>
          <option value="kz">Қазақша</option>
        </select>
        <img
          @click="profileClick"
          class="header__user-icon"
          src="../assets/img/userIcon.svg"
          alt=""
        />

        <div class="profile-popup" v-if="profilePopup">
          <img src="../assets/img/userAva.png" alt="" />
          <p class="user-name">{{ myProfile?.name }} {{ myProfile?.surname }}</p>
          <p class="user-email">{{ myProfile?.email }}</p>
          <hr />
          <div class="notification" @click="router.push('/notifications')">
            <img src="../assets/img/icon_notification.png" alt="" />
            <p class="notification-text">{{ $t("NOTIFICATIONS") }}</p>
          </div>
          <div class="notification" @click="router.push('/favorites')">
            <img src="../assets/img/icon_fav.png" alt="" />
            <p class="notification-text">{{ $t("FAVORITES") }}</p>
          </div>
          <p class="edit-profile" @click="router.push('/edit-profile')">{{ $t("EDITPROFILE") }}</p>
          <p class="logout-profile" @click="logout">{{ $t("LOGOUT") }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="header-mobile" :class="{ 'header__active-burger': navOpen }">
    <img class="header__logo" src="../assets/img/logo.svg" alt="" @click="router.push('/')" />
    <!-- <img src="../assets/img/burger_menu.png" class="burger__menu-btn" alt="" /> -->
    <div id="sidemenu">
      <button
        class="sidemenu__btn"
        v-on:click="navOpen = !navOpen"
        v-bind:class="{ active: navOpen }"
      >
        <span class="top"></span>
        <span class="mid"></span>
        <span class="bottom"></span>
      </button>
      <transition name="translateX">
        <nav v-show="navOpen">
          <div class="sidemenu__wrapper">
            <ul class="sidemenu__list">
              <form class="header__search-form-mobile" @submit.prevent="doSearch">
                <input
                  v-model="searchValue"
                  class="header__search"
                  type="text"
                  :placeholder="'&#xF002;  ' + $t('SEARCH') + '...'"
                  style="font-family: Arial, FontAwesome"
                />
                <input type="submit" hidden />
              </form>
              <li class="sidemenu__item" @click="router.push('/')">
                <p>{{ $t("HOME") }}</p>
              </li>
              <li class="sidemenu__item" @click="router.push('/about')">
                <p>{{ $t("ABOUTUS") }}</p>
              </li>
              <!-- <li class="sidemenu__item"><p>Blog</p></li> -->
              <!-- <li class="sidemenu__item"><p>Category</p></li> -->
              <li class="sidemenu__item" @click="goDown">
                <p>{{ $t("CONTACTUS") }}</p>
              </li>
              <li class="sidemenu__item" @click="router.push('/map')">
                <p>{{ $t("MAP") }}</p>
              </li>
              <li class="sidemenu__item" @click="router.push('/notifications')" v-if="authorized">
                <p>{{ $t("NOTIFICATIONS") }}</p>
              </li>
              <li class="sidemenu__item" @click="router.push('/favorites')" v-if="authorized">
                <p>{{ $t("FAVORITES") }}</p>
              </li>
              <li class="sidemenu__item" @click="router.push('/edit-profile')" v-if="authorized">
                <p>{{ $t("EDITPROFILE") }}</p>
              </li>
              <li class="sidemenu__item" @click="logout" v-if="authorized">
                <p>{{ $t("LOGOUT") }}</p>
              </li>
              <li class="sidemenu__item" @click="router.push('/auth/login')" v-if="!authorized">
                <p>{{ $t("LOGIN") }}</p>
              </li>
              <select
                @change="setNewCity(city)"
                v-model="city"
                class="header__city-mobile"
                name="cities"
                id="cities"
              >
                <option hidden>City</option>
                <option value="Astana">{{ $t("ASTANA") }}</option>
                <option value="Almaty">{{ $t("ALMATY") }}</option>
                <option value="Shymkent">{{ $t("SHYMKENT") }}</option>
                <option value="Kyzylorda">{{ $t("KYZYLORDA") }}</option>
                <option value="Atyrau">{{ $t("ATYRAU") }}</option>
                <option value="Karagandy">{{ $t("KARAGANDY") }}</option>
                <option value="Pavlodar">{{ $t("PAVLODAR") }}</option>
                <option value="Kokshetau">{{ $t("KOKSHETAU") }}</option>
              </select>
              <select
                class="header__city-mobile"
                @change="setLang(lang)"
                v-model="lang"
                name="cities"
                id="cities"
              >
                <option hidden>Language</option>
                <option value="en">English</option>
                <option value="ru">Русский</option>
                <option value="kz">Қазақша</option>
              </select>
            </ul>
          </div>
        </nav>
      </transition>
    </div>
  </div>

  <div v-if="profilePopup" @click="profilePopup = false" class="cover_dark"></div>
</template>

<style scoped lang="scss">
.header-mobile {
  display: none;
}
.header {
  padding-block: 1rem;
  background-color: #ffffffee;
  border-bottom: 1px solid #e9e9e9;
}
.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header__left {
  display: flex;
  align-items: center;
  gap: 60px;
}
.header__right {
  position: relative;
  display: flex;
  align-items: center;
  gap: 19px;
}
.header__search-form {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 180px;
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

.profile-popup {
  position: absolute;
  padding: 37px 46px;
  background: #ffffff;
  box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  z-index: 10;
  right: 0;
  top: 62px;
  text-align: center;
}
.cover_dark {
  background: #000000;
  opacity: 0.5;
  z-index: 9;
  position: absolute;
  width: 100%;
  height: 100%;
}
.user-name {
  font-weight: 500;
  font-size: 20px;
  color: #202020;
  margin-top: 10px;
}
.user-email {
  font-weight: 275;
  font-size: 13px;
  color: #202020;
}

hr {
  width: 250px;
  margin-top: 10px;
  border-top: 2px solid #dcdbdd;
}

.notification {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 24px;
  cursor: pointer;
}

.notification img {
  width: 24px;
  height: 24px;
}

.notification-text {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #202020;
}

.notification:hover .notification-text {
  transition: all 0.3s ease-out;
  text-decoration: underline;
  text-underline-offset: 5px;
  text-decoration-thickness: 2px;
}

.edit-profile {
  font-weight: 500;
  font-size: 15px;
  color: #ffffff;
  padding: 8px 0px;
  width: 100%;
  background: #009580;
  border-radius: 12px;
  margin: 0 auto;
  margin-top: 25px;
  cursor: pointer;
  transition: all 0.3s ease-out;
}

.edit-profile:hover {
  background: #035a4e;
}

.logout-profile {
  font-weight: 500;
  font-size: 15px;
  color: #ffffff;
  padding: 8px 0px;
  width: 100%;
  background: #aa2020;
  border-radius: 12px;
  margin: 0 auto;
  margin-top: 10px;
  cursor: pointer;
  transition: all 0.3s ease-out;
}

.logout-profile:hover {
  background: #8b0101;
}

@media screen and (max-width: 575px) {
  .header {
    display: none;
  }
  .header-mobile {
    display: flex;
    align-items: center;
    padding: 0px 20px;
    margin-top: 10px;
    width: 100%;
  }
  .header__active-burger {
    margin-top: 17px;
    margin-bottom: 7px;
  }

  #sidemenu {
    width: 100%;
    nav {
      width: 200px;
      background: grey;
      position: fixed;
      top: 0;
      right: 0;
      z-index: 99;
    }

    .sidemenu {
      &__btn {
        margin-left: auto;
        display: block;
        width: 50px;
        height: 50px;
        background: transparent;
        border: none;
        position: relative;
        z-index: 100;
        appearance: none;
        cursor: pointer;
        outline: none;

        span {
          display: block;
          width: 20px;
          height: 2px;
          margin: auto;
          background: rgb(0, 0, 0);
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          transition: all 0.4s ease;

          &.top {
            transform: translateY(-8px);
          }

          &.bottom {
            transform: translateY(8px);
          }
        }
        &.active {
          position: fixed;
          right: 10px;
          top: 15px;
          span {
            background: white;
          }
          .top {
            transform: rotate(-45deg);
          }
          .mid {
            transform: translateX(-20px) rotate(360deg);
            opacity: 0;
          }
          .bottom {
            transform: rotate(45deg);
          }
        }
      }

      &__wrapper {
        padding-top: 50px;
      }

      &__list {
        padding-top: 50px;
        list-style: none;
        padding: 0;
        margin: 0;
        margin-top: 30px;
      }

      &__item {
        a {
          text-decoration: none;
          line-height: 1.6em;
          font-size: 1.6em;
          padding: 0.5em;
          display: block;
          color: white;
          transition: 0.4s ease;

          &:hover {
            background: lightgrey;
            color: dimgrey;
          }
        }
      }
    }
  }

  .translateX-enter {
    transform: translateX(200px);
    opacity: 0;
  }

  .translateX-enter-active,
  .translateX-leave-active {
    transform-origin: top left 0;
    transition: 0.2s ease;
  }

  .translateX-leave-to {
    transform: translateX(200px);
    opacity: 0;
  }
  .sidemenu__item {
    font-size: 1.3rem;
    color: white;
    margin-left: 40px;
  }
  .sidemenu__list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 20px;
  }
  .sidemenu__wrapper {
    padding-bottom: 50px;
  }
  .header__city-mobile {
    border-radius: 100px;
    background: transparent;
    border: none;
    font-size: 1.3rem;
    color: white;
    font-weight: 500;
    outline: none;
    border-right: 10px solid transparent;
    cursor: pointer;
    width: 70%;
    margin-left: 36px;
  }
  select option {
    margin: 40px;
    background: rgb(63, 63, 63);
    color: #fff;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
  }
  .header__search-form-mobile {
    width: 90%;
    margin-left: 10px;
  }
}
</style>
