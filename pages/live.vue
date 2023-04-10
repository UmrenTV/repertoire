<template>
  <div class="main-live ">
    <h3 class="subtitle black-text" v-if="liveEvent">
      <div v-if="currentlyNowPlaying">
        <strong>Currently Playing:</strong>
        <p>
          <button @click="showLyrics = !showLyrics">{{ showLyrics ? 'Hide' : 'Show' }} lyrics</button>
          <span>{{ currentlyNowPlaying.title }} - </span>
          <span>{{ currentlyNowPlaying.artist }}</span>
          <pre v-if="showLyrics" class="lyrics">{{ currentlyNowPlaying.lyrics }}</pre>
        </p>
        <hr/>
      </div>
      <!-- <div v-if="votes.length"> -->
      <!--   <strong>Voted Songs:</strong> -->
      <!--   <p v-for="votedSongId in votes" :key="votedSongId"> -->
      <!--     <span>{{ liveEvent.songs[votedSongId].title }} - </span> -->
      <!--     <span>{{ liveEvent.songs[votedSongId].artist }}</span> -->
      <!--   </p> -->
      <!--   <hr/> -->
      <!-- </div> -->
      <div v-if="sortedUpcomingSongs.length">
        <span><strong>Vote Here</strong> ({{ votesRemaining }} votes remaining):</span>
        <p v-for="song in sortedUpcomingSongs" :key="song.id">
          <span>{{ song.title }} - </span>
          <span>{{ song.artist }}</span>
          <span>({{ song.votes }} votes)</span>
          <button v-if="!song.voted" :disabled="votesRemaining <= 0" @click="voteSong(song)">Vote</button>
          <button v-if="song.voted" disabled>Voted</button>
        </p>
      </div>
    </h3>
    <h3 class="subtitle black-text" v-else>
      Sorry, there is no event currently live.
    </h3>
  </div>
</template>

<script>
export default {
  async mounted() {
    this.$fireModule
      .database()
      .ref("live-event")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const liveEvents = Object.entries(data)
          const liveEvent = liveEvents[0]
          if (liveEvent) {
            const [id, liveEventVal] = liveEvent
            this.liveEvent = {
              ...liveEventVal,
              id
            }
            this.readLocalStorage()
          }
        } else {
          this.liveEvent = null
        }
      });
  },
  data() {
    return {
      liveEvent: null,
      votes: null,
      showLyrics: false
    };
  },
  computed: {
    sortedUpcomingSongs() {
      const songs = Object.values(this.liveEvent?.songs || {}).filter(song => song.status === 'upcoming')
      return songs
        .map((song) => {
          const voted = this.votes.includes(song.id)
          return {
            ...song,
            voted
          }
        })
        .sort((a, b) => b.votes - a.votes)
    },
    currentlyNowPlaying() {
      let currentlyNowPlaying = null
      Object.entries(this.liveEvent?.songs || {}).forEach(([id, song]) => {
        if (song.status === 'nowplaying') {
          currentlyNowPlaying = {
            ...song,
            id
          }
        }
      })
      return currentlyNowPlaying
    },
    votesRemaining() {
      return 3 - this.votes.length
    }
  },
  watch: {
    votes: {
      deep: true,
      handler: function(votes) {
        if (this.liveEvent) {
          localStorage.setItem(`rb:${this.liveEvent.id}`, JSON.stringify({ votes }))
        }
      }
    }
  },
  methods: {
    readLocalStorage() {
      let item = localStorage.getItem(`rb:${this.liveEvent.id}`)
      if (!item) {
        this.votes = []
      } else {
        this.votes = JSON.parse(item).votes
      }
    },
    async voteSong(song) {
      const updates = {}
      const updatedSong = {
        ...song,
        votes: song.votes + 1
      }
      delete updatedSong.voted
      updates[`live-event/${this.liveEvent.id}/songs/${song.id}`] = updatedSong
        console.log(updatedSong)
      await this.$fireModule
        .database()
        .ref()
        .update(updates);
      this.votes.push(song.id)
    }
  },
};
</script>

<style>
.lyrics {
  border: 1px solid black;
  width: 70%;
  margin: auto;
  margin-top: 10px;
  font-size: 20px;
  }
</style>
