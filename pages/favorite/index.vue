<template>
  <v-container fluid>
    <v-layout column justify-center align-content-center align-center xs12>
      <div class="text-center">
        <h1>Your favorites</h1>
      </div>
      <v-flex column justify-center align-center mt-5>
        <v-flex row justify-center wrap>
          <favorite-movie-card
            class="ma-2"
            v-for="movie in movieList"
            :key="movie.id"
            :movie="movie"
            @remove-favorite="removeFavorite"
          >
          </favorite-movie-card>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import MovieRepository from '@/repositories/MovieRepository'
import { mapGetters } from 'vuex'
import { Getter } from '@/constants/app.vuex'
import FavoriteMovieCard from '@/components/favorite/FavoriteMovieCard.vue'
import FavoriteRepository from '~/repositories/FavoriteRepository'
import { SnackbarAction } from '@/constants/app.style'

@Component<Favorite>({
  name: 'Favorite',
  components: {
    FavoriteMovieCard,
  },

  computed: {
    ...mapGetters({
      user: Getter.USER,
    }),
  },

  async created() {
    await this.getFavoriteMovies()
  },
})
export default class Favorite extends Vue {
  private movieList: Array<any> = []
  $notify: any

  public async getFavoriteMovies(): Promise<any> {
    await MovieRepository.getUserFavoriteMovies()
      .then((response) => {
        this.movieList = response.data
      })
      .catch((error) => {
        console.log('error')
      })
  }

  public async removeFavorite(id: number): Promise<any> {
    await FavoriteRepository.dislikeMovie(id)
      .then((response) => {
        let index = this.movieList.findIndex((i) => i.id === id)
        this.movieList.splice(index, 1)
        this.$notify.showMessage({
          message: `Remove from favorite successful`,
          color: SnackbarAction.success,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>