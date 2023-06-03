<script setup lang="ts">
import { ref } from "vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";
import notificationsJson from "@/db/notifications.json";

const notifications = ref(notificationsJson);

const deleteNotification = (id: number) => {
  for (let i = 0; i < notifications.value.length; i++) {
    if (notifications.value[i].id === id) {
      notifications.value.splice(i, 1);
    }
  }
};

window.scrollTo(0, 0);
</script>

<template>
  <HeaderComponent />
  <div class="rec">
    <div class="header">
      <h1 class="title">Notifications</h1>
    </div>
    <div class="notifications" v-auto-animate="{ duration: 500 }" v-if="notifications.length > 0">
      <div class="notifications-one" v-for="i in notifications" :key="i.id">
        <div class="notifications-one-name">
          <img src="../assets/img/icon_notification.png" alt="" />
          <p class="notifications-one-name__text">{{ i.text }}</p>
        </div>
        <div class="notifications-right">
          <p class="notifications-right__date">{{ i.date }}</p>
          <svg
            @click="deleteNotification(i.id)"
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <rect width="25" height="25" fill="url(#pattern0)" />
            <defs>
              <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#image0_109_6" transform="scale(0.01)" />
              </pattern>
              <image
                id="image0_109_6"
                width="100"
                height="100"
                xlink:href="data:image/png;base64,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"
              />
            </defs>
          </svg>
        </div>
      </div>
    </div>
    <div class="null-fav" v-else>
      <img src="/images/nonotifications.png" alt="" />
      <h1>No notifications yet</h1>
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

.notifications {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin: 0 auto;
  width: 100%;
  max-width: 1260px;
  gap: 10px;
}
.notifications-one {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
}
.notifications-right {
  display: flex;
  align-items: center;
  :nth-child(1) {
    font-size: 18px;
    color: #000000;
    font-weight: 700;
  }
  :nth-child(2) {
    cursor: pointer;
    margin-left: 40px;
  }
}
.notifications-one-name {
  display: flex;
  align-items: center;
  gap: 15px;
  img {
    max-width: 30px;
  }
  :nth-child(2) {
    font-size: 18px;
    color: #000000;
    font-weight: 400;
  }
}

@media screen and (max-width: 575px) {
  .title {
    font-size: 30px;
    margin: 0 auto;
  }
  .notifications {
    gap: 15px;
    padding: 0 20px;
    margin-top: 20px;
  }
  .notifications-right {
    &__date {
      display: none;
    }
  }
  .notifications-one-name {
    &__text {
      font-size: 16px !important;
    }
  }
  .null-fav {
    img {
      max-width: 150px;
    }
    h1 {
      font-size: 22px;
    }
  }
}
</style>
