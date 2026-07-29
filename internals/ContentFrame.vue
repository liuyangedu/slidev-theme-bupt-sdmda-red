<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import { computed, unref } from 'vue'
import { useBuptTheme, type BuptThemeProps } from '../utils/theme'

const props = withDefaults(defineProps<{
  themeProps: Readonly<BuptThemeProps>
  layoutClass?: string
}>(), {
  layoutClass: '',
})

const { theme, cssVars, chapterState, sectionTargets } = useBuptTheme(props.themeProps)
const { $page, $nav } = useSlideContext()
const sectionNumbers = ['一', '二', '三', '四', '五', '六']
const displayPageNumber = computed(() => String(unref($page)).padStart(2, '0'))

async function goToSection(index: number) {
  const target = sectionTargets.value[index]
  const nav = unref($nav)
  if (target !== undefined && nav?.go)
    await nav.go(target)
}
</script>

<template>
  <div
    class="slidev-layout bupt2024-layout bupt2024-default"
    :class="layoutClass"
    :data-surface-effect="theme.surfaceEffect"
    :data-column-divider="theme.columnDivider ? 'true' : 'false'"
    :style="cssVars"
  >
    <img
      class="bupt2024-background-photo"
      :src="theme.contentImage"
      alt=""
      :style="{ objectPosition: theme.contentBackgroundPosition }"
    >

    <div class="bupt2024-content-surface">
      <main class="bupt2024-content-inner">
        <slot />
      </main>
    </div>

    <nav class="bupt2024-side-nav" aria-label="章节导航">
      <img class="bupt2024-side-logo" :src="theme.sideLogo" :alt="theme.sideLogoAlt">
      <ol class="bupt2024-side-chapters">
        <li
          v-for="(item, index) in theme.sections"
          :key="`${index}-${item}`"
          :class="`is-${chapterState(index)}`"
        >
          <button
            type="button"
            :disabled="sectionTargets[index] === undefined"
            :title="sectionTargets[index] === undefined
              ? `${item}：未指定起始页`
              : `${item}：跳转到第 ${sectionTargets[index]} 页`"
            :aria-label="sectionTargets[index] === undefined
              ? `第 ${index + 1} 章：${item}，未指定起始页`
              : `跳转到第 ${index + 1} 章：${item}，第 ${sectionTargets[index]} 页`"
            :aria-current="chapterState(index) === 'current' ? 'step' : undefined"
            @mousedown.stop
            @click.stop="goToSection(index)"
          >
            {{ sectionNumbers[index] }}
          </button>
        </li>
      </ol>
    </nav>

    <footer class="bupt2024-status-bar">
      <div class="bupt2024-status-bar__deck">{{ theme.footerTitle }}</div>
      <div class="bupt2024-status-bar__section">{{ theme.section }}</div>
      <div class="bupt2024-status-bar__date">{{ theme.showDate ? theme.date : '' }}</div>
      <div class="bupt2024-status-bar__page">
        <span v-if="theme.showPageNumber">{{ displayPageNumber }}</span>
      </div>
    </footer>
  </div>
</template>
