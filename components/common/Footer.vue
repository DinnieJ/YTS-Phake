<template>
  <v-footer>
    <span>&copy; {{ new Date().getFullYear() }}</span>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component<Footer>({
    name: 'Footer'
})

export default class Footer extends Vue {
    private fixed: boolean = true
}
</script>

<style></style>
