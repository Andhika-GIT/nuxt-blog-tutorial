export default function ({ store, redirect }) {
  console.log('[middleware] action store run on the server, this is run when user signed in')
  if (!store.getters.isAuthenticated) {
    return redirect("/admin/auth");
  }
}
