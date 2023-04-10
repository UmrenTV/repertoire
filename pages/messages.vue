<template>
  <div class="main-page">
    <form @submit.prevent="sendMessage">
      <h1>Here we are!</h1>
      <br />
      <label for="input-message">Enter Message:</label>
      <input type="text" id="input-message" v-model="requestMessage" />
      <button>Send!</button>
    </form>
    <br />
    <h1>Messages:</h1>
    <br />
    <div v-for="(message, idx) in state.messages" :key="message.key">
      <div class="message-inner" v-if="message.content">
        <div class="content">
          <strong>{{ idx + 1 }}:</strong> {{ message.content }}
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    requestMessage: "",
    state: {
      messages: [],
    },
  }),
  methods: {
    sendMessage() {
      const messagesRef = this.$fireModule.database().ref("messages");
      if (this.requestMessage === "" || this.requestMessage === null) {
        return;
      }

      const message = {
        content: this.requestMessage,
      };

      messagesRef.push(message);
      this.requestMessage = "";
    },
  },
  mounted() {
    const messagesRef = this.$fireModule.database().ref("messages");
    messagesRef.on("value", (snapshot) => {
      const data = snapshot.val();
      let messages = [];

      Object.keys(data).forEach((key) => {
        messages.push({
          id: key,
          username: data[key].username,
          content: data[key].content,
        });
      });
      this.state.messages = messages;
    });
  },
};
</script>

<style lang="scss">
.main-page {
  padding-left: 20px;
  padding-top: 20px;
}
</style>
