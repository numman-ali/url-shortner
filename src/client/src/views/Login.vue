<template>
  <div class="home">
    <UserForm :form-type="formType"/>
  </div>
</template>

<script>
import UserForm from '@/components/UserForm.vue';
import FormType from '@/helpers/FormType.enum';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Login',
  components: {
    UserForm,
  },
})
export default class Login extends Vue {
  formType = FormType.LOGIN;
}
</script>
