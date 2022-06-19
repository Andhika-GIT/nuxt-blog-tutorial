import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
    return new Vuex.Store({
        // set default variabel for data
        state : {
            loadedPosts: []
        },
        mutations : {
            // method for what you want to do with the data
            setPosts(state,posts) {
                state.loadedPosts = posts
            }
        },
        actions : {
            // nuxtServerInit will automatically dispatched this action
            // this will also automatically check if there's a data (data > 0) after we fetched
            nuxtServerInit(vuexContent,context) {
               // if there's no changes in data after we send request, then we run this request only once, which will make the blog posts page faster
               return axios.get('https://nuxt-blog-755f4-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
               .then(res => {
                // console.log(res)
                const postsArray = [] // make variable to store the data
                for (const key in res.data) { // for every data array inside the res.data
                  postsArray.push({...res.data[key], id: key}) // store the data using push array into postsArray variable
                }
                vuexContent.commit('setPosts',postsArray)}) // run the mutation, with postsArray variable as an argument to store the data 
               .catch(e => context.error(e))
               
            },
           
        },
        getters : {
            // to get or return the data
            loadedPosts(state){
               return state.loadedPosts
            }
        }
    })

}

export default createStore