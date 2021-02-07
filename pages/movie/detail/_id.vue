<template>
  <v-layout class="content-layout mb-9" d-flex justify-center column>
    <information-card
      :movie="movieDetail"
      :favorited.sync="movieDetail.favorited"
    ></information-card>
    <comment-list
      :comments.sync="movieDetail.comments"
      :movieId="movieDetail.movie_id"
    ></comment-list>
  </v-layout>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MovieRepository from '@/repositories/MovieRepository'
import { SnackbarAction } from '@/constants/app.style'
import InformationCard from '@/components/moviedetail/InformationCard.vue'
import CommentList from '@/components/moviedetail/CommentList.vue'

@Component<MovieDetail>({
  name: 'MovieDetail',
  components: {
    InformationCard,
    CommentList,
  },
  async created() {
    await this.getMovieDetail()
  },
})
export default class MovieDetail extends Vue {
  private movieId: string = this.$route.params.id
  private movieDetail: Object = {}
  $notify: any

  public async getMovieDetail(): Promise<any> {
    let id: number = parseInt(this.movieId)
    if (!isNaN(id)) {
      await MovieRepository.getMovie(id)
        .then((response) => {
          this.movieDetail = response.data
        })
        .catch((error) => {
          console.log(error)
          this.$notify.showMessage({
            message: `${error.message}`,
            color: SnackbarAction.error,
          })
          this.$router.push('/')
        })
    } else {
      this.$notify.showMessage({
        message: `Failed to load movie`,
        color: SnackbarAction.error,
      })
    }
  }
}
</script>
<style lang="scss">
.content-layout {
  max-width: 1140px;
  margin: 0 auto;
}
</style>
