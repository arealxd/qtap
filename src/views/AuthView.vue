<script setup lang="ts">
import { ref } from "vue";
import HeaderComponent from "../components/HeaderComponent.vue";
// import axios from "axios";
import { useRouter } from "vue-router";
import { watch } from "vue";

const router = useRouter();

// let formData = new FormData();

const username = ref("");
const login_password = ref("");
const loginEmailError = ref(false);
const loginPasswordError = ref(false);

window.scrollTo(0, 0);

const login = () => {
  if (
    username.value === localStorage.getItem("email") &&
    login_password.value === localStorage.getItem("password")
  ) {
    localStorage.setItem("userState", "authorized");
    username.value = "";
    login_password.value = "";
    router.push("/");
  } else {
    if (username.value !== localStorage.getItem("email")) {
      loginEmailError.value = true;
    } else {
      loginEmailError.value = false;
      if (login_password.value !== localStorage.getItem("password")) {
        loginPasswordError.value = true;
      } else {
        loginPasswordError.value = false;
      }
    }
  }
  // formData = new FormData();
  // formData.append("username", username.value);
  // formData.append("password", login_password.value);
  // axios
  //   .post("https://almatap-backend.onrender.com/process_login", formData)
  //   .then((result) => {
  //     console.log(result);
  //     console.log(result.status);
  //     if (result.status === 200) {
  //       localStorage.setItem("userState", "authorized");
  //       username.value = "";
  //       login_password.value = "";
  //       router.push("/");
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};

const firstName = ref("");
const lastName = ref("");
const yearOfBirth = ref("");
const email = ref("");
const password = ref("");
const successRegister = ref(false);

const register = () => {
  localStorage.setItem("name", firstName.value);
  localStorage.setItem("surname", lastName.value);
  localStorage.setItem("yearOfBirth", yearOfBirth.value);
  localStorage.setItem("email", email.value);
  localStorage.setItem("password", password.value);
  localStorage.setItem("userState", "registered");
  successRegister.value = true;

  // formData = new FormData();
  // formData.append("name", firstName.value);
  // formData.append("surname", lastName.value);
  // formData.append("yearOfBirth", yearOfBirth.value);
  // formData.append("email", email.value);
  // formData.append("password", password.value);
  // axios
  //   .post("https://almatap-backend.onrender.com/auth/registration", formData)
  //   .then((result) => {
  //     console.log(result);
  //     console.log(result.status);
  //     if (result.status === 200) {
  //       authLevel.value = "login";
  //       localStorage.setItem("userState", "registered");
  //       firstName.value = "";
  //       lastName.value = "";
  //       yearOfBirth.value = "";
  //       email.value = "";
  //       password.value = "";
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};

const forgot = () => {
  console.log("forgot");
  authLevel.value = "createNewPassword";
};

const passwordMismatch = ref(false);
const newPassword = ref("");
const confirmNewPassword = ref("");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
watch(confirmNewPassword, (newValue, oldValue) => {
  if (
    newPassword.value !== "" &&
    confirmNewPassword.value !== "" &&
    newValue !== newPassword.value
  ) {
    passwordMismatch.value = true;
  } else {
    passwordMismatch.value = false;
  }
});

watch(successRegister, () => {
  if (successRegister.value === true) {
    setTimeout(() => {
      successRegister.value = false;
      authLevel.value = "login";
    }, 2000);
  }
});

const setNewPassword = () => {
  console.log("setNewPassword");
  localStorage.setItem("password", confirmNewPassword.value);
  newPassword.value = "";
  confirmNewPassword.value = "";
  authLevel.value = "login";
};

const authLevel = ref("login");
</script>

<template>
  <HeaderComponent />
  <div class="form_block">
    <form @submit.prevent="login" class="form" v-if="authLevel === 'login'">
      <h2>Sign in</h2>
      <div class="btn_offer">
        <p class="new_user">New user?</p>
        <p class="create_btn" @click="authLevel = 'register'">Create an account</p>
      </div>
      <input
        v-model="username"
        required
        class="input_email"
        type="email"
        placeholder="Email address"
      />
      <a-input-password
        v-model:value="login_password"
        required
        class="input_email input_password"
        type="password"
        placeholder="Password"
      />
      <p v-if="loginEmailError" class="mismatch">Wrong email!</p>
      <p v-if="loginPasswordError" class="mismatch">Wrong password!</p>
      <div class="btn_offer">
        <p class="forgot_password" @click="authLevel = 'forgot'">Forgot password?</p>
        <button type="submit" class="sign_in">Sign In</button>
      </div>
    </form>
    <form @submit.prevent="register" class="form" v-if="authLevel === 'register'">
      <h2>Create an account</h2>
      <div class="btn_offer">
        <p class="new_user">Already have an account?</p>
        <p class="create_btn" @click="authLevel = 'login'">Sign in</p>
      </div>

      <div class="name_input">
        <input
          required
          class="input_email"
          style="margin-bottom: unset"
          type="text"
          placeholder="First name"
          v-model="firstName"
        />
        <input
          required
          class="input_email"
          style="margin-bottom: unset"
          type="text"
          placeholder="Last name"
          v-model="lastName"
        />
      </div>
      <input
        required
        class="input_email"
        style="margin-bottom: unset; padding-right: 15px"
        min="1900"
        max="2023"
        type="number"
        placeholder="Year of birth"
        v-model="yearOfBirth"
      />
      <input
        required
        class="input_email"
        type="email"
        placeholder="Email address"
        v-model="email"
      />
      <a-input-password
        style="padding-right: 15px"
        required
        class="input_email input_password"
        type="password"
        placeholder="Password"
        v-model:value="password"
      />
      <p v-if="successRegister" class="successRegister">Successfully registered</p>
      <div class="btn_offer">
        <button type="submit" class="sign_up">Sign Up</button>
      </div>
    </form>
    <form @submit.prevent="forgot" class="form" v-if="authLevel === 'forgot'">
      <h2>Forgot password?</h2>
      <div class="btn_offer">
        <p class="forgot_info">
          No worriest! Just enter your email and we’ll send you a reset password link.
        </p>
      </div>
      <input required class="input_email" type="email" placeholder="Email address" />

      <div class="btn_offer">
        <button type="submit" class="sign_up">Send Recovery Email</button>
      </div>
      <div class="btn_offer" style="margin-top: 19px; justify-content: center">
        <p class="new_user">Just remember?</p>
        <p class="create_btn" @click="authLevel = 'login'">Sign in</p>
      </div>
    </form>
    <form @submit.prevent="setNewPassword" class="form" v-if="authLevel === 'createNewPassword'">
      <h2>Create new password</h2>
      <div class="btn_offer">
        <p class="forgot_info">
          Please create a new password that you don’t use on any other site.
        </p>
      </div>
      <a-input-password
        v-model:value="newPassword"
        required
        class="input_email"
        style="margin-bottom: unset; padding-right: 15px"
        type="password"
        placeholder="New password"
      />
      <a-input-password
        v-model:value="confirmNewPassword"
        style="padding-right: 15px"
        required
        class="input_email"
        type="password"
        placeholder="Confirm new password"
      />
      <p v-if="passwordMismatch" class="mismatch">Password mismatch</p>
      <div class="btn_offer">
        <button v-if="passwordMismatch" type="button" class="sign_up">Change password</button>
        <button v-else type="submit" class="sign_up">Change password</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
input:hover {
  border: #51a8d9 1px solid;
}
::placeholder {
  color: rgb(201, 201, 201);
  opacity: 1;
  font-weight: 400;
}
.name_input {
  display: flex;
  align-items: center;
  gap: 10px;
}
.form_block {
  background-image: url("../assets/img/banner.png");
  padding-top: clamp(1rem, 7vw + 1rem, 12rem);
  background-position: center;
  background-size: cover;
  flex-grow: 1;
}
.form {
  background: #ffffff;
  box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 35px 40px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}
h2 {
  font-weight: 500;
  font-size: 36px;
  line-height: 48px;
  color: #202020;
  text-align: center;
  margin-bottom: 30px;
}
.btn_offer {
  display: flex;
  align-items: center;
  gap: 12px;
}
.new_user {
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #202020;
}
.create_btn {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #51a8d9;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}
.create_btn:hover {
  transition: all 0.5s ease-in-out;
  color: #000;
  text-underline-offset: 5px;
}
.forgot_password {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #51a8d9;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}
.forgot_password:hover {
  transition: all 0.5s ease-in-out;
  color: #000;
  text-underline-offset: 5px;
}
.sign_in {
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
  padding: 14px 70px;
  background: #009580;
  border-radius: 12px;
  text-align: center;
  margin-left: auto;
  cursor: pointer;
  border: none;
}
.sign_in:hover,
.sign_up:hover {
  background: #015c50;
  transition: all 0.3s ease-in-out;
}
.sign_up {
  width: 80%;
  margin: 0 auto;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
  padding: 14px 0px;
  background: #009580;
  border-radius: 12px;
  text-align: center;
  margin-left: auto;
  cursor: pointer;
  border: none;
}
.input_email {
  margin-top: 25px;
  background: #ffffff;
  border: 1px solid #dcdbdd;
  border-radius: 12px;
  padding: 16px 0px 16px 24px;
  outline: none;
  font-weight: 500;
  font-size: 14px;
  color: #202020;
  margin-bottom: 28px;
  width: 100%;
}

.input_password {
  margin-top: 0px;
  padding-right: 15px;
}
.forgot_info {
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #47464a;
}
.mismatch {
  font-weight: 600;
  font-size: 14px;
  color: #ff0000;
  text-align: center;
  margin-top: -15px;
  margin-bottom: 10px;
}

.successRegister {
  font-weight: 600;
  font-size: 14px;
  color: #00b60f;
  text-align: center;
  margin-top: -15px;
  margin-bottom: 10px;
}
/* @media screen and (max-width: 575px) {

} */
</style>
