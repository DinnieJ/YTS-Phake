<template>
  <v-hover v-slot:default="{ hover }">
    <v-card width="250" height="320" class="movie-card">
      <v-img lazy-src="/download.jpeg" :src="movie.cover" height="320">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="red darken-3"
              size="64"
            ></v-progress-circular>
          </v-row>
        </template>
        <v-expand-transition>
          <div
            v-if="hover"
            column
            class="d-flex flex-column transition v-card--reveal red darken-3 display-1 text-center pl-2 pr-2"
          >
            <nuxt-link :to="`/movie/detail/${movie.id}`" tag="span">
              <div class="card__title">{{ movie.title }}</div>
            </nuxt-link>
            <div class="card__content">{{ movie.rating }}</div>
            <v-btn 
              fab 
              dark
              v-if="user"
              :color="favoriteColor.background" 
              :loading="favoriteLoading"
              @click="favoriteMovie"
              ><v-icon :color="favoriteColor.icon">mdi-heart</v-icon></v-btn
            >
          </div>
        </v-expand-transition>
      </v-img>
    </v-card>
  </v-hover>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { unfavoriteBtnColor, favoriteBtnColor } from '@/constants/app.style'
import { mapGetters } from 'vuex'
import { Getter } from '@/constants/app.vuex'

@Component<MovieCard>({
  name: 'MovieCard',

  computed: {
    ...mapGetters({
      user: Getter.USER
    })
  }
})
export default class MovieCard extends Vue {
  @Prop({ required: true }) readonly movie!: any

  private favoriteLoading: boolean = false
  favorited: boolean = false;
  private favoriteColor: Object = unfavoriteBtnColor

  public goToDetail() {
    this.$router.push(`/detail/${this.movie.id}`)
  }

  public favoriteMovie(): void {
    if(this.favorited) {
      this.unlikeMovie()
    } else {
      this.likeMovie()
    }
  }
  public likeMovie(): void {
    this.favoriteLoading = true;
    this.favorited = true;
    setTimeout(() => {
      this.favoriteColor = favoriteBtnColor;
      this.favoriteLoading = false;
    }, 5)
  }

  public unlikeMovie(): void {
    this.favoriteLoading = true;
    this.favorited = false;
    setTimeout(() => {
      this.favoriteColor = unfavoriteBtnColor;
      this.favoriteLoading = false;
    }, 5)
  }
}
</script>
<style lang="scss">
.v-card {
  &--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: 0.8;
    position: absolute;
    width: 100%;
    height: 100%;
    color: #ffffff;
  }
}

.movie-card {
  position: relative;
}

.card {
  &__title {
    font-size: 22px;
    font-weight: bold;
    cursor: pointer;
  }

  &__content {
    font-size: 16px;
  }
}

.btn {
  &-favorite {
    position: absolute;
    top: 0;
    left: 0;
  }
}
.v-btn:hover i {
  transform: scale(1.3);
}
</style>