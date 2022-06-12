<template>
  <div class="home-page">
    <section class="intro">
      <h1>Get the latest tech news!</h1>
    </section>
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
import PostList from "~/components/Posts/PostList.vue";
import { ref, reactive, onMounted } from "@nuxtjs/composition-api";

export default {
  name: "IndexPage",
  components: { PostList },
  asyncData(context, callback) {
    setTimeout(() => {
      callback(null, {
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
  },
  setup() {
    // let loadedPosts = ref([
    //   {
    //     id: "1",
    //     title: "first post",
    //     previewText: "this is our first post",
    //     thumbnail:
    //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2lceG8UoY7MwfJS7xXLn-S70J7yUNqcd0d5eVazbGXmIwMfNqF3iO96UXDN3DRIKhGCk&usqp=CAU",
    //   },
    //   {
    //     id: "2",
    //     title: "second post",
    //     previewText: "this is our second post",
    //     thumbnail:
    //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2lceG8UoY7MwfJS7xXLn-S70J7yUNqcd0d5eVazbGXmIwMfNqF3iO96UXDN3DRIKhGCk&usqp=CAU",
    //   },
    // ]);
    // return { loadedPosts };
  },
};
</script>
<style scoped>
.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-image: url("~assets/images/background-image.jpg");
  background-position: center;
  background-size: cover;
}

.intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: rgb(211, 211, 211);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}

.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
