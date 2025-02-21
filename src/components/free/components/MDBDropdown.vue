<template>
  <component :is="tag" ref="root" :class="className">
    <slot />
  </component>
</template>

<script>
import { computed, onMounted, onUnmounted, provide, ref, watch, watchEffect } from 'vue'
import MDBPopper from '../../utils/MDBPopper.js'
import { off, on } from '../../utils/MDBEventHandlers.js'
import { handleBreakpoints } from '../../utils/MDBBreakpointHandler.js'

export default {
  name: 'MDBDropdown',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    boundary: {
      type: String,
      default: 'clippingParent'
    },
    btnGroup: {
      type: Boolean,
      default: false
    },
    dropup: {
      type: Boolean,
      default: false
    },
    dropend: {
      type: Boolean,
      default: false
    },
    dropstart: {
      type: Boolean,
      default: false
    },
    align: {
      type: [String, Array],
      default: 'start'
    },
    offset: {
      type: [Array, String, Function],
      default: () => [0, 0]
    },
    popperConfig: [null, Object, Function],
    target: String,
    modelValue: Boolean
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const className = computed(() => {
      return [
        props.btnGroup ? 'btn-group' : 'dropdown',
        props.dropup && 'dropup',
        props.dropend && 'dropend',
        props.dropstart && 'dropstart'
      ]
    })

    const {
      setPopper,
      isPopperActive,
      closePopper,
      openPopper,
      updatePopper,
      getPopperOffset
    } = MDBPopper()

    const root = ref('root')
    const triggerEl = ref(null)
    const popperEl = ref(null)
    const windowWidth = ref(0)

    const menuAlignClasses = ref('')
    provide('menuAlignClasses', menuAlignClasses)

    provide('closePopper', closePopper)

    // ------------------- isActive -------------------
    // controlled by modelValue property, triggers DropdownMenu visibilty
    // by toggling its v-if value on or off
    const isActive = ref(props.modelValue)

    watchEffect(() => (isActive.value = props.modelValue))
    provide('isActive', isActive)

    // ------------------- isMenuMounted -------------------
    // controls if DropdownMenu has been mounted into DOM and its element
    // can be targeted by the Popper setup function
    const isMenuMounted = ref(false)
    const dropdownMenu = ref(null)
    const setMenuMountedState = (boolean, menuRef) => {
      isMenuMounted.value = boolean
      dropdownMenu.value = menuRef
    }
    provide('setMenuMountedState', setMenuMountedState)

    // ------------------- Utilites and setups -------------------
    const popperPosition = props.dropup
      ? 'top'
      : props.dropend
        ? 'right'
        : props.dropstart
          ? 'left'
          : 'bottom'

    const getBreakpointValue = () => {
      windowWidth.value = window.innerWidth

      let propsValues = props.align
      if (typeof props.align === 'string')
        propsValues = ['start', props.align]

      const activeBrakpointValue = handleBreakpoints(
        windowWidth.value,
        propsValues
      )

      if (!activeBrakpointValue)
        return

      return activeBrakpointValue.includes('start') ? 'start' : 'end'
    }

    const listenToResize = () => {
      const align = getBreakpointValue()
      updatePopper('placement', `${popperPosition}-${align}`)
    }

    const getConfig = () => {
      if (typeof props.align === 'string') {
        menuAlignClasses.value = `dropdown-menu-${props.align}`
      }
      else {
        menuAlignClasses.value = props.align.map(prop =>
          `dropdown-menu-${prop}`.trim()
        )
      }

      let align = props.align
      if (
        typeof props.align !== 'string'
        || (props.align !== 'start' && props.align !== 'end')
      ) {
        align = getBreakpointValue()
        on(window, 'resize', listenToResize)
      }

      const placement = `${popperPosition}-${align}`

      let boundary = document.querySelector(props.boundary)
      if (!boundary)
        boundary = props.boundary

      const defaultBsPopperConfig = {
        placement,
        modifiers: [
          {
            name: 'preventOverflow',
            options: {
              boundary
            }
          },
          {
            name: 'offset',
            options: {
              offset: getPopperOffset(props.offset, root.value)
            }
          }
        ]
      }

      return {
        ...defaultBsPopperConfig,
        ...(typeof props.popperConfig === 'function'
          ? props.popperConfig(defaultBsPopperConfig)
          : props.popperConfig)
      }
    }

    const popperSetup = () => {
      triggerEl.value = props.target
        ? document.querySelector(props.target)
        : root.value.querySelector('[data-trigger]')
      popperEl.value = dropdownMenu.value

      const config = getConfig()

      setPopper(triggerEl.value, popperEl.value, config)
    }

    const handleMenuMountedState = (mountedValue) => {
      if (mountedValue) {
        popperSetup()

        openPopper()
      }
      else {
        closePopper()
      }
    }

    // ------------------- isPopperActive -------------------
    // controls if Popper is mounted into DOM
    // also Poppers visibility triggers DropdownMenu open/close animation
    // with adding/removing 'show' class

    provide('isPopperActive', isPopperActive)
    provide('externalTarget', props.target)

    // ------------------- handleEscAndOutsideClick -------------------
    // mimics toggling modelValue when user click outside the toggle button
    // or close dropdown with escape button
    const handleEscAndOutsideClick = () => {
      emit('update:modelValue', false)
    }

    provide('handleEscAndOutsideClick', handleEscAndOutsideClick)

    onMounted(() => {
      windowWidth.value = window.innerWidth

      watch(
        () => isMenuMounted.value,
        cur => handleMenuMountedState(cur),
        { immediate: true }
      )
    })

    onUnmounted(() => {
      off(window, 'resize', listenToResize)
    })

    return {
      className,
      root,
      props
    }
  }
}
</script>
