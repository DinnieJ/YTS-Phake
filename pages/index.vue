<template>
  <v-container fluid>
    <v-layout
      d-flex
      column
      justify-center
      align-content-center
      xs12
      sm6
      offset-sm3
      mt-3
    >
      <v-flex class="text-center">
        <div class="app-title">{{ title }}</div>
        <search-bar @search="searchMovie"></search-bar>
        <h1 class="banner__title">RANDOM MOVIE</h1>
        <v-flex class="text-center" mt-5>
          <v-btn @click="getRandomMovie">
            <v-icon>mdi-shuffle-variant</v-icon>
          </v-btn>
        </v-flex>
        <v-flex row wrap justify-center mt-5>
          <movie-card
            class="ma-2"
            v-for="movie in randomMovies"
            :key="movie.id"
            :movie="movie"
          ></movie-card>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SearchBar from '@/components/home/SearchBar.vue'
import MovieCard from '@/components/common/MovieCard.vue'
import MovieRepository from '@/repositories/MovieRepository'
import { SnackbarAction } from "@/constants/app.style"

@Component<Home>({
  components: { MovieCard, SearchBar },
  async created() {
    await this.getRandomMovie()
  },

  middleware: 'authenticated'
})
export default class Home extends Vue {
  private title: string = `${process.env.APP_TITLE}`.toUpperCase()
  private randomMovies: any = null
  private loading: boolean = true
  $notify: any
  public searchMovie(query: any): void {
    if(query.trim()) this.$router.push(`/search?keyword=${encodeURI(query.trim())}`)
  }

  private async getRandomMovie() {
    this.loading = false
    await MovieRepository.getRandomMovie()
      .then((response) => {
        this.randomMovies = response.data
      })
      .catch((error) => {
        this.$notify.showMessage({
          message:"Failed to get the database",
          color: SnackbarAction.error
        })
      })
      .finally(() => {
        this.loading = true
      })
  }
}
</script>

<style lang="scss">
.app-title {
  font-size: 60px;
}

</style>