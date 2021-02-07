<template>
  <v-sheet width="180" height="180" elevation="2">
    <v-flex column class="pa-4">
      <h2>{{ torrent.quality }}</h2>
      <h3>Size: {{ torrent.size }}</h3>
      <h3>Type: {{ torrent.type }}</h3>
      <v-btn class="mt-2" @click="downloadTorrent" width="100" color="green">
        <v-icon>mdi-download-circle</v-icon>
      </v-btn>
    </v-flex>
  </v-sheet>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component<TorrentCard>({
  name: 'TorrentCard',
})
export default class TorrentCard extends Vue {
  @Prop() readonly torrent!: any

  public downloadTorrent() {
    window.open(this.torrent.url)
  }
}
</script>