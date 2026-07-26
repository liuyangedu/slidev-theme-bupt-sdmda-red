<script setup lang="ts">
import { computed } from 'vue'
import { useBuptTheme, type BuptThemeProps } from '../utils/theme'

const props = withDefaults(defineProps<BuptThemeProps>(), {
  showBrand: undefined,
  showDate: undefined,
  showPageNumber: undefined,
})
const { theme, cssVars } = useBuptTheme(props)

const displayTitle = computed(() => props.title ?? theme.value.coverTitle)
</script>

<template>
  <div
    class="slidev-layout bupt2024-layout bupt2024-cover"
    :data-surface-effect="theme.surfaceEffect"
    :style="cssVars"
  >
    <img
      class="bupt2024-background-photo"
      :src="theme.coverImage"
      alt=""
      :style="{ objectPosition: theme.coverBackgroundPosition }"
    >
    <div class="bupt2024-cover__curve" aria-hidden="true" />
    <div class="bupt2024-cover__mask" aria-hidden="true" />

    <div v-if="theme.showBrand" class="bupt2024-brand-pair bupt2024-cover__brand">
      <img class="bupt2024-brand-pair__emblem" :src="theme.emblem" :alt="theme.emblemAlt">
      <img class="bupt2024-brand-pair__wordmark" :src="theme.wordmark" :alt="theme.wordmarkAlt">
    </div>

    <section class="bupt2024-cover__copy">
      <h1>{{ displayTitle }}</h1>
      <p v-if="theme.subtitle" class="bupt2024-cover__subtitle">{{ theme.subtitle }}</p>
      <div v-if="theme.presenter || theme.organization || (theme.showDate && theme.date)" class="bupt2024-cover__meta">
        <span v-if="theme.presenter">{{ theme.presenter }}</span>
        <span v-if="theme.organization">{{ theme.organization }}</span>
        <span v-if="theme.showDate && theme.date" class="bupt2024-cover__date">{{ theme.date }}</span>
      </div>
      <div class="bupt2024-cover__extra"><slot /></div>
    </section>
  </div>
</template>
