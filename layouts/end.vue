<script setup lang="ts">
import { computed } from 'vue'
import { useBuptTheme, type BuptThemeProps } from '../utils/theme'

const props = withDefaults(defineProps<BuptThemeProps>(), {
  showBrand: undefined,
  showDate: undefined,
  showPageNumber: undefined,
})
const { theme, cssVars } = useBuptTheme(props)

const displayTitle = computed(() => props.title ?? theme.value.endTitle)
</script>

<template>
  <div
    class="slidev-layout bupt2024-layout bupt2024-end"
    :data-surface-effect="theme.surfaceEffect"
    :style="cssVars"
  >
    <img
      class="bupt2024-background-photo"
      :src="theme.endImage"
      alt=""
      :style="{ objectPosition: theme.endBackgroundPosition }"
    >
    <div class="bupt2024-end__overlay" aria-hidden="true" />
    <div class="bupt2024-end__curve" aria-hidden="true" />

    <section class="bupt2024-end__copy">
      <h1 v-if="displayTitle">{{ displayTitle }}</h1>
      <div class="bupt2024-end__extra"><slot /></div>
    </section>

    <div v-if="theme.showBrand" class="bupt2024-brand-pair bupt2024-end__brand">
      <img class="bupt2024-brand-pair__emblem" :src="theme.emblem" :alt="theme.emblemAlt">
      <img class="bupt2024-brand-pair__wordmark" :src="theme.wordmark" :alt="theme.wordmarkAlt">
    </div>
  </div>
</template>
