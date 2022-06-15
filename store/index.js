import { create } from 'core-js/core/object'
import Vuex from 'vuex'

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
            // actions to run or commit the method in mutations
            setPosts(vuexContent, posts) {
                vuexContent.commit('setPosts', posts) // posts will second parameter for setPosts in mutations
            }
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