<template>
  <i :class="className"><slot /></i>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'MDBIcon',
  props: {
    iconStyle: {
      type: String,
      default: 'fas'
    },
    icon: String,
    flag: String,
    size: String
  },
  setup(props) {
    const className = computed(() => {
      return [
        !props.flag && props.iconStyle,
        props.flag ? `flag flag-${props.flag}` : `fa-${props.icon}`,
        props.size && `fa-${props.size}`
      ]
    })

    return {
      className
    }
  }
}
</script>
