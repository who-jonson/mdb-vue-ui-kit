<template>
  <component
    :is="tag"
    :class="navTogglerClass"
    type="button"
    :aria-controls="target"
    :aria-expanded="isExpanded"
    aria-label="Toggle navigation"
    @click="handleClick"
  >
    <MDBIcon :icon="togglerIcon" :size="togglerSize" :icon-style="iconStyle" />
  </component>
</template>

<script>
import { computed, ref } from 'vue'
import { MDBIcon } from '../../../index'

export default {
  name: 'MDBNavbarToggler',
  components: {
    MDBIcon
  },
  props: {
    tag: {
      type: String,
      default: 'button'
    },
    target: {
      type: String,
      default: '#navbarSupportedContent'
    },
    togglerClass: {
      type: String
    },
    togglerIcon: {
      type: String,
      default: 'bars'
    },
    togglerSize: {
      type: String,
      default: '1x'
    },
    iconStyle: {
      type: String,
      default: 'fas'
    }
  },
  setup(props) {
    const navTogglerClass = computed(() => {
      return ['navbar-toggler', props.togglerClass]
    })

    const isExpanded = ref(false)

    const handleClick = () => {
      isExpanded.value = !isExpanded.value
    }

    return {
      navTogglerClass,
      handleClick,
      isExpanded,
      props
    }
  }
}
</script>
