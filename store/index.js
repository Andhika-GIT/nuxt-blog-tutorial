import Vuex from "vuex";
import axios from "axios";
import { useRoute, useRouter } from "@nuxtjs/composition-api";

const createStore = () => {
  return new Vuex.Store({
    // set default variabel for data
    state: {
      loadedPosts: [], // this will containts all the post data after nuxtServerInit action runs when the website is open\
      authToken: "", // contain idToken after sign up or login
    },
    mutations: {
      // method for what you want to do with the data
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addPost(state, post) {
        // 'post' argument is retrive from addPost action
        // push new index into loadedPost
        state.loadedPosts.push(post);
        // so after the redirect, we will the new post that admin have made
      },
      editPost(state, editedPost) {
        // find the post id from database that matched with the id post that has edited, store it in postIndex variabel
        const postIndex = state.loadedPosts.findIndex(
          (post) => post.id === editedPost.id
        );
        // find post with the index of the post that has been edited, then replace the previous post index
        // this will replace the previous post that's not updated with the new updated post
        state.loadedPosts[postIndex] = editedPost;
      },
      authenticateUser(state, authToken) {
        // catch the idToken from 'authenticateUser' action and store it in authToken state data
        state.authToken = authToken;
      },
    },
    actions: {
      // nuxtServerInit will automatically dispatched this action
      nuxtServerInit(vuexContent, context) {
        // nuxtServerInit will only run fetch on initial load (when website is open for the first time), which will make the blog posts page faster
        return axios
          .get(
            // use the default baseurl firebase (check nuxt.config for env setting)
            `${process.env.baseUrl}/posts.json`
          )
          .then((res) => {
            // console.log(res)
            const postsArray = []; // make variable to store the data
            for (const key in res.data) {
              // for every data array inside the res.data
              postsArray.push({ ...res.data[key], id: key }); // store the data using push array into postsArray variable
            }
            vuexContent.commit("setPosts", postsArray);
          }) // run the mutation, with postsArray variable as an argument to store the data
          .catch((e) => context.error(e));
      },
      // action after we submit new post
      addPost(vuexContent, postData) {
        // create new variabel for storing new data
        const createdPost = {
          // all the new data form submitted form, and also retrive the updatedDate (date when data is submitted)
          ...postData,
          updatedDate: new Date(),
        };
        // send request post to save data into firebase
        return axios
          .post(`${process.env.baseUrl}/posts.json?auth=${vuexContent.state.authToken}`, createdPost) // send all the new data form submitted form into firebase
          .then((result) => {
            // commit the addPost mutation
            vuexContent.commit("addPost", {
              ...createdPost,
              id: result.data.name, // the id name is a unique name created automatically by firebase and we can get that id name after the post is created
            });
          }) // go back to admin index
          .catch((e) => console.log(e));
      },
      editPost(vuexContent, editedPost) {
        return axios
          .put(`${process.env.baseUrl}/posts/${editedPost.id}.json?auth=${vuexContent.state.authToken}`, editedPost) // send the edited post data to firebase by using put request method and send idToken for authentication
          .then((res) => {
            // commit the ediPost mutation
            vuexContent.commit("editPost", editedPost);
          }) // go back to admin index
          .catch((e) => console.log(e));
      },
      authenticateUser(vuexContent, authData) {
        // read https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
        // we have set up the default api key in nuxt.config.js
        // authData is a variabel that includes form data and isLogin that we received from auth index page

        // make default send request url (default url is for login)
        let authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbAPIKey}`;

        authData.isLogin != true
          ? // if isLogin is false, then set the authUrl for sign up request url
            (authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbAPIKey}`)
          : "";

        return axios
          .post(
            authUrl,
            { ...authData, returnSecureToken: true }
            // it needs email, password, returnSecureToken
          )
          .then((results) => {
            console.log(results); // check the results
            // commit the 'authenticateUser' mutation
            vuexContent.commit("authenticateUser", results.data.idToken);
          })
          .catch((e) => {
            alert(e.response.data.error.message);
            console.log(e);
          });
      },
    },
    getters: {
      // to get or return the data
      loadedPosts(state) {
        return state.loadedPosts;
      },
    },
  });
};

export default createStore;
