<template>
  <keep-alive>
    <div v-if="isVertical" :class="columnClassName">
      <component :is="tag" :class="className" v-bind="$attrs">
        <slot />
      </component>
    </div>
    <component :is="tag" v-else :class="className" v-bind="$attrs">
      <slot />
    </component>
  </keep-alive>
</template>

<script>
import { computed, inject } from 'vue'
export default {
  name: 'MDBTabContent',
  inheritAttrs: false,
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    col: {
      type: String,
      default: '9'
    },
    contentClasses: String
  },
  setup(props) {
    const className = computed(() => {
      return ['tab-content', props.contentClasses && props.contentClasses]
    })

    const columnClassName = computed(() => {
      return [`col-${props.col}`]
    })

    const isVertical = inject('isVertical', false)

    return {
      isVertical,
      className,
      columnClassName,
      props
    }
  }
}
</script>
