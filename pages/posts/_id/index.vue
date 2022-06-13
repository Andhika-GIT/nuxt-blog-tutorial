<template>
  <div>
    <div class="single-post-page">
      <section class="post">
        <h1 class="post-title">
          {{ loadedPost.title }}
        </h1>
        <div class="post-details">
          <div class="post-detail">Last updated on {{ loadedPost.updateData }}</div>
          <div class="post-detail">Written by {{ loadedPost.author }}</div>
        </div>
        <p>{{ loadedPost.content }}</p>
      </section>
      <section class="post-feedback">
        <p class="post-content">
          let me know what you think about the post, send a mail to
          <a target="”_blank”"
            href="https://www.facebook.com/photo/?fbid=1430222807015576&set=a.597011410336724">Andhika</a>
        </p>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  asyncData(context, callback) {
    console.log(context)
    setTimeout(() => {
      callback(null, {
        loadedPost: {
          id: `${context.params.id}`, // take the id from route url,
          title: `First Post (ID : ${context.params.id})`,
          previewText: "this is our first post",
          author: "Hubla",
          updateData: new Date(),
          content: "some text for content of this post okay",
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2lceG8UoY7MwfJS7xXLn-S70J7yUNqcd0d5eVazbGXmIwMfNqF3iO96UXDN3DRIKhGCk&usqp=CAU",

        }
      })
    }, 1000)
  }
}

</script>
<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>
