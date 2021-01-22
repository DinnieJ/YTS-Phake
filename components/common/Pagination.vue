<template>
        <v-pagination
            v-model="synchedPage"
            :length="totalPage"
            :total-visible="7"
            circle
            color="red darken-3"
        ></v-pagination>
</template>
<script lang="ts">
import { Component, Vue, Emit, Prop, PropSync } from 'vue-property-decorator';

@Component<Pagination>({
    name: "Pagination"
})
export default class Pagination extends Vue {
    @Prop({required: true})  readonly totalPage!: number
    @PropSync('page') synchedPage!: number

}
</script>