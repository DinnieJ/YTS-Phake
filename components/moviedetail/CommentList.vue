<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h1>Comments</h1>
      </v-col>
    </v-row>
    <v-row v-if="user">
      <v-col cols="9">
        <v-textarea
          placeholder="Write your comment here..." 
          rows="3" 
          outlined 
          hide-details 
          dense 
          no-resize
          v-model="content"
          :loading="loading"
        >
        </v-textarea>
      </v-col>
      <v-col cols="1" align-self="center">
        <v-btn class="mb-5" :disabled="!allowSubmit" @click="addComment">Submit</v-btn>
        <v-btn @click="clearTextArea">Clear</v-btn>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <div class="comment-blocked pa-9 text-center">Login to comment</div>
      </v-col>
    </v-row>
    <v-row v-for="comment in asyncComments" :key="comment.comment_id">
      <v-col cols="12">
      <comment-card :comment="comment"></comment-card>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, PropSync } from 'vue-property-decorator'
import CommentCard from '@/components/moviedetail/CommentCard.vue'
import CommentRepository from '@/repositories/CommentRepository'
import { SnackbarAction } from '@/constants/app.style'
import { mapGetters } from 'vuex'
import { Getter } from '@/constants/app.vuex'

@Component<CommentList>({
  name: 'CommentList',

  components: {
    CommentCard
  },

  computed: {
    ...mapGetters({
      user: Getter.USER
    })
  },

  created() {

  }
})
export default class CommentList extends Vue {
  @Prop({ required: true }) readonly movieId!: number
  @PropSync('comments') asyncComments: any

  private loading: boolean = false
  private content: string = ""
  $notify: any

  get allowSubmit() : boolean {
    return this.content.trim() !== ""
  }

  public clearTextArea(): void {
    this.content = ""
  }

  public async addComment(): Promise<any> {
    this.loading = true;
    await CommentRepository.addComment({ movie_id: this.movieId, comment: this.content })
      .then(response => {
        this.asyncComments.unshift(response.data.comment)
        this.$notify.showMessage({
          message: `Added comment`,
          color: SnackbarAction.success
        })
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        this.loading = false
        this.content = ""
      })
  }
}
</script>
<style lang="scss">
.comment-blocked {
  border: 1px solid #FFFFFF;
}
</style>