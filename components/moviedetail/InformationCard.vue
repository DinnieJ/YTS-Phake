<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-img
          lazy-src="/2918043.jpeg"
          min-height="200"
          max-height="300"
          :src="movie.background_img"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="red darken-3"
                size="64"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
    <v-row class="mt-5" align-sm="center" align-md="start">
      <v-col cols="8" offset="2" offset-sm="0" offset-md="0" sm="5" md="3">
        <v-img
          lazy-src="/download.jpeg"
          :src="movie.cover_img"
          min-height="350"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="red darken-3"
                size="64"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
      <v-col cols="8" offset="2" offset-sm="0" offset-md="0" sm="7" md="9">
        <h1>{{ movie.title }} ({{ movie.year }})</h1>
        <v-rating
          background-color="red lighten-2"
          color="red"
          empty-icon="mdi-star-outline"
          full-icon="mdi-star"
          half-icon="mdi-star-half-full"
          half-increments
          hover
          length="5"
          size="20"
          :value="movie.rating / 2"
          readonly
        ></v-rating>
        <p>{{ movie.description }}</p>
        <div>
          <v-icon left>mdi-thumb-up</v-icon>
          {{ movie.total_favorite }}
        </div>
        <div v-if="!user" class="pa-5 favorite-blocked">
          Login to add this movie to favorite
        </div>
        <div v-else class="mt-5">
          <v-btn v-if="!asyncFavorited" rounded @click="likeMovie">
            <v-icon left>mdi-heart</v-icon>
            Favorite
          </v-btn>
          <v-btn v-else rounded color="white" @click="unlikeMovie">
            <v-icon left color="red">mdi-heart</v-icon>
            <span style="color: red">Unfavorite</span>
          </v-btn>
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="ml-2" rounded dark v-bind="attrs" v-on="on">
                  <v-icon left>mdi-file-download</v-icon>
                Download
              </v-btn>
            </template>

            <torrent-list :torrentList="movie.torrents"></torrent-list>
          </v-dialog>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, PropSync } from 'vue-property-decorator'
import FavoriteRepository from '@/repositories/FavoriteRepository'
import { SnackbarAction } from '@/constants/app.style'
import { mapGetters } from 'vuex'
import { Getter } from '@/constants/app.vuex'
import TorrentList from '@/components/moviedetail/TorrentList.vue'

@Component<InformationCard>({
  name: 'InformationCard',
  components: {
      TorrentList
  },
  computed: {
    ...mapGetters({
      user: Getter.USER,
    }),
  },
})
export default class InformationCard extends Vue {
  @Prop({ required: true }) readonly movie!: any
  @PropSync('favorited') asyncFavorited!: boolean
  private favoriteLoading: boolean = false
  private dialog: boolean = false
  $notify: any

  public async likeMovie(): Promise<any> {
    this.favoriteLoading = true
    await FavoriteRepository.likeMovie(this.movie.movie_id)
      .then((response) => {
        this.asyncFavorited = true
        this.$notify.showMessage({
          message: `Added ${this.movie.title} to your favorite`,
          color: SnackbarAction.success,
        })
        this.movie.total_favorite++
      })
      .catch((error) => {
        this.$notify.showMessage({
          message: `Failed to like movie, please try again later`,
          color: SnackbarAction.error,
        })
      })
      .finally(() => {
        this.favoriteLoading = false
      })
  }

  public async unlikeMovie(): Promise<any> {
    this.favoriteLoading = true
    await FavoriteRepository.dislikeMovie(this.movie.movie_id)
      .then((response) => {
        this.asyncFavorited = false
        this.$notify.showMessage({
          message: `Remove ${this.movie.title} from your favorite`,
          color: SnackbarAction.success,
        })
        this.movie.total_favorite--
      })
      .catch((error) => {
        this.$notify.showMessage({
          message: `Failed to dislike movie, please try again later`,
          color: SnackbarAction.error,
        })
        console.log(error.message)
      })
      .finally(() => {
        this.favoriteLoading = false
      })
  }
}
</script>
<style lang="scss">
.favorite-blocked {
  width: 50%;
  border: 2px solid #ffffff;
  margin-top: 36px;
}
</style>