<template>
  <div>
    <div class="admin-new-post-page">
      <section class="new-post-form">
        <AdminPostForm @submit="onSubmitted" />
      </section>
    </div>
  </div>
</template>
<script>
import AdminPostForm from "~/components/Admin/AdminPostForm.vue";
import { useRouter } from "@nuxtjs/composition-api";
import { useStore } from "@nuxtjs/composition-api";
export default {
  middleware: ["check-auth", "auth"],
  components: { AdminPostForm },
  setup() {
    const store = useStore();
    const router = useRouter();

    // postData is editedPost that came from custom event in AdminPostForm.vue
    const onSubmitted = (postData) => {
      // run the action 'addPost' in vuex store and send postData as an argument
      store
        .dispatch("addPost", postData)
        // because 'addPost' action is return a axios, we can use then or catch
        .then(() => {
          router.push("/admin");
        });
    };

    return { onSubmitted };
  },
};
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>
