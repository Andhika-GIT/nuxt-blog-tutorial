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
import axios from "axios";
export default {
  components: { AdminPostForm },
  setup() {
    // postData is editedPost that came from custom event in AdminPostForm.vue
    const onSubmitted = (postData) => {
      // console.log(postData)
      // send request post to save data into firebase
      axios.post('https://nuxt-blog-755f4-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json', postData)
        .then(result => { console.log(result) })
        .catch(e => console.log(e))

    }

    return { onSubmitted }
  }
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
