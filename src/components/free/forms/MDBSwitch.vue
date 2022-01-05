<template>
  <component :is="tag" :class="wrapperClassName">
    <input
      :id="uid"
      type="checkbox"
      :class="inputClassName"
      v-bind="$attrs"
      :checked="inputValue"
      @change="handleChange"
    >
    <label :class="labelClassName" :for="uid">{{ label }}</label>
  </component>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { getUID } from '../../utils/getUID'

export default {
  name: 'MDBSwitch',
  inheritAttrs: false,
  props: {
    id: String,
    inputClass: String,
    label: String,
    labelClass: String,
    modelValue: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'div'
    },
    wrapperClass: String
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inputValue = ref(props.modelValue)
    const uid = props.id || getUID('MDBSwitch-')

    const wrapperClassName = computed(() => {
      return ['form-check form-switch', props.wrapperClass]
    })
    const inputClassName = computed(() => {
      return ['form-check-input', props.inputClass]
    })
    const labelClassName = computed(() => {
      return ['form-check-label', props.labelClass]
    })

    function handleChange() {
      inputValue.value = !inputValue.value
      emit('update:modelValue', inputValue.value)
    }

    watch(
      () => props.modelValue,
      value => (inputValue.value = value)
    )

    return {
      inputValue,
      uid,
      wrapperClassName,
      inputClassName,
      labelClassName,
      handleChange
    }
  }
}
</script>
