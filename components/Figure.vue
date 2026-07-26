<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { defaultAssets } from '../utils/assets'

const props = withDefaults(defineProps<{
  src?: string
  alt?: string
  caption?: string
  width?: string
  maxHeight?: string
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  align?: 'left' | 'center' | 'right'
  captionAlign?: 'left' | 'center' | 'right'
  captionSize?: string
}>(), {
  src: '',
  alt: '',
  caption: '',
  width: '70%',
  maxHeight: '27cqw',
  fit: 'contain',
  align: 'center',
  captionAlign: 'center',
  captionSize: '1.05cqw',
})

const slots = useSlots()
const imageSource = computed(() => props.src || defaultAssets.coverImage)
const hasCaption = computed(() => Boolean(props.caption) || Boolean(slots.default))
const figureStyle = computed(() => ({
  '--bupt-figure-width': props.width,
  '--bupt-figure-max-height': props.maxHeight,
  '--bupt-figure-fit': props.fit,
  '--bupt-figure-caption-align': props.captionAlign,
  '--bupt-figure-caption-size': props.captionSize,
}))
</script>

<template>
  <figure
    class="bupt2024-figure"
    :data-align="align"
    :style="figureStyle"
  >
    <img
      class="bupt2024-figure__image"
      :src="imageSource"
      :alt="alt"
    >
    <figcaption v-if="hasCaption" class="bupt2024-figure__caption">
      <slot>{{ caption }}</slot>
    </figcaption>
  </figure>
</template>
