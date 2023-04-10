export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    let authenticated = localStorage.loggedIn;
    if (to.path.includes("/admin")) {
      if (authenticated) {
        next();
      } else {
        next("/login");
      }
    } else {
      next();
    }
  });
};
