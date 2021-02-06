<template>
  <v-row justify="center" class="login-container">
    <v-col sm="12" md="6" cols="12" style="padding: unset">
      <v-img
        :src="require('@/assets/images/signin-signup.png')"
        class="sign-img"
      ></v-img>
    </v-col>
    <v-col sm="12" md="6" cols="12" style="padding: unset">
      <v-card align="center" class="login-card">
        <v-card-title class="login-title">Britecheck</v-card-title>
        <v-card-subtitle class="login-subtitle"
          >Inventory<sup>&#174;</sup></v-card-subtitle
        >
        <v-card-text class="login-welcome"
          >Welcome back! Please login to your account</v-card-text
        >
        <LoginForm class="login-form" />
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import LoginForm from '@/components/user/LoginForm'
export default {
  name: 'Login',
  components: {
    LoginForm
  }
}
</script>
<style lang="css">
.login-container {
  height: 100vh;
}
.sign-img {
  height: 100vh;
}
.sign-img .v-image__image--cover {
  background-size: 100% !important;
}
.login-title {
  display: unset;
  padding: 30px 60px;
  margin-bottom: 20px;
  font-size: 45px;
  font-weight: bold;
  color: #413967;
  font-family: 'SCRIPTBL';
}
.login-subtitle {
  margin-top: 20px !important;
  font-size: 25px;
  letter-spacing: 0.1em;
  font-weight: bold;
  color: #413967 !important;
  font-family: 'Sourcesanspro';
}
.login-card {
  padding-left: 23%;
  padding-right: 23%;
  padding-top: 10%;
  height: 100%;
  margin: unset;
  border-radius: unset !important;
  background-color: #f5f5f5 !important;
}
.login-form {
  background-color: #f5f5f5 !important;
}
.login-welcome {
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
  font-family: 'Sourcesanspro';
  color: #b7b4c7 !important;
}
@media screen and (max-width: 768px) {
  .login-card {
    padding-left: 2px;
    padding-right: 2px;
  }
  .sign-img {
    display: none;
  }
}
</style>
