<template>
  <div class="p-20 flex flex-xy-center">
    <ul :class="paginationClasses.ul">
      <li
        v-for="page in items"
        :key="page.label"
        :class="`${paginationClasses.li} ${page.active ? paginationClasses.liActive : ''} ${
          page.disable ? paginationClasses.liDisable : ''
        }`"
      >
        <span v-if="page.disable" :class="`${paginationClasses.number} ${paginationClasses.numberDisable}`"> ... </span>
        <button
          v-else
          @click="goto(page.label)"
          :class="`${paginationClasses.number} ${page.active ? paginationClasses.numberActive : ''}`"
        >
          {{ page.label }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
  import BaseIcon from '../BaseIcon.vue'

  const defaultClasses = {
    ul: 'pagination',
    li: 'pagination__item',
    liActive: 'pagination__item--active',
    liDisable: 'pagination__item--disable',
    button: 'pagination__link',
    number: 'pagination__number',
    numberActive: 'pagination__number--active',
    numberDisable: 'pagination__number--disable',
    buttonActive: 'pagination__link--active',
    buttonDisable: 'pagination__link--disable'
  }
  const defaultLabels = {
    first: '&laquo;',
    prev: '&lsaquo;',
    next: '&rsaquo;',
    last: '&raquo;'
  }

  export default {
    props: {
      value: {
        // current page
        type: Number,
        required: true
      },
      pageCount: {
        // page numbers
        type: Number,
        required: true
      },
      classes: {
        type: Object,
        required: false,
        default: () => ({})
      },
      labels: {
        type: Object,
        required: false,
        default: () => ({})
      }
    },
    data() {
      return {
        paginationClasses: {
          ...defaultClasses,
          ...this.classes
        },
        paginationLabels: {
          ...defaultLabels,
          ...this.labels
        }
      }
    },
    mounted() {
      if (this.value > this.pageCount) {
        this.$emit('input', this.pageCount)
      }
    },
    computed: {
      items() {
        let valPrev = this.value > 1 ? this.value - 1 : 1 // for easier navigation - gives one previous page
        let valNext = this.value < this.pageCount ? this.value + 1 : this.pageCount // one next page
        let extraPrev = valPrev === 3 ? 2 : null
        let extraNext = valNext === this.pageCount - 2 ? this.pageCount - 1 : null
        let dotsBefore = valPrev > 3 ? 2 : null
        let dotsAfter = valNext < this.pageCount - 2 ? this.pageCount - 1 : null
        let output = []
        for (let i = 1; i <= this.pageCount; i += 1) {
          if (
            [1, this.pageCount, this.value, valPrev, valNext, extraPrev, extraNext, dotsBefore, dotsAfter].includes(i)
          ) {
            output.push({
              label: i,
              active: this.value === i,
              disable: [dotsBefore, dotsAfter].includes(i)
            })
          }
        }
        return output
      },
      hasFirst() {
        return this.value === 1
      },
      hasLast() {
        return this.value === this.pageCount
      }
    },
    methods: {
      first() {
        !this.hasFirst && this.$emit('clickPage', 1)
      },
      prev() {
        !this.hasFirst && this.$emit('clickPage', this.value - 1)
      },
      goto(page) {
        this.$emit('clickPage', page)
      },
      next() {
        !this.hasLast && this.$emit('clickPage', this.value + 1)
      },
      last() {
        !this.hasLast && this.$emit('clickPage', this.pageCount)
      }
    },
    components: { BaseIcon }
  }
</script>

<style lang="scss" scoped>
  .pagination {
    display: flex;
    // background: #e2f3d8;
    // border: 1px solid #8c8c8c;
    border-radius: 4px;
    padding: 9px;
    // .pagination__item
    &__item {
      &:not(:last-child) {
        margin-right: 4px;
      }
      &--active {
      }
      &--disable {
      }
      span {
      }
    }
    // .pagination__number
    &__number {
      height: 24px;
      min-width: 24px;
      padding: 4px 5px;
      border-radius: 4px;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      background: rgba(236, 236, 236, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #474747;
      &:hover {
        background-color: #5aa832;
        color: var(--white);
      }
      &--active {
        background-color: #5aa832;
        color: var(--white);
      }
      &--disable {
        background-color: transparent !important;
        color: #474747 !important;
      }
    }
  }
</style>
