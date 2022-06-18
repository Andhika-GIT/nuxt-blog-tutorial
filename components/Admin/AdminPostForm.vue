<template>
  <div>
    <form @submit.prevent="onSave">
      <AppControlInput v-model="editedPost.author">Author Name</AppControlInput>

      <AppControlInput v-model="editedPost.title">Title</AppControlInput>

      <AppControlInput v-model="editedPost.thumbnailLink">Thumbnail Link</AppControlInput>

      <AppControlInput control-type="textarea" v-model="editedPost.content">Content</AppControlInput>

      <AppButton type="submit">Save</AppButton>

      <AppButton type="button" style="margin-left: 10px" btn-style="cancel" @click="onCancel">Cancel</AppButton>
    </form>
  </div>
</template>
<script>
import AppButton from "~/components/UI/AppButton.vue";
import AppControlInput from "~/components/UI/AppControlInput.vue";
import { ref, reactive, useRouter } from "@nuxtjs/composition-api";
export default {
  components: {
    AppButton,
    AppControlInput,
  },
  props: {
    post: {
      type: Object,
      required: false,
    },
  },
  setup(props, { emit }) {
    let editedPost = props.post
      ? // if we have post from props, then editedPost will contain all the post coming from the props.post
      { ...props.post }
      : // if not, then make new object data
      reactive({
        author: "",
        title: "",
        thumbnailLink: "",
        content: "",
      });

    const router = useRouter();

    const onSave = () => {
      // save the post
      // console.log(editedPost);
      emit('submit', editedPost)
    };
    const onCancel = () => {
      // navigate back
      router.push("/admin");
    };

    return { editedPost, onSave, onCancel };
  },
};
</script>
