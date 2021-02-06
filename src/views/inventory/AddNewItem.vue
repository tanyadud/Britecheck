<template>
  <div id="inspire">
    <div>
      <v-toolbar flat color="#EFEFEF">
        <v-toolbar-title class="font-weight-bold">Add New Item</v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="text-center">
          <v-btn
            depressed
            rounded
            small
            color="#007BEC"
            dark
            style="margin-right: 8px; text-transform: none"
            router
            :to="'/about'"
          >
            Save Item
          </v-btn>
          <v-btn
            depressed
            rounded
            small
            color="#EFEFEF"
            dark
            style="
              padding: 0 18.4444444444px;
              border: 1px solid #bdbbbb !important;
              text-transform: none;
            "
          >
            <span style="color: black">Cancel</span>
          </v-btn>
        </div>
      </v-toolbar>
      <div class="home-content">
        <v-container class="grey lighten-5" style="max-width: 100%">
          <v-row no-gutters style="height: 150px">
            <v-col style="padding-right: 45px">
              <div class="header-content">Default Information</div>
              <div>
                <v-icon left> mdi-pencil-minus-outline </v-icon>
                <span class="label-text">Item Name *</span>
                <div class="input-mb">
                  <v-text-field
                    height="35px"
                    outlined
                    dense
                    placeholder="Enter Item Name"
                    :hide-details="true"
                  ></v-text-field>
                </div>
              </div>

              <div class="mb-2 d-flex">
                <div class="divide-equal" style="margin-right: 5px">
                  <div class="d-flex">
                    <img
                      class="image-icon"
                      src="@/assets/addnewitems/quantity.png"
                    />

                    <div class="label-text">
                      <div class="label-value">QUANTITY*</div>
                    </div>
                  </div>
                  <div class="input-mb">
                    <IncreaseNumber
                      v-bind:foo="params[0].foo"
                      v-bind:placeholder="params[0].placeholder"
                      v-bind:type="params[0].type"
                    />
                  </div>
                </div>

                <div class="divide-equal" style="margin-left: 5px">
                  <div class="d-flex">
                    <img
                      class="image-icon1"
                      src="@/assets/addnewitems/minlevel.png"
                    />

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
                </div>
              </div>

              <div class="mb-2 d-flex">
                <div class="divide-equal" style="margin-right: 5px">
                  <div class="d-flex">
                    <img
                      class="image-icon"
                      src="@/assets/addnewitems/price.png"
                    />

                    <div class="label-text">
                      <div class="label-value" style="padding-left: 1px">
                        PRICE, ₽
                      </div>
                    </div>
                  </div>
                  <div class="input-mb" id="input-mb">
                    <v-text-field
                      outlined
                      dense
                      placeholder="Enter Price"
                      :hide-details="true"
                    ></v-text-field>
                  </div>
                </div>

                <div class="divide-equal" style="margin-left: 5px">
                  <div class="d-flex">
                    <img
                      class="image-icon"
                      src="@/assets/addnewitems/price.png"
                    />

                    <div class="label-text">
                      <div class="label-value">VALUE, ₽</div>
                    </div>
                  </div>
                  <div class="input-mb">
                    <v-text-field
                      outlined
                      dense
                      placeholder="0"
                      :hide-details="true"
                    ></v-text-field>
                  </div>
                </div>
              </div>

              <div class="mb-2 d-flex">
                <div class="divide-equal">
                  <div class="d-flex">
                    <img
                      class="image-icon"
                      src="@/assets/addnewitems/tags.png"
                    />

                    <div class="label-text">
                      <div class="label-value">TAGS</div>
                    </div>
                  </div>
                  <div class="input-mb label-tags">
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
                      height="32"
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
              </div>
              <div class="mb-2">
                <v-icon left> mdi-pencil-minus-outline </v-icon>
                <span class="label-text">NOTES</span>
                <div class="input-mb">
                  <v-textarea
                    outlined
                    name="input-7-4"
                    label="Enter Notes"
                    hide-details="true"
                    single-line
                  ></v-textarea>
                </div>
              </div>
              <div class="mb-2">
                <v-icon left> mdi-folder-open-outline </v-icon>
                <span class="label-text">FOLDER</span>
                <div class="input-mb">
                  <v-select
                    :items="folders"
                    label="Folders"
                    outlined
                    single-line
                    dense
                  ></v-select>
                </div>
              </div>

              <div class="text-left" style="margin-bottom: 20px">
                <v-btn
                  depressed
                  rounded
                  small
                  color="#007BEC"
                  dark
                  style="margin-right: 8px; text-transform: none"
                  router
                  :to="'/about'"
                >
                  Save Item
                </v-btn>
                <v-btn
                  depressed
                  rounded
                  small
                  color="#EFEFEF"
                  dark
                  style="
                    padding: 0 18.4444444444px;
                    border: 1px solid #bdbbbb !important;
                    text-transform: none;
                  "
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
                      class="image-icon"
                      src="@/assets/addnewitems/photo.png"
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
                      <vue-image-picker
                        @upload-success="uploadImageSuccess"
                        @before-remove="beforeRemove"
                        @edit-image="editImage"
                        @data-change="dataChange"
                        :data-images="images"
                      >
                      </vue-image-picker>
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import IncreaseNumber from '@/components/add-new-items/IncreaseNumber'
import VueImagePicker from '@/components/add-new-items/VueImagePicker'
import EventBus from '@/plugins/EventBus'

export default {
  name: 'AddNewItem',
  components: {
    IncreaseNumber,
    VueImagePicker
  },
  data: () => ({
    images: [],
    folders: ['IT Inventory', 'Folder1', 'Folder2', 'Folder3'],
    chips: [],
    select: ['add-tags-with', 'enter', 'tab', 'paste'],
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
    ]
  }),
  methods: {
    uploadImageSuccess(formData, index, fileList) {
      // console.log("data", formData, index, fileList);
      // Upload image api
      // axios.post('http://your-url-upload', { data: formData }).then(response => {
      //   console.log(response)
      // })
    },
    beforeRemove(index, done, fileList) {
      //   console.log("index", index, fileList);
      var r = confirm('remove image')
      if (r === true) {
        done()
      } else {
      }
    },
    editImage(formData, index, fileList) {
      // console.log("edit data", formData, index, fileList);
    },
    dataChange(data) {
      // console.log(data);
    }
  },
  mounted() {
    EventBus.$emit('breadCrumbEvents', false)
    EventBus.$emit('paddingInventoryEvents', false)
  },
  beforeDestroy() {
    EventBus.$emit('breadCrumbEvents', true)
    EventBus.$emit('paddingInventoryEvents', true)
  }
}
</script>
<style>
.v-text-field .v-input__control .v-input__slot {
  min-height: auto !important;
  display: flex !important;
  align-items: center !important;
}
.v-text-field--outlined.v-input--dense .v-label {
  top: 7px;
}
.label-tags .v-text-field--outlined.v-input--dense .v-label {
  top: 10px;
}
.v-text-field--enclosed.v-input--dense:not(.v-text-field--solo).v-text-field--outlined
  .v-input__append-inner {
  margin-top: 5px;
}
</style>
<style lang="scss" scoped>
$header-form-color: #efefef;

#inspire {
  .save-button {
    background-color: #efefef;
    color: white;
  }
  .cancel-button {
    background-color: white;
    color: black;
  }
  .home-content {
    padding: 0px 4px;
    .header-content {
      color: #798393;
      font-weight: 600;
      margin-bottom: 16px;
    }
    .header-content1 {
      color: #798393;
      font-weight: 600;
      margin-bottom: 11px;
    }
    .label-text {
      color: #798393;
      text-transform: uppercase;
      position: relative;
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
      margin-top: 16px;
    }
    .image-icon {
      width: 24px;
      height: 24px;
      margin-right: 9px;
    }
    .image-icon1 {
      width: 24px;
      height: 24px;
      margin-right: 9px;
    }
    .divide-equal {
      flex-basis: 0;
      flex-grow: 1;
    }

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
}
</style>
