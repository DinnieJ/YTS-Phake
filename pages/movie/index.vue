<template>
  <v-container fluid>
    <v-layout column justify-center align-content-center align-center xs12>
      <div class="text-center">
        <h1>All movies</h1>
      </div>
      <v-flex column justify-center align-center mt-5>
        <div class="mt-5 mb-5">
          <pagination :totalPage="totalPage" :page.sync="page"></pagination>
        </div>
        <v-flex row justify-center wrap>
          <movie-card
            class="ma-2"
            v-for="movie in movieList"
            :key="movie.id"
            :movie="movie"
            :favorite.sync="movie.favorited_by_user"
          >
          </movie-card>
        </v-flex>
        <div class="mt-5 mb-5">
          <pagination :totalPage="totalPage" :page.sync="page"></pagination>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import MovieCard from '@/components/common/MovieCard.vue'
import Pagination from '@/components/common/Pagination.vue'
import MovieRepository from '@/repositories/MovieRepository'
import { Framework } from 'vuetify'

declare module 'vue/types/vue' {
  // this.$vuetify inside Vue components
  interface Vue {
    $vuetify: Framework
  }
}

@Component<Movies>({
  name: 'Movies',
  components: {
    MovieCard,
    Pagination,
  },

  async mounted() {
    await this.getMovieData()
  },
})
export default class Movies extends Vue {
  private movieList: any = null
  private totalPage: number = 0
  private page: number = 1

  public async getMoviePagination() {
    await MovieRepository.getAllMovies(this.page)
      .then((response) => {
        this.movieList = response.data.data
        this.totalPage = response.data.total_page
      })
      .catch((error) => {
        console.log(error)
      })
  }

  public async getMoviePaginationAuth() {
    if (this.$store.state.auth.user) {
      await MovieRepository.getAllMoviesAuth(this.page)
        .then((response) => {
          this.movieList = response.data.data
          this.totalPage = response.data.total_page
          console.log(this.movieList)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  private async getMovieData(): Promise<any> {
    if(this.$store.state.auth.user) {
      await this.getMoviePaginationAuth()
    } else {
      await this.getMoviePagination()
    }
  }

  public scrollToTop(): void {
    this.$vuetify.goTo(0)
  }
  @Watch('$store.state.auth.user')
  @Watch('page')
  public async pageChanged() {
    this.getMovieData()
    this.scrollToTop()
  }
}
</script>
