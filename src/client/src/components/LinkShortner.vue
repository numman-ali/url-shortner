<template>
  <div>
    <h1>Link Shortner</h1>
    <p>
      Enter the URL you would like to have shortened below:
    </p>
    <input placeholder="URL" id="url" type="text" name="url" v-model="url">
    <button @click="shortenUrl">Make Short</button>
    <template  v-if="shortenedUrls.length"></template>
    <h3>Your shortened URLs</h3>
    <hr>
    <template v-for="url in shortenedUrls">
      <div :key="url._id">
        <p>{{ url.longUrl }}</p>
        <ul style="font-size: 0.9rem">
          <li>
            <a :href="url.longUrl">{{ url.shortUrl }}</a> |
            <button @click="deleteUrl(url._id)">Delete</button>
          </li>
        </ul>
        <hr>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AxiosResponse } from 'axios';

interface ShortenedUrl {
  _id: string;
  shortUrl: string;
  longUrl: string;
}

@Component
export default class LinkShortner extends Vue {
  url = '';

  shortenedUrls: ShortenedUrl[] = [];

  async beforeMount() {
    try {
      const response: AxiosResponse = await this.axios.get('/api/urls');
      this.shortenedUrls = response.data;
    } catch (err) {
      console.log('An error occurred trying to load shortened URLs', err);
      if (!err.message.includes(401)) alert('An error occurred, please refresh the page.');
    }
  }

  async shortenUrl(): Promise<void> {
    try {
      const url = new URL(this.url);
    } catch (e) {
      alert('Not a valid URL!');
      return;
    }

    try {
      const response: AxiosResponse = await this.axios.post('/api/urls', { url: this.url });
      this.shortenedUrls.unshift(response.data);
      this.url = '';
    } catch (err) {
      console.log('An error occurred trying to shorten the url.', err);
      if (!err.message.includes(401)) alert('An error occurred, please try again.');
    }
  }

  async deleteUrl(id: string): Promise<void> {
    try {
      await this.axios.delete(`/api/urls/${id}`);
      this.shortenedUrls = this.shortenedUrls.filter(({ _id }) => _id !== id);
    } catch (err) {
      console.log('An error occurred trying to delete the url.', err);
      if (!err.message.includes(401)) alert('An error occurred, please try again.');
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
