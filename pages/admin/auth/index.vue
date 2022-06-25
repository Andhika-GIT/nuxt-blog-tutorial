<template>
  <div class="admin-auth-page">
    <div class="auth-container">
      <form @submit.prevent="onSubmit">
        <AppControlInput type="email" v-model="form.email"
          >E-Mail Address</AppControlInput
        >
        <AppControlInput type="password" v-model="form.password"
          >Password</AppControlInput
        >
        <AppButton type="submit">{{ isLogin ? "Login" : "Sign Up" }}</AppButton>
        <AppButton
          type="button"
          btn-style="inverted"
          style="margin-left: 10px"
          @click="isLogin = !isLogin"
          >Switch to {{ isLogin ? "Signup" : "Login" }}</AppButton
        >
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AppControlInput from "@/components/UI/AppControlInput";
import AppButton from "@/components/UI/AppButton";
import { reactive } from "@nuxtjs/composition-api";

export default {
  name: "AdminAuthPage",
  components: {
    AppControlInput,
    AppButton,
  },
  data() {
    return {
      isLogin: true,
    };
  },
  setup() {
    const form = reactive({
      email: "",
      password: "",
    });
    const onSubmit = () => {
      // read https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
      // we have set up the default api key in nuxt.config.js
      axios
        .post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbAPIKey}`,
          { ...form, returnSecureToken: true }
          // it needs email, password, returnSecureToken
        )
        .then((result) => {
          console.log(result);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    return { form, onSubmit };
  },
};
</script>

<style scoped>
.admin-auth-page {
  padding: 20px;
}

.auth-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 2px #ccc;
  width: 300px;
  margin: auto;
  padding: 10px;
  box-sizing: border-box;
}
</style>
