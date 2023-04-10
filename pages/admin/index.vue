<template>
  <div>
    <div class="make-circle-button" type="button" @click="makeCircle()">
      Make a Circle
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // Make a function that creates circle in the DOM with css 20px radius and make it movable upon pressing buttons. Left arrow for left, right for right, up for up, down for down. Make it change color upon pressing the buttons. Make it leave a trail of color when moving.
    makeCircle() {
      const circle = document.createElement("div");
      circle.style.width = "20px";
      circle.style.height = "20px";
      circle.style.borderRadius = "20px";
      circle.style.backgroundColor = "red";
      circle.style.position = "absolute";
      circle.style.left = "0px";
      circle.style.top = "0px";
      document.body.appendChild(circle);
      let x = 0;
      let y = 0;
      let color = "red";
      let trail = "";
      const move = function(e) {
        if (e.keyCode === 37) {
          x -= 10;
        } else if (e.keyCode === 38) {
          y -= 10;
        } else if (e.keyCode === 39) {
          x += 10;
        } else if (e.keyCode === 40) {
          y += 10;
        }
        circle.style.left = x + "px";
        circle.style.top = y + "px";
        trail += x + "," + y + ",";
        circle.style.backgroundColor = color;
        circle.style.backgroundImage =
          "linear-gradient(to right, " + trail + ")";
      };
      document.addEventListener("keydown", move);
      console.log("clicked");
    }
  }
};
</script>

<style>
.make-circle-button {
  width: 50px;
  height: 25px;
  cursor: pointer;
}
</style>
