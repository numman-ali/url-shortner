<template>
  <div>
    <h2>{{ formType }}</h2>
    <div>
      <input placeholder="Email" type="email" name="email" v-model="email">
      <input placeholder="Password" type="password" name="password" v-model="password">
    </div>
    <br>
    <button @click="submitForm">Submit</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import FormType from '@/helpers/FormType.enum';

@Component
export default class UserForm extends Vue {
  @Prop() private formType!: FormType;

  private email = '';

  private password = '';

  async submitForm(e: Event): Promise<void> {
    e.preventDefault();
    if (this.formType === FormType.REGISTER) {
      await this.register();
    }

    if (this.formType === FormType.LOGIN) {
      await this.login();
    }
  }

  async register() {
    try {
      await this.axios.post('/api/auth/register', { email: this.email, password: this.password });
      await this.login();
    } catch (err) {
      console.log('An error occurred trying to register.', err);
      if (err.response.status === 409) {
        alert('This email address has already been registered!');
      } else {
        alert('An unknown error occurred, please contact support!');
      }
    }
  }

  async login() {
    try {
      const response = await this.axios.post('api/auth/login', { email: this.email, password: this.password });
      await this.$store.dispatch('setToken', response.data.access_token);
      await this.$router.push('/');
    } catch (err) {
      console.log('An error occurred trying to login.', err.message);
      if (err.response.status === 401) {
        alert('Unauthorised, please check your details!');
      } else {
        alert('An unknown error occurred, please contact support!');
      }
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
