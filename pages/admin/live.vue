<template>
  <div class="live-event">
    <div class="dialog-component" v-if="dialogOpen">
      <dialog-box
        @close="closeDialog"
        @accept="closeEvent"
        title="End Event Prompt"
        text="This will remove the votes, Done Songs, Currently Playing, etc. Continue?"
      ></dialog-box>
    </div>
    <div class="songs-child" v-if="isLive">
      <div class="live-header flex-column-center">
        <h1 class="admin-subtitle">Selected Event: {{ liveEvent.title }}</h1>
        <div class="flex-row-center">
          <button
            class="main-button border-black hover-effect ms-20"
            @click="closeEvent"
          >
            End Event Now!
          </button>
          <router-link
            target="_blank"
            class="main-button hover-effect router-button ms-20"
            to="/live"
          >
            View Event
            <p>(Opens in new tab)</p>
          </router-link>
        </div>
      </div>
      <div class="song-controls">
        <div class="half current-songs">
          <div class="current-songs-wrapper">
            <h1 class="admin-subtitle current-songs-subtitle">
              Upcoming Songs:
            </h1>
            <ul class="songs-list">
              <li
                v-for="s in sortedUpcomingSongs"
                :key="s.id"
                class="hover-effect"
                @click="markSong(s, 'nowplaying')"
              >
                <span
                  >{{ s.title }} - {{ s.artist }} ({{ s.votes }} votes)</span
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="half">
          <div v-if="currentlyNowPlaying">
            <h1 class="admin-subtitle current-songs-subtitle">
              Now Playing:
            </h1>
            <ul class="songs-list">
              <li
                class="hover-effect"
                @click="markSong(currentlyNowPlaying, 'done')"
              >
                <span
                  >{{ currentlyNowPlaying.title }} -
                  {{ currentlyNowPlaying.artist }}</span
                >
              </li>
            </ul>
            <br />
          </div>
          <template v-if="doneSongs.length">
            <h1 class="admin-subtitle current-songs-subtitle">
              Done Songs:
            </h1>
            <ul class="songs-list">
              <li
                v-for="s in doneSongs"
                :key="s.id"
                class="hover-effect"
                @click="markSong(s, 'upcoming')"
              >
                <span>{{ s.title }} - {{ s.artist }}</span>
              </li>
            </ul>
          </template>
        </div>
      </div>
    </div>
    <div class="event-selector" v-else>
      <h1 class="admin-subtitle">Please select an event:</h1>
      <div class="event-picker-main">
        <div
          v-for="event in events"
          :key="event.id"
          class="event-picker hover-effect"
          @click="selectEvent(event.id)"
          :class="{ selected: selectedEvent && selectedEvent.id === event.id }"
        >
          {{ event.title }}
        </div>
        <button class="main-button hover-effect" @click="makeEventLive">
          Go Live!
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import DialogBox from "@/components/base/DialogBox.vue";
export default {
  components: { DialogBox },
  data: () => ({
    dialogOpen: false,
    newSongTitle: "",
    newSongLyrics: "",
    newSongArtist: "",
    events: [],
    songs: [],
    selectedEvent: null,
    liveEvent: null,
    isLive: false
  }),
  computed: {
    sortedUpcomingSongs() {
      const songs = Object.values(this.liveEvent?.songs || {}).filter(
        song => song.status === "upcoming"
      );
      return songs.sort((a, b) => b.votes - a.votes);
    },
    currentlyNowPlaying() {
      let currentlyNowPlaying = null;
      Object.entries(this.liveEvent?.songs || {}).forEach(([id, song]) => {
        if (song.status === "nowplaying") {
          currentlyNowPlaying = {
            ...song,
            id
          };
        }
      });
      return currentlyNowPlaying;
    },
    doneSongs() {
      const songs = Object.values(this.liveEvent?.songs || {}).filter(
        song => song.status === "done"
      );
      return songs;
    }
  },
  methods: {
    selectEvent(id) {
      const foundEvent = this.events.find(e => e.id === id);
      this.selectedEvent = foundEvent;
    },
    makeEventLive() {
      const eventRef = this.$fireModule.database().ref("live-event");
      if (this.selectedEvent) {
        const songsObj = {};
        this.songs.forEach(song => {
          songsObj[song.id] = {
            ...song,
            status: "upcoming"
          };
        });
        eventRef.push({
          ...this.selectedEvent,
          songs: songsObj
        });
      }
    },
    closeDialog() {
      this.dialogOpen = false;
    },
    closeEvent() {
      if (!this.dialogOpen) {
        this.dialogOpen = true;
      } else {
        if (this.liveEvent) {
          this.dialogOpen = false;
          const eventRef = this.$fireModule
            .database()
            .ref(`live-event/${this.liveEvent.id}`);
          eventRef.remove();
        }
      }
    },
    async markSong(song, status) {
      const updates = {};
      if (status === "nowplaying" && this.currentlyNowPlaying) {
        updates[
          `live-event/${this.liveEvent.id}/songs/${this.currentlyNowPlaying.id}`
        ] = {
          ...this.currentlyNowPlaying,
          status: "done"
        };
      }
      updates[`live-event/${this.liveEvent.id}/songs/${song.id}`] = {
        ...song,
        status,
        votes: status === "upcoming" ? 0 : song.votes
      };
      await this.$fireModule
        .database()
        .ref()
        .update(updates);
    }
  },
  mounted() {
    const liveEventRef = this.$fireModule.database().ref("live-event");
    const eventRef = this.$fireModule.database().ref("events");
    eventRef.on("value", snapshot => {
      const data = snapshot.val();
      let events = [];

      if (data) {
        Object.keys(data).forEach(key => {
          events.push({
            id: key,
            title: data[key].title,
            description: data[key].description,
            date: data[key].date,
            songs: data[key].songs
          });
        });
      }
      this.events = events;
    });
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
    liveEventRef.on("value", snapshot => {
      const data = snapshot.val();
      if (data) {
        const key = Object.keys(data)[0];
        this.liveEvent = {
          id: key,
          title: data[key].title,
          description: data[key].description,
          date: data[key].date,
          songs: data[key].songs
        };
        this.isLive = true;
      } else {
        this.liveEvent = null;
        this.isLive = false;
      }
    });
  }
};
</script>

<style lang="scss">
.half {
  width: 50%;
}

.song-title,
.song-lyrics,
.song-date {
  margin-bottom: 15px;
}
.pick-songs,
.current-songs-subtitle {
  padding-top: 1vw;
}
.song-controls {
  padding-top: 50px;
  display: flex;
  flex-direction: row;
  .new-song {
    width: 50%;
  }
  .current-songs {
    width: 50%;
  }
}
.event-picker {
  cursor: pointer;
  border: 1px solid black;
  width: 50%;
  margin: auto;
  padding: 10px;
}

.submit-song-button {
  padding: 0.5vw 1.5vw;
  margin-top: 15px;
  cursor: pointer;
}

.current-songs-wrapper {
  width: 70%;
  margin: auto;
  height: 100%;
}
.songs-list {
  list-style: none;
  padding: 0px;
  li {
    padding: 1vw 0.1vw;
    border: 1px solid black;
    cursor: pointer;
  }
}
</style>
