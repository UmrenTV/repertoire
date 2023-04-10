<template>
  <ScrollerLayout :sections="sections">
    <div class="main-index">
      <div class="top container" id="top-home">
        <div class="image-overlay"></div>
        <div class="home-left desktop"></div>
        <div class="home-content">
          <div class="header-title">
            <h1 class="title">SIMPLY</h1>
            <h1 class="title">MAKING</h1>
            <h1 class="title">MUSIC</h1>
          </div>
          <div>
            <h3 class="subtitle pr-18 psm-4">
              Roel Thomas a "One Man Party Band" experience
            </h3>
          </div>
        </div>
      </div>
      <div class="events container" id="events">
        <h1 class="title black-text">Events</h1>
      </div>
      <div class="songs container" id="songs">
        <h1 class="title black-text">Songs</h1>
      </div>
      <div class="about-me container" id="about-me">
        <h1 class="title black-text">About</h1>
      </div>
      <div class="contact-me container" id="contact-me">
        <h1 class="title black-text">Contact</h1>
      </div>
    </div>
  </ScrollerLayout>
</template>

<script>
import ScrollerLayout from "@/layouts/ScrollerLayout";
export default {
  data() {
    return {
      sections: [
        { id: "top-home", mobile: "T", desktop: "Welcome" },
        { id: "events", mobile: "E", desktop: "Upcoming" },
        { id: "songs", mobile: "S", desktop: "My Songs" },
        { id: "about-me", mobile: "A", desktop: "About" },
        { id: "contact-me", mobile: "C", desktop: "Contact" },
      ],
    };
  },
  components: { ScrollerLayout },
};
</script>

<style lang="scss">
.top {
  background: url("@/assets/images/Roel-thomas-header-image.png");
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: row;
  position: relative;
  .image-overlay {
    background-color: rgba(0, 0, 0, 0.4);
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
.main-page {
  padding-left: 20px;
  padding-top: 20px;
  text-align: center;
}
.home-left {
  width: 50%;
}
.home-content {
  z-index: 1;
  width: 50%;
  @media screen and (max-width: 812px) {
    width: 100%;
    padding: 0 30px;
    padding-top: 10%;
  }
}
</style>
