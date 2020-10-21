<template>
  <div class="container">
    <hr>
    <h1>Login</h1>
    <b-form @submit.prevent="login" class="bg-white p4">
      <b-form-group
        label="E-mail:"
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="email"
          type="email"
          placeholder="Exemplo: seunome@seudominio.com"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Senha:"
        label-for="password"
      >
        <b-form-input
          id="password"
          v-model="password"
          type="password"
        ></b-form-input>
      </b-form-group>
      <b-alert v-if="error" show variant="danger"> {{ error }}</b-alert>
      <b-form-group>
        <b-button type="submit" block variant="primary" class="bg-primary">Logar</b-button>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>

export default {
  layout: 'login',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async login () {

      try {

        let response = await this.$auth.loginWith('local', {

          data: {

            email: this.email,

            password: this.password

          }

        })

        this.$router.push('/conversor-de-moedas')

      } catch (e) {
        console.log(e)
        this.error = e.response.data.message
      }


    }
  },
}
</script>
