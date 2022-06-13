<template lang="">
  <div>
    <div class="posts-page">
      <PostList :posts="loadedPosts" />
    </div>
  </div>
</template>
<script>
import PostList from "~/components/Posts/PostList.vue";
export default {
  components: { PostList },
  asyncData(context) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          loadedPosts: [
            {
              id: "1",
              title: "first post",
              previewText: "this is our first post",
              thumbnail:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2lceG8UoY7MwfJS7xXLn-S70J7yUNqcd0d5eVazbGXmIwMfNqF3iO96UXDN3DRIKhGCk&usqp=CAU",
            },
            {
              id: "2",
              title: "second post",
              previewText: "this is our second post",
              thumbnail:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2lceG8UoY7MwfJS7xXLn-S70J7yUNqcd0d5eVazbGXmIwMfNqF3iO96UXDN3DRIKhGCk&usqp=CAU",
            },
          ],
        });
      }, 1500);
      // reject(new Error())
    }).then(data => {
      return data
    }).catch(e => { context.error(e) })

  },
};
</script>
<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
