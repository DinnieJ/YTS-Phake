<template>
  <v-toolbar flat>
    <v-app-bar-nav-icon
      class="hidden-sm-and-up"
      @click="toggleDrawer"
    ></v-app-bar-nav-icon>
    <v-toolbar-title>
      <nuxt-link to="/" style="cursor: pointer" tag="span">
        {{ appTitle }}
      </nuxt-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-xs-only">
      <v-btn text v-for="item in menuItems" :key="item.title" :to="item.path">
        <v-icon left dark>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-btn v-if="user" text small class="login-btn">
      <v-icon left dark>mdi-lock-open</v-icon>
      <span class="hidden-xs-only" @click="logout">Logout</span>
    </v-btn>
    <v-btn v-else text small class="login-btn" to="/login">
      <v-icon left dark>mdi-lock</v-icon>
      <span class="hidden-xs-only">Sign In</span>
    </v-btn>
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue} from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import { DispatchAction, Getter } from '@/constants/app.vuex'

@Component<Navbar>({
  name: 'Navbar',

  computed: {
    ...mapGetters({
      user: Getter.USER,
    }),
  },
})
export default class Navbar extends Vue {
  @Prop() readonly menuItems!: Array<Object>

  private appTitle: string = `${process.env.APP_TITLE}`
  @Emit('toggle-drawer')
  public toggleDrawer(): void {
  }

  public async logout(): Promise<void> {
    const isLoggedOut = await this.$store.dispatch(DispatchAction.LOGOUT)
    if(isLoggedOut) {
      alert('Successful logged out')
    }
  }
}
</script>

<style lang="scss">
.login-btn::before {
  background-color: transparent;
}
</style>
