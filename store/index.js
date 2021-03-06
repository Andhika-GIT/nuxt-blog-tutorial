import Vuex from "vuex";
import axios from "axios";
import Cookies from "js-cookie";

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
      // mutation for clear token after expired
      clearToken(state) {
        state.authToken = null;
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
          .post(
            `${process.env.baseUrl}/posts.json?auth=${vuexContent.state.authToken}`,
            createdPost
          ) // send all the new data form submitted form into firebase
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
          .put(
            `${process.env.baseUrl}/posts/${editedPost.id}.json?auth=${vuexContent.state.authToken}`,
            editedPost
          ) // send the edited post data to firebase by using put request method and send idToken for authentication
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

            // after the user log in, we can store data into localstorage by using localstorage.set(). BUT REMEMBER THIS ONLY RUN AFTER THE ACTION IS RUN ON THE CLIENT, SO AFTER LOG IN THE USER NEEDS TO GO TO ANOTHER PAGE, SO THAT THE ACTION IS RUNNING ON THE CLIENT

            // set the localStorage
            localStorage.setItem("token", results.data.idToken); // token
            // because date.getTime is milisecond, but expireIn is seconds, we change expiresIn into milisecond by multiply 1000
            localStorage.setItem(
              "tokenExpiration",
              // because result.data.expiresIn is string, we have to convert it into number
              new Date().getTime() +
                Number.parseInt(results.data.expiresIn) * 1000
            );

            // set the cookie
            Cookies.set("token", results.data.idToken); // set the token
            Cookies.set(
              "tokenExpiration",
              // because result.data.expiresIn is string, we have to convert it into number
              new Date().getTime() +
                Number.parseInt(results.data.expiresIn) * 1000
            );

            // make post request to router link config that we have setup in api/index
            return axios.post("http://localhost:3000/api/track-data", {
              data: "Authenticated!",
            });
          })
          .catch((e) => {
            alert(e.response.data.error.message);
            console.log(e);
          });
      },
      // action for take the localStorage data
      initAuth(vuexContent, req) {
        // decleare token and expiration date
        let token;
        let tokenExpiration;
        // if running on the server
        if (req) {
          if (!req.headers.cookies) {
            // however if there's no cookies header (cookies data) then we return (exit)
            return;
          }
          // take the data from Cookies that we have set in 'authenticateUser' action
          token = req.headers.cookies
            .split(";") // split data by ";"
            .find((c) => c.trim().startsWith("token=")) // find data or object, remove blank space by trim, use startsWith to return true or false (if the word start with "token=" then return true)
            .split("=")[1]; // then split data again by "=" on array second key ([1])

          tokenExpiration = req.headers.cookie
            .split(";") // split data by ";"
            .find((c) => c.trim().startsWith("tokenExpiration=")) // find data or object, remove blank space by trim, use startsWith to return true or false (if the word start with "tokenExpiration=" then return true)
            .split("=")[1]; // then split data again by "=" on array second key ([1])
        }
        // otherwise if running on the client
        else {
          // take the data from localstorage that we have set in 'authenticateUser' action by using getItem
          token = localStorage.getItem("token"); // take the token from localstorage
          tokenExpiration = localStorage.getItem("tokenExpiration"); // take the tokenExpiration date from localstorage
        }

        // if there's no token, or the the current date is bigger than tokenExpiraton date
        if (!token || new Date().getTime() > +tokenExpiration) {
          console.log("no Token or invalid token");
          vuexContent.dispatch("logout"); // runs "logout" action to clear token and expiration date from localstorage and cookie
        }
        console.log(token);
        // commit 'authenticateUser' mutation and pass the token data
        vuexContent.commit("authenticateUser", token);
      },
      // action for logout
      logout(vuexContent) {
        vuexContent.commit("clearToken"); // runs clearToken mutation for clear token
        // clear token and expirationdate from cookie
        Cookies.remove("token");
        Cookies.remove("tokenExpiration");
        if (process.client) {
          // if process runs on the client
          // clear token and expirationdate from localstorage
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
        }
      },
    },
    getters: {
      // to get or return the data
      loadedPosts(state) {
        return state.loadedPosts;
      },
      isAuthenticated(state) {
        // send true if authToken data is not null (this is for auth middleware)
        return state.authToken != null;
      },
    },
  });
};

export default createStore;
