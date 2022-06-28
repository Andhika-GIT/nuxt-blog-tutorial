<template>
  <div>
    <div class="admin-post-page">
      <section class="update-form">
        <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
      </section>
    </div>
  </div>
</template>
<script>
import AdminPostForm from "~/components/Admin/AdminPostForm.vue";
import { useRoute, useRouter, useStore } from "@nuxtjs/composition-api";
import axios from "axios";
export default {
  middleware: ["auth", "check-auth"],
  components: { AdminPostForm },
  asyncData(context) {
    // console.log(context) -> check what context can do(it can catch the id of the post)
    // send http request to get single post
    // catch the id post using context.params
    return axios

      .get(
        // use the default baseurl firebase (check nuxt.config for env setting)
        `${process.env.baseUrl}/posts/${context.params.postId}.json`
      ) // send get request for single (by sending the id)
      .then((res) => {
        console.log(res); // check the respond ( look for the data post )
        return {
          loadedPost: { ...res.data, id: context.params.postId },
          // we need retrive id, so we can send it later as a argument when we perform dispatch action after the admin submit the edit post form
        };
      })
      .catch((e) => context.error(e));
  },

  // setup for update
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const onSubmitted = (editedPost) => {
      // run the 'editPost' action in index vuex store and send editedPost as an argument
      // editedPost data from AdminPostForm (emit custom event) to 'editPost' action
      store.dispatch("editPost", editedPost).then(() => router.push("/admin")); // go back to admin index
    };

    return { onSubmitted };
  },
};
</script>
<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
