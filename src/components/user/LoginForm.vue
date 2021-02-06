<template>
  <v-card flat>
    <v-form class="login--form" ref="form" v-model="valid" lazy-validation>
      <div class="row">
        <v-col cols="12" v-if="errMsg" class="login-errMsg">
          Login failed. Please try again.
        </v-col>
      </div>
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
            class="login-email-input"
          ></v-text-field>
          <v-spacer></v-spacer>
          <span style="font-weight: 600" class="label-field">Password</span>
          <v-text-field
            @blur="isValidatedPassMethod"
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[passwordRules.required]"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            hint=""
            placeholder="Password"
            required
            :append-outer-icon="
              pwdErrCnt == 0
                ? ''
                : isValidatedPass
                ? 'mdi-checkbox-marked-circle'
                : 'mdi-alert-circle'
            "
            @click:append="showPassword = !showPassword"
            class="login-pass-input"
          ></v-text-field>
        </div>
        <div class="remember-forgot">
          <v-checkbox
            v-model="rememberMe"
            value="1"
            label="Remember Me"
            color="#12ba81"
            type="checkbox"
            class="rememeber-label"
            @click.native="changecolor"
          >
            <template v-slot:label>
              <div class="white">
                <span
                  class="rememberMe"
                  :style="[
                    color_checkbox ? { color: '#413967' } : { color: '#12ba81' }
                  ]"
                >
                  Remember me
                </span>
              </div>
            </template>
          </v-checkbox>
          <v-spacer></v-spacer>
          <router-link class="subtitle-2" to="/resetpassword"
            >Forgot password</router-link
          >
        </div>
      </v-card-text>
      <v-row>
        <v-col
          cols="12"
          md="6"
          class="d-flex justify-end flex-row"
          style="display: flex; justify-content: flex-end"
        >
          <v-btn
            :loading="loading"
            :disabled="!valid"
            @click="validate"
            class="login-btn"
            height="48"
            >LogIn</v-btn
          >
        </v-col>
        <v-col
          cols="12"
          md="6"
          class="d-flex justify-start"
          style="display: flex; justify-content: flex-start"
        >
          <v-btn
            depressed
            @click="$router.push({ name: 'Register' })"
            class="signup-btn"
            height="48"
            >Sign Up</v-btn
          >
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-card-text class="text-center terms-policy">
        <router-link class="subtitle-2" to="/policy"
          >Terms of use. Privacy Policy</router-link
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
      rememberMe: false,
      showPassword: false,
      valid: true,
      errMsg: false,
      emailErrCnt: 0,
      pwdErrCnt: 0,
      email: '',
      password: '',
      color_checkbox: true,
      passwordRules: {
        required: (value) => !!value || 'Required',
        min: (v) => v.length >= 6 || 'Min 6 characters'
      },
      nameRules: [(value) => !!value || 'This field is Required'],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    errors() {
      return this.$store.getters.error
    },
    isError() {
      if (this.$store.getters.error) {
        console.log('isError', this.$store.getters)
        return true
      } else {
        return false
      }
    },
    isValidatedEmail() {
      const validRegEx = /\S+@\S+\.\S+/
      return this.email !== null && validRegEx.test(this.email)
    },
    isValidatedPass() {
      const validRegEx = /^.{1,}$/
      return this.password !== null && validRegEx.test(this.password)
    }
  },
  mounted() {
    setInterval(this.removeErrors, 5000)
  },
  watch: {
    isValidatedEmail: {
      deep: true,
      handler: function (newVal) {
        this.emailErrCnt++
      }
    },
    isValidatedPass: {
      deep: true,
      handler: function (newVal) {
        this.pwdErrCnt++
      }
    }
  },

  methods: {
    isValidatedEmailMethod() {
      const validRegEx = /\S+@\S+\.\S+/
      if (this.email === '' && !validRegEx.test(this.email)) {
        this.emailErrCnt++
      }
    },
    isValidatedPassMethod() {
      const validRegEx = /^.{1,}$/
      if (this.password === '' && !validRegEx.test(this.password)) {
        this.pwdErrCnt = 1
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.login()
      }
    },
    changecolor() {
      this.color_checkbox = !this.color_checkbox
    },
    async login() {
      await this.$store
        .dispatch('user/login', {
          email: this.email,
          password: this.password
        })
        .then((res) => {
          if (res.data.error.type === 500) this.errMsg = true
          else this.errMsg = false
        })
    },
    removeErrors() {
      this.$store.dispatch('user/removeErrors')
    }
  }
}
</script>
<style scoped lang="css">
.remember-forgot {
  display: flex;
  justify-content: space-between;
}
.label-field {
  font-size: 1.2rem !important;
}
.login--form {
  font-size: 1.2rem !important;
  color: #413967;
  font-family: 'Sourcesanspro';
}
.subtitle-2 {
  margin-top: 20px;
  text-decoration: none;
  color: #413967;
  font-family: 'Sourcesanspro';
  font-weight: bold;
  font-size: 1.2rem !important;
}

.v-input__slot label {
  font-size: 1.2rem !important;
  color: #413967 !important;
  font-weight: 600;
  font-family: 'Sourcesanspro';
  padding-left: 10px;
}

.login-btn {
  width: 80%;
  background-image: linear-gradient(to right, #8074c2, #4c486b);
  color: white !important;
  font-weight: bold;
  text-transform: capitalize;
  font-size: 1.2rem !important;
}
.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: #584c8e !important;
}
.signup-btn {
  width: 80%;
  border: 2px solid #6452a2;
  background-color: #f5f5f5 !important;
  color: #6452a2 !important;
  font-weight: bold;
  text-transform: capitalize;
  font-size: 1.2rem !important;
}
.login-btn:hover {
  width: 80%;
  border: 2px solid #6452a2;
  background-color: #f5f5f5 !important;
  color: white !important;
  font-weight: bold;
  text-transform: capitalize;
  font-size: 1.2rem !important;
}
.signup-btn:hover {
  background-image: linear-gradient(to right, #8074c2, #4c486b);
  color: white !important;
}
.login-errMsg {
  padding: 0;
  font-size: 18px;
  color: red;
}
.error-alert {
  background-color: orange !important;
  color: white;
}
.error-alert i {
  border: 1px solid white;
}
.login-email-input,
.login-pass-input {
  padding-top: 0;
}
.login--form >>> .login-email-input > div > div > .mdi-alert-circle,
.login--form >>> .login-pass-input > div > div > .mdi-alert-circle {
  color: red !important;
}
.login--form
  >>> .login-email-input
  > div
  > div
  > div
  > div
  > .mdi-checkbox-marked-circle,
.login--form >>> .login-pass-input > div > div > .mdi-checkbox-marked-circle {
  color: #22bb33 !important;
}
.terms-policy {
  margin-top: 50px;
}
.terms-policy .subtitle-2 {
  color: #7180a9;
  font-size: 16px !important;
}
.login--form >>> .v-messages__message {
  color: red;
}
.rememeber-label >>> .v-input__slot i {
  font-size: 20px;
  font-family: 'Sourcesanspro';
}
.rememberMe {
  font-weight: bold;
  font-size: 1.2rem;
  font-family: 'Sourcesanspro';
  padding-left: 5px;
}
</style>
