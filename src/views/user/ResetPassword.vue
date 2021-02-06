<template>
  <v-row justify="center" id="reset-container">
    <v-col sm="12" md="6" cols="12" style="padding: unset">
      <v-img
        :src="require('@/assets/images/signin-signup.png')"
        id="reset-img"
      ></v-img>
    </v-col>
    <v-col sm="12" md="6" cols="12" style="padding: unset">
      <v-card align="center" id="resetpass-card">
        <v-card-title id="reset-title">Britecheck</v-card-title>
        <v-card-text id="reset-subtitle"
          >Enter your email and we will send you a password reset
          link.</v-card-text
        >
        <ResetPasswordForm class="reset-form" />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import ResetPasswordForm from '@/components/user/ResetPasswordForm'
export default {
  name: 'ResetPassword',
  components: {
    ResetPasswordForm
  }
}
</script>
<style lang="css">
#reset-container {
  height: 100vh;
}
#reset-img .v-image__image--cover {
  background-size: 100% !important;
}
#resetpass-card {
  padding-left: 20%;
  padding-right: 20%;
  padding-top: 12%;
  height: 100%;
  margin: unset;
  border-radius: unset !important;
  background-color: #f5f5f5 !important;
}
#reset-image {
  height: 100vh;
}
#reset-title {
  display: unset;
  padding: 30px 60px;
  margin-bottom: 20px;
  font-size: 50px;
  color: #413967;
  font-family: 'SCRIPTBL';
}
.reset-form {
  background-color: #f5f5f5 !important;
}
#reset-subtitle {
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  font-family: 'Sourcesanspro';
  color: #b7b4c7;
}
</style>
