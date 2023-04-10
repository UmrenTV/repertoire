<template>
  <div class="full-template">
    <slot></slot>
    <div class="nav">
      <Scroller :sections="sections" />
    </div>
    <div class="footer-template" id="footer">
      <div class="footer container">
        <h1 class="title black-text">Footer</h1>
      </div>
    </div>
    <div class="filler"></div>
  </div>
</template>

<script>
import Scroller from "@/components/navigation/scroller/Scroller";
export default {
  components: {
    Scroller,
  },
  props: { sections: { type: Array, default: () => [] } },
};
</script>

<style lang="scss">
.nav {
  position: fixed;
  width: 100vw;
  height: 7vh;
  bottom: 0;
}
.filler {
  height: 7vh;
}
</style>
