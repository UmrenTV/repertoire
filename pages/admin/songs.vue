<template>
  <div class="songs-child relative">
    <div class="dialog-component" v-if="dialogOpen">
      <dialog-box
        @close="closeDialog"
        @accept="removeSong(songToDelete)"
        title="Delete Song?"
      ></dialog-box>
    </div>
    <h1 class="admin-title">Songs</h1>
    <div class="song-controls">
      <div class="new-song">
        <h3 class="new-song-title admin-subtitle">Add New Song</h3>
        <form @submit.prevent="addSong">
          <div class="song-title">
            <label class="admin-label" for="new-song-title">Title</label>
            <input id="new-song-title" v-model="newSongTitle" />
          </div>
          <div class="song-artist">
            <label class="admin-label" for="new-song-artist">Artist</label>
            <input id="new-song-artist" type="text" v-model="newSongArtist" />
          </div>
          <div class="song-lyrics">
            <label class="admin-label" for="new-song-lyrics">Lyrics</label>
            <textarea rows="3" id="new-song-lyrics" v-model="newSongLyrics" />
          </div>
          <button class="submit-song-button" type="submit">Add</button>
        </form>
      </div>
      <div class="current-songs">
        <div class="current-songs-wrapper">
          <h1 class="admin-subtitle current-songs-subtitle">Current Songs:</h1>
          <ul class="songs-list">
            <li
              class="hover-effect"
              v-for="s in songs"
              :key="s.id"
              @click="removeSong(s)"
            >
              {{ s.title }} - {{ s.artist }}
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
  components: { DialogBox },
  data: () => ({
    dialogOpen: false,
    newSongTitle: "",
    newSongLyrics: "",
    newSongArtist: "",
    songs: []
  }),
  methods: {
    closeDialog() {
      this.dialogOpen = false;
      this.songToDelete = null;
    },
    async removeSong(s) {
      if (!this.dialogOpen && !this.songToDelete) {
        this.dialogOpen = true;
        this.songToDelete = s;
      } else if (this.dialogOpen && this.songToDelete) {
        this.dialogOpen = false;
        await this.$fireModule
          .database()
          .ref(`performing-songs/${s.id}`)
          .remove();
        this.songToDelete = null;
      }
    },
    addSong() {
      const songRef = this.$fireModule.database().ref("performing-songs");
      if (
        (this.newSongTitle === "" || this.newSongTitle === null) &&
        (this.newSongLyrics === "" || this.newSongLyrics === null) &&
        (this.newSongArtist === "" || this.newSongArtist === null)
      ) {
        return;
      }

      const song = {
        title: this.newSongTitle,
        artist: this.newSongArtist,
        lyrics: this.newSongLyrics
      };

      songRef.push(song);
      this.newSongTitle = "";
      this.newSongArtist = "";
      this.newSongLyrics = "";
      console.warn("song saved");
    }
  },
  mounted() {
    const songRef = this.$fireModule.database().ref("performing-songs");
    songRef.on("value", snapshot => {
      const data = snapshot.val();
      let songs = [];

      Object.keys(data).forEach(key => {
        songs.push({
          id: key,
          title: data[key].title,
          artist: data[key].artist,
          lyrics: data[key].lyrics
        });
      });
      this.songs = songs;
    });
  }
};
</script>

<style lang="scss">
.song-title,
.song-lyrics,
.song-date,
.song-artist {
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
