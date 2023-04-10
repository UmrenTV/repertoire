<template>
  <div class="admin-index">
    <div class="side-menu">
      <!-- <nuxt-link class="side-menu-link" to="/admin/">Home</nuxt-link> -->
      <nuxt-link class="side-menu-link" to="/admin/events">Events</nuxt-link>
      <nuxt-link class="side-menu-link" to="/admin/songs">Songs</nuxt-link>
      <nuxt-link class="side-menu-link" to="/admin/live">Live</nuxt-link>
      <a class="side-menu-link" @click="logout">Logout</a>
    </div>
    <div class="admin-content">
      <NuxtChild />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      if (localStorage.loggedIn) {
        localStorage.removeItem("loggedIn");
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style lang="scss">
.admin-index {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  height: 100vh;
}

.side-menu {
  width: 15%;
  display: flex;
  flex-direction: column;
  border: solid black 1px;
  align-content: center;
  justify-content: flex-start;
  text-align: center;
}
.admin-content {
  width: 85%;
  padding: 1vw;
  display: flex;
  flex-direction: column;
  border: solid black 1px;
  align-content: center;
  justify-content: flex-start;
  text-align: center;
}
.side-menu-link {
  cursor: pointer;
  font-size: 2vw;
  text-decoration: none;
  padding: 0.5vw 0;
  transition: 0.25s ease-in-out;
}
.side-menu-link:hover,
.nuxt-link-exact-active {
  background: var(--color-primary);
  color: white;
}
</style>
