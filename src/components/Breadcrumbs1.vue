<template>
  <div class="wrapper-crumbs">
    <ul class="breadcrumbs">
      <li class="breadcrumbs-item" v-for="(item, index) in crumbs" :key="index">
        <a
          v-bind:class="[item.disabel ? 'disable' : 'active']"
          :href="item.to"
          >{{ item.text }}</a
        >
        <div v-if="index < crumbs.length - 1" class="divider">/</div>
      </li>
    </ul>
    <span class="total-items">{{ totalItems }}</span>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumbs1',
  data() {
    return {
      totalsItem: 63
    }
  },
  computed: {
    totalItems: function () {
      return '(' + this.totalsItem + ' items)'
    },
    crumbs: function () {
      if (this.$route.path === '/') {
        return []
      } else {
        const pathArray = this.$route.path.split('/')

        pathArray.shift()
        const breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
          let disabeld = false
          if (idx === pathArray.length - 1) disabeld = true
          if (this.$route.matched[idx] === undefined) {
          } else {
            breadcrumbArray.push({
              path: path,
              to: breadcrumbArray[idx - 1]
                ? '/' + breadcrumbArray[idx - 1].path + '/' + path
                : '/' + path,
              text: this.$route.matched[idx].meta.breadCrumb || path,
              disabel: disabeld
            })
          }
          return breadcrumbArray
        }, [])

        return breadcrumbs
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss">
.wrapper-crumbs {
  display: inline-flex;
  font-size: 13px;
  color: grey;
  padding-left: 1rem;

  .breadcrumbs {
    list-style-type: none;
    display: inline-flex;
    white-space: wrap;
    padding-left: 0px;

    .breadcrumbs-item {
      list-style-type: none;
      display: inline-flex;
      white-space: wrap;
      a {
        text-decoration: none;
      }
      .divider {
        margin: 0 8px;
      }
      .active {
        color: grey;
      }
      .disable {
        color: black;
        font-weight: bold;
      }
    }
  }
  .total-items {
    margin-left: 8px;
  }
}
</style>
