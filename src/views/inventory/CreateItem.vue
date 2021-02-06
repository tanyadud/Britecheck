<template>
  <v-app id="inspire">
    <div>
      <v-toolbar flat color="#EFEFEF">
        <v-toolbar-title class="font-weight-bold">Add New Item</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <div class="home-content">
        <v-container class="grey lighten-5" style="max-width: 100%">
          <v-form
            class="create-item--form"
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-row no-gutters class="pl-4 pt-4">
              <v-col style="padding-right: 45px">
                <div class="header-content">Default Information</div>
                <div class="mb-4">
                  <img
                    class="image-icon left"
                    src="@/assets/icons/svg/pencil2.svg"
                  />
                  <span class="label-text">Item Name *</span>
                  <div class="input-mb">
                    <v-text-field
                      @blur="isValidatedNameMethod"
                      dense
                      placeholder="Enter Item Name"
                      v-model="itemToSubmit.name"
                      :rules="nameRules"
                      color="#43425d"
                      required
                      class="r-field item-name-field"
                      :append-icon="
                        isValidatedName ? 'mdi-checkbox-marked-circle' : ''
                      "
                      :append-outer-icon="
                        nameErrCnt == 0
                          ? ''
                          : isValidatedName
                          ? ''
                          : 'mdi-alert-circle'
                      "
                    ></v-text-field>
                  </div>
                </div>

                <div class="mb-4 d-flex">
                  <div class="divide-equal" style="margin-right: 5px">
                    <div class="d-flex">
                      <img
                        class="image-icon"
                        src="@/assets/icons/svg/boxes.svg"
                      />

                      <div class="label-text">
                        <div class="label-value">QUANTITY*</div>
                      </div>
                    </div>
                    <div class="input-mb" style="width: 50%">
                      <!-- <IncreaseNumber
                      v-bind:foo="params[0].foo"
                      v-bind:placeholder="params[0].placeholder"
                      v-bind:type="params[0].type"
                      v-model="itemToSubmit.quantity"
                      @update="setQuantity($event)"
                    /> -->
                      <v-text-field
                        @blur="isValidatedQuantifyMethod"
                        dense
                        class="r-field item-name-field"
                        placeholder="0"
                        v-model="itemToSubmit.quantity"
                        single-line
                        color="#43425d"
                        type="number"
                        :rules="nameRules"
                        required
                        :append-icon="
                          isValidatedQuantify
                            ? 'mdi-checkbox-marked-circle'
                            : ''
                        "
                        :append-outer-icon="
                          quantifyErrCnt == 0
                            ? ''
                            : isValidatedQuantify
                            ? ''
                            : 'mdi-alert-circle'
                        "
                      ></v-text-field>
                    </div>
                  </div>

                  <!-- <div class="divide-equal" style="margin-left: 5px">
                  <div class="d-flex">
                    <img class="image-icon" src="@/assets/minlevel.png" />

                    <div class="label-text">
                      <div class="label-value">MIN LEVEL</div>
                    </div>
                  </div>
                  <div class="input-mb">
                    <IncreaseNumber
                      v-bind:foo="params[1].foo"
                      v-bind:placeholder="params[1].placeholder"
                      v-bind:type="params[1].type"
                    />
                  </div>
                </div> -->
                </div>

                <div class="mb-4 d-flex">
                  <div class="divide-equal" style="margin-right: 5px">
                    <div class="d-flex">
                      <img
                        class="image-icon left"
                        src="@/assets/icons/svg/money.svg"
                      />

                      <div class="label-text">
                        <div class="label-value" style="padding-left: 1px">
                          PRICE, ₽
                        </div>
                      </div>
                    </div>
                    <div class="input-mb" id="input-mb">
                      <v-text-field
                        dense
                        placeholder="Enter Price"
                        :hide-details="true"
                        color="#43425d"
                        v-model="itemToSubmit.price"
                        type="number"
                      ></v-text-field>
                    </div>
                  </div>

                  <div class="divide-equal" style="margin-left: 5px">
                    <div class="d-flex">
                      <img
                        class="image-icon"
                        src="@/assets/icons/svg/money.svg"
                      />

                      <div class="label-text">
                        <div class="label-value">VALUE, ₽</div>
                      </div>
                    </div>
                    <div class="input-mb">
                      <v-text-field
                        dense
                        placeholder="0"
                        :hide-details="true"
                      ></v-text-field>
                    </div>
                  </div>
                </div>

                <!-- <div class="mb-2 d-flex">
                <div class="divide-equal">
                  <div class="d-flex">
                    <img class="image-icon" src="@/assets/tags.png" />

                    <div class="label-text">
                      <div class="label-value">TAGS</div>
                    </div>
                  </div>
                  <div class="input-mb">
                    <v-combobox
                      v-model="chips"
                      label="Tags"
                      chips
                      dense
                      multiple
                      outlined
                      clear-icon
                      hide-details
                      single-line
                    >
                      <template v-slot:append>
                        <span></span>
                      </template>
                      <template v-slot:selection="data">
                        <div
                          style="
                            background-color: #00edff52;
                            padding: 5px 8px;
                            border-radius: 5px;
                            color: black;
                          "
                        >
                          <span>{{ data.item }}</span>
                        </div>
                        <div style="margin-right: 10px"></div>
                      </template>
                    </v-combobox>
                  </div>
                </div>
              </div> -->
                <div class="mb-2">
                  <img
                    class="image-icon left"
                    src="@/assets/icons/svg/pencil2.svg"
                  />
                  <span class="label-text">NOTES</span>
                  <div class="input-mb">
                    <v-textarea
                      name="input-7-4"
                      label="Enter Notes"
                      hide-details="true"
                      single-line
                      color="#43425d"
                      rows="3"
                      v-model="itemToSubmit.notes"
                    ></v-textarea>
                  </div>
                </div>
                <div class="mb-2">
                  <img
                    class="image-icon left"
                    src="@/assets/icons/svg/folder.svg"
                  />
                  <span class="label-text">FOLDER</span>
                  <div class="input-mb">
                    <v-select
                      :items="categories"
                      item-text="name"
                      item-value="id"
                      label="Folders"
                      single-line
                      dense
                      color="#43425d"
                      return-object
                      v-model="itemToSubmit.folder"
                    ></v-select>
                  </div>
                </div>

                <div class="text-left pt-10">
                  <v-btn
                    @click="validate"
                    depressed
                    medium
                    color="#007BEC"
                    dark
                    :disabled="!valid"
                    class="save-item-btn"
                  >
                    Save Item
                  </v-btn>
                  <v-btn
                    @click.stop="confirmDialog = true"
                    depressed
                    medium
                    dark
                    class="cancel-btn"
                  >
                    <span style="color: black">Cancel</span>
                  </v-btn>
                </div>
              </v-col>
              <v-col style="padding-left: 45px">
                <div class="header-content1">Photos</div>
                <div class="d-flex">
                  <div>
                    <div class="d-flex">
                      <img
                        class="image-icon left"
                        src="@/assets/icons/svg/image.svg"
                      />

                      <div class="label-text">
                        <div class="label-value" style="width: 200px">
                          ADD PHOTOS ITEM
                        </div>
                      </div>
                    </div>
                    <div class="input-mb">
                      <div
                        id="my-strictly-unique-vue-upload-multiple-image"
                        style="
                          display: flex;
                          justify-content: left;
                          align-item: start;
                        "
                      >
                        <vue-upload-multiple-image
                          @upload-success="uploadImageSuccess"
                          @before-remove="beforeRemove"
                          @edit-image="editImage"
                          @data-change="dataChange"
                          :data-images="itemToSubmit.images"
                          v-model="itemToSubmit.images"
                        ></vue-upload-multiple-image>
                      </div>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </div>
    </div>
    <v-dialog v-model="confirmDialog" persistent max-width="480">
      <v-card>
        <v-card-title
          class="headline d-flex justify-center modalTitle grey--text lighten-1--text"
          >Unsaved Changes</v-card-title
        >
        <v-card-text
          >Are you sure you want to leave this page without saving your
          changes</v-card-text
        >
        <v-card-actions class="text-xs-center justify-center">
          <v-btn
            color="#f55975"
            depressed
            rounded
            small
            dark
            style="margin-right: 8px; width: 100px; text-transform: none"
            @click="confirmDialog = false"
            >Confirm</v-btn
          >
          <v-btn
            depressed
            rounded
            small
            color="#EFEFEF"
            dark
            style="
              padding: 0 18.4444444444px;
              width: 100px;
              border: 1px solid rgb(245 78 78) !important;
              text-transform: none;
            "
            ><span style="color: black">Cancel</span></v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import IncreaseNumber from '@/components/inventory/IncreaseNumber'
import VueUploadMultipleImage from '@/components/upload-image/VueUploadMultipleImage'
// import axios from 'axios'
export default {
  name: 'Home',
  components: {
    // IncreaseNumber,
    VueUploadMultipleImage
  },
  data() {
    return {
      valid: true,
      nameErrCnt: 0,
      quantifyErrCnt: 0,
      params: [
        {
          foo: 0,
          placeholder: '',
          type: 0
        },
        {
          foo: '',
          placeholder: 'Enter Min Level',
          type: 1
        }
      ],
      itemToSubmit: {
        name: '',
        quantity: '',
        price: '',
        notes: '',
        images: [],
        folder: ''
      },
      chips: [],
      select: ['add-tags-with', 'enter', 'tab', 'paste'],
      folders: [],
      confirmDialog: false,
      nameRules: [(value) => !!value || 'Please Enter Name'],
      imageFormData: ''
    }
  },
  computed: {
    ...mapGetters('inventory', ['categories']),
    isValidatedName() {
      const validRegEx = /\S+/
      return (
        this.itemToSubmit.name !== null &&
        validRegEx.test(this.itemToSubmit.name)
      )
    },
    isValidatedQuantify() {
      const validRegEx = /\S+/
      return (
        this.itemToSubmit.quantity !== null &&
        validRegEx.test(this.itemToSubmit.quantity)
      )
    }
  },
  watch: {
    isValidatedName: {
      deep: true,
      handler: function (newVal) {
        this.nameErrCnt++
      }
    },
    isValidatedQuantify: {
      deep: true,
      handler: function (newVal) {
        this.quantifyErrCnt++
      }
    }
  },
  mounted() {},
  async created() {
    await this.getCategories()
    // console.log('categories', this.categories)
    // this.categories.map((category, index) => {
    //   this.folders.push(category.name)
    // })
  },
  methods: {
    ...mapActions('inventory', ['createItem', 'getCategories', 'uploadImage']),
    uploadImageSuccess(formData, index, fileList) {
      console.log('dd', formData)
      this.imageFormData = formData
    },
    beforeRemove(index, done, fileList) {
      done()
      // var r = confirm('remove image')
      // if (r === true) {
      //   done()
      // } else {
      // }
    },
    async validate() {
      if (this.$refs.form.validate()) {
        if (this.imageFormData !== '') {
          await this.uploadImage(this.imageFormData).then((res) => {
            console.log('res', res)
            this.itemToSubmit.images = res
          })
          // this.createFolder(this.folderToSubmit)
        } else {
          // this.createFolder(this.folderToSubmit)
        }
      } else {
        this.nameErrCnt = 1
        this.quantifyErrCnt = 1
      }
    },
    editImage(formData, index, fileList) {},
    dataChange(data) {},
    createItemSubmit() {
      console.log('dd', this.itemToSubmit)
      this.createItem(this.itemToSubmit)
    },
    setQuantity(event) {
      console.log('dd', event)
      this.itemToSubmit.quantity = event
    },
    isValidatedNameMethod() {
      const validRegEx = /\S+/
      if (
        this.itemToSubmit.name === '' &&
        !validRegEx.test(this.itemToSubmit.name)
      ) {
        this.nameErrCnt = 1
      }
    },
    isValidatedQuantifyMethod() {
      const validRegEx = /\S+/
      if (
        this.itemToSubmit.quantity === '' &&
        !validRegEx.test(this.itemToSubmit.quantity)
      ) {
        this.quantifyErrCnt = 1
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$header-form-color: #efefef;
::v-deep .container {
  width: 100%;
  padding: 0 !important;
  margin-right: auto;
  /* margin-left: auto; */
}
#inspire {
  font-family: 'Sourcesanspro';
  .save-item-btn {
    width: 120px;
    background-image: linear-gradient(to right, #8074c2, #4c486b);
    color: white !important;
    text-transform: capitalize;
    font-size: 1rem !important;
  }
  .cancel-btn {
    width: 120px;
    margin-left: 15px;
    border: 1px solid #6452a2;
    background-color: #f5f5f5 !important;
    color: #6452a2 !important;
    text-transform: capitalize;
    font-size: 1rem !important;
  }
  .save-item-btn:hover {
    background-color: #f5f5f5 !important;
    color: white !important;
  }
  .cancel-btn:hover {
    color: white !important;
    background-image: linear-gradient(to right, #8074c2, #4c486b);
    -webkit-text-fill-color: white;
  }

  .home-content {
    padding: 0px;
    .header-content {
      color: #73727e;
      font-weight: 600;
      margin-bottom: 16px;
      font-size: 20px;
    }
    .header-content1 {
      color: #798393;
      font-weight: 600;
      margin-bottom: 11px;
      font-size: 20px;
    }
    .label-text {
      color: #43425d;
      text-transform: uppercase;
      position: relative;
      font-size: 18px;
      font-weight: 600;
      .label-value {
        position: absolute;
        bottom: 0;
        width: 100px;
      }
    }
    .input-mb {
      margin-top: 4px;
    }

    .border-textfield {
      padding: 4px 8px;
      border: 1px solid #9ea3ac87;
      width: 100%;
      padding-left: 8px;
      outline: none;
      caret-color: #9ea3ac87;
      color: #798393;

      &::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: rgb(192, 189, 189);
        opacity: 1; /* Firefox */
        font-size: 0.35rem;
      }

      &:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: rgb(192, 189, 189);
        font-size: 0.35rem;
      }

      &::-ms-input-placeholder {
        /* Microsoft Edge */
        color: rgb(192, 189, 189);
        font-size: 0.35rem;
      }
    }

    .mb-2 {
      // margin-top: 20px;
    }
    .image-icon {
      width: 18px;
      margin-right: 10px;
      fill: #43425d !important;
    }
    .divide-equal {
      flex-basis: 0;
      flex-grow: 1;
    }

    .modalTitle {
      color: #e0e0e0;
    }
    .r-field {
      padding-top: unset;
      margin-top: unset;
    }

    ::v-deep .item-name-field .mdi-checkbox-marked-circle {
      color: #22bb33 !important;
    }
    .item-name-field > div > div > .mdi-alert-circle {
      color: red !important;
    }
    // .item-name-field > div > div > div > div > .mdi-checkbox-marked-circle {
    //   color: #22bb33 !important;
    // }

    #my-strictly-unique-vue-upload-multiple-image {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      margin-top: 3px;

      .image-container {
        width: 300px;
        height: 300px;
        border: 1px solid #d6d6d6;
        border-radius: 4px;
        background-color: #fff;
      }

      h1,
      h2 {
        font-weight: normal;
      }

      ul {
        list-style-type: none;
        padding: 0;
      }

      li {
        display: inline-block;
        margin: 0 10px;
      }

      a {
        color: #42b983;
      }
    }
  }
  ::v-deep .v-messages__message {
    color: red;
    font-style: italic;
    font-size: 15px;
    text-align: right;
  }

  .v-text-field--outlined {
    border-color: rgba(192, 0, 250, 0.986);
  }
}
</style>
