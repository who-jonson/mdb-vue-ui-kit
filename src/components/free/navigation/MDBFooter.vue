<template>
  <component :is="tag" :class="className">
    <slot />
  </component>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'MDBFooter',
  props: {
    tag: {
      type: String,
      default: 'footer'
    },
    bg: {
      type: String,
      default: 'light'
    },
    text: {
      type: [String, Array]
    }
  },
  setup(props) {
    const className = computed(() => {
      return [
        props.bg && props.bg !== 'none' && `bg-${props.bg}`,
        props.text && spreadProps(props.text)
      ]
    })

    const spreadProps = (props) => {
      if (typeof props === 'string')
        return `text-${props}`

      return props.map(prop => `text-${prop}`.trim()).join(' ')
    }

    return {
      className,
      props
    }
  }
}
</script>
