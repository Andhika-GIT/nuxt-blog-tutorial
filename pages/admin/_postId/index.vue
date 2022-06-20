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
import { useRoute, useRouter } from "@nuxtjs/composition-api";
import axios from "axios";
export default {
  components: { AdminPostForm },
  asyncData(context) {
    // console.log(context) -> check what context can do(it can catch the id of the post)
    // send http request to get single post
    // catch the id post using context.params
    return axios

      .get(
        `https://nuxt-blog-755f4-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${context.params.postId}.json`
      ) // send get request for single (by sending the id)
      .then((res) => {
        console.log(res); // check the respond ( look for the data post )
        return {
          loadedPost: res.data,
        };
      })
      .catch((e) => context.error(e));
  },

  // setup for update
  setup() {
    const route = useRoute();
    const router = useRouter();
    const onSubmitted = (editedPost) => {
      // send put request (update)
      axios
        .put(
          `https://nuxt-blog-755f4-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${route.value.params.postId}.json`,
          editedPost
        ) // send the editedPost data from AdminPostForm (emit custom event) to firebase
        .then((res) => router.push("/admin")) // go back to admin index
        .catch((e) => console.log(e));
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
