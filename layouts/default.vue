<template>
  <v-app dark>
    <v-main>
      <sidebar
        :menuItems="menuItems"
        :toggle.sync="toggle"
        @close="toggleSidebar"
      />
      <navbar :menuItems="menuItems" @toggle-drawer="toggleSidebar" />
      <snackbar />
      <v-container pb-9>
        <nuxt />
      </v-container>
      <v-footer :absolute="true">
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Navbar from '@/components/common/Navbar.vue'
import Footer from '@/components/common/Footer.vue'
import Sidebar from '@/components/common/Sidebar.vue'
import Snackbar from '@/components/common/Snackbar.vue'
import { getTokenCookie } from '@/utils/cookies'
import { DispatchAction, MutationState } from '@/constants/app.vuex'
import AuthRepository from '@/repositories/AuthRepository'
import { SnackbarAction } from '@/constants/app.style'
 
@Component<Default>({
  components: {
    Navbar,
    Footer,
    Sidebar,
    Snackbar,
  },

  async created() {
    const token = getTokenCookie()
    if (token && !this.$store.state.auth.token) {
      this.$store.commit(MutationState.SET_TOKEN, token)

      this.$store.commit(MutationState.SHOW_SNACKBAR, {
        message: `Trying to connect...`,
        color: SnackbarAction.process,
      })

      await AuthRepository.authUser()
        .then((response) => {
          this.$store.commit(MutationState.SET_USER, response.data)
          this.$store.commit(MutationState.SHOW_SNACKBAR, {
            message: `Login successful with ${response.data.email}`,
            color: SnackbarAction.success,
          })
        })
        .catch((error) => {
          this.$store.dispatch(DispatchAction.CLEAR_AUTH)
          this.$store.commit(MutationState.SHOW_SNACKBAR, {
            message: `Token expired`,
            color: SnackbarAction.error,
          })
        })
    }
  },

  middleware: 'authenticated',
})
export default class Default extends Vue {
  private unauthMenuItems: Array<Object> = [
    { title: 'Home', path: '/', icon: 'mdi-home' },
    { title: 'Movies', path: '/movie', icon: 'mdi-movie' },
  ]

  private authMenuItems: Array<Object> = [
    { title: 'Favorite', path: '/favorite', icon: 'mdi-heart' },
  ]

  private menuItems?: Array<Object> = this.unauthMenuItems

  private toggle: boolean = false

  public toggleSidebar(): void {
    this.toggle = !this.toggle
  }

  @Watch('$store.state.auth.user')
  public updateMenuItems() {
    if (this.$store.state.auth.user) {
      this.menuItems = this.unauthMenuItems.concat(this.authMenuItems)
    } else {
      this.menuItems = this.unauthMenuItems
    }
  }
}
</script>
