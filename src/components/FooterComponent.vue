<script setup lang="ts">
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
      <p class="gallery_text">WE ARE ALWAYS HAPPY TO HELP YOU FIND SUITABLE PLACES.</p>
    </div>
    <div class="footer_nav container">
      <div class="logo">
        <router-link class="router" to="/">
          <img src="../assets/img/logo.svg" alt="" />
        </router-link>
        <p class="logo_text">Travel around the Kazakhstan.</p>
        <p class="copyright">© 2023 QTAP All rights reserved.</p>
      </div>
      <div class="contact">
        <p class="contact_text">Contact Information</p>
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
        <p class="quick_title">Quick Link</p>
        <router-link class="router" to="/" @click="goUp"
          ><p class="quick_description">Home</p></router-link
        >
        <router-link class="router" to="/about"
          ><p class="quick_description">About Us</p></router-link
        >
        <router-link class="router" to="/map"><p class="quick_description">Map</p></router-link>
        <!-- <router-link class="router" to="/blog"><p class="quick_description">Blog</p></router-link> -->
        <!-- <router-link class="router" to="/category"
          ><p class="quick_description">Category</p></router-link
        > -->
        <!-- <router-link class="router" to="/contact"
          ><p class="quick_description">Contact Us</p></router-link
        > -->
      </div>
      <div class="follow">
        <p class="quick_title">Follow Us</p>
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
  .footer_nav {
    flex-direction: column;
    align-items: flex-start;
  }
  .logo {
    margin-bottom: 30px;
  }
  .contact {
    margin-bottom: 30px;
  }
  .quick {
    margin-bottom: 30px;
  }
  .follow {
    margin-bottom: 30px;
  }
  .gallery_text {
    font-size: 18px;
  }
}
</style>
