<template>
  <div>
    <div class="admin-post-page">
      <section class="update-form">
        <AdminPostForm :post="loadedPost" />
      </section>
    </div>
  </div>
</template>
<script>
import AdminPostForm from "~/components/Admin/AdminPostForm.vue";
import axios from "axios";
export default {
  components: { AdminPostForm },
  asyncData(context) {
    // console.log(context) -> check what context can do(it can catch the id of the post)
    // send http request to get single post
    // catch the id post using context.params
    return axios.get(`https://nuxt-blog-755f4-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${context.params.postId}.json`)
      .then(res => {
        console.log(res) // check the respond ( look for the data post )
        return {
          loadedPost: res.data
        }

      })
      .catch(e => context.error(e))
  }
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
