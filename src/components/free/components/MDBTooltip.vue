<template>
  <component
    :is="tag"
    ref="triggerEl"
    style="display: inline-block"
    v-bind="$attrs"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @focus="onMouseEnter"
    @blur="onMouseLeave"
  >
    <slot name="reference" />
  </component>
  <transition name="fade">
    <div
      v-if="isActive"
      ref="popperEl"
      :class="{
        tooltip: true,
        fade: true,
        'tooltip-inner': true,
      }"
      :style="[widthStyle]"
    >
      <slot name="tip" />
      <div v-if="arrow" data-popper-arrow class="tooltip_arrow" />
    </div>
  </transition>
</template>

<script>
import { computed, nextTick, ref, watchEffect } from 'vue'
import MDBPopper from '../../utils/MDBPopper.js'

export default {
  name: 'MDBTooltip',
  props: {
    tag: {
      type: String,
      default: 'span'
    },
    modelValue: Boolean,
    reference: String,
    popover: String,
    options: {
      type: [Object, Function],
      default() {
        return {}
      }
    },
    boundary: {
      type: String,
      default: 'clippingParent'
    },
    fallbackPlacements: {
      type: Array,
      default: () => ['top', 'right', 'bottom', 'left']
    },
    offset: {
      type: String,
      default: '0, 5'
    },
    direction: {
      type: String,
      default: 'top',
      validator: value =>
        ['top', 'right', 'bottom', 'left'].includes(value.toLowerCase())
    },
    maxWidth: {
      type: Number,
      default: 276
    },
    arrow: {
      type: Boolean,
      default: false
    },
    disabled: Boolean
  },
  setup(props, { emit }) {
    const {
      setPopper,
      isPopperActive,
      openPopper,
      closePopper,
      getPopperOffset
    } = MDBPopper()
    const triggerEl = ref('triggerEl')
    const popperEl = ref('popperEl')

    const widthStyle = computed(
      () => `max-width: ${props.maxWidth}px!important`
    )

    const getConfig = () => {
      const placement = props.direction

      let boundary = document.querySelector(props.boundary)
      if (!boundary)
        boundary = props.boundary

      const defaultBsPopperConfig = {
        placement,
        modifiers: [
          {
            name: 'flip',
            options: {
              fallbackPlacements: props.fallbackPlacements
            }
          },
          {
            name: 'preventOverflow',
            options: {
              boundary
            }
          },
          {
            name: 'offset',
            options: {
              offset: getPopperOffset(props.offset, triggerEl.value)
            }
          },
          {
            name: 'arrow',
            options: {
              element: '.tooltip_arrow',
              padding: 5
            }
          }
        ]
      }

      return {
        ...defaultBsPopperConfig,
        ...(typeof props.options === 'function'
          ? props.options(defaultBsPopperConfig)
          : props.options)
      }
    }

    const popperSetup = () => {
      triggerEl.value = props.reference
        ? document.querySelector(props.reference)
        : triggerEl.value
      popperEl.value = props.popover
        ? document.querySelector(props.popover)
        : popperEl.value

      const config = getConfig()

      setPopper(triggerEl.value, popperEl.value, config)
    }

    const isThrottled = ref(false)

    watchEffect(() => {
      if (props.modelValue) {
        if (isThrottled.value)
          return

        nextTick(() => {
          popperSetup()

          setTimeout(openPopper, 0)
          setTimeout(() => {
            popperEl.value.classList.add('show')
          }, 0)
        })
      }
      else {
        if (!isPopperActive.value)
          return

        setTimeout(() => {
          popperEl.value.classList.remove('show')
        }, 10)

        isThrottled.value = true

        setTimeout(() => {
          closePopper()
          isThrottled.value = false
        }, 150)
      }
    })

    const isActive = computed(() => {
      if (props.modelValue || (!props.modelValue && isPopperActive.value))
        return true
      else if (!props.modelValue && !isPopperActive.value)
        return false

      return false
    })

    const onMouseEnter = () => {
      !props.disabled && emit('update:modelValue', true)
    }
    const onMouseLeave = () => {
      !props.disabled && emit('update:modelValue', false)
    }

    return {
      isActive,
      triggerEl,
      popperEl,
      widthStyle,
      onMouseEnter,
      onMouseLeave,
      props
    }
  }
}
</script>
