<template>
  <div>
    <div class="single-post-page">
      <section class="post">
        <h1 class="post-title">
          Title of the post with id : {{ $route.params.id }}
        </h1>
        <div class="post-details">
          <div class="post-detail">Last updated on XXX</div>
          <div class="post-detail">Written by NAME</div>
        </div>
        <p>content of the post</p>
      </section>
      <section class="post-feedback">
        <p class="post-content">
          let me know what you think about the post, send a mail to
          <a
            target="”_blank”"
            href="https://www.facebook.com/photo/?fbid=1430222807015576&set=a.597011410336724"
            >Andhika</a
          >
        </p>
      </section>
    </div>
  </div>
</template>
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
