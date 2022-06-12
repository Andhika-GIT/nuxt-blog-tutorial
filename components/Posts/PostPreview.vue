<template>
  <div>
    <nuxt-link :to="postLink">
      <article class="post-preview">
        <div
          class="post-thumbnail"
          :style="{
            backgroundImage: 'url(' + thumbnail + ')',
          }"
        ></div>
        <div class="post-content">
          <h1>{{ title }}</h1>
          <p>{{ previewText }}</p>
        </div>
      </article>
    </nuxt-link>
  </div>
</template>
<script>
import { computed, ref } from "@nuxtjs/composition-api";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    previewText: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const postLink = computed(() => {
      return props.isAdmin ? "/admin/" + props.id : "/posts/" + props.id;
    });
    return { postLink };
  },
};
</script>
<style scoped>
.post-preview {
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px #ccc;
  background-color: white;
  width: 100%;
}

a {
  text-decoration: none;
  color: black;
}

@media (min-width: 850px) {
  .post-preview {
    width: 400px;
    margin: 10px;
  }
}

.post-thumbnail {
  width: 100%;
  height: 200px;
  background-position: center;
  background-size: cover;
}

.post-content {
  padding: 10px;
  text-align: center;
}

a:hover .post-content,
a:active .post-content {
  background-color: #ccc;
}
</style>
