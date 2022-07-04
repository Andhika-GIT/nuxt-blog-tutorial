export default function (context) {
  // if the process is run on the client side ( action store run on the client side, after the user go to admin page for the second time after LOG IN)

  // run the 'initAuth' action from vuex store
  context.store.dispatch("initAuth", context.req);
  // send context.req parameter, so initAuth action catch it and get the data from cookie instead
  // console.log for checking
  console.log(
    "[middleware] user go to admin for the second time, now the action is excuted on client, and token is successfuly stored in the localstorage"
  );
}
