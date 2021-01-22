<template>
  <v-layout>
    <v-text-field
      v-model="query"
      label="Find your porn here"
      prepend-inner-icon="mdi-movie"
      color="red"
      class="search-field"
      @keyup.enter="passQuery"
    >
      <template v-slot:append>
        <v-btn tile icon class="ma-0" @click="passQuery">
            <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field>
  </v-layout>
</template>
<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator'

@Component<SearchBar>({})
export default class SearchBar extends Vue {
  private query: string = ''

  @Emit('search')
  public passQuery(): any {
    return this.query
  }
}
</script>
<style lang="scss">
</style>