<template>
  <component :is="tag" :class="className" :style="style">
    <slot />
  </component>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'MDBProgress',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    height: Number
  },
  setup(props) {
    const className = computed(() => {
      return ['progress']
    })
    const style = computed(() => {
      return { height: `${props.height}px` }
    })

    return {
      className,
      style,
      props
    }
  }
}
</script>
