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
import { ref, reactive, useRouter } from "@nuxtjs/composition-api";
export default {
  components: { AdminPostForm },
  setup() {
    let loadedPost = reactive({
      author: "Andhika",
      title: "My Awesome Post",
      content: "Super amazing, thanks",
      thumbnailLink:
        "https://d27fp5ulgfd7w2.cloudfront.net/wp-content/uploads/2019/01/08160759/tech-blogs-1.jpg",
    });

    return { loadedPost };
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
