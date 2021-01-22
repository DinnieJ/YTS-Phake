<template>
    <v-layout>
        <v-row no-gutters>
            <v-col
             cols="12"
             sm="4"
             md="6"
            >
            </v-col>
        </v-row>
    </v-layout>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MovieRepository from '@/repositories/MovieRepository'

@Component<MovieDetail>({
    name: 'MovieDetail'
})

export default class MovieDetail extends Vue {
    private ok: string = this.$route.params.id

    private async getMovieDetail(): Promise<any> {
        await MovieRepository.getMovie
    }
}

</script>