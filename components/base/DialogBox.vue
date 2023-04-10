<template>
  <div class="dialog-container">
    <div class="dialog-background" @click="closeButton">
      <div class="dialog-main">
        <div class="dialog-header">
          <h2>{{ title }}</h2>
        </div>
        <div class="dialog-body">
          <p>{{ text }}</p>
        </div>
        <div class="dialog-footer">
          <button @click="acceptButton">Accept</button
          ><button @click="closeButton">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Are You Sure?"
    },
    text: {
      type: String,
      default: "This cannot be undone."
    }
  },
  data() {
    return {
      dialogOpen: false
    };
  },
  mounted() {
    this.dialogOpen = true;
    document.body.style.overflow = "hidden";
  },
  methods: {
    acceptButton() {
      this.$emit("accept");
      this.dialogOpen = false;
      document.body.style.overflow = "auto";
    },
    closeButton() {
      this.$emit("close");
      this.dialogOpen = false;
      document.body.style.overflow = "auto";
    }
  }
};
</script>

<style lang="scss">
.dialog-background {
  position: fixed;
  overflow: hidden;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .dialog-main {
    background: white;
    border: 1px black solid;
    padding: 30px;
    .dialog-header {
      display: flex;
      flex-direction: row;
      justify-content: center;
      h2 {
        color: red;
      }
    }
    .dialog-footer {
      button {
        margin: 0 10px;
        padding: 5px;
      }
    }
  }
}
</style>
