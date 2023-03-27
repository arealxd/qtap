<script setup lang="ts"></script>

<template>
  <div class="places">
    <div class="gallery_block"><p class="gallery_text">GALLERY</p></div>
    <h1>Unforgettable moments</h1>
    <div class="images">
      <div class="left">
        <img src="../assets/img/mountains.jpg" alt="" />
        <p class="image_text">Mountains</p>
      </div>
      <div class="right">
        <div class="right_upper">
          <img src="../assets/img/historical.jpg" alt="" />
          <p class="image_text">Historical</p>
        </div>
        <div class="right_under">
          <div class="right_under-left">
            <img src="../assets/img/museums.jpg" alt="" />
            <p class="image_text">Museums</p>
          </div>
          <div class="right_under-right">
            <img src="../assets/img/attractions.jpg" alt="" />
            <p class="image_text">Attractions</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  border-radius: 10px;
}
.places {
  display: flex;
  flex-direction: column;
  padding-bottom: 70px;
}
.gallery_block {
  background: #2ea7eb;
  padding: 15px 0px;
  width: 100%;
  text-align: center;
}
.gallery_text {
  font-weight: 500;
  font-size: 28px;
  text-align: center;
  color: #000000;
}
h1 {
  font-weight: 600;
  font-size: 40px;
  text-align: center;
  color: #000000;
  margin-top: 60px;
  margin-bottom: 40px;
}
.images {
  display: flex;
  gap: 20px;
  width: 100%;
}
.left {
  width: 100%;
  position: relative;
}
.right {
  width: 100%;
}
.left img {
  height: 100%;
  max-height: 600px;
  width: 100%;
}
.right {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.right_upper {
  position: relative;
}
.right_upper img {
  max-height: 287px;
  width: 100%;
}
.right_under {
  display: flex;
  align-items: center;
  gap: 20px;
  object-fit: cover;
}
.right_under img {
  max-height: 287px;
  width: 100%;
  height: 100%;
}
.right_under-left {
  position: relative;
  width: 100%;
  height: 100%;
}
.right_under-right {
  position: relative;
  width: 100%;
  height: 100%;
}
.image_text {
  font-weight: 600;
  font-size: 28px;
  color: #ffffff;
  position: absolute;
  bottom: 25px;
  left: 25px;
}
</style>
