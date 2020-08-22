<template>
  <div class="home">
    <UrlShortner/>
  </div>
</template>

<script lang="ts">
import UrlShortner from '@/components/UrlShortner.vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Home',
  components: {
    UrlShortner,
  },
})
export default class Home extends Vue {}
</script>
