<script setup lang="ts">
import ContentFrame from '../internals/ContentFrame.vue'
import type { BuptThemeProps } from '../utils/theme'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<BuptThemeProps>(), {
  showBrand: undefined,
  showDate: undefined,
  showPageNumber: undefined,
  columnDivider: undefined,
})
</script>

<template>
  <ContentFrame :theme-props="props">
    <article class="bupt2024-markdown-body"><slot /></article>
  </ContentFrame>
</template>
