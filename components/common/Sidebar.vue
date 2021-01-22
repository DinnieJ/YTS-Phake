<template>
  <v-navigation-drawer
    v-model="display"
    fixed
  >
    <v-list>
      <v-list-item
        v-for="(item, i) in menuItems"
        :key="i"
        :to="item.path"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script lang="ts">
import {Component, Vue, Prop, PropSync} from 'vue-property-decorator';

@Component<Sidebar>({
  name:'Sidebar'
})

export default class Sidebar extends Vue {
  @Prop({required: true})  readonly menuItems!: Array<Object>
  @PropSync('toggle')  display!: boolean


}
</script>


