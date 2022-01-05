<template>
  <component
    :is="tag"
    ref="triggerEl"
    v-mdb-click-outside="handleClickOutside"
    style="display: inline-block"
    :tabindex="dismissible ? 0 : null"
    v-bind="$attrs"
  >
    <slot name="reference" />
  </component>
  <transition>
    <div
      v-if="isActive && ($slots.header || $slots.body)"
      ref="popperEl"
      :class="{ popover: true, fade: true }"
      :style="[widthStyle]"
    >
      <div v-if="$slots.header" class="popover-header">
        <slot name="header" />
      </div>
      <div v-if="$slots.body" class="popover-body">
        <slot name="body" />
      </div>
      <slot />
      <div v-if="arrow" data-popper-arrow class="popover_arrow" />
    </div>
  </transition>
</template>

<script>
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watchEffect
} from 'vue'
import MDBPopper from '../../utils/MDBPopper'
import mdbClickOutside from '../../../directives/free/mdbClickOutside'
import { off, on } from '../../utils/MDBEventHandlers'

export default {
  name: 'MDBPopover',
  directives: {
    mdbClickOutside
  },
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
      default: 'bottom',
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
    dismissible: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const {
      setPopper,
      isPopperActive,
      openPopper,
      closePopper,
      destroyPopper,
      getPopperOffset
    } = MDBPopper()
    const triggerEl = ref('triggerEl')
    const popperEl = ref('popperEl')

    const widthStyle = computed(
      () => `max-width: ${props.maxWidth}px!important`
    )

    const getOffset = () => {
      if (!props.arrow)
        return props.offset

      return [0, 10]
    }

    const getConfig = () => {
      const placement = props.direction

      let boundary = document.querySelector(props.boundary)
      if (!boundary)
        boundary = props.boundary

      const offset = getOffset()

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
              offset: getPopperOffset(offset, triggerEl.value)
            }
          },
          {
            name: 'arrow',
            options: {
              element: '.popover_arrow',
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

    const isActive = computed(() => {
      if (props.modelValue || (!props.modelValue && isPopperActive.value))
        return true
      else if (!props.modelValue && !isPopperActive.value)
        return false

      return false
    })

    const onMouseOver = () => {
      emit('update:modelValue', true)
    }
    const onMouseOut = () => {
      emit('update:modelValue', false)
    }

    const handleClickOutside = () => {
      if (!props.dismissible || !props.modelValue)
        return

      emit('update:modelValue', false)
    }

    const destroy = () => {
      off(triggerEl.value, 'mouseover', onMouseOver)
      off(triggerEl.value, 'mouseout', onMouseOut)

      destroyPopper()
    }

    onMounted(() => {
      watchEffect(() => {
        if (props.modelValue) {
          nextTick(() => {
            popperSetup()

            setTimeout(openPopper, 0)
            setTimeout(() => {
              popperEl.value.classList.add('show')

              if (props.hover) {
                on(popperEl.value, 'mouseover', onMouseOver)
                on(popperEl.value, 'mouseout', onMouseOut)
              }
            }, 0)
          })
        }
        else {
          if (!isPopperActive.value)
            return

          setTimeout(() => {
            off(popperEl.value, 'mouseover', onMouseOver)
            off(popperEl.value, 'mouseout', onMouseOut)

            popperEl.value.classList.remove('show')
          }, 0)
          setTimeout(closePopper, 0)
          destroyPopper()
        }
      })
      if (props.hover) {
        on(triggerEl.value, 'mouseover', onMouseOver)
        on(triggerEl.value, 'mouseout', onMouseOut)
      }
    })

    onUnmounted(() => {
      destroy()
    })

    return {
      isActive,
      triggerEl,
      popperEl,
      widthStyle,
      handleClickOutside,
      props
    }
  }
}
</script>
