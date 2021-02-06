<template>
  <v-row justify="center" class="signup-container">
    <v-col sm="12" md="6" cols="12" style="padding: unset">
      <v-img
        :src="require('@/assets/images/signin-signup.png')"
        class="signup-img"
      ></v-img>
    </v-col>
    <v-col sm="12" md="6" cols="12" style="padding: unset">
      <v-card align="center" class="signup-card">
        <v-card-title class="login-title">Britecheck</v-card-title>
        <v-card-subtitle class="login-subtitle"
          >Inventory<sup>&#174;</sup></v-card-subtitle
        >
        <v-card-text class="signup-welcome"
          >Please complete to create your account</v-card-text
        >
        <RegisterForm class="signup-form" />
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import RegisterForm from '@/components/user/RegisterForm'
export default {
  name: 'Register',
  components: {
    RegisterForm
  }
}
</script>
<style lang="css">
.signup-img {
  height: 100vh;
}
.signup-img .v-image__image--cover {
  background-size: 100% !important;
}
.signup-card {
  padding-left: 23%;
  padding-right: 23%;
  padding-top: 7%;
  height: 100%;
  margin: unset;
  background-color: #f5f5f5 !important;
}
.signup-form {
  background-color: #f5f5f5 !important;
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
.signup-welcome {
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
  font-family: 'Sourcesanspro';
  color: #b7b4c7 !important;
}
@media screen and (max-width: 768px) {
  .signup-card {
    padding-left: 2%;
    padding-right: 2%;
  }
  .signup-img {
    display: none;
  }
}
</style>
