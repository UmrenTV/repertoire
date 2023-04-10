<template>
  <div class="events-child relative">
    <div class="dialog-component" v-if="dialogOpen">
      <dialog-box
        title="Delete Event?"
        @close="closeDialog"
        @accept="removeEvent(eventToDelete)"
      ></dialog-box>
    </div>
    <h1 class="admin-title">Events</h1>
    <div class="event-controls">
      <div class="new-event">
        <h3 class="new-event-title admin-subtitle">Add New Event</h3>
        <form @submit.prevent="addEvent">
          <div class="event-title">
            <label class="admin-label" for="new-event-title">Title</label>
            <input id="new-event-title" v-model="newEventTitle" />
          </div>
          <div class="event-description">
            <label class="admin-label" for="new-event-description"
              >Description</label
            >
            <textarea
              rows="3"
              id="new-event-description"
              v-model="newEventDescription"
            />
          </div>
          <div class="event-date">
            <label class="admin-label" for="new-event-date">Date</label>
            <input id="new-event-date" type="date" v-model="newEventDate" />
          </div>
          <!-- <div class="event-songs"> -->
          <!--   <h3 class="admin-subtitle pick-songs">Pick Songs:</h3> -->
          <!--   <div class="event-songs-wrapper"> -->
          <!--     <ul class="current-songs-list"> -->
          <!--       <li v-for="s in songs" :key="s.id"> -->
          <!--         {{ s.title }} - {{ s.artist }} -->
          <!--       </li> -->
          <!--     </ul> -->
          <!--   </div> -->
          <!-- </div> -->
          <button class="submit-event-button" type="submit">Add</button>
        </form>
      </div>
      <div class="current-events">
        <div class="current-events-wrapper">
          <h1 class="admin-subtitle current-events-subtitle">
            Current Events:
          </h1>
          <ul class="events-list">
            <li
              class="hover-effect"
              v-for="e in events"
              :key="e.id"
              @click="removeEvent(e)"
            >
              {{ e.title }} - {{ e.date }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DialogBox from "@/components/base/DialogBox.vue";
export default {
  components: {
    DialogBox
  },
  data: () => ({
    dialogOpen: false,
    eventToDelete: null,
    newEventTitle: "",
    newEventDescription: "",
    newEventDate: "",
    events: [],
    songs: []
  }),
  methods: {
    closeDialog() {
      this.dialogOpen = false;
      this.eventToDelete = null;
    },
    async removeEvent(e) {
      if (!this.dialogOpen && !this.eventToDelete) {
        this.dialogOpen = true;
        this.eventToDelete = e;
      } else if (this.dialogOpen && this.eventToDelete) {
        this.dialogOpen = false;
        await this.$fireModule
          .database()
          .ref(`events/${this.eventToDelete.id}`)
          .remove();
        this.eventToDelete = null;
      }
    },
    addEvent() {
      const eventRef = this.$fireModule.database().ref("events");
      if (
        (this.newEventTitle === "" || this.newEventTitle === null) &&
        (this.newEventDescription === "" ||
          this.newEventDescription === null) &&
        (this.newEventDate === "" || this.newEventDate === null)
      ) {
        return;
      }

      const event = {
        title: this.newEventTitle,
        description: this.newEventDescription,
        date: this.newEventDate
      };

      eventRef.push(event);
      this.newEventTitle = "";
      this.newEventDescription = "";
      this.newEventDate = "";
    }
  },
  mounted() {
    const eventRef = this.$fireModule.database().ref("events");
    const songRef = this.$fireModule.database().ref("performing-songs");
    songRef.on("value", snapshot => {
      const data = snapshot.val();
      let songs = [];

      Object.keys(data).forEach(key => {
        songs.push({
          id: key,
          title: data[key].title,
          artist: data[key].artist,
          lyrics: data[key].lyrics,
          votes: 0
        });
      });
      this.songs = songs;
    });
    eventRef.on("value", snapshot => {
      const data = snapshot.val();
      let events = [];

      if (data) {
        Object.keys(data).forEach(key => {
          events.push({
            id: key,
            title: data[key].title,
            description: data[key].description,
            date: data[key].date
          });
        });
      }
      this.events = events;
    });
  }
};
</script>

<style lang="scss">
.event-title,
.event-description,
.event-date {
  margin-bottom: 15px;
}
.pick-songs,
.current-events-subtitle {
  padding-top: 1vw;
}
.event-controls {
  padding-top: 50px;
  display: flex;
  flex-direction: row;
  .new-event {
    width: 50%;
  }
  .current-events {
    width: 50%;
  }
}

.submit-event-button {
  padding: 0.5vw 1.5vw;
  margin-top: 15px;
  cursor: pointer;
}
.event-songs {
  width: 90%;
  margin: auto;
  height: 100%;
}

.current-events-wrapper {
  width: 70%;
  margin: auto;
  height: 100%;
}
.events-list,
.current-songs-list {
  list-style: none;
  padding: 0px;
  li {
    padding: 1vw 0.1vw;
    border: 1px solid black;
    cursor: pointer;
  }
}

.dialog-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 45vw;
  height: 30vw;
  background: rgba(0, 0, 0, 0.5);
}
</style>
