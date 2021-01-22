<template>
  <v-app dark>
    <v-main>
      <sidebar
        :menuItems="menuItems"
        :toggle.sync="toggle"
        @close="toggleSidebar"
      />
      <navbar 
      :menuItems="menuItems"
      @toggle-drawer="toggleSidebar" />
      <snackbar/>
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
import { Getter } from '@/constants/app.vuex'

@Component<Default>({
  components: {
    Navbar,
    Footer,
    Sidebar,
    Snackbar
  },

  created() {

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
    if(this.$store.state.auth.user) {
      this.menuItems = this.unauthMenuItems.concat(this.authMenuItems)
    } else {
      this.menuItems = this.unauthMenuItems
    }
  }
}
</script>
