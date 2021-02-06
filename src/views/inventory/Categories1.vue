<template>
  <div>
    <div class="headline1">IT Inventory</div>
    <div class="gridview">
      <v-row class="row-header" style="margin-left: 0px; margin-right: 0px">
        <v-col>
          <div class="d-flex header-title">
            <div class="left-header-title">
              <div class="left-header-items">
                <img src="@/assets/filter/edit.png" class="icon" />
                <span class="text-after">Edit</span>
                <img
                  src="@/assets/filter/dividervertical.png"
                  class="divider"
                />
              </div>
              <div class="left-header-items">
                <img src="@/assets/filter/movetofolder.png" class="icon" />
                <span class="text-after">Move to folder</span>
                <img
                  src="@/assets/filter/dividervertical.png"
                  class="divider"
                />
              </div>
              <div class="left-header-items">
                <img src="@/assets/filter/clone.png" class="icon" />
                <span class="text-after">Clone</span>
                <img
                  src="@/assets/filter/dividervertical.png"
                  class="divider"
                />
              </div>
              <div class="left-header-items">
                <img src="@/assets/filter/export.png" class="icon" />
                <span class="text-after">Export</span>
                <img
                  src="@/assets/filter/dividervertical.png"
                  class="divider"
                />
              </div>
              <div class="left-header-items">
                <img src="@/assets/filter/trash.png" class="icon" />
                <span class="text-after">Delete</span>
              </div>
            </div>
            <v-spacer></v-spacer>
            <div class="right-header-title">
              <span class="sort-by">Sort by:</span>
              <div class="right-header-items">
                <span class="text-before">Name</span>
                <img
                  src="@/assets/filter/name.png"
                  class="icon"
                  style="width: 15px; height: 15px"
                />
                <img
                  src="@/assets/filter/dividervertical.png"
                  class="divider"
                />
              </div>
              <div class="right-header-items" @click="switchMode">
                <span
                  class="text-before"
                  v-if="mode_view == 1"
                  style="margin-right: 6px"
                  >Grid View</span
                >
                <span class="text-before" v-else style="margin-right: 6px"
                  >Table View</span
                >
                <img
                  v-if="mode_view == 1"
                  src="@/assets/filter/gridview.png"
                  class="icon"
                  style="width: 13px; height: 13px; margin-right: 3px"
                />
                <img
                  v-else
                  src="@/assets/filter/list.png"
                  class="icon"
                  style="width: 13px; height: 13px; margin-right: 3px"
                />

                <img
                  src="@/assets/filter/dropdownblue.png"
                  class="icon-drop-down"
                />
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col style="padding-top: 0px; padding-bottom: 0px">
          <div v-if="this.mode_view === 1">
            <div class="wrapper-gallerry">
              <v-container>
                <v-row>
                  <v-col
                    class="col-lg-3 col-xs-12"
                    v-for="item in items_current"
                    :key="item.id + 'grid'"
                  >
                    <div class="gallerry-item">
                      <div class="wrapper-image">
                        <div class="wrapper1-image">
                          <img
                            class="image-content"
                            src="../../assets/filter/macbook.jpg"
                          />
                        </div>
                        <div class="overlay_image">
                          <div class="left-overlay">
                            <input
                              type="checkbox"
                              :id="item.id"
                              :name="item.id"
                              :value="item.id"
                            />
                          </div>
                          <v-spacer> </v-spacer>
                          <div class="right-overlay" v-if="item.total > 10">
                            <span class="right-overlay-content">{{
                              item.total + ' QTY'
                            }}</span>
                          </div>
                          <div class="right-overlay" v-else>
                            <span class="right-overlay-content1">{{
                              item.total + ' QTY'
                            }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="bottom-image">
                        <div class="line">
                          <div class="line-left">
                            <span class="sku">{{ item.time }}</span>
                          </div>
                          <v-spacer></v-spacer>
                          <div class="line-right">
                            <span class="type">{{ item.type }}</span>
                          </div>
                        </div>
                        <div class="line">
                          <div class="line-left">
                            <span class="name">{{ item.name }}</span>
                          </div>
                          <v-spacer></v-spacer>
                          <div class="line-right">
                            <img
                              src="@/assets/filter/threedots.png"
                              class="threedots"
                            />
                          </div>
                        </div>

                        <div class="line"><div class="divider"></div></div>
                        <div class="line">
                          <div class="line-left">
                            <span class="price">{{ item.total + ' Qty' }}</span>
                          </div>
                          <v-spacer></v-spacer>
                          <div class="line-right">
                            <span class="price">{{ item.price + ' ₽' }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </div>
          <div v-else>
            <div class="listview-item">
              <v-container style="padding-top: 0; padding-bottom: 0">
                <v-row>
                  <div class="listview-row font-header">
                    <div class="row-header-col1">
                      <input type="checkbox" class="checkbox" />
                    </div>
                    <div class="row-header-col2"></div>
                    <div class="row-header-col3">Name</div>
                    <div class="row-header-col4">Price, ₽</div>
                    <div class="row-header-col5">Item Type</div>
                    <div class="row-header-col6">ID</div>
                    <div class="row-header-col7">Quantity</div>
                    <div class="row-header-col8">Tags</div>
                    <div class="row-header-col9">Note</div>
                    <div class="row-header-col10">Created</div>
                    <div class="row-header-col11">Last Updated</div>
                  </div>
                </v-row>
                <v-row v-for="item in items_current" :key="item.id + 'list'">
                  <div class="listview-row font-content">
                    <div class="row-header-col1 row-content row-content-col1">
                      <input type="checkbox" class="checkbox" />
                    </div>
                    <div class="row-header-col2 row-content row-content-col2">
                      <div class="wrapper-image">
                        <img
                          class="img-preview"
                          src="../../assets/filter/macbook.jpg"
                        />
                      </div>
                    </div>
                    <div class="row-header-col3 row-content row-content-col3">
                      {{ item.name }}
                    </div>
                    <div class="row-header-col4 row-content row-content-col4">
                      {{ item.price }}
                    </div>
                    <div class="row-header-col5 row-content row-content-col5">
                      {{ item.type }}
                    </div>
                    <div class="row-header-col6 row-content row-content-col6">
                      {{ item.time }}
                    </div>
                    <div class="row-header-col7 row-content row-content-col7">
                      <div :class="[item.total > 9 ? 'multiple' : 'singular']">
                        {{ item.total }}
                      </div>
                    </div>
                    <div class="row-header-col8 row-content row-content-col8">
                      {{ item.tags }}
                    </div>
                    <div class="row-header-col9 row-content row-content-col9">
                      {{ item.note }}
                    </div>
                    <div class="row-header-col10 row-content row-content-col10">
                      {{ item.created }}
                    </div>
                    <div class="row-header-col11 row-content row-content-col11">
                      {{ item.last_updated }}
                    </div>
                  </div>
                </v-row>
              </v-container>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row class="row-footer" style="margin-left: 0px; margin-right: 0px">
        <v-col>
          <div class="header-footer">
            <div class="left-footer-title">
              <div class="left-footer-items">
                <span>Showing</span>

                <div class="mg-3">
                  <DropDown id="dropdownmenu1" :arrays="entries"> </DropDown>
                </div>
                <span>entries</span>
              </div>
            </div>
            <v-spacer></v-spacer>
            <div class="right-footer-title">
              <div class="pagination-wrap">
                <span
                  class="text dp-none"
                  v-if="pagination.previous_button === 2"
                >
                  &lt;</span
                >
                <span
                  class="text enabled"
                  v-else-if="pagination.previous_button === 1"
                  @click="previousButton()"
                >
                  &lt;</span
                >
                <span class="text disable-button" v-else> &lt;</span>
              </div>
              <div class="pagination-wrap">
                <span
                  class="text enabled"
                  v-if="pagination.previous_threedots"
                  @click="previousThreeDotsButton()"
                  >...</span
                >
                <span class="text dp-none" v-else>...</span>
              </div>
              <div class="pagination-wrap">
                <span
                  class="text active"
                  v-if="pagination.page_one.value === this.current_page"
                  >{{ pagination.page_one.value }}</span
                >
                <span
                  class="text dp-none"
                  v-else-if="!pagination.page_one.active"
                  >{{ pagination.page_one.value }}</span
                >
                <span class="text enabled" @click="ButtonOneClicked()" v-else>{{
                  pagination.page_one.value
                }}</span>
              </div>
              <div class="pagination-wrap">
                <span
                  class="text active"
                  v-if="pagination.page_two.value === this.current_page"
                  >{{ pagination.page_two.value }}</span
                >
                <span
                  class="text dp-none"
                  v-else-if="!pagination.page_two.active"
                  >{{ pagination.page_two.value }}</span
                >
                <span class="text enabled" @click="ButtonTwoClicked()" v-else>{{
                  pagination.page_two.value
                }}</span>
              </div>

              <div class="pagination-wrap">
                <span
                  class="text active"
                  v-if="pagination.page_three.value === this.current_page"
                  >{{ pagination.page_three.value }}</span
                >
                <span
                  class="text dp-none"
                  v-else-if="!pagination.page_three.active"
                  >{{ pagination.page_three.value }}</span
                >
                <span
                  class="text enabled"
                  @click="ButtonThreeClicked()"
                  v-else
                  >{{ pagination.page_three.value }}</span
                >
              </div>
              <div class="pagination-wrap">
                <span
                  class="text active"
                  v-if="pagination.page_four.value === this.current_page"
                  >{{ pagination.page_four.value }}</span
                >
                <span
                  class="text dp-none"
                  v-else-if="!pagination.page_four.active"
                  >{{ pagination.page_four.value }}</span
                >
                <span
                  class="text enabled"
                  @click="ButtonFourClicked()"
                  v-else
                  >{{ pagination.page_four.value }}</span
                >
              </div>
              <div class="pagination-wrap">
                <span
                  class="text enabled"
                  v-if="pagination.next_threedots"
                  @click="nextThreeDotsButton()"
                  >...</span
                >
                <span class="text dp-none" v-else>...</span>
              </div>
              <div class="pagination-wrap">
                <span class="text dp-none" v-if="pagination.next_button === 2">
                  &gt;</span
                >
                <span
                  class="text enabled"
                  v-else-if="pagination.next_button === 1"
                  @click="nextButton()"
                >
                  &gt;</span
                >
                <span class="text disable-button" v-else> &gt;</span>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import DropDown from '@/components/customs/dropdown/DropDown'
export default {
  name: 'Categories',
  data() {
    return {
      mode_view: 2,
      items_per_page: 8,
      total_pages: 1,
      current_page: 1,
      items_current: [],
      pagination: {
        previous_button: 0,
        next_button: 1,
        previous_threedots: false,
        next_threedots: false,
        page_one: {
          value: 1,
          active: true
        },
        page_two: {
          value: 2,
          active: true
        },
        page_three: {
          value: 3,
          active: true
        },
        page_four: {
          value: 4,
          active: true
        },
        page_segment: 4
      },
      ex4: ['1', '2', '3', 'info', '5', '6', '7', '8'],
      entries: [
        { id: 1, text: '1', selected: true },
        { id: 2, text: '2', selected: false },
        { id: 3, text: '3', selected: false },
        { id: 4, text: '4', selected: false },
        { id: 5, text: '5', selected: false },
        { id: 6, text: '6', selected: false }
      ],
      items: []
    }
  },
  computed: {
    categories() {
      return this.$store.getters.categories
    }
  },
  components: {
    DropDown
  },
  created() {
    this.getDummyitems()

    this.getItemCurrents()

    this.caculatePagination()
  },
  methods: {
    caculatePagination() {
      // previous 0:disa  1:act  2:hide
      if (this.total_pages === 0) {
        this.pagination.previous_button = 2
        this.pagination.next_button = 2
        this.pagination.previous_threedots = false
        this.pagination.next_threedots = false
        this.pagination.page_one.value = 1
        this.pagination.page_one.active = false
        this.pagination.page_two.value = 2
        this.pagination.page_two.active = false
        this.pagination.page_three.value = 3
        this.pagination.page_three.active = false
        this.pagination.page_four.value = 4
        this.pagination.page_four.active = false
        return
      }

      if (this.current_page <= 1) {
        this.pagination.previous_button = 0
      } else {
        this.pagination.previous_button = 1
      }

      if (this.current_page < this.total_pages) {
        this.pagination.next_button = 1
      } else {
        this.pagination.next_button = 0
      }

      if (this.current_page > this.pagination.page_segment) {
        this.pagination.previous_threedots = true
      } else {
        this.pagination.previous_threedots = false
      }

      var segmentfinal = this.caculateTotalPage(
        this.total_pages,
        this.pagination.page_segment
      )

      var segmentvalue = this.caculateTotalPage(
        this.current_page,
        this.pagination.page_segment
      )

      if (segmentvalue < segmentfinal) {
        this.pagination.next_threedots = true
      } else {
        this.pagination.next_threedots = false
      }

      var initvalue = (segmentvalue - 1) * this.pagination.page_segment

      this.pagination.page_one.value = initvalue + 1
      this.pagination.page_two.value = initvalue + 2
      this.pagination.page_three.value = initvalue + 3
      this.pagination.page_four.value = initvalue + 4

      if (this.pagination.page_one.value <= this.total_pages) {
        this.pagination.page_one.active = true
      } else {
        this.pagination.page_one.active = false
      }

      if (this.pagination.page_two.value <= this.total_pages) {
        this.pagination.page_two.active = true
      } else {
        this.pagination.page_two.active = false
      }
      if (this.pagination.page_three.value <= this.total_pages) {
        this.pagination.page_three.active = true
      } else {
        this.pagination.page_three.active = false
      }
      if (this.pagination.page_four.value <= this.total_pages) {
        this.pagination.page_four.active = true
      } else {
        this.pagination.page_four.active = false
      }
    },
    getItemCurrents() {
      this.items_current = []
      let start = (this.current_page - 1) * this.items_per_page
      const end = this.current_page * this.items_per_page
      for (start; start < end; start++) {
        if (start < this.items.length) {
          this.items_current.push(this.items[start])
        }
      }
    },
    getDummyitems() {
      var a = []
      for (let i = 0; i < 12 * 10; i++) {
        if (i % 5 === 0) {
          const c = {
            id: i + 1,
            src: '../../assets/filter/macbook1.jpg',
            total: '5',
            time: '153AD 14382',
            type: 'MacBook1',
            name: 'Apple MacBook1',
            price: '88 500.00',
            tags: 'Apple',
            note: 'Processor int...',
            created: 'Sep 19 2020',
            last_updated: 'Sep 19 2020'
          }
          a.push(c)
        } else {
          const b = {
            id: i + 1,
            src: '../../assets/filter/macbook.jpg',
            total: '46',
            time: '153AD 1438',
            type: 'MacBook',
            name: 'Apple MacBook',
            price: '78 500.00',
            tags: 'Apple',
            note: 'Processor int...',
            created: 'Sep 18 2020',
            last_updated: 'Sep 18 2020'
          }

          a.push(b)
        }
      }
      this.items = a
      if (this.mode_view === 1) {
        this.items_per_page = 8
      } else {
        this.items_per_page = 12
      }

      this.total_pages = this.caculateTotalPage(
        this.items.length,
        this.items_per_page
      )
      this.current_page = 1
    },
    caculateTotalPage(total, divide) {
      const nguyen = Math.floor(total / divide)
      const du = total % divide
      if (du > 0) {
        return nguyen + 1
      } else {
        return nguyen
      }
    },
    switchMode() {
      if (this.mode_view === 1) {
        this.mode_view = 2
        this.items_per_page = 12
        this.total_pages = this.caculateTotalPage(
          this.items.length,
          this.items_per_page
        )
        this.current_page = 1
      } else {
        this.mode_view = 1
        this.items_per_page = 8
        this.total_pages = this.caculateTotalPage(
          this.items.length,
          this.items_per_page
        )
        this.current_page = 1
      }
      this.getItemCurrents()
      this.caculatePagination()
    },

    previousButton() {
      this.current_page = this.current_page - 1
      this.getItemCurrents()
      this.caculatePagination()
    },
    nextButton() {
      this.current_page = this.current_page + 1
      this.getItemCurrents()
      this.caculatePagination()
    },

    ButtonOneClicked() {
      this.current_page = this.pagination.page_one.value
      this.getItemCurrents()
      this.caculatePagination()
    },
    ButtonTwoClicked() {
      this.current_page = this.pagination.page_two.value
      this.getItemCurrents()
      this.caculatePagination()
    },
    ButtonThreeClicked() {
      this.current_page = this.pagination.page_three.value
      this.getItemCurrents()
      this.caculatePagination()
    },
    ButtonFourClicked() {
      this.current_page = this.pagination.page_four.value
      this.getItemCurrents()
      this.caculatePagination()
    },
    previousThreeDotsButton() {
      var segmentvalue = this.caculateTotalPage(
        this.current_page,
        this.pagination.page_segment
      )
      var initvalue =
        (segmentvalue - 2) * this.pagination.page_segment +
        this.pagination.page_segment
      this.current_page = initvalue
      this.getItemCurrents()
      this.caculatePagination()
    },
    nextThreeDotsButton() {
      var segmentvalue = this.caculateTotalPage(
        this.current_page,
        this.pagination.page_segment
      )
      var initvalue = segmentvalue * this.pagination.page_segment + 1
      this.current_page = initvalue
      this.getItemCurrents()
      this.caculatePagination()
    }
  }
}
</script>
<style lang="scss" scoped>
.headline1 {
  font-size: 16px;
  font-weight: 600;
  color: #4a6088;
  margin-bottom: 20px;
  margin-top: 10px;
}
.gridview {
  border: 1px solid #a0979747;
  .row-header {
    background-color: rgba(226, 222, 222, 0.28);
    .header-title {
      flex: 0 0 auto;
      .left-header-title {
        display: flex;
        .left-header-items {
          display: inline-flex;
          align-items: center;
          .icon {
            width: 18px;
            height: 18px;
            margin-right: 3px;
          }
          .icon1 {
            width: 15px;
            height: 15px;
            margin-right: 3px;
          }
          .text-after {
            font-size: 14px;
            font-weight: bold;
            color: #4a6088;
          }
          .divider {
            width: 18px;
            height: 18px;
            margin-right: 3px;
          }
        }
      }
      .right-header-title {
        display: flex;
        .sort-by {
          font-size: 14px;
          margin-right: 5px;
        }
        .right-header-items {
          display: inline-flex;
          align-items: center;
          .icon {
            width: 18px;
            height: 18px;
            cursor: pointer;
          }
          .text-before {
            font-size: 14px;
            font-weight: bold;
            color: #1085f9;
            margin-right: 3px;
          }
          .icon-drop-down {
            width: 12px;
            height: 6px;
            margin-right: 10px;
            margin-left: 5px;
            cursor: pointer;
          }
          .divider {
            width: 18px;
            height: 18px;
            margin-right: 3px;
          }
        }
      }
    }
  }
  .row-footer {
    background-color: rgba(226, 222, 222, 0.28);
    .mg-3 {
      margin: 0 5px;
    }
    .header-footer {
      display: flex;
      flex: 0 0 auto;
      .left-footer-title {
        display: flex;
        font-size: 14px;
        .left-footer-items {
          display: inline-flex;
          align-items: center;
        }
      }
      .right-footer-title {
        display: flex;
        .threedots {
          margin: 0px 3px;
        }
        .pagination-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          margin-right: 3px;
          .dp-none {
            display: none;
          }
          .disable-button {
          }
          .enabled {
            cursor: pointer;
          }
          .enabled:hover {
            background-color: rgb(16, 133, 249);
          }
          .text {
            padding: 1px 6px;
            border-radius: 3px;
            border: 1px solid #a0979747;
          }
        }
        .active {
          background-color: rgb(16, 133, 249);
        }
      }
    }
  }
  .wrapper-gallerry {
    .gallerry-item {
      width: 190px;
      .wrapper-image {
        width: 100%;
        height: 190px;
        position: relative;
        .wrapper1-image {
          width: 100%;
          height: 100%;
          position: relative;

          .image-content {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
        }
        .overlay_image {
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          width: 100%;
          padding: 5px 10px;
          .left-overlay {
            input {
              outline: 1px solid #8080808c;
            }
          }
          .right-overlay {
            display: flex;
            justify-content: center;
            align-items: center;
            .right-overlay-content {
              background-color: #1e9c1e;
              color: white;
              font-size: 10px;
              padding: 2px 5px;
            }
            .right-overlay-content1 {
              background-color: red;
              color: white;
              font-size: 10px;
              padding: 2px 5px;
            }
          }
        }
      }
      .bottom-image {
        font-size: 12px;
        .line {
          display: flex;
          width: 100%;
          padding: 0px 10px;
          .divider {
            border: 1px solid #8080801a;
            width: 100%;
            height: 1px;
            margin-top: 3px;
            margin-bottom: 6px;
          }
          .price {
            color: black;
            font-size: 11px;
            font-weight: 500;
          }
          .line-left {
            .sku {
              font-size: 10px;
              color: #808080bf;
            }
            .name {
              font-size: 14px;
              color: black;
              font-weight: bold;
            }
          }
          .line-right {
            .type {
              color: #808080bf;
            }
            .threedots {
              width: 15px;
              height: 15px;
            }
          }
        }
      }
    }
  }
  .listview-item {
    .font-content {
      font-size: 13px;
    }
    .font-header {
      font-size: 13px;
      font-weight: bold;
      color: #4a6088;
      height: 50px;
      align-items: center;
      background-color: rgba(226, 222, 222, 0.28);
      border-top: 1px solid #a0979747;
    }
    .listview-row {
      border-bottom: 1px solid #a0979747;
      display: flex;
      width: 100%;
      .row-content {
        height: 50px;
        display: flex;
        align-items: center;
      }
      .row-content-col1 {
        justify-content: center;
      }
      .row-content-col2 {
        justify-content: center;
        .wrapper-image {
          width: 40px;
          height: 30px;
          position: relative;
          .img-preview {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
        }
      }
      .row-content-col3 {
        justify-content: left;
      }
      .row-content-col4 {
        justify-content: left;
      }
      .row-content-col5 {
        justify-content: left;
      }
      .row-content-col6 {
        justify-content: left;
      }
      .row-content-col7 {
        justify-content: left;
        .multiple {
          color: #1e9c1e;
        }
        .singular {
          color: red;
        }
      }
      .row-content-col8 {
        justify-content: left;
      }
      .row-content-col9 {
        justify-content: left;
      }
      .row-content-col10 {
        justify-content: left;
      }
      .row-content-col11 {
        justify-content: left;
      }
      .row-header-col1 {
        text-align: center;
        width: 30px;
        .checkbox {
          margin: 0 auto;
        }
      }
      .row-header-col2 {
        width: 60px;
      }
      .row-header-col3 {
        width: 90px;
      }
      .row-header-col4 {
        width: 90px;
      }
      .row-header-col5 {
        width: 90px;
      }
      .row-header-col6 {
        width: 90px;
      }
      .row-header-col7 {
        width: 80px;
      }
      .row-header-col8 {
        width: 60px;
      }
      .row-header-col9 {
        width: 80px;
      }
      .row-header-col10 {
        width: 90px;
      }
      .row-header-col11 {
        width: 90px;
      }
    }
  }
}
</style>
