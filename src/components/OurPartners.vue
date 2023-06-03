<script setup lang="ts"></script>

<template>
  <div class="partners">
    <div class="partners_texts">
      <p class="title">Our partners</p>
      <p class="description">
        There are many variation of passage of lorem ipsum available but the majority have suffered
        alteration
      </p>
    </div>
    <div class="partners_logos">
      <img src="../assets/img/partner1.png" alt="" />
      <img src="../assets/img/partner2.png" alt="" />
      <img src="../assets/img/partner3.png" alt="" />
      <img src="../assets/img/partner4.png" alt="" />
      <img src="../assets/img/partner5.png" alt="" />
    </div>
  </div>
</template>

<style scoped>
.partners {
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
}
.partners_texts {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title {
  font-weight: 600;
  font-size: 60px;
  text-align: center;
  color: #020202;
}
.description {
  font-weight: 500;
  font-size: 18px;
  text-align: center;
  color: #858585;
  max-width: 630px;
  margin: 0 auto;
  margin-top: 20px;
}
.partners_logos {
  display: flex;
  align-items: center;
  gap: 100px;
  margin-top: 60px;
  justify-content: center;
}
@media screen and (max-width: 575px) {
  .partners {
    margin-top: 50px;
  }
  .title {
    font-size: 40px;
  }
  .description {
    font-size: 16px;
    max-width: 300px;
  }
  .partners_logos {
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    flex-direction: column;
  }
}
</style>
