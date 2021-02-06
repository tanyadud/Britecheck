<template>
  <v-card flat>
    <v-form ref="form" class="reset--form" v-model="valid" lazy-validation>
      <v-card-text>
        <div align="left">
          <span style="font-weight: 600" class="label-field">Email</span>
          <v-text-field
            @blur="isValidatedEmailMethod"
            v-model="email"
            :rules="emailRules"
            placeholder="Email..."
            pt="5"
            required
            :append-icon="isValidatedEmail ? 'mdi-checkbox-marked-circle' : ''"
            :append-outer-icon="
              emailErrCnt == 0 ? '' : isValidatedEmail ? '' : 'mdi-alert-circle'
            "
            class="reset-email-input"
          ></v-text-field>
        </div>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          @click="validate"
          class="send-btn ml-5 mr-5"
          height="48"
          >Send Request</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
      <p class="text-center reset-notification" v-if="notifyMsg">
        You will receive an email with instructions on how to reset your
        password in a few minutes
      </p>
      <v-card-text class="text-center terms-policy">
        <router-link class="subtitle-2" to="/policy"
          >Term of use. Privacy policy</router-link
        >
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      valid: true,
      email: '',
      emailErrCnt: 0,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      notifyMsg: false
    }
  },
  computed: {
    isValidatedEmail() {
      const validRegEx = /\S+@\S+\.\S+/
      return this.email !== null && validRegEx.test(this.email)
    }
  },
  watch: {
    isValidatedEmail: {
      deep: true,
      handler: function (newVal) {
        this.emailErrCnt++
      }
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.resetPwdRequest()
      }
    },
    async resetPwdRequest() {
      await this.$store
        .dispatch('user/resetPwdReq', {
          email: this.email
        })
        .then((res) => {
          if (res.data.error.type === 200) this.notifyMsg = true
          else this.notifyMsg = false
        })
    },
    isValidatedEmailMethod() {
      const validRegEx = /\S+@\S+\.\S+/
      if (this.email === '' && !validRegEx.test(this.email)) {
        this.emailErrCnt = 1
      }
    }
  }
}
</script>
<style lang="css">
.reset--form {
  font-size: 1.2rem !important;
  color: #413967;
  font-family: 'Sourcesanspro';
}
.send-btn {
  border: 1px solid #6452a2;
  background-image: linear-gradient(to right, #8074c2, #4c486b);
  color: white !important;
  font-family: 'Sourcesanspro';
  text-transform: capitalize;
  font-size: 20px !important;
}
.send-btn:hover {
  background-color: #6452a2 !important;
  color: white !important;
}
.label-field {
  font-size: 1.2rem;
}
.subtitle-2 {
  text-decoration: none;
  color: #414c6c;
  margin-top: 20px;
  font-size: 16px !important;
}
.terms-policy {
  margin-top: 20px;
}
.v-messages__message {
  color: red;
}
.reset-email-input {
  padding-top: unset;
  margin-top: unset;
}
.reset-email-input > div > div > .mdi-alert-circle,
.reset-email-input > div > div > .mdi-alert-circle {
  color: red !important;
}
.reset-email-input > div > div > div > div > .mdi-checkbox-marked-circle,
.reset-email-input > div > div > .mdi-checkbox-marked-circle {
  color: #22bb33 !important;
}
.reset-notification {
  width: 70%;
  color: #6452a2;
  font-size: 1rem;
  font-family: 'Sourcesanspro';
  margin-top: 20px;
}
</style>
