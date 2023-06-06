<script setup lang="ts">
import { ref } from "vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { watch } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n({ useScope: "global" });

const router = useRouter();

let formData = new FormData();

const username = ref("");
const login_password = ref("");
const loginEmailError = ref(false);
const loginPasswordError = ref(false);

window.scrollTo(0, 0);

const login = () => {
  // if (
  //   username.value === localStorage.getItem("email") &&
  //   login_password.value === localStorage.getItem("password")
  // ) {
  //   localStorage.setItem("userState", "authorized");
  //   username.value = "";
  //   login_password.value = "";
  //   router.push("/");
  // } else {
  //   if (username.value !== localStorage.getItem("email")) {
  //     loginEmailError.value = true;
  //   } else {
  //     loginEmailError.value = false;
  //     if (login_password.value !== localStorage.getItem("password")) {
  //       loginPasswordError.value = true;
  //     } else {
  //       loginPasswordError.value = false;
  //     }
  //   }
  // }

  // formData = new FormData();
  // formData.append("username", username.value);
  // formData.append("password", login_password.value);
  axios
    .post("https://almatap-backend.onrender.com/auth/login", {
      username: username.value,
      password: login_password.value,
    })
    .then((result) => {
      console.log(result);
      console.log(result.status);
      if (result.status === 200) {
        if (result.data.token === undefined) {
          loginEmailError.value = true;
        } else {
          localStorage.setItem("userState", "authorized");
          localStorage.setItem("token", result.data.token);
          username.value = "";
          login_password.value = "";
          router.push("/");
          getProfile();
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const firstName = ref("");
const lastName = ref("");
const yearOfBirth = ref("");
const email = ref("");
const password = ref("");
const successRegister = ref(false);

const register = () => {
  // localStorage.setItem("name", firstName.value);
  // localStorage.setItem("surname", lastName.value);
  // localStorage.setItem("yearOfBirth", yearOfBirth.value);
  // localStorage.setItem("email", email.value);
  // localStorage.setItem("password", password.value);
  // localStorage.setItem("userState", "registered");
  // successRegister.value = true;

  formData = new FormData();
  formData.append("name", firstName.value);
  formData.append("surname", lastName.value);
  formData.append("yearOfBirth", yearOfBirth.value);
  formData.append("email", email.value);
  formData.append("password", password.value);
  axios
    .post("https://almatap-backend.onrender.com/auth/registration", formData)
    .then((result) => {
      console.log(result);
      console.log(result.status);
      if (result.status === 200) {
        successRegister.value = true;
        localStorage.setItem("userState", "registered");
        firstName.value = "";
        lastName.value = "";
        yearOfBirth.value = "";
        email.value = "";
        password.value = "";
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const forgotEmail = ref("");
const checkEmailForgot = ref(false);

const forgot = () => {
  formData = new FormData();
  formData.append("email", forgotEmail.value);

  axios
    .post("https://almatap-backend.onrender.com/auth/lost-password", formData)
    .then((result) => {
      console.log(result);
      if (result.status === 200) {
        checkEmailForgot.value = true;
        setTimeout(() => {
          forgotEmail.value = "";
          checkEmailForgot.value = false;
          authLevel.value = "login";
        }, 2000);
      }
    })
    .catch((error) => {
      console.log(error);
    });
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
    }, 3000);
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

const token = localStorage.getItem("token");
const myProfile = ref();

const getProfile = () => {
  axios
    .get("https://almatap-backend.onrender.com/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      myProfile.value = res.data;
      localStorage.setItem("name", myProfile.value.name);
      localStorage.setItem("surname", myProfile.value.surname);
      localStorage.setItem("yearOfBirth", myProfile.value.yearOfBirth);
      localStorage.setItem("email", myProfile.value.email);
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<template>
  <HeaderComponent />
  <div class="form_block">
    <form @submit.prevent="login" class="form" v-if="authLevel === 'login'">
      <h2>{{ $t("SIGNIN") }}</h2>
      <div class="btn_offer">
        <p class="new_user">{{ $t("NEWUSER") }}</p>
        <p class="create_btn" @click="authLevel = 'register'">{{ $t("CREATEACCOUNT") }}</p>
      </div>
      <input
        v-model="username"
        required
        class="input_email"
        type="email"
        :placeholder="$t('EMAILADDRESS')"
      />
      <a-input-password
        v-model:value="login_password"
        required
        class="input_email input_password"
        type="password"
        :placeholder="$t('PASSWORD')"
      />
      <p v-if="loginEmailError" class="mismatch">{{ $t("WRONGEMAIL") }}!</p>
      <p v-if="loginPasswordError" class="mismatch">{{ $t("WRONGPASSWORD") }}</p>
      <div class="btn_offer">
        <p class="forgot_password" @click="authLevel = 'forgot'">{{ $t("FORGOTPASSWORD") }}</p>
        <button type="submit" class="sign_in">{{ $t("SIGNIN") }}</button>
      </div>
    </form>
    <form @submit.prevent="register" class="form" v-if="authLevel === 'register'">
      <h2>{{ $t("CREATEACCOUNT") }}</h2>
      <div class="btn_offer">
        <p class="new_user">{{ $t("ALREADYHAVE") }}</p>
        <p class="create_btn" @click="authLevel = 'login'">{{ $t("SIGNIN") }}</p>
      </div>

      <div class="name_input">
        <input
          required
          class="input_email"
          style="margin-bottom: unset"
          type="text"
          :placeholder="$t('FIRSTNAME')"
          v-model="firstName"
        />
        <input
          required
          class="input_email"
          style="margin-bottom: unset"
          type="text"
          :placeholder="$t('LASTNAME')"
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
        :placeholder="$t('YEARBIRTH')"
        v-model="yearOfBirth"
      />
      <input
        required
        class="input_email"
        type="email"
        :placeholder="$t('EMAILADDRESS')"
        v-model="email"
      />
      <a-input-password
        style="padding-right: 15px"
        required
        class="input_email input_password"
        type="password"
        :placeholder="$t('PASSWORD')"
        v-model:value="password"
      />
      <p v-if="successRegister" class="successRegister">{{ $t("CHECKCONFIRM") }}</p>
      <div class="btn_offer">
        <button type="submit" class="sign_up">{{ $t("SIGNUP") }}</button>
      </div>
    </form>
    <form @submit.prevent="forgot" class="form" v-if="authLevel === 'forgot'">
      <h2>{{ $t("FORGOTPASSWORD") }}</h2>
      <div class="btn_offer">
        <p class="forgot_info">
          {{ $t("NOWORRIEST") }}
        </p>
      </div>
      <input
        required
        class="input_email"
        type="email"
        v-model="forgotEmail"
        :placeholder="$t('EMAILADDRESS')"
      />
      <p class="successRegister" v-if="checkEmailForgot">{{ $t("CHECKEMAIL") }}</p>
      <div class="btn_offer">
        <button type="submit" class="sign_up">{{ $t("SENDRESET") }}</button>
      </div>
      <div class="btn_offer" style="margin-top: 19px; justify-content: center">
        <p class="new_user">{{ $t("JUSTREMEMBER") }}</p>
        <p class="create_btn" @click="authLevel = 'login'">{{ $t("SIGNIN") }}</p>
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
  font-size: 16px;
  color: #00b60f;
  text-align: center;
  margin-top: -15px;
  margin-bottom: 10px;
}

@media screen and (max-width: 575px) {
  .form {
    width: 90%;
    margin: 0 auto;
  }
  .btn_offer {
    flex-direction: column;
    gap: 15px;
  }
  .sign_in {
    margin: 0 auto;
  }
  h2 {
    font-weight: 700;
    font-size: 30px;
  }
}
</style>
