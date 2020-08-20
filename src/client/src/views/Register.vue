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
  name: 'Register',
  components: {
    UserForm,
  },
})
export default class HelloWorld extends Vue {
  formType = FormType.REGISTER;
}
</script>
