<template>
  <div class="login-main">
    <form @submit.prevent="authenticate">
      <div class="event-title">
        <label class="admin-label" for="username-input">Username</label>
        <input id="username-input" v-model="usernameInput" type="text" />
      </div>
      <div class="event-title">
        <label class="admin-label" for="password-input">Password</label>
        <input
          id="password-input"
          v-model="passwordInput"
          type="password"
          @keydown.enter="authenticate"
        />
      </div>
      <button type="submit">Sign In</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usernameInput: "",
      passwordInput: "",
    };
  },
  mounted() {
    if (localStorage.loggedIn) {
      this.$router.push("/admin");
    }
  },
  methods: {
    authenticate() {
      if (
        this.usernameInput === "roel" &&
        this.passwordInput === "roelisbest123"
      ) {
        localStorage.loggedIn = true;
        this.$router.push("/admin");
      }
    },
  },
};
</script>
