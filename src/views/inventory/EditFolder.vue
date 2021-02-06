<template>
  <v-app id="inspire">
    <div>
      <v-toolbar flat color="#EFEFEF">
        <v-toolbar-title class="font-weight-bold">Edit Folder</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <div class="home-content">
        <v-container class="grey lighten-5" style="max-width: 100%">
          <v-form class="create-folder--form" ref="form" v-model="valid" lazy-validation>
            <v-row no-gutters class="pl-4 pt-4">
              <v-col style="padding-right: 45px">
                <div class="header-content">Folder Information</div>
                <div class="mb-4">
                  <img class="image-icon left" src="@/assets/icons/svg/pencil2.svg" />
                  <span class="label-text">Folder Name *</span>
                  <div class="input-mb">
                    <v-text-field
                      @blur="isValidatedNameMethod"
                      dense
                      placeholder="Enter Folder Name"
                      v-model="folderToSubmit.name"
                      class="r-field folder-name-field"
                      :rules="nameRules"
                      required
                      color="#43425d"
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
                <div class="mb-4">
                  <img class="image-icon" src="@/assets/icons/svg/pencil2.svg" />
                  <span class="label-text">NOTES</span>
                  <div class="input-mb">
                    <v-textarea
                      name="input-7-4"
                      label="Enter Notes..."
                      hide-details="true"
                      color="#43425d"
                      single-line
                      rows="3"
                      v-model="folderToSubmit.notes"
                    ></v-textarea>
                  </div>
                </div>
                <div class="mb-4">
                  <img class="image-icon left" src="@/assets/icons/svg/folder.svg" />
                  <span class="label-text">FOLDER</span>
                  <div class="input-mb">
                    <v-select
                      :items="categories"
                      item-text="name"
                      item-value="id"
                      label="Folders"
                      single-line
                      color="#43425d"
                      dense
                      return-object
                      v-model="folderToSubmit.folder"
                    ></v-select>
                  </div>
                </div>

                <div class="text-left pt-10">
                  <v-btn
                    @click="validate"
                    depressed
                    medium
                    :disabled="!valid"
                    dark
                    class="edit-folder-btn"
                  >Edit Folder</v-btn>
                  <v-btn @click.stop="confirmDialog = true" depressed medium class="cancel-btn">
                    <span style="color: black">Cancel</span>
                  </v-btn>
                </div>
              </v-col>
              <v-col style="padding-left: 45px">
                <div class="header-content1">Photos</div>
                <div class="d-flex">
                  <div>
                    <div class="d-flex">
                      <img class="image-icon left" src="@/assets/icons/svg/image.svg" />

                      <div class="label-text">
                        <div class="label-value" style="width: 200px">ADD PHOTOS Folder</div>
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
                          :data-images="folderToSubmit.images"
                          idUpload="myIdUpload"
                          editUpload="myIdEdit"
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
        >Unsaved Changes</v-card-title>
        <v-card-text>
          Are you sure you want to leave this page without saving your
          changes
        </v-card-text>
        <v-card-actions class="text-xs-center justify-center">
          <v-btn
            color="#f55975"
            depressed
            small
            dark
            style="margin-right: 8px; width: 100px; text-transform: none"
            @click="conformCancel"
          >Confirm</v-btn>
          <v-btn
            depressed
            small
            color="white"
            @click="confirmDialog = false"
            style="
              padding: 0 18.4444444444px;
              width: 100px;
              border: 1px solid rgb(245 78 78) !important;
              text-transform: none;
            "
          >
            <span style="color: rgb(245 78 78)">Cancel</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import VueUploadMultipleImage from 'vue-upload-multiple-image'
import VueUploadMultipleImage from '@/components/upload-image/VueUploadMultipleImage'
// import axios from 'axios'
export default {
  name: 'Home',
  components: {
    VueUploadMultipleImage
  },
  data() {
    return {
      valid: true,
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
      folderToSubmit: {
        name: '',
        notes: '',
        images: [],
        folder: ''
      },
      chips: [],
      select: ['add-tags-with', 'enter', 'tab', 'paste'],
      folders: [],
      confirmDialog: false,
      nameErrCnt: 0,
      nameRules: [(value) => !!value || 'Please Enter Name'],
      categoryId: 1,
      curUserInventoryId: '',
      imageFormData: ''
    }
  },
  computed: {
    ...mapGetters('inventory', ['categories', 'categoryById']),
    isValidatedName() {
      const validRegEx = /\S+/
      return (
        this.folderToSubmit.name !== null &&
        validRegEx.test(this.folderToSubmit.name)
      )
    }
  },
  watch: {
    isValidatedName: {
      deep: true,
      handler: function (newVal) {
        this.nameErrCnt++
      }
    }
  },
  mounted() {},
  async created() {
    await this.getCategories().then((res) => {
      console.log('getcatego', res)
      this.categoryId = res.length
      const inventoryById = res[this.categoryId - 1]
      this.folderToSubmit.name = inventoryById.name
      this.folderToSubmit.notes = inventoryById.description
      // const formData = new FormData()
      // formData.append('file', inventoryById.image)
      this.folderToSubmit.images.push({ path: `https://sandbox2.britecheck.com/images/${inventoryById.image}` })
      if (inventoryById.parentId !== null) {
        this.folderToSubmit.folder.id = inventoryById.parentId
      }
      this.curUserInventoryId = inventoryById.inventoryId
    })
  },
  methods: {
    ...mapActions('inventory', ['editFolder', 'getCategories', 'uploadImage']),
    uploadImageSuccess(formData, index, fileList) {
      console.log('dd', formData, fileList)
      this.imageFormData = formData
      console.log('ee', this.folderToSubmit.images)
      this.folderToSubmit.images[0] = fileList
    },
    beforeRemove(index, done, fileList) {
      done()
      // var r = confirm('remove image')
      // if (r === true) {
      //   done()
      // } else {
      // }
    },
    editImage(formData, index, fileList) {
      console.log(formData, index, fileList)
    },
    myIdEdit(id) {
      console.log(id)
    },
    dataChange(data) {},
    async validate() {
      console.log('dd', this.folderToSubmit)
      if (this.$refs.form.validate()) {
        if (this.imageFormData !== '') {
          await this.uploadImage(this.imageFormData).then((res) => {
            console.log('res', res)
            this.folderToSubmit.images[0] = res
          })
        } else {
        }
        var payload = {}
        if (this.folderToSubmit.images[0]) {
          payload = {
            id: this.categoryId,
            inventoryId: this.curUserInventoryId,
            name: this.folderToSubmit.name,
            parentId: this.folderToSubmit.folder.id,
            image: this.folderToSubmit.images[0]
              ? this.folderToSubmit.images[0]
              : '',
            description: this.folderToSubmit.notes
          }
        } else {
          payload = {
            id: this.categoryId,
            inventoryId: this.curUserInventoryId,
            name: this.folderToSubmit.name,
            parentId: this.folderToSubmit.folder.id,
            description: this.folderToSubmit.notes
          }
        }
        console.log('updatePayload', payload)
        this.editFolder(payload)
      }
    },
    setQuantity(event) {
      console.log('dd', event)
      this.folderToSubmit.quantity = event
    },
    conformCancel() {
      this.confirmDialog = false
      this.$router.push('/inventory')
    },
    isValidatedNameMethod() {
      const validRegEx = /\S+/
      if (
        this.folderToSubmit.name === '' &&
        !validRegEx.test(this.folderToSubmit.name)
      ) {
        this.nameErrCnt = 1
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$header-form-color: #efefef;
// .container {
//   width: 100%;
//   padding: 0 !important;
//   margin-right: auto;
//   /* margin-left: auto; */
// }
#inspire {
  font-family: 'Sourcesanspro';
  .edit-folder-btn {
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
  .edit-folder-btn:hover {
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

    ::v-deep .folder-name-field .mdi-checkbox-marked-circle {
      color: #22bb33 !important;
    }
    .folder-name-field > div > div > .mdi-alert-circle {
      color: red !important;
    }
    // .folder-name-field > div > div > div > div > .mdi-checkbox-marked-circle {
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
    #my-strictly-unique-vue-upload-multiple-image
      > div
      >>> .image-list-container {
      visibility: hidden !important;
    }
  }
  ::v-deep .v-messages__message {
    color: red;
    font-style: italic;
    font-size: 15px;
    text-align: right;
  }
  ::v-deep .image-list-container {
    display: none;
  }
}
</style>
