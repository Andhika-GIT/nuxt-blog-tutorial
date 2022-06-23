// this feature is still not work

import { defineNuxtPlugin } from "@nuxtjs/composition-api";
import App from 'vue'
import Vue from 'vue'


import AppButton from "~/components/UI/AppButton.vue";
import AppControlInput from "~/components/UI/AppControlInput.vue";
import PostList from "~/components/Posts/PostList.vue";

// export default defineNuxtPlugin((nuxtApp) => {
//     nuxtApp.vueApp.use('AppButton',AppButton)
//     .component('AppControlInput', AppControlInput)
//     .component('PostList', PostList)
// })

export default{
    install : (app) => {
        app = App 
        app.component('AppButton',AppButton)
            .component('AppControlInput', AppControlInput)
            .component('PostList', PostList)
    }
}

// Vue.component('AppButton',AppButton)
//     .component('AppControlInput', AppControlInput)
//     .component('PostList', PostList)


