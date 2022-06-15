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
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts // get the data from vuex store so we can use it on view
    }
  }


};
</script>
<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
 