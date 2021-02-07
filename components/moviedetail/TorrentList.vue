<template>
  <div>
    <v-flex class="list-torrent pa-5" row wrap>
      <torrent-card
        class="ma-2"
        v-for="torrent in torrentList"
        :key="torrent.id"
        :torrent="torrent"
      ></torrent-card>
    </v-flex>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import TorrentCard from '@/components/moviedetail/TorrentCard.vue'

@Component<TorrentList>({
  name: 'TorrentList',
  components: {
    TorrentCard,
  },
})
export default class TorrentList extends Vue {
  @Prop() readonly torrentList!: any
}
</script>
<style lang="scss">
.list-torrent {
  background-color: #696969;
  height: 300px;
}
</style>