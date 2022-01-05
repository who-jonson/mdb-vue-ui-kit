<template>
  <li v-if="href" class="nav-item" role="presentation">
    <a
      :id="uid"
      v-bind="$attrs"
      ref="item"
      :class="className"
      role="tab"
      :aria-controls="controls"
      :href="href"
      @click.prevent="handleClick(tabId)"
    >
      <slot />
    </a>
  </li>
  <component
    :is="tag"
    v-else
    :id="uid"
    v-bind="$attrs"
    ref="item"
    :class="className"
    role="tab"
    :aria-controls="controls"
    @click.prevent="handleClick(tabId)"
  >
    <slot />
  </component>
</template>

<script>
import { computed, inject, onMounted, ref, watchEffect } from 'vue'

export default {
  name: 'MDBTabItem',
  inheritAttrs: false,
  props: {
    tag: {
      type: String,
      default: 'a'
    },
    tabId: {
      type: String,
      required: true
    },
    href: String
  },
  setup(props) {
    const item = ref('item')

    const className = computed(() => {
      return ['nav-link', isActive.value && 'active']
    })

    const uid = computed(() => {
      return `tab-${props.tabId}`
    })
    const controls = computed(() => {
      return `${props.tabId}`
    })

    const activeTabId = inject('activeTab', false)
    const isActive = ref(
      activeTabId
        && (activeTabId.value === props.tabId
          || (activeTabId && activeTabId === props.tabId))
    )

    const updateActiveTab = inject('updateActiveTab', false)
    watchEffect(
      () =>
        (isActive.value
          = activeTabId
          && (activeTabId.value === props.tabId
            || (activeTabId && activeTabId === props.tabId)))
    )

    const handleClick = () => {
      updateActiveTab(item.value, props.tabId)
    }

    onMounted(() => {
      if (isActive.value && updateActiveTab)
        updateActiveTab(item.value, props.tabId)
    })

    return {
      item,
      uid,
      controls,
      className,
      handleClick,
      props
    }
  }
}
</script>
