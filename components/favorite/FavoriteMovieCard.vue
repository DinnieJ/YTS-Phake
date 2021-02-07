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
              :color="favoriteColor.background"
              :loading="favoriteLoading"
              @click="dislikeMovie"
              ><v-icon :color="favoriteColor.icon">mdi-close</v-icon></v-btn
            >
          </div>
        </v-expand-transition>
      </v-img>
    </v-card>
  </v-hover>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import {
  favoriteBtnColor,
} from '@/constants/app.style'

import FavoriteRepository from '@/repositories/FavoriteRepository'

@Component<FavoriteMovieCard>({
    name: 'FavoriteMovieCard'
})

export default class FavoriteMovieCard extends Vue {
    @Prop() readonly movie!: any

    private favoriteLoading: boolean = false
    private favoriteColor: any = favoriteBtnColor

    @Emit('remove-favorite')
    public dislikeMovie(): void { 
        return this.movie.id
    }
}
</script>
