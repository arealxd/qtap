<script setup lang="ts">
import { ref } from "vue";
import StarRating from "vue-star-rating";
import feedbackJson from "@/db/feedback.json";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n({ useScope: "global" });

const firstIndex = ref(0);
const secondIndex = ref(1);
const thirdIndex = ref(2);

const feedback = ref(feedbackJson);

const nextFeedback = () => {
  if (thirdIndex.value === feedback.value.length - 1) {
    firstIndex.value = 0;
    secondIndex.value = 1;
    thirdIndex.value = 2;
  } else {
    firstIndex.value++;
    secondIndex.value++;
    thirdIndex.value++;
  }
};

const previousFeedback = () => {
  if (firstIndex.value === 0) {
    firstIndex.value = feedback.value.length - 3;
    secondIndex.value = feedback.value.length - 2;
    thirdIndex.value = feedback.value.length - 1;
  } else {
    firstIndex.value--;
    secondIndex.value--;
    thirdIndex.value--;
  }
};

const showFeedbackForm = ref(false);
const feedbackRating = ref(0);
const feedbackText = ref("");

const postFeedback = () => {
  feedback.value.push({
    id: feedback.value.length + 1,
    name: "Platform User",
    role: "Treveller",
    rating: feedbackRating.value,
    description: feedbackText.value,
    image: "https://picsum.photos/200/300",
  });
  console.log("feedback posted: " + feedbackText.value + " " + feedbackRating.value);
  showFeedbackForm.value = false;
  feedbackRating.value = 0;
  feedbackText.value = "";
};
</script>

<template>
  <div class="feedback container">
    <div class="feedback_header">
      <div class="title">
        <p class="title_first">{{ $t("TESTIMONIAL") }}</p>
        <p class="title_second">{{ $t("WHAT") }}</p>
        <p class="title_third">{{ $t("BRIEF") }}</p>
      </div>
      <div class="leave_feedback">
        <p class="btn" @click="showFeedbackForm = !showFeedbackForm">{{ $t("LEAVE") }}</p>
        <form v-if="showFeedbackForm" class="form_feedback" @submit.prevent="postFeedback">
          <star-rating :star-size="20" :read-only="false" v-model:rating="feedbackRating" />
          <textarea
            type="text"
            required
            v-model="feedbackText"
            :placeholder="$t('WRITEREVIEW')"
            rows="5"
          >
          </textarea>
          <button type="submit">{{ $t("SEND") }}</button>
        </form>
        <div class="arrows">
          <div class="left-arrow" @click="previousFeedback">
            <svg
              width="19"
              height="35"
              viewBox="0 0 19 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.904 2.33447L1.57471 17.8914L16.904 33.4483"
                stroke="#737373"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="right-arrow" @click="nextFeedback">
            <svg
              width="19"
              height="35"
              viewBox="0 0 19 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.81138 2.28027L17.1406 17.8372L1.81138 33.3941"
                stroke="#737373"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="feedback_cards">
      <div class="card">
        <img :src="feedback[firstIndex].image" alt="" />
        <p class="user_name">{{ feedback[firstIndex].name }}</p>
        <p class="user_role">{{ feedback[firstIndex].role }}</p>
        <star-rating
          :star-size="15"
          :read-only="true"
          v-model:rating="feedback[firstIndex].rating"
        />
        <p class="description">
          {{ feedback[firstIndex].description }}
        </p>
      </div>
      <div class="card">
        <img :src="feedback[secondIndex].image" alt="" />
        <p class="user_name">{{ feedback[secondIndex].name }}</p>
        <p class="user_role">{{ feedback[secondIndex].role }}</p>
        <star-rating
          :star-size="15"
          :read-only="true"
          v-model:rating="feedback[secondIndex].rating"
        />
        <p class="description">
          {{ feedback[secondIndex].description }}
        </p>
      </div>
      <div class="card">
        <img :src="feedback[thirdIndex].image" alt="" />
        <p class="user_name">{{ feedback[thirdIndex].name }}</p>
        <p class="user_role">{{ feedback[thirdIndex].role }}</p>
        <star-rating
          :star-size="15"
          :read-only="true"
          v-model:rating="feedback[thirdIndex].rating"
        />
        <p class="description">
          {{ feedback[thirdIndex].description }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.feedback_cards {
  display: flex;
  justify-content: space-between;
  gap: 50px;
  margin-top: 50px;
}
.card {
  padding: 50px;
  background: #ffffff;
  box-shadow: 0px 20px 60px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  max-width: 385.33px;
}
.card img {
  width: 100px;
  height: 100px;
  max-width: 140px;
  max-height: 140px;
  border-radius: 100%;
  margin: 0 auto;
}
.user_name {
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  color: #000000;
  margin-top: 20px;
}
.user_role {
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  color: #858585;
  margin-bottom: 10px;
}
.description {
  font-weight: 500;
  font-size: 16px;
  color: #858585;
  margin-top: 5px;
}
.feedback {
  display: flex;
  flex-direction: column;
}
.feedback_header {
  display: flex;
}
.leave_feedback {
  margin-left: auto;
  display: flex;
  flex-direction: column;
  gap: 60px;
}
.btn {
  padding: 10px 35px;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
  background: #000000;
  border-radius: 30px;
  text-transform: uppercase;
  cursor: pointer;
}
.btn:hover {
  background: #01428d;
  transition: all 0.3s ease;
}
.arrows {
  display: flex;
  align-items: center;
  gap: 50px;
  margin-left: auto;
}
.left-arrow,
.right-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #ffffff;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  padding: 15px 20px;
  -webkit-box-shadow: 2px 3px 65px -5px rgba(0, 0, 0, 0.19);
  -moz-box-shadow: 2px 3px 65px -5px rgba(0, 0, 0, 0.19);
  box-shadow: 2px 3px 65px -5px rgba(0, 0, 0, 0.19);
}
.left-arrow:hover,
.right-arrow:hover {
  transition: all 0.3s ease;
  background: orange;
  box-shadow: none;
}
.title_first {
  font-weight: 500;
  font-size: 28px;
  color: #626262;
}
.title_second {
  font-weight: 600;
  font-size: 40px;
  color: #020202;
}
.title_third {
  font-weight: 500;
  font-size: 18px;
  color: #626262;
}
.form_feedback {
  display: flex;
  flex-direction: column;
  margin: -30px 0;
  textarea {
    border-radius: 15px;
    padding: 10px;
    outline: none;
    font-weight: 600;
    font-size: 15px;
    color: black;
    margin-top: 10px;
  }
  textarea::placeholder {
    font-weight: 600;
    font-size: 15px;
    color: #666666;
  }
  button {
    margin-top: 15px;
    padding: 10px 0;
    font-weight: 600;
    font-size: 15px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    color: #ffffff;
    background: #00a0df;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
  }
  button:hover {
    background: #0082b6;
  }
}
@media screen and (max-width: 575px) {
  .feedback_cards {
    flex-direction: column;
    gap: 30px;
  }
  .card {
    max-width: 100%;
  }
  .arrows {
    margin-left: 0;
  }
  .title_first {
    font-size: 20px;
  }
  .title_second {
    font-size: 30px;
    line-height: 1.1;
    margin-top: 15px;
    margin-bottom: 10px;
    max-width: 180px;
  }
  .title_third {
    font-size: 14px;
    max-width: 180px;
  }
}
</style>
