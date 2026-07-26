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
  <ContentFrame :theme-props="props" layout-class="bupt2024-two-cols">
    <article class="bupt2024-markdown-body bupt2024-two-cols__body">
      <slot />
      <div class="bupt2024-two-cols__grid">
        <section class="bupt2024-two-cols__column bupt2024-two-cols__column--left">
          <slot name="left" />
        </section>
        <section class="bupt2024-two-cols__column bupt2024-two-cols__column--right">
          <slot name="right" />
        </section>
      </div>
    </article>
  </ContentFrame>
</template>
