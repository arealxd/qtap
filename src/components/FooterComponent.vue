<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n({ useScope: "global" });

const goUp = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>

<template>
  <div class="footer">
    <div class="gallery_block">
      <p class="gallery_text">{{ $t("ALWAYS") }}</p>
    </div>
    <div class="footer_nav container">
      <div class="logo">
        <router-link class="router" to="/">
          <img src="../assets/img/logo.svg" alt="" />
        </router-link>
        <p class="logo_text">{{ $t("TRAVEL") }}.</p>
        <p class="copyright">© 2023 QTAP {{ $t("RESERVED") }}.</p>
      </div>
      <div class="contact">
        <p class="contact_text">{{ $t("CONTACT") }}</p>
        <div class="phone">
          <img src="../assets/img/phone.png" alt="" />
          <a class="contact_data" href="tel:+77055254909">+7 705 525 49 09</a>
        </div>
        <div class="email">
          <img src="../assets/img/email.png" alt="" />
          <a class="contact_data" href="mailto:qtap@gmail.com">qtap@gmail.com</a>
        </div>
      </div>
      <div class="quick">
        <p class="quick_title">{{ $t("QUICKLINK") }}</p>
        <router-link class="router" to="/" @click="goUp"
          ><p class="quick_description">{{ $t("HOME") }}</p></router-link
        >
        <router-link class="router" to="/about"
          ><p class="quick_description">{{ $t("ABOUTUS") }}</p></router-link
        >
        <router-link class="router" to="/map"
          ><p class="quick_description">{{ $t("MAP") }}</p></router-link
        >
        <!-- <router-link class="router" to="/blog"><p class="quick_description">Blog</p></router-link> -->
        <!-- <router-link class="router" to="/category"
          ><p class="quick_description">Category</p></router-link
        > -->
        <!-- <router-link class="router" to="/contact"
          ><p class="quick_description">Contact Us</p></router-link
        > -->
      </div>
      <div class="follow">
        <p class="quick_title">{{ $t("FOLLOWUS") }}</p>
        <div class="social">
          <a href="https://ru-ru.facebook.com/" target="_blank"
            ><img src="../assets/img/facebook.png" alt=""
          /></a>
          <a href="https://twitter.com/?lang=ru" target="_blank"
            ><img src="../assets/img/twitter.png" alt=""
          /></a>
          <a href="https://www.youtube.com/" target="_blank"
            ><img src="../assets/img/youtube.png" alt=""
          /></a>
          <a href="https://www.instagram.com/" target="_blank"
            ><img src="../assets/img/instagram.png" alt=""
          /></a>
        </div>
      </div>
      <div class="follow mobile-app">
        <p class="quick_title">{{ $t("MOBILEAPP") }}</p>
        <div class="social" style="margin-top: -35px">
          <a href="https://play.google.com/store/apps/details?id=com.qtap.qtap" target="_blank"
            ><img style="width: 125px" src="/images/playmarket.png" alt=""
          /></a>
          <a href="https://www.apple.com/ru/app-store/" target="_blank"
            ><img style="width: 125px" src="/images/appstore.png" alt=""
          /></a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.router {
  text-decoration: none;
}
.footer {
  display: flex;
  flex-direction: column;
}
.gallery_block {
  background: #2ea7eb;
  padding: 15px 0px;
  width: 100%;
  text-align: center;
}
.gallery_text {
  font-weight: 500;
  font-size: 22px;
  text-align: center;
  color: #000000;
}
.footer_nav {
  display: flex;
  margin-top: 100px;
  justify-content: space-between;
}
.logo_text {
  font-weight: 500;
  font-size: 18px;
  color: #6c6c6c;
  height: 100%;
}
.contact_text {
  font-weight: 600;
  font-size: 24px;
  color: #000000;
}
.phone {
  display: flex;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 5px;
  cursor: pointer;
}
.email {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.contact_data {
  font-weight: 500;
  font-size: 18px;
  color: #6c6c6c;
  cursor: pointer;
  text-decoration: none;
}
.contact img {
  margin-right: 6px;
}
.quick_title {
  font-weight: 600;
  font-size: 24px;
  color: #000000;
  margin-bottom: 10px;
}
.quick_description {
  font-weight: 500;
  font-size: 18px;
  color: #6c6c6c;
  margin-top: 5px;
  cursor: pointer;
}
.social {
  display: flex;
  align-items: center;
  margin-top: 15px;
  gap: 20px;
}
.copyright {
  font-weight: 400;
  font-size: 16px;
  color: #000000;
  margin-top: auto;
  padding-bottom: 35px;
}
.social img {
  cursor: pointer;
}

@media screen and (max-width: 575px) {
  .gallery_block {
    padding: 15px 20px;
  }
  .copyright {
    display: none;
  }
  .footer_nav {
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }
  .logo {
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .contact {
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .quick {
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .follow {
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .quick_title {
    margin-bottom: 0;
  }
  .gallery_text {
    font-size: 18px;
  }
}
</style>
