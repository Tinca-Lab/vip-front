export default function ({store, redirect}) {
  if (!store.state.auth.user.verified) {
    return redirect("/not-verified");
  }
}