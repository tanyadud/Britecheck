<template>
  <div
    style="outline: none"
    @drag="preventEvent"
    @dragstart="preventEvent"
    @dragend="preventEvent"
    @dragover="preventEvent"
    @dragenter="preventEvent"
    @dragleave="preventEvent"
    @drop="preventEvent"
  >
    <div
      class="image-container position-relative text-center"
      v-if="!images.length"
    >
      <div
        class="drag-upload-cover position-absolute"
        v-if="isDragover"
        @drop="onDrop"
      >
        <div class="centered full-width text-center text-primary">
          <svg
            class="icon-drag-drop"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              d="M444.5 15C407.7 15 378 44.8 378 81.5s29.8 66.5 66.5 66.5S511 118.2 511 81.5 481.2 15 444.5 15zm29.4 72.4h-23.5l.1 25.9c0 3.2-2.6 5.8-5.8 5.9-3.2 0-5.8-2.6-5.8-5.8l-.1-26h-23.6c-3.2 0-5.8-2.6-5.8-5.8s2.6-5.8 5.8-5.8h23.5l-.1-25.9c0-3.2 2.6-5.8 5.8-5.9 3.2 0 5.8 2.6 5.8 5.8l.1 26h23.6c3.3 0 5.8 2.6 5.8 5.8s-2.6 5.8-5.8 5.8zM199.3 191.3c21.5 0 38.9 17.6 38.9 39.3s-17.4 39.3-38.9 39.3-38.9-17.6-38.9-39.3c0-21.7 17.5-39.3 38.9-39.3zm185.4 201.3H86.3c-6.5 0-11.9-5.3-11.9-11.9v-32.4c0-2.5.7-4.8 2.1-6.9l41.3-58.4c3.7-5.2 10.8-6.5 16.1-3.1l56.4 36.8c4.5 3 10.3 2.5 14.4-1L313 220.1c5.1-4.5 13.1-3.8 17.2 1.7l61.5 79.7c1.6 2 2.5 4.6 2.5 7.2v74.4c0 5.2-4.3 9.5-9.5 9.5zm7.9 117.6h-58.8v-12h58.8v12zm-78.4 0h-58.8v-12h58.8v12zm-78.5 0h-58.8v-12h58.8v12zm-78.4 0H98.4v-12h58.8v12h.1zm-78.5 0H57.7c-14.3 0-27.9-5.4-38.3-15.3l8.3-8.7c8.2 7.8 18.8 12 30.1 12h21.1l-.1 12zm333.6-.1l-.3-12c17.8-.4 33.4-11.5 39.8-28.2l11.2 4.3c-8.1 21.3-28 35.4-50.7 35.9zM6.8 477c-3.2-7.1-4.7-14.7-4.7-22.5v-38.2h12v38.2c0 6.1 1.3 12.1 3.7 17.6l-11 4.9zm459.9-24.1h-12v-58.8h12v58.8zM14.1 396.7h-12v-58.8h12v58.8zm452.6-22.3h-12v-58.8h12v58.8zM14.1 318.3h-12v-58.8h12v58.8zM466.7 296h-12v-58.8h12V296zM14.1 239.8h-12V181h12v58.8zm452.6-22.2h-12v-58.8h12v58.8zM14.1 161.4h-12v-58.8h12v58.8zm2.4-76.1L5.3 81.2C13 59.9 33.4 45.5 56.1 45.5h.2v12h-.2c-17.7 0-33.6 11.2-39.6 27.8zm353.6-27.8h-58.8v-12h58.8v12zm-78.5 0h-58.8v-12h58.8v12zm-78.4 0h-58.8v-12h58.8v12zm-78.5 0H75.9v-12h58.8v12z"
            ></path>
          </svg>
          <h4 class="drop-text-here">
            <b>{{ dropText }}</b>
          </h4>
        </div>
      </div>
      <div
        v-else
        class="image-center position-absolute display-flex flex-column justify-content-center align-items-center"
        @dragover.prevent="onDragover"
      >
        <div>
          <img
            class="image-icon-drag"
            src="@/assets/addnewitems/bigphotos.png"
          />
        </div>
        <div class="text-center">
          <a class="browse-text">{{ browseText }}</a>
          <br />
          <label class="drag-text">{{ dragText }}</label>
        </div>
        <div class="image-input position-absolute full-width full-height">
          <label :for="idUpload" class="full-width full-height cursor-pointer">
          </label>
        </div>
      </div>
    </div>

    <div
      class="image-container position-relative text-center image-list"
      v-else
    >
      <div
        class="drag-upload-cover position-absolute"
        v-if="isDragover"
        @drop="onDrop"
      >
        <div class="centered full-width text-center text-primary">
          <svg
            class="icon-drag-drop"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              d="M444.5 15C407.7 15 378 44.8 378 81.5s29.8 66.5 66.5 66.5S511 118.2 511 81.5 481.2 15 444.5 15zm29.4 72.4h-23.5l.1 25.9c0 3.2-2.6 5.8-5.8 5.9-3.2 0-5.8-2.6-5.8-5.8l-.1-26h-23.6c-3.2 0-5.8-2.6-5.8-5.8s2.6-5.8 5.8-5.8h23.5l-.1-25.9c0-3.2 2.6-5.8 5.8-5.9 3.2 0 5.8 2.6 5.8 5.8l.1 26h23.6c3.3 0 5.8 2.6 5.8 5.8s-2.6 5.8-5.8 5.8zM199.3 191.3c21.5 0 38.9 17.6 38.9 39.3s-17.4 39.3-38.9 39.3-38.9-17.6-38.9-39.3c0-21.7 17.5-39.3 38.9-39.3zm185.4 201.3H86.3c-6.5 0-11.9-5.3-11.9-11.9v-32.4c0-2.5.7-4.8 2.1-6.9l41.3-58.4c3.7-5.2 10.8-6.5 16.1-3.1l56.4 36.8c4.5 3 10.3 2.5 14.4-1L313 220.1c5.1-4.5 13.1-3.8 17.2 1.7l61.5 79.7c1.6 2 2.5 4.6 2.5 7.2v74.4c0 5.2-4.3 9.5-9.5 9.5zm7.9 117.6h-58.8v-12h58.8v12zm-78.4 0h-58.8v-12h58.8v12zm-78.5 0h-58.8v-12h58.8v12zm-78.4 0H98.4v-12h58.8v12h.1zm-78.5 0H57.7c-14.3 0-27.9-5.4-38.3-15.3l8.3-8.7c8.2 7.8 18.8 12 30.1 12h21.1l-.1 12zm333.6-.1l-.3-12c17.8-.4 33.4-11.5 39.8-28.2l11.2 4.3c-8.1 21.3-28 35.4-50.7 35.9zM6.8 477c-3.2-7.1-4.7-14.7-4.7-22.5v-38.2h12v38.2c0 6.1 1.3 12.1 3.7 17.6l-11 4.9zm459.9-24.1h-12v-58.8h12v58.8zM14.1 396.7h-12v-58.8h12v58.8zm452.6-22.3h-12v-58.8h12v58.8zM14.1 318.3h-12v-58.8h12v58.8zM466.7 296h-12v-58.8h12V296zM14.1 239.8h-12V181h12v58.8zm452.6-22.2h-12v-58.8h12v58.8zM14.1 161.4h-12v-58.8h12v58.8zm2.4-76.1L5.3 81.2C13 59.9 33.4 45.5 56.1 45.5h.2v12h-.2c-17.7 0-33.6 11.2-39.6 27.8zm353.6-27.8h-58.8v-12h58.8v12zm-78.5 0h-58.8v-12h58.8v12zm-78.4 0h-58.8v-12h58.8v12zm-78.5 0H75.9v-12h58.8v12z"
            ></path>
          </svg>
          <h4 class="drop-text-here">
            <b>{{ dropText }}</b>
          </h4>
        </div>
      </div>
      <div v-else @dragover.prevent="onDragover">
        <div
          class="preview-image full-width position-relative cursor-pointer"
          @click="openGallery(currentIndexImage)"
        >
          <div
            class="image-overlay position-relative full-width full-height"
          ></div>
          <div class="image-overlay-details full-width">
            <svg
              class="icon-overlay"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                d="M283.9 186.4h-64.6l-.4-71.1c-.1-8.8-7.2-15.9-16-15.9h-.1c-8.8.1-16 7.3-15.9 16.1l.4 70.9h-64.4c-8.8 0-16 7.2-16 16s7.2 16 16 16h64.6l.4 71.1c.1 8.8 7.2 15.9 16 15.9h.1c8.8-.1 16-7.3 15.9-16.1l-.4-70.9h64.4c8.8 0 16-7.2 16-16s-7.1-16-16-16z"
              ></path>
              <path
                d="M511.3 465.3L371.2 325.2c-1-1-2.6-1-3.6 0l-11.5 11.5c31.6-35.9 50.8-82.9 50.8-134.3C406.9 90.3 315.6-1 203.4-1 91.3-1 0 90.3 0 202.4s91.3 203.4 203.4 203.4c51.4 0 98.5-19.2 134.3-50.8l-11.5 11.5c-1 1-1 2.6 0 3.6l140.1 140.1c1 1 2.6 1 3.6 0l41.4-41.4c.9-.9.9-2.5 0-3.5zm-307.9-92.5C109.5 372.8 33 296.4 33 202.4S109.5 32.1 203.4 32.1s170.4 76.4 170.4 170.4-76.4 170.3-170.4 170.3z"
              ></path>
            </svg>
          </div>
          <div class="show-image centered">
            <img class="show-img img-responsive" :src="imagePreview" />
          </div>
        </div>
        <!-- <div
          class="image-bottom display-flex position-absolute full-width align-items-center justify-content-between"
          :class="!showPrimary && 'justify-content-end'"
        >
          <div
            class="image-bottom-left display-flex align-items-center"
            v-if="showPrimary"
          >
            <div class="display-flex align-items-center" v-show="imageDefault">
              <span class="image-primary display-flex align-items-center">
                <svg
                  class="image-icon-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <circle fill="#10BC83" cx="256" cy="256" r="256"></circle>
                  <path
                    fill="#FFF"
                    d="M216.7 350.9h-.1c-5.1 0-9.9-2.1-13.4-5.7l-74.2-76c-7.4-7.5-7.2-19.5.4-26.8 7.5-7.4 19.5-7.2 26.8.4L217 305l139.7-138.5c7.5-7.4 19.5-7.4 26.8.1s7.4 19.5-.1 26.8l-153.2 152c-3.7 3.5-8.5 5.5-13.5 5.5z"
                  ></path>
                </svg>
                {{ primaryText }}
              </span>
              <popper trigger="click" :options="{ placement: 'top' }">
                <div class="popper popper-custom">
                  {{ popupText }}
                </div>
                <i
                  slot="reference"
                  class="cursor-pointer display-flex align-items-center"
                >
                  <svg
                    class="image-icon-info"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M256 32c30.3 0 59.6 5.9 87.2 17.6 26.7 11.3 50.6 27.4 71.2 48s36.7 44.5 48 71.2c11.7 27.6 17.6 56.9 17.6 87.2s-5.9 59.6-17.6 87.2c-11.3 26.7-27.4 50.6-48 71.2s-44.5 36.7-71.2 48C315.6 474.1 286.3 480 256 480s-59.6-5.9-87.2-17.6c-26.7-11.3-50.6-27.4-71.2-48s-36.7-44.5-48-71.2C37.9 315.6 32 286.3 32 256s5.9-59.6 17.6-87.2c11.3-26.7 27.4-50.6 48-71.2s44.5-36.7 71.2-48C196.4 37.9 225.7 32 256 32m0-32C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0z"
                    ></path>
                    <path
                      d="M304.2 352H296c-4.4 0-8-3.6-8-8v-94.8c0-15.3-11.5-28.1-26.7-29.8-2.5-.3-4.8-.5-6.7-.5-23.7 0-44.6 11.9-57 30.1l-.1.1v-.1c-1 2-1.7 5.3.7 6.5.6.3 1.2.5 1.8.5h16c4.4 0 8 3.6 8 8v80c0 4.4-3.6 8-8 8h-8.2c-8.7 0-15.8 7.1-15.8 15.8v.3c0 8.7 7.1 15.8 15.8 15.8h96.4c8.7 0 15.8-7.1 15.8-15.8v-.3c0-8.7-7.1-15.8-15.8-15.8zM256 128c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32z"
                    ></path>
                  </svg>
                </i>
              </popper>
            </div>
            <a
              class="text-small mark-text-primary cursor-pointer"
              @click.prevent="markIsPrimary(currentIndexImage)"
              v-show="!imageDefault"
              >{{ markIsPrimaryText }}</a
            >
          </div>
          <div class="display-flex">
            <label
              v-if="showEdit"
              class="image-edit display-flex cursor-pointer"
              :for="idEdit"
            >
              <svg
                class="image-icon-edit"
                xmlns="http://www.w3.org/2000/svg"
                width="512"
                height="512"
                viewBox="0 0 512 512"
              >
                <path
                  d="M469.56 42.433C420.927-6.199 382.331-.168 378.087.68l-4.8.96L36.895 338.001 0 512l173.985-36.894 336.431-336.399.941-4.86c.826-4.257 6.65-42.984-41.797-91.414zM41.944 470.057L64.3 364.617c12.448 3.347 31.968 11.255 50.51 29.794 18.96 18.963 27.84 39.986 31.875 53.436l-104.741 22.21zm132.504-41.134c-6.167-16.597-17.199-37.794-36.775-57.371C119 352.88 99.435 342.57 83.739 336.879l155.156-155.15 97.066-97.051c11.069 2.074 34.864 8.95 57.253 31.338 22.708 22.708 30.95 48.358 33.734 60.428l-96.685 96.663-155.815 155.816zm278.41-278.383c-6.167-16.6-17.196-37.8-36.781-57.384-18.669-18.667-38.228-28.977-53.92-34.668l26.118-26.113c8.785.484 30.373 4.87 58.423 32.918l.001.002c28.085 28.074 32.467 49.675 32.946 58.463l-26.787 26.782z"
                ></path>
              </svg>
            </label>

            <a
              v-if="showDelete"
              class="image-delete display-flex cursor-pointer"
              @click.prevent="deleteImage(currentIndexImage)"
            >
              <svg
                class="image-icon-delete"
                xmlns="http://www.w3.org/2000/svg"
                width="512"
                height="512"
                viewBox="0 0 512 512"
              >
                <path
                  d="M448 64h-96V0H159.9l.066 64H32v32h32v416h384V96h32V64h-32zM192 32h128v32H192V32zm224 448H96V96h320v384zM192 160h32v256h-32V160zm96 0h32v256h-32V160z"
                ></path>
              </svg>
            </a>
          </div>
        </div> -->
      </div>
    </div>

    <div
      class="image-list-container display-flex flex-wrap"
      v-if="images.length && multiple"
    >
      <div
        class="image-list-item position-relative cursor-pointer"
        :class="image.highlight && 'image-highlight'"
        v-for="(image, index) in images"
        :key="index"
        @click="changeHighlight(index)"
      >
        <div class="centered">
          <img class="show-img img-responsive" :src="image.path" />
        </div>
      </div>
      <div
        class="add-special-icon image-list-item position-relative cursor-pointer display-flex justify-content-center align-items-center"
        v-if="images.length < maxImage && showAdd"
      >
        <!--  <svg
          class="icon add-image-svg"
          xmlns="http://www.w3.org/2000/svg"
          width="512"
          height="512"
          viewBox="0 0 512 512"
        >
          <path d="M511.5 227.5h-227V.5h-57v227H-.5v57h228v228h57v-228h227z"></path>
        </svg>-->

        <img src="@/assets/addnewitems/addButton.png" class="add-image-svg" />
        <div class="input-add-image position-absolute full-width full-height">
          <label
            :for="idUpload"
            class="display-block full-width full-height cursor-pointer"
          >
          </label>
        </div>
      </div>
    </div>
    <div>
      <input
        class="display-none"
        :id="idUpload"
        @change="uploadFieldChange"
        name="images"
        :multiple="multiple"
        :accept="accept"
        type="file"
        :disabled="disabled"
      />
      <input
        class="display-none"
        :id="idEdit"
        @change="editFieldChange"
        name="image"
        :accept="accept"
        type="file"
        :disabled="disabled"
      />
    </div>

    <div
      style="
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      "
      v-if="showImageEditor"
    >
      <div class="image-editor">
        <div class="image-editor-wrapper">
          <div class="handle-command">
            <div class="handle-right">
              <div class="cancel" @click="closeImageEditor">CANCEL</div>
              <div class="save" @click="saveImageEditor">SAVE</div>
            </div>
          </div>
          <div class="content">
            <div class="overlay-image">
              <div class="img-cropper">
                <vue-cropper
                  id="imagecropper"
                  ref="cropper"
                  :src="imgSrc"
                  dragMode="move"
                  :aspect-ratio="16 / 9"
                />
              </div>
            </div>
          </div>
          <div class="handle-crop">
            <div class="wrapper-icon">
              <img
                class="icon"
                src="@/assets/addnewitems/cropped.png"
                @click.prevent="cropImage(0.2)"
              />
            </div>
            <div class="wrapper-icon" @click.prevent="zoom(0.2)">
              <img class="icon1" src="@/assets/addnewitems/zoom-out.png" />
            </div>
            <div class="wrapper-icon" @click.prevent="zoom(-0.2)">
              <img class="icon1" src="@/assets/addnewitems/zoom-in.png" />
            </div>
            <div class="wrapper-icon" @click.prevent="rotate(-90)">
              <img class="icon1" src="@/assets/addnewitems/rotate-left.png" />
            </div>
            <div class="wrapper-icon" @click.prevent="rotate(90)">
              <img class="icon1" src="@/assets/addnewitems/rotate-right.png" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <vue-image-lightbox-carousel
      ref="lightbox"
      :show="showLightbox"
      @close="showLightbox = false"
      :images="images"
      @change="changeHighlight"
      :showCaption="false"
    >
    </vue-image-lightbox-carousel>
    -->
  </div>
</template>

<script>
import { forEach, findIndex, orderBy, cloneDeep } from 'lodash'
import 'vue-popperjs/dist/vue-popper.css'

import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
export default {
  name: 'VueImagePicker',

  props: {
    dragText: {
      type: String,
      default: '(Max 5 photos for 1 item, 30MB total)'
    },
    browseText: {
      type: String,
      default: 'Add Photo'
    },
    primaryText: {
      type: String,
      default: 'Mặc định'
    },
    markIsPrimaryText: {
      type: String,
      default: 'Đặt làm mặc định'
    },
    popupText: {
      type: String,
      default: 'Hình ảnh này sẽ được hiển thị làm mặc định'
    },
    dropText: {
      type: String,
      default: 'Thả tệp của bạn ở đây ...'
    },
    accept: {
      type: String,
      default: 'image/gif,image/jpeg,image/png,image/bmp,image/jpg'
    },
    dataImages: {
      type: Array,
      default: () => {
        return []
      }
    },
    multiple: {
      type: Boolean,
      default: true
    },
    showPrimary: {
      type: Boolean,
      default: true
    },
    maxImage: {
      type: Number,
      default: 5
    },
    idUpload: {
      type: String,
      default: 'image-upload'
    },
    idEdit: {
      type: String,
      default: 'image-edit'
    },
    showEdit: {
      type: Boolean,
      default: true
    },
    showDelete: {
      type: Boolean,
      default: true
    },
    showAdd: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentIndexImage: 0,
      images: [],
      isDragover: false,
      showLightbox: false,
      arrLightBox: [],
      showImageEditor: false,
      imgSrc: require('@/assets/addnewitems/wrapper_image.png'),
      cropImg: ''
    }
  },
  components: {
    VueCropper
  },
  computed: {
    imagePreview() {
      const index = findIndex(this.images, { highlight: 1 })
      if (index > -1) {
        return this.images[index].path
      } else {
        return this.images.length ? this.images[0].path : ''
      }
    },
    imageDefault() {
      if (this.images[this.currentIndexImage]) {
        return this.images[this.currentIndexImage].default
      }
      return this.images[0].default
    }
  },
  methods: {
    preventEvent(e) {
      e.preventDefault()
      e.stopPropagation()
    },
    onDrop(e) {
      this.isDragover = false
      e.stopPropagation()
      e.preventDefault()
      const files = e.dataTransfer.files
      if (!files.length) {
        return false
      }
      if (!this.isValidNumberOfImages(files.length)) {
        return false
      }
      forEach(files, (value, index) => {
        this.createImage(value)
        if (!this.multiple) {
          return false
        }
      })
      if (document.getElementById(this.idUpload)) {
        document.getElementById(this.idUpload).value = []
      }
    },
    onDragover() {
      this.isDragover = true
    },
    createImage(file) {
      if (this.disabled) return
      const reader = new FileReader()
      const formData = new FormData()
      formData.append('file', file)
      reader.onload = (e) => {
        const dataURI = e.target.result
        if (dataURI) {
          if (!this.images.length) {
            this.images.push({
              name: file.name,
              path: dataURI,
              highlight: 1,
              default: 1
            })
            this.currentIndexImage = 0
          } else {
            this.images.push({
              name: file.name,
              path: dataURI,
              highlight: 0,
              default: 0
            })
          }
          this.$emit(
            'upload-success',
            formData,
            this.images.length - 1,
            this.images
          )
        }
      }
      reader.readAsDataURL(file)
      console.log('createImage')
    },
    editImage(file) {
      if (this.disabled) return
      const reader = new FileReader()
      const formData = new FormData()
      formData.append('file', file)
      reader.onload = (e) => {
        const dataURI = e.target.result
        if (dataURI) {
          if (this.images.length && this.images[this.currentIndexImage]) {
            this.images[this.currentIndexImage].path = dataURI
            this.images[this.currentIndexImage].name = file.name
          }
        }
      }
      reader.readAsDataURL(file)
      this.$emit('edit-image', formData, this.currentIndexImage, this.images)
    },
    uploadFieldChange(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return false
      }
      if (!this.isValidNumberOfImages(files.length)) {
        return false
      }
      forEach(files, (value, index) => {
        this.createImage(value)
      })
      if (document.getElementById(this.idUpload)) {
        document.getElementById(this.idUpload).value = []
      }
    },
    editFieldChange(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return false
      }
      if (!this.isValidNumberOfImages(files.length)) {
        return false
      }
      forEach(files, (value, index) => {
        this.editImage(value)
      })
      if (document.getElementById(this.idEdit)) {
        document.getElementById(this.idEdit).value = ''
      }
    },
    changeHighlight(currentIndex) {
      this.currentIndexImage = currentIndex
      const arr = this.images
      this.images = []
      arr.map((item, index) => {
        if (currentIndex === index) {
          item.highlight = 1
        } else {
          item.highlight = 0
        }
        return item
      })
      this.images = arr
    },
    markIsPrimary(currentIndex) {
      this.images.map((item, index) => {
        if (currentIndex === index) {
          item.highlight = 1
          item.default = 1
        } else {
          item.highlight = 0
          item.default = 0
        }
        return item
      })
      this.currentIndexImage = 0
      this.images = orderBy(this.images, 'default', 'desc')
      this.$emit('mark-is-primary', currentIndex, this.images)
    },
    deleteImage(currentIndex) {
      this.$emit(
        'before-remove',
        currentIndex,
        () => {
          if (this.images[currentIndex].default === 1) {
            this.images[0].default = 1
          }
          this.images.splice(currentIndex, 1)
          this.currentIndexImage = 0
          if (this.images.length) {
            this.images[0].highlight = 1
          }
        },
        this.images
      )
    },
    openGallery(index) {
      this.openImageEditor(index)
      this.showLightbox = true
      this.$refs.lightbox.showImage(index)
      // console.log('openGallery')
    },
    onOpenedLightBox(value) {
      if (value) {
        this.showLightbox = true
      } else {
        this.showLightbox = false
      }
    },
    isValidNumberOfImages(amount) {
      if (amount > this.maxImage) {
        this.$emit('limit-exceeded', amount)
        return false
      } else {
        return true
      }
    },
    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
      this.$refs.cropper.replace(this.cropImg)
    },
    rotate(deg) {
      this.$refs.cropper.rotate(deg)
    },
    zoom(percent) {
      this.$refs.cropper.relativeZoom(percent)
    },
    openImageEditor(index) {
      this.showImageEditor = true
      this.imgSrc = this.images[index].path
    },
    closeImageEditor() {
      this.showImageEditor = false
    },
    saveImageEditor() {
      this.images[this.currentIndexImage].path = this.cropImg
      this.showImageEditor = false
    }
  },
  watch: {
    dataImages: {
      handler: function (newVal) {
        this.images = cloneDeep(newVal)
      },
      deep: true
    }
  },
  mounted() {
    document.body.addEventListener('dragleave', (event) => {
      event.stopPropagation()
      event.preventDefault()
      this.isDragover = false
    })
  },
  created() {
    this.images = []
    this.images = cloneDeep(this.dataImages)
  }
}
</script>

<style lang="css" scoped>
.text-small {
  font-size: 11px;
}
.position-relative {
  position: relative;
}
.position-absolute {
  position: absolute;
}
.text-center {
  text-align: center;
}
.text-primary {
  color: #2fa3e6;
}
.display-flex {
  display: flex;
}
.flex-column {
  flex-direction: column;
}
.flex-wrap {
  flex-wrap: wrap;
}
.justify-content-center {
  justify-content: center;
}
.justify-content-between {
  justify-content: space-between;
}
.justify-content-end {
  justify-content: flex-end;
}
.align-items-center {
  align-items: center;
}
.full-width {
  width: 100%;
}
.full-height {
  height: 100%;
}
.cursor-pointer {
  cursor: pointer;
}
.centered {
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  position: absolute;
  display: block;
}
.image-container {
  width: 400px;
  height: 300px;
  border: 2px solid #d6d6d6;
  border-radius: 4px;
  background-color: #fff;
}
.image-center {
  width: 100%;
  height: 100%;
}
.image-icon-drag {
  fill: #c9c8c8;
  height: 50px;
  width: 50px;
}
.drag-text {
  padding-top: 5px;
  color: #777;
  font-weight: 400;
  line-height: 1.5;
  font-size: 86%;
}
.browse-text {
  color: #20b2c5;
  text-decoration: none;
}
.image-input {
  overflow: hidden;
  opacity: 0;
  top: 0;
  left: 0;
  bottom: 0;
}
.image-input label {
  display: block;
}
.drag-upload-cover {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fcfeff;
  opacity: 0.9;
  z-index: 1;
  margin: 5px;
  border: 2px dashed #268ddd;
}
.drag-upload-cover {
  font-weight: 400;
  font-size: 20px;
}
.icon-drag-drop {
  height: 50px;
  width: 50px;
  fill: #2fa3e6;
}
.drop-text-here {
  margin: 0;
  line-height: 1.5;
}
.display-none {
  display: none;
}

/* list images*/
.image-list {
  border: 1px solid #d6d6d6;
}
.preview-image {
  height: 300px;
  width: 400px;
  border: 1px solid #6da5a238;
  border-radius: 3px;
  box-sizing: border-box;
}
.image-overlay {
  background: rgba(0, 0, 0, 0.7);
  z-index: 10;
  border-radius: 5px;
  opacity: 0;
  transition: all 0.3s ease-in-out 0s;
}
.image-overlay-details {
  position: absolute;
  z-index: 11;
  opacity: 0;
  transform: translate(0, -50%);
  top: 50%;
}
.icon-overlay {
  width: 40px;
  height: 40px;
  fill: #fff;
}
.preview-image:hover .image-overlay,
.preview-image:hover .image-overlay-details {
  opacity: 1;
}
.img-responsive {
  display: block;
  max-width: 100%;
  height: auto;
}
.show-img {
  width: 398px;
  height: 298px;
  object-fit: cover;
  max-height: 300px;
  max-width: 400px;
  display: block;
  vertical-align: middle;
}
/*image bottom*/
.image-bottom {
  bottom: 0;
  left: 0;
  height: 40px;
  padding: 5px 10px;
  box-sizing: border-box;
}
.image-primary {
  border-radius: 4px;
  background-color: #e3edf7;
  padding: 3px 7px;
  font-size: 11px;
  margin-right: 5px;
}
.image-icon-primary {
  width: 10px;
  height: 10px;
  margin-right: 2px;
}
.image-icon-delete {
  height: 14px;
  width: 14px;
  fill: #222;
}
.image-edit {
  margin-right: 10px;
}
.image-icon-edit {
  height: 14px;
  width: 14px;
  fill: #222;
}
.image-list-container {
  max-width: 400px;
  min-height: 110px;
  margin-top: 10px;
}
.image-list-container .image-list-item {
  height: 48px;
  width: 48px;
  border-radius: 4px;
  border: 1px solid #d6d6d6;
}
.image-list-container .image-list-item:not(:last-child) {
  margin-right: 5px;
  margin-bottom: 5px;
}

.image-list-container .image-list-item .show-img {
  max-width: 48px;
  max-height: 46px;
  border-radius: 4px;
}
.image-list-container .image-highlight {
  border: 1px solid #2fa3e7;
  z-index: 40;
}
.add-special-icon {
  background-color: rgb(0, 123, 236);
}
.add-image-svg {
  width: 48px;
  height: 48px;
}
.input-add-image {
  overflow: hidden;
  opacity: 0;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 11;
}
.input-add-image label {
  display: block;
}
.image-icon-info {
  width: 14px;
  height: 14px;
  fill: #222;
}
.mark-text-primary {
  color: #034694;
}
.popper-custom {
  background: #000;
  padding: 10px;
  border: none;
  box-shadow: none;
  color: white;
  text-align: left;
  font-size: 12px;
}
</style>
<style lang="css">
.popper-custom .popper__arrow {
  border-color: #000 transparent transparent transparent !important;
}
</style>
<style lang="scss" scoped>
/* image editor*/
.image-editor {
  position: fixed;
  //width: 1024px;
  //height: 570px;
  width: 100%;
  height: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 50px;
  padding-right: 100px;
  z-index: 9998;
  top: 0;
  left: 0;
  background-color: #1b222b;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: flex-start;
  justify-content: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  box-align: center;
  box-pack: center;
  -webkit-transition: opacity 0.3s ease;
  transition: opacity 0.3s ease;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  .image-editor-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    .handle-command {
      display: flex;
      justify-content: flex-end;
      .handle-right {
        color: white;
        display: flex;
        margin-bottom: 5px;
        font-size: 12px;
        margin-top: 10px;
        .cancel {
          display: flex;
          justify-content: flex-end;
          align-items: center;

          padding: 10px 40px;
          border-radius: 3px;
        }
        .cancel:hover {
          cursor: pointer;
          background-color: #353534;
        }
        .save {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          background-color: #00bf9d;
          padding: 10px 40px;
          border-radius: 3px;
        }
        .save:hover {
          cursor: pointer;
          background-color: #219696;
        }
      }
    }
  }
  .content {
    width: 100%;
    height: 100%;
    padding-left: 10%;
    padding-right: 10%;

    height: 430px;

    background: url('~@/assets/addnewitems/wrapper_image.png') no-repeat center
      center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    .overlay-image {
      //background: url("~@/assets/overlay_cropper.png") no-repeat center center;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .img-cropper {
        height: 430px;
        display: inline-flex;
        .imagecropper {
        }
      }
    }
  }

  .handle-crop {
    display: flex;
    margin: 25px 0;
    .wrapper-icon {
      padding: 3px 3px;
      margin-right: 25px;
      .icon {
        width: 15px;
        height: 15px;
      }
      .icon1 {
        width: 18px;
        height: 18px;
      }
    }
    .wrapper-icon:hover {
      cursor: pointer;
      background-color: #1c1727;
    }
  }
}
</style>
