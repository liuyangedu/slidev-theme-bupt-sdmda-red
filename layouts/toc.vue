<script setup lang="ts">
import { computed } from 'vue'
import { useBuptTheme, type BuptThemeProps } from '../utils/theme'

const props = withDefaults(defineProps<BuptThemeProps>(), {
  showBrand: undefined,
  showDate: undefined,
  showPageNumber: undefined,
})
const { theme, cssVars, chapterState } = useBuptTheme(props)

const displayTitle = computed(() => props.title ?? theme.value.tocTitle)
const sectionNumbers = ['一', '二', '三', '四', '五', '六']
</script>

<template>
  <div
    class="slidev-layout bupt2024-layout bupt2024-toc"
    :data-surface-effect="theme.surfaceEffect"
    :style="cssVars"
  >
    <img
      class="bupt2024-background-photo"
      :src="theme.tocImage"
      alt=""
      :style="{ objectPosition: theme.tocBackgroundPosition }"
    >

    <section class="bupt2024-toc__panel">
      <div class="bupt2024-toc__surface" aria-hidden="true" />
      <svg
        class="bupt2024-toc__frame"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line class="bupt2024-toc__frame-line bupt2024-toc__frame-line--left" x1="121.2" y1="-10" x2="-1.2" y2="1010" />
        <line class="bupt2024-toc__frame-line bupt2024-toc__frame-line--right" x1="878.8" y1="-10" x2="1001.2" y2="1010" />
      </svg>
      <h1>{{ displayTitle }}</h1>
      <div class="bupt2024-toc__list-region">
        <ol class="bupt2024-toc__list">
          <li
            v-for="(item, index) in theme.sections"
            :key="`${index}-${item}`"
            :class="`is-${chapterState(index)}`"
            :aria-current="chapterState(index) === 'current' ? 'step' : undefined"
          >
            <span class="bupt2024-toc__number">{{ sectionNumbers[index] }}、</span>
            <span>{{ item }}</span>
          </li>
        </ol>
        <div class="bupt2024-toc__extra"><slot /></div>
      </div>
    </section>
  </div>
</template>
