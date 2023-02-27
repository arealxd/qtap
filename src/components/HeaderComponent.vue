<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const searchValue = ref("");

const doSearch = () => {
  console.log(searchValue.value);
};

const navOpen = ref(false);
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
  <div class="header-mobile">
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
              <li class="sidemenu__item"><p>Home</p></li>
              <li class="sidemenu__item"><p>About Us</p></li>
              <li class="sidemenu__item"><p>Blog</p></li>
              <li class="sidemenu__item"><p>Category</p></li>
              <li class="sidemenu__item"><p>Contact Us</p></li>
              <li class="sidemenu__item"><p>My profile</p></li>
              <select class="header__city-mobile" name="cities" id="cities">
                <option hidden>City</option>
                <option value="Astana">Astana</option>
                <option value="Almaty">Almaty</option>
                <option value="Shymkent">Shymkent</option>
                <option value="Aktau">Aktau</option>
              </select>
              <form class="header__search-form-mobile" @submit.prevent="doSearch">
                <input
                  v-model="searchValue"
                  class="header__search"
                  type="text"
                  placeholder="&#xF002;  Search..."
                  style="font-family: Arial, FontAwesome"
                />
                <input type="submit" hidden />
              </form>
            </ul>
          </div>
        </nav>
      </transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-mobile {
  display: none;
}
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

@media screen and (max-width: 575px) {
  .header {
    display: none;
  }
  .header-mobile {
    display: flex;
    align-items: center;
    padding: 0px 20px;
    margin-top: -10px;
    width: 100%;
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
        // position: fixed;
        position: relative;
        z-index: 100;
        appearance: none;
        cursor: pointer;
        outline: none;
        // right: 10px;
        // top: 15px;

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
        margin-top: 20px;
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
    width: 60%;
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
