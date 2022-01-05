<template>
  <component
    :is="tag"
    v-mdb-ripple="ripple"
    :type="type"
    :role="role"
    :class="className"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

<script>
import { computed, ref } from 'vue'
import mdbRipple from '../../../directives/free/mdbRipple'

export default {
  name: 'MDBBtn',
  directives: { mdbRipple },
  props: {
    color: String,
    size: String,
    outline: String,
    rounded: Boolean,
    floating: Boolean,
    toggler: Boolean,
    toggle: Boolean,
    role: {
      type: String,
      default: 'button'
    },
    type: {
      type: String,
      default: 'button'
    },
    tag: {
      type: String,
      default: 'button'
    },
    block: {
      type: Boolean,
      default: false
    },
    ripple: {
      type: [Object, Boolean],
      default: props =>
        props.outline || props.color === 'light' || props.color === 'link'
          ? { color: 'dark' }
          : true
    },
    picker: Boolean
  },
  emits: ['update:toggle'],
  setup(props, { emit }) {
    const toggle = ref(props.toggle)

    const className = computed(() => {
      return [
        !props.picker && 'btn',
        props.color && `btn-${props.color}`,
        props.size && `btn-${props.size}`,
        props.outline && `btn-outline-${props.outline}`,
        props.rounded && 'btn-rounded',
        props.floating && 'btn-floating',
        props.block && 'btn-block',
        toggle.value && 'active'
      ]
    })

    function handleClick() {
      if (props.toggler) {
        toggle.value = !toggle.value
        emit('update:toggle', toggle.value)
      }
    }

    return {
      className,
      props,
      handleClick
    }
  }
}
</script>
