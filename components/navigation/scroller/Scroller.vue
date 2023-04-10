<template>
  <div id="scroller">
    <div
      v-for="s in sectionProps"
      :key="s.id"
      class="links-container"
      @click="changeSection(s)"
      :class="[currentSection === s.id ? 'active' : '', deviceType]"
      :style="linksStyles(s.id)"
    >
      <div class="mobile-container" v-if="deviceType === 'mobile'">
        <div
          class="link mobile unselectable"
          :class="currentSection === s.id ? 'active' : ''"
        >
          {{ s.mobile }}
        </div>
        <transition name="span">
          <div
            class="links-span unselectable"
            :class="currentSection === s.id ? 'active' : ''"
          >
            {{ s.desktop }}
          </div></transition
        >
      </div>
      <div
        class="link desktop unselectable"
        v-else
        :class="currentSection === s.id ? 'active' : ''"
      >
        {{ s.desktop }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sections: { type: Array, default: () => [] },
  },
  data() {
    return {
      currentSection: "",
      deviceType: null,
      sectionProps: null,
      widthCalculated: null,
      activeWidth: 35,
    };
  },
  methods: {
    changeSection(section) {
      document
        .getElementById(section.id)
        .scrollIntoView({ behavior: "smooth" });
    },
    checkViewport() {
      if (window.innerWidth <= 812) {
        this.deviceType = "mobile";
      } else {
        this.deviceType = "desktop";
      }
    },
    checkSection() {
      const s = [...this.sections, { id: "footer", mobile: "F", desktop: "Footer" }];
      s.forEach((sec) => {
        const element = document.getElementById(sec.id);
        const rect = element.getBoundingClientRect();
        if (
          rect.bottom > 0 &&
          rect.right > 0 &&
          rect.left <
            (window.innerWidth || document.documentElement.clientWidth) &&
          rect.top <
            (0.5 * window.innerHeight ||
              0.5 * document.documentElement.clientHeight)
        ) {
          this.currentSection = sec.id;
        }
      });
    },
    linksStyles(id) {
      if (this.deviceType === "mobile") {
        if (this.currentSection === id) {
          return `width: ${this.activeWidth}vw`;
        } else {
          this.widthCalculated =
            (100 - this.activeWidth) / (this.sectionProps.length - 1);
          return `width: ${this.widthCalculated}vw`;
        }
      } else {
        this.widthCalculated = 100 / (this.sectionProps.length - 1)
        return `width: ${this.widthCalculated}vw`;
      }
    },
  },
  mounted() {
    this.currentSection = this.sections[0];
    window.addEventListener("resize", this.checkViewport);
    this.checkViewport();
    window.addEventListener("scroll", this.checkSection);
    this.checkSection();
    console.log(this.sections);
    this.sectionProps = [
      ...this.sections,
      { id: "footer", mobile: "F", desktop: "Footer" },
    ];
    console.log(this.sectionProps);
  },
  destroyed() {
    window.removeEventListener("resize", this.checkViewport);
    window.removeEventListener("scroll", this.checkSection);
  },
  watch: {
    currentSection(val) {
      this.currentSection = val;
    },
  },
};
</script>

<style lang="scss">
#scroller {
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
  width: 100%;
}
.mobile-container {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
}
.unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.links-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  // flex: 1;
  cursor: pointer;
  transition: 0.1s ease-in-out;
  &.active {
    background: rgba(0, 0, 0, 0.85);
  }
  &.mobile {
    transition: 0.1s ease-in-out;
    &.active {
      //  flex: 3;
      background: rgba(0, 0, 0, 0.9);
    }
  }
}
.links-container:hover {
  background: rgba(0, 0, 0, 0.85);
}
.links-span {
  opacity: 0;
  font-size: 0;
  padding: 0;
  transition: 0.05s ease-in-out;
  &.active {
    opacity: 1;
    padding-left: 2vw;
    font-size: 3.5vw;
    transition: 0.1s 0.1s ease-in-out;
  }
}
.span-enter-active {
  transition: 0.1s ease-in-out;
  transition-delay: 0.3s;
}
.span-leave-active {
  transition: 0s ease-in-out;
  transition-delay: 0.05s;
}
.span-enter-from {
  opacity: 0;
  width: 0px;
}
.span-enter-to {
  opacity: 1;
}
.span-leave-to {
  opacity: 0;
  width: 0px;
}

.link {
  color: white;
  transition: 0.1s ease-in-out;
  font-size: 1vw;
  &.mobile {
    @media screen and (max-width: 812px) {
      font-size: 3.5vw;
    }
  }
  &.desktop {
    font-size: 1.8vw;
  }
}
// .link:first-child {
//   padding-top: 0.5vw;
// }
// .link:last-child {
//   padding-bottom: 0.5vw;
// }
.links-container:hover {
  .link {
    // font-size: 1.8vw;
    &.mobile {
      // font-size: 5vw;
    }
  }
}

.active {
  color: var(--color-primary);
  &.desktop {
    //font-size: 1.8vw;
  }
  &.mobile {
    // font-size: 5vw;
  }
}
</style>
