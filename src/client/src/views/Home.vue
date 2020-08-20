<template>
  <div class="home">
    <LinkShortner/>
  </div>
</template>

<script lang="ts">
import LinkShortner from '@/components/LinkShortner.vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Home',
  components: {
    LinkShortner,
  },
})
export default class Home extends Vue {}
</script>
