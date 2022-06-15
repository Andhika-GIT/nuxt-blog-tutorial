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
            // nuxtServerInit will automatically dispatched this action
            // this will also automatically check if there's a data (data > 0) after we fetched
            nuxtServerInit(vuexContent,context) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                      vuexContent.commit('setPosts',  [
                        // fetch the data from store will make the blog posts page faster 
                        // if there's no changes in data after we fetch, then we only fetch one time which will make the blog posts page faster
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
                      )
                      resolve();
                    }, 1500);
                    // reject(new Error())
                  })
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