<template>
  <div id="app">
    <div id="nav">
      <template v-if="isAuthenticated">
        <router-link  to="/">Home</router-link> |
        <button @click="logoutUser">Logout</button>
      </template>
      <template v-else>
        <router-link to="/register">Register</router-link> |
        <router-link to="/login">Login</router-link>
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

  mounted() {
    this.axios.interceptors.response.use((response) => response, async (error) => {
      console.log(error.response);
      if (error.response.config.url.includes('/login') || error.response.config.url.includes('/register')) return Promise.reject(error);
      if (error.response.status === 401) {
        await this.logoutUser();
      }
      return Promise.reject(error);
    });
    if (process.env.NODE_ENV !== 'production') {
      this.axios.defaults.baseURL = `http://localhost:${process.env.PORT || 3000}`;
    }
  }

  async logoutUser(): Promise<void> {
    await this.$store.dispatch('removeToken');
    await this.$router.push('/login', () => alert('Your login has expired, so you will be logged out!'));
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
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
