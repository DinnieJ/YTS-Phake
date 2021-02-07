<template>
  <v-container fluid>
    <v-layout d-flex column justify-center align-center class="xs10">
      <h1 class="text-center">LOGIN</h1>
      <p class="gray">おれ わ おちんちん が だいすき なんだよ</p>
      <validation-observer ref="formObserver" v-slot="{ invalid }">
        <v-form
          class="mt-5 d-flex flex-column justify-content-center form"
          @submit.prevent="submit"
        >
          <validation-provider
            v-slot="{ errors }"
            name="email"
            :rules="rules.email"
          >
            <v-text-field
              color="red"
              v-model="loginInfo.email"
              label="Email"
              outlined
              :error-messages="errors"
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="password"
            :rules="rules.password"
          >
            <v-text-field
              color="red"
              v-model="loginInfo.password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              label="Password"
              outlined
              :error-messages="errors"
            ></v-text-field>
          </validation-provider>
          <v-btn 
            :disabled="invalid"
            :loading="loading"
            @click="submitLoginForm"
          >Login</v-btn>
          <v-btn class="mt-3 blue darken-3">
            <v-icon left >mdi-google</v-icon>
            Login with google
          </v-btn>
        </v-form>
      </validation-observer>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
  validate
} from 'vee-validate'
import { required, email, min, max } from 'vee-validate/dist/rules'
import { LoginRule } from '@/constants/app.interface'
import { DispatchAction } from '@/constants/app.vuex' 
import { LoginDTO } from '@/constants/app.interface'
import { MutationState } from '@/constants/app.vuex'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: 'Enter something you dumb ass bitch',
})

extend('email', {
  ...email,
  message: 'That is not an email you stoopid ass',
})

extend('min', {
  ...min,
  message: 'Too short, like your dick',
})


@Component<Login>({
  name: 'Login',
  components: {
    ValidationObserver,
    ValidationProvider,
  },

  created() {
    
  }
})
export default class Login extends Vue {
  [x: string]: any
  private loginInfo: LoginDTO = {
    email: "",
    password: ""
  }
  private showPassword: boolean = false
  private loading: boolean = false

  private rules: LoginRule = {
    email: { required: true, email: true },
    password: { required: true, min: 8 },
  }

  /**
   * submitLoginForm
   */
  public async submitLoginForm() {
    this.loading = true
    const userLogin = await this.$store.dispatch(DispatchAction.LOGIN, this.loginInfo)
    if(userLogin) {
      this.$router.push('/')
    } else {
      this.$notify.showMessage({ message: "Wrong email or password", color:"red" })
    }
    this.loading = false
  }
}
</script>
<style lang="scss">
.form {
  border: 1px solid #aaaaaa;
  padding: 80px;
}
</style>
