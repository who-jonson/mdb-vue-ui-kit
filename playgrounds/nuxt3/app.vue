<template>
  <div>
    <Header />

    <NuxtPage />
  </div>
</template>

<script lang="ts">
import Header from '~/components/Header.vue'

export default defineComponent({
  components: {
    Header
  }
})
</script>
