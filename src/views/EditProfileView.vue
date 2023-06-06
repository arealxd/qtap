<script setup lang="ts">
import { ref, watch } from "vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";
import axios from "axios";

const firstName = ref<any>(localStorage.getItem("name"));
const lastName = ref<any>(localStorage.getItem("surname"));
const yearOfBirth = ref<any>(localStorage.getItem("yearOfBirth"));
const email = ref<any>(localStorage.getItem("email"));
const password = ref("");
const confirmPassword = ref("");

const editProfile = () => {
  localStorage.setItem("name", firstName.value);
  localStorage.setItem("surname", lastName.value);
  localStorage.setItem("yearOfBirth", yearOfBirth.value);
  localStorage.setItem("email", email.value);
  if (confirmPassword.value !== "") {
    localStorage.setItem("password", confirmPassword.value);
  }
  successfullySaved.value = true;
  setTimeout(() => {
    successfullySaved.value = false;
    password.value = "";
    confirmPassword.value = "";
  }, 1500);
};

const mismatch = ref(false);
const successfullySaved = ref(false);
const activeBtn = ref(true);

watch(confirmPassword, () => {
  if (password.value !== confirmPassword.value) {
    mismatch.value = true;
    activeBtn.value = false;
  } else {
    mismatch.value = false;
    activeBtn.value = true;
  }
});

window.scrollTo(0, 0);
</script>

<template>
  <HeaderComponent />
  <div class="rec">
    <div class="header">
      <h1 class="title">Edit profile</h1>
    </div>
    <form @submit.prevent="editProfile" class="edit-form">
      <div class="edit" v-auto-animate="{ duration: 500 }">
        <div class="edit-blocks">
          <div class="edit-input">
            <p>First name</p>
            <input type="text" v-model="firstName" placeholder="First name" />
          </div>
          <div class="edit-input">
            <p>Last name</p>
            <input type="text" v-model="lastName" placeholder="Last name" />
          </div>
          <div class="edit-input">
            <p>Year of birth</p>
            <input type="text" v-model="yearOfBirth" placeholder="Year of birth" />
          </div>
        </div>
        <div class="edit-blocks">
          <div class="edit-input">
            <p>Email address</p>
            <input type="email" v-model="email" placeholder="Email address" />
          </div>
          <div class="edit-input">
            <p>Password</p>
            <input type="password" v-model="password" placeholder="Password" />
          </div>
          <div class="edit-input">
            <p>Confirm password</p>
            <input type="password" v-model="confirmPassword" placeholder="Confirm password" />
          </div>
        </div>
      </div>
      <p class="password_mismatch" v-if="mismatch">Password mismatch!</p>
      <p class="successfully_saved" v-if="successfullySaved">Successfully saved</p>
      <button type="submit" v-if="activeBtn">Save</button>
      <button type="button" v-else>Save</button>
    </form>
  </div>
  <FooterComponent />
</template>

<style scoped lang="scss">
.password_mismatch {
  color: red;
  font-size: 15px;
  font-weight: 700;
  margin: 0 auto;
  margin: -10px auto;
}
.successfully_saved {
  color: rgb(31, 187, 0);
  font-size: 15px;
  font-weight: 700;
  margin: 0 auto;
  margin: -10px auto;
}
.rec {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 150px;
}
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1260px;
  margin: 0 auto;
}
.title {
  font-weight: 700;
  font-size: 42px;
  color: #000000;
}
.edit-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  gap: 20px;
  margin: 0 auto;
  button {
    width: 100%;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    background-color: rgb(1, 119, 253);
    outline: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  button:hover {
    background-color: rgb(0, 82, 204);
  }
}
.edit {
  display: flex;
  margin-top: 20px;
  gap: 50px;
}
.edit-blocks {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.edit-input {
  display: flex;
  flex-direction: column;
  gap: 5px;
  p {
    font-weight: 500;
    font-size: 17px;
    color: #000000;
  }
  input {
    width: 100%;
    max-width: 300px;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 600;
    color: #000000;
    background-color: rgb(255, 246, 123);
    outline: none;
  }
  input::placeholder {
    color: #535353;
    font-size: 16px;
    font-weight: 600;
  }
}

@media screen and (max-width: 575px) {
  .title {
    font-size: 32px;
    margin: 0 auto;
  }
  .edit {
    padding: 0 20px;
    margin-top: 25px;
    flex-direction: column;
    gap: 15px;
  }
  .edit-form {
    width: 100%;
    max-width: 100%;
    button {
      max-width: 234px;
    }
  }
  .edit-input {
    width: 100%;
    max-width: 100%;
    p {
      font-size: 16px;
    }
  }
  .rec {
    margin-bottom: 70px;
  }
}
</style>
