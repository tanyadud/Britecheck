<template>
  <v-card flat>
    <v-form class="signup-form" ref="form" v-model="valid" lazy-validation>
      <div class="row">
        <v-col cols="12" v-if="errMsg" class="signup-errMsg">
          This email address is already in use.
        </v-col>
      </div>
      <v-card-text align="left">
        <v-row>
          <v-col align="left">
            <span style="font-weight: 600" class="label-field">First name</span>
            <v-text-field
              @blur="isValidatedFirstNameMethod"
              v-model="firstName"
              :rules="nameRules"
              placeholder="First Name"
              required
              class="r-field register-input"
              :append-icon="
                isValidatedFirstName ? 'mdi-checkbox-marked-circle' : ''
              "
              :append-outer-icon="
                firstNameErrCnt == 0
                  ? ''
                  : isValidatedFirstName
                  ? ''
                  : 'mdi-alert-circle'
              "
            ></v-text-field>
          </v-col>
          <v-col align="left">
            <span style="font-weight: 600" class="label-field">Last name</span>
            <v-text-field
              @blur="isValidatedLastNameMethod"
              v-model="lastName"
              :rules="nameRules"
              placeholder="Last Name"
              required
              :append-icon="
                isValidatedLastName ? 'mdi-checkbox-marked-circle' : ''
              "
              :append-outer-icon="
                lastNameErrCnt == 0
                  ? ''
                  : isValidatedLastName
                  ? ''
                  : 'mdi-alert-circle'
              "
              class="r-field register-input"
            ></v-text-field>
          </v-col>
        </v-row>
        <span style="font-weight: 600" class="label-field">Email</span>
        <v-text-field
          @blur="isValidatedEmailMethod"
          v-model="email"
          :rules="emailRules"
          placeholder="Email"
          required
          class="r-field register-input"
          :append-icon="isValidatedEmail ? 'mdi-checkbox-marked-circle' : ''"
          :append-outer-icon="
            emailErrCnt == 0 ? '' : isValidatedEmail ? '' : 'mdi-alert-circle'
          "
        ></v-text-field>
        <span style="font-weight: 600" class="label-field">Password</span>
        <v-text-field
          @blur="isValidatedPassMethod"
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          name="password"
          placeholder="Enter a password"
          hint=""
          required
          @click:append="showPassword = !showPassword"
          :append-outer-icon="
            pwdErrCnt == 0
              ? ''
              : isValidatedPass
              ? 'mdi-checkbox-marked-circle'
              : 'mdi-alert-circle'
          "
          class="r-field register-pass"
        ></v-text-field>
        <span style="font-weight: 600" class="label-field"
          >Confirm Password</span
        >
        <v-text-field
          @blur="isValidatedConfirmPassMethod"
          v-model="confirmPassword"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          name="password"
          placeholder="Confirm password"
          hint=""
          required
          @click:append="showPassword = !showPassword"
          :append-outer-icon="
            pwdConfirmErrCnt == 0
              ? ''
              : isValidatedConfirmPass
              ? 'mdi-checkbox-marked-circle'
              : 'mdi-alert-circle'
          "
          class="r-field register-pass"
        ></v-text-field>
        <div class="d-flex align-center">
          <v-checkbox
            v-model="agreement"
            value="1"
            label="I agree with terms and conditions"
            type="checkbox"
            color="#12ba81"
            class="agree-label"
            :rules="[(v) => !!v || 'You must agree before submitting']"
            @click.native="changecolor"
            required
            ><template v-slot:label>
              <div class="white">
                <span
                  class="agree-terms"
                  :style="[
                    color_checkbox ? { color: '#413967' } : { color: '#12ba81' }
                  ]"
                >
                  I agree with terms and conditions
                </span>
              </div>
            </template>
          </v-checkbox>
          <v-spacer></v-spacer>
        </div>
      </v-card-text>
      <v-row>
        <v-col cols="12" md="3"></v-col>
        <v-col cols="12" md="6">
          <v-btn
            :disabled="!valid"
            @click="validate"
            class="signup-submit"
            height="48"
            >Sign Up</v-btn
          >
        </v-col>
        <v-col cols="12" md="3"></v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <span class="already-account">
            Already have an account?
            <a
              class="mx-1"
              small
              depressed
              @click="$router.push({ name: 'Login' })"
              >Sign In</a
            >
          </span>
        </v-col>
      </v-row>
      <v-card-text class="text-center terms-policy">
        <router-link class="subtitle-2" to="/policy"
          >Term of use. Privacy Policy</router-link
        >
      </v-card-text>
    </v-form>
  </v-card>
</template>
<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      agreement: false,
      firstName: '',
      lastName: '',
      userName: '',
      showPassword: false,
      valid: true,
      email: '',
      password: '',
      confirmPassword: '',
      errMsg: false,
      firstNameErrCnt: 0,
      lastNameErrCnt: 0,
      emailErrCnt: 0,
      pwdErrCnt: 0,
      pwdConfirmErrCnt: 0,
      nameRules: [(value) => !!value || 'This field is Required'],
      passwordRules: [
        (value) => !!value || 'This field is Required',
        (v) => v.length >= 6 || 'Min 6 characters',
        (v) => (!!v && v) === this.password || 'Passwords do not match'
      ],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      validPassRegEx: /^.{6,}$/,
      color_checkbox: true
    }
  },
  computed: {
    isValidatedFirstName() {
      const validRegEx = /\S+/
      return this.firstName !== null && validRegEx.test(this.firstName)
    },
    isValidatedLastName() {
      const validRegEx = /\S+/
      return this.lastName !== null && validRegEx.test(this.lastName)
    },
    isValidatedUserName() {
      const validRegEx = /\S+/
      return this.userName !== null && validRegEx.test(this.userName)
    },
    isValidatedEmail() {
      const validRegEx = /\S+@\S+\.\S+/
      return this.email !== null && validRegEx.test(this.email)
    },
    isValidatedPass() {
      return this.password !== null && this.validPassRegEx.test(this.password)
    },
    isValidatedConfirmPass() {
      return (
        this.confirmPassword !== null &&
        this.validPassRegEx.test(this.confirmPassword) &&
        this.confirmPassword === this.password
      )
    }
  },
  watch: {
    isValidatedFirstName: {
      deep: true,
      handler: function (newVal) {
        this.firstNameErrCnt++
      }
    },
    isValidatedLastName: {
      deep: true,
      handler: function (newVal) {
        this.lastNameErrCnt++
      }
    },
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
    },
    isValidatedConfirmPass: {
      deep: true,
      handler: function (newVal) {
        this.pwdConfirmErrCnt++
      }
    }
  },
  methods: {
    changecolor() {
      this.color_checkbox = !this.color_checkbox
    },
    isValidatedFirstNameMethod() {
      const validRegEx = /\S+/
      if (this.firstName === '' && !validRegEx.test(this.firstName)) {
        this.firstNameErrCnt = 1
      }
    },
    isValidatedLastNameMethod() {
      const validRegEx = /\S+/
      if (this.lastName === '' && !validRegEx.test(this.lastName)) {
        this.lastNameErrCnt = 1
      }
    },
    isValidatedEmailMethod() {
      const validRegEx = /\S+@\S+\.\S+/
      if (this.email === '' && !validRegEx.test(this.email)) {
        this.emailErrCnt = 1
      }
    },
    isValidatedPassMethod() {
      const validRegEx = /^.{1,}$/
      if (this.password === '' && !validRegEx.test(this.password)) {
        this.pwdErrCnt = 1
      }
    },
    isValidatedConfirmPassMethod() {
      const validRegEx = /^.{1,}$/
      if (
        this.confirmPassword === '' &&
        !validRegEx.test(this.confirmPassword)
      ) {
        this.pwdConfirmErrCnt = 1
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.register()
      }
    },
    async register() {
      await this.$store
        .dispatch('user/register', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
        })
        .then((res) => {
          if (res.data.error.type === 500) this.errMsg = true
          else this.errMsg = false
        })
    }
  }
}
</script>
<style lang="css">
.signup-form {
  font-size: 1.2rem !important;
  color: #413967;
  font-family: 'Sourcesanspro';
}
.label-field {
  font-size: 1.2rem !important;
}
.signup-submit {
  width: 80%;
  /* background-color: #6452a2 !important; */
  background-image: linear-gradient(to right, #8074c2, #4c486b);
  color: white !important;
  font-weight: bold;
  text-transform: capitalize;
  font-size: 1.2rem !important;
}
.signup-submit:hover {
  background-color: #6452a2 !important;
  color: white !important;
}
.v-textfield {
  margin-top: 0px;
  padding-top: unset;
}
.r-field {
  padding-top: unset;
  margin-top: unset;
}
.register-input > div > div > .mdi-alert-circle,
.register-pass > div > div > .mdi-alert-circle {
  color: red !important;
}
.register-input > div > div > div > div > .mdi-checkbox-marked-circle,
.register-pass > div > div > .mdi-checkbox-marked-circle {
  color: #22bb33 !important;
}
.terms-policy {
  margin-top: 50px;
}
.terms-policy .subtitle-2 {
  color: #414c6c;
  font-size: 16px !important;
  text-decoration: none;
}
.already-account {
  color: #343235 !important;
  font-weight: bold;
  font-size: 1rem;
}
.already-account a {
  text-decoration: underline;
  color: #354d7d;
}
.v-messages__message {
  color: red;
}
.signup-errMsg {
  padding: 0;
  font-size: 18px;
  color: red;
}
.agree-terms {
  font-weight: bold;
  font-size: 1rem;
  font-family: 'Sourcesanspro';
  padding-left: 5px;
}
.agree-label .v-input__slot i {
  font-size: 20px;
  font-family: 'Sourcesanspro';
}
</style>
