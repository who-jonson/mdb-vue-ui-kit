<template>
  <component :is="tag" :class="className" :aria-current="currentName">
    <slot />
  </component>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'MDBBreadcrumbItem',
  props: {
    tag: {
      type: String,
      default: 'li'
    },
    active: {
      type: Boolean,
      default: false
    },
    current: {
      type: String,
      default: 'page'
    }
  },
  setup(props) {
    const className = computed(() => {
      return ['breadcrumb-item', props.active && 'active']
    })

    const currentName = computed(() => {
      return props.active && props.current
    })

    return {
      className,
      currentName,
      props
    }
  }
}
</script>
