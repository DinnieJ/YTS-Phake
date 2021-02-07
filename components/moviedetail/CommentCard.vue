<template>
    <v-sheet class="card-comment pa-5" elevation="10" height="100" rounded outlined>
        <h5>{{ comment.username }}</h5>
        <p>{{ comment.content }}</p>
    </v-sheet>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component<CommentCard>({
  name: 'CommentCard',
})

export default class CommentCard extends Vue {
    @Prop() readonly comment!: any
}
</script>
<style lang="scss">
.card-comment {
    border-bottom: 30px solid #FFFFFF;
}
</style>