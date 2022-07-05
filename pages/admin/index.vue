<template>
  <div>
    <div class="admin-page">
      <section class="new-post">
        <AppButton @click="$router.push('/')">Go back to Home</AppButton>
        <AppButton @click="$router.push('/admin/new-post')">Create Post</AppButton>
        <AppButton v-if="logout" @click="onLogout">Logout</AppButton>
      </section>
      <section class="existing-posts">
        <h1>Existing Post</h1>
        <!-- pass the isAdmin = true -->
        <PostList isAdmin :posts="loadedPosts" />
      </section>
    </div>
  </div>
</template>
<script>
import PostList from "~/components/Posts/PostList";
import AppButton from "~/components/UI/AppButton.vue";

export default {
  middleware: ["check-auth", "auth"],
  components: {
    PostList,
    AppButton,
  },
  methods() {
    // dispatch or run 'logout' action
    this.$store.dispatch('logout')
  },
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts; // get the data from vuex store so we can use it on view
    },
    logout() {
      return this.$store.state.authToken != null ? true : false // return true if there's token in state data store
    }
  },
};
</script>
<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>
