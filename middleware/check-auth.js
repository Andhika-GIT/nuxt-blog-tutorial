export default function ({ store }) {
    // if the process is run on the client side ( action store run on the client side, after the user go to admin page for the second time after LOG IN)
    if (process.client) {
        // run the 'initAuth' action from vuex store
        store.dispatch('initAuth')
        // console.log for checking
        console.log('[middleware] user go to admin for the second time, now the action is excuted on client, and token is successfuly stored in the localstorage')
    }
}