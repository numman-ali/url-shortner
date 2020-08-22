<template>
  <div id="app">
    <div id="nav">
      <h1>URL Shortner</h1>
      <template v-if="isAuthenticated">
        <div>
          <p>{{ user.email }}</p>
          <button @click="logoutUser()">Logout</button>
        </div>
      </template>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  get isAuthenticated(): boolean {
    return this.$store.getters.isAuthenticated;
  }

  get user(): { email: string } {
    return this.$store.getters.getUser;
  }

  mounted() {
    this.axios.interceptors.response.use((response) => response, async (error) => {
      console.log(error.response);
      if (error.response.config.url.includes('/login') || error.response.config.url.includes('/register')) return Promise.reject(error);
      if (error.response.status === 401) {
        await this.logoutUser(true);
      }
      return Promise.reject(error);
    });
    if (process.env.NODE_ENV !== 'production') {
      this.axios.defaults.baseURL = `http://localhost:${process.env.PORT || 3000}`;
    }
  }

  async logoutUser(withAlert = false): Promise<void> {
    const alertFn = () => alert('Your login has expired, so you will be logged out!');
    await this.$store.dispatch('removeToken');
    await this.$router.push('/login', withAlert ? alertFn : undefined);
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 10px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
