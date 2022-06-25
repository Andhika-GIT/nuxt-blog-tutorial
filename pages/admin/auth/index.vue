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
import { ref, reactive, useStore, useRouter } from "@nuxtjs/composition-api";

export default {
  name: "AdminAuthPage",
  components: {
    AppControlInput,
    AppButton,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const isLogin = ref(true);
    const form = reactive({
      email: "",
      password: "",
    });
    const onSubmit = () => {
      store
        // run authenticateUser action
        .dispatch("authenticateUser", {
          // send the form data and isLogin boolean data
          isLogin: isLogin.value,
          ...form,
        })
        .then(() => {
          router.push("/admin");
        });
    };

    return { isLogin, form, onSubmit };
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
