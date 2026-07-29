import { computed, unref } from 'vue'
import { useSlideContext } from '@slidev/client'
import { defaultAssets } from './assets'

export interface BuptThemeProps {
  title?: string
  deckTitle?: string
  coverTitle?: string
  tocTitle?: string
  endTitle?: string
  subtitle?: string
  presenter?: string
  presenterName?: string
  organization?: string
  date?: string
  sections?: string[]
  activeSection?: number | string
  section?: string
  showDate?: boolean
  showPageNumber?: boolean
  showBrand?: boolean
  primary?: string
  primaryDeep?: string
  primaryWine?: string
  primaryBright?: string
  primaryTint?: string
  primaryShadow?: string
  onPrimary?: string
  ink900?: string
  ink700?: string
  ink500?: string
  ink400?: string
  line?: string
  canvas?: string
  surface?: string
  card?: string
  accentGold?: string
  accentSteel?: string
  maskColor?: string
  curveColor?: string
  curveWidth?: string
  surfaceEffect?: string
  overlayOpacity?: number | string
  glassBlur?: string
  glassSaturation?: number | string
  glassBrightness?: number | string
  glassHighlightColor?: string
  glassHighlightOpacity?: number | string
  glassShadowColor?: string
  glassShadowOpacity?: number | string
  glassGradientAngle?: string
  backgroundOpacity?: number | string
  coverImage?: string
  tocImage?: string
  contentImage?: string
  endImage?: string
  emblem?: string
  wordmark?: string
  navLogo?: string
  sideLogo?: string
  emblemAlt?: string
  wordmarkAlt?: string
  navLogoAlt?: string
  sideLogoAlt?: string
  coverBackgroundPosition?: string
  coverBrandTop?: string
  coverBrandRight?: string
  coverCopyTop?: string
  coverCopyLeft?: string
  coverCopyWidth?: string
  coverMaskExpansion?: string
  coverCurveCenterX?: string
  coverCurveCenterY?: string
  coverCurveRadiusX?: string
  coverCurveRadiusY?: string
  tocBackgroundPosition?: string
  contentBackgroundPosition?: string
  endBackgroundPosition?: string
  endCurveCenterX?: string
  endCurveCenterY?: string
  endCurveRadiusX?: string
  endCurveRadiusY?: string
  endMaskExpansion?: string
  endBrandBottom?: string
  endBrandLeft?: string
  topNavHeight?: string
  topNavLogoLeft?: string
  topNavLogoSize?: string
  topNavRangeWidth?: string
  topNavRangeCenterX?: string
  topNavGap?: string
  topNavItemWidth?: string
  topNavItemHeight?: string
  topNavActiveWidth?: string
  topNavTextSize?: string
  topNavTitleGap?: string
  topNavProgressColor?: string
  statusBarHeight?: string
  statusTextSize?: string
  statusTextColor?: string
  statusBarRight?: string
  statusBarBottom?: string
  contentPaddingTop?: string
  contentPaddingRight?: string
  contentPaddingBottom?: string
  contentPaddingLeft?: string
  contentMaxWidth?: string
  mermaidBackground?: string
  columnRatio?: string
  columnGap?: string
  columnAlign?: string
  columnDivider?: boolean
  tocPanelWidth?: string
  tocItemSize?: string
  tocListTop?: string
  tocListBottom?: string
  tocListMinWidth?: string
  tocPanelTop?: string
  tocPanelHeight?: string
  tocFrameTopInset?: string
  tocFrameBottomInset?: string
  tocFrameExtension?: string
  fontSans?: string
  fontSerif?: string
  coverTitleSize?: string
  coverSubtitleSize?: string
  coverMetaSize?: string
  slideTitleSize?: string
  bodySize?: string
}

type ThemeRecord = Record<string, unknown>

function formatToday() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

function hasValue(record: ThemeRecord, key: string) {
  return Object.prototype.hasOwnProperty.call(record, key)
    && record[key] !== undefined
    && record[key] !== null
}

export function useBuptTheme(props: Readonly<BuptThemeProps>) {
  const { $slidev, $nav, $page } = useSlideContext()

  const themeConfig = computed<ThemeRecord>(() =>
    ($slidev.configs.themeConfig ?? {}) as ThemeRecord,
  )

  function resolve<T>(key: keyof BuptThemeProps, fallback: T): T {
    const pageValue = props[key]
    if (pageValue !== undefined && pageValue !== null)
      return pageValue as T
    if (hasValue(themeConfig.value, key))
      return themeConfig.value[key] as T
    return fallback
  }

  const theme = computed(() => {
    const requestedSurfaceEffect = String(resolve<string>('surfaceEffect', 'plain')).toLowerCase()
    const surfaceEffect = requestedSurfaceEffect === 'glass' ? 'glass' : 'plain'
    const configuredSections = resolve<string[]>('sections', [
      '第一章',
      '第二章',
      '第三章',
      '第四章',
    ])
    const sections = Array.isArray(configuredSections)
      ? configuredSections.slice(0, 6).map(String)
      : ['第一章', '第二章', '第三章', '第四章']

    const deckTitle = resolve<string>(
      'deckTitle',
      String($slidev.configs.title ?? '演示标题'),
    )

    const hasPageSection = props.section !== undefined && props.section !== null
    const hasPageActiveSection = props.activeSection !== undefined && props.activeSection !== null
    let inheritedSection: unknown
    let inheritedActiveSection: unknown

    if (!hasPageSection && !hasPageActiveSection) {
      const nav = unref($nav)
      const slides = nav?.slides ? unref(nav.slides) : []
      const currentPage = Number(unref($page))

      for (let index = Math.min(currentPage - 2, slides.length - 1); index >= 0; index -= 1) {
        const frontmatter = slides[index]?.meta?.slide?.frontmatter as ThemeRecord | undefined
        if (!frontmatter)
          continue

        if (hasValue(frontmatter, 'section') || hasValue(frontmatter, 'activeSection')) {
          inheritedSection = hasValue(frontmatter, 'section') ? frontmatter.section : undefined
          inheritedActiveSection = hasValue(frontmatter, 'activeSection')
            ? frontmatter.activeSection
            : undefined
          break
        }
      }
    }

    const sectionName = hasPageSection
      ? String(props.section)
      : inheritedSection !== undefined
        ? String(inheritedSection)
        : resolve<string>('section', '')
    const sectionIndex = sections.findIndex(item => item === sectionName)
    const rawActive = sectionIndex >= 0
      ? sectionIndex + 1
      : Number(
          hasPageActiveSection
            ? props.activeSection
            : inheritedActiveSection !== undefined
              ? inheritedActiveSection
              : resolve<number | string>('activeSection', 1),
        )
    const activeSection = Math.min(
      Math.max(Number.isFinite(rawActive) ? Math.trunc(rawActive) : 1, 1),
      Math.max(sections.length, 1),
    )

    const dateValue = resolve<string>('date', formatToday())

    return {
      deckTitle,
      coverTitle: resolve<string>('coverTitle', deckTitle),
      tocTitle: resolve<string>('tocTitle', '目录'),
      endTitle: resolve<string>('endTitle', ''),
      subtitle: resolve<string>('subtitle', ''),
      presenter: resolve<string>('presenterName', resolve<string>('presenter', '')),
      organization: resolve<string>('organization', '数字媒体与设计艺术学院'),
      date: dateValue === 'auto' ? formatToday() : dateValue,
      sections,
      activeSection,
      section: sectionName || sections[activeSection - 1] || '',
      showDate: resolve<boolean>('showDate', true),
      showPageNumber: resolve<boolean>('showPageNumber', true),
      showBrand: resolve<boolean>('showBrand', true),
      primary: resolve<string>('primary', '#c2272b'),
      primaryDeep: resolve<string>('primaryDeep', '#9e1c20'),
      primaryWine: resolve<string>('primaryWine', '#7a1418'),
      primaryBright: resolve<string>('primaryBright', '#e2474b'),
      primaryTint: resolve<string>('primaryTint', '#f8e7e7'),
      primaryShadow: resolve<string>('primaryShadow', '#8a181c'),
      onPrimary: resolve<string>('onPrimary', '#ffffff'),
      ink900: resolve<string>('ink900', '#1b1a18'),
      ink700: resolve<string>('ink700', '#3c3a37'),
      ink500: resolve<string>('ink500', '#6e6a64'),
      ink400: resolve<string>('ink400', '#938e87'),
      line: resolve<string>('line', '#e5dfd6'),
      canvas: resolve<string>('canvas', '#fbfaf7'),
      surface: resolve<string>('surface', '#f3efe9'),
      card: resolve<string>('card', '#ffffff'),
      accentGold: resolve<string>('accentGold', '#b79a5e'),
      accentSteel: resolve<string>('accentSteel', '#98a0a6'),
      maskColor: resolve<string>('maskColor', '#ffffff'),
      curveColor: resolve<string>('curveColor', resolve<string>('primary', '#c2272b')),
      curveWidth: resolve<string>('curveWidth', '0.72cqw'),
      surfaceEffect,
      overlayOpacity: resolve<number | string>('overlayOpacity', surfaceEffect === 'glass' ? 0.68 : 0.94),
      glassBlur: resolve<string>('glassBlur', '1.35cqw'),
      glassSaturation: resolve<number | string>('glassSaturation', 1.25),
      glassBrightness: resolve<number | string>('glassBrightness', 1.06),
      glassHighlightColor: resolve<string>('glassHighlightColor', '#ffffff'),
      glassHighlightOpacity: resolve<number | string>('glassHighlightOpacity', 0.34),
      glassShadowColor: resolve<string>('glassShadowColor', '#7c8794'),
      glassShadowOpacity: resolve<number | string>('glassShadowOpacity', 0.10),
      glassGradientAngle: resolve<string>('glassGradientAngle', '135deg'),
      backgroundOpacity: resolve<number | string>('backgroundOpacity', 1),
      coverImage: resolve<string>('coverImage', defaultAssets.coverImage),
      tocImage: resolve<string>('tocImage', defaultAssets.tocImage),
      contentImage: resolve<string>('contentImage', defaultAssets.contentImage),
      endImage: resolve<string>('endImage', defaultAssets.endImage),
      emblem: resolve<string>('emblem', defaultAssets.emblem),
      wordmark: resolve<string>('wordmark', defaultAssets.wordmark),
      navLogo: resolve<string>('navLogo', resolve<string>('sideLogo', defaultAssets.sideLogo)),
      emblemAlt: resolve<string>('emblemAlt', '北京邮电大学校徽'),
      wordmarkAlt: resolve<string>('wordmarkAlt', '数字媒体与设计艺术学院'),
      navLogoAlt: resolve<string>('navLogoAlt', resolve<string>('sideLogoAlt', '数字媒体与设计艺术学院标识')),
      coverBackgroundPosition: resolve<string>('coverBackgroundPosition', 'top center'),
      coverBrandTop: resolve<string>('coverBrandTop', '1.55cqw'),
      coverBrandRight: resolve<string>('coverBrandRight', '1.75cqw'),
      coverCopyTop: resolve<string>('coverCopyTop', '49.5%'),
      coverCopyLeft: resolve<string>('coverCopyLeft', '3.9cqw'),
      coverCopyWidth: resolve<string>('coverCopyWidth', '56cqw'),
      coverMaskExpansion: resolve<string>('coverMaskExpansion', '0.25%'),
      coverCurveCenterX: resolve<string>('coverCurveCenterX', '100%'),
      coverCurveCenterY: resolve<string>('coverCurveCenterY', '100%'),
      coverCurveRadiusX: resolve<string>('coverCurveRadiusX', '70%'),
      coverCurveRadiusY: resolve<string>('coverCurveRadiusY', '50%'),
      tocBackgroundPosition: resolve<string>('tocBackgroundPosition', 'top center'),
      contentBackgroundPosition: resolve<string>('contentBackgroundPosition', 'top center'),
      endBackgroundPosition: resolve<string>('endBackgroundPosition', 'top center'),
      endCurveCenterX: resolve<string>('endCurveCenterX', '50%'),
      endCurveCenterY: resolve<string>('endCurveCenterY', '-30%'),
      endCurveRadiusX: resolve<string>('endCurveRadiusX', '70%'),
      endCurveRadiusY: resolve<string>('endCurveRadiusY', '68%'),
      endMaskExpansion: resolve<string>('endMaskExpansion', '0.3%'),
      endBrandBottom: resolve<string>('endBrandBottom', '1.55cqw'),
      endBrandLeft: resolve<string>('endBrandLeft', '1.75cqw'),
      topNavHeight: resolve<string>('topNavHeight', '3.6cqw'),
      topNavLogoLeft: resolve<string>('topNavLogoLeft', '1.2cqw'),
      topNavLogoSize: resolve<string>('topNavLogoSize', '2.65cqw'),
      topNavRangeWidth: resolve<string>('topNavRangeWidth', '82cqw'),
      topNavRangeCenterX: resolve<string>('topNavRangeCenterX', '55.5%'),
      topNavGap: resolve<string>('topNavGap', '0.65cqw'),
      topNavItemWidth: resolve<string>('topNavItemWidth', '3.5cqw'),
      topNavItemHeight: resolve<string>('topNavItemHeight', '2.35cqw'),
      topNavActiveWidth: resolve<string>('topNavActiveWidth', '18cqw'),
      topNavTextSize: resolve<string>('topNavTextSize', '1.2cqw'),
      topNavTitleGap: resolve<string>('topNavTitleGap', '0.8cqw'),
      topNavProgressColor: resolve<string>('topNavProgressColor', 'color-mix(in srgb, var(--bupt-primary) 24%, white)'),
      statusBarHeight: resolve<string>('statusBarHeight', '1.65cqw'),
      statusTextSize: resolve<string>('statusTextSize', '1.05cqw'),
      statusTextColor: resolve<string>('statusTextColor', resolve<string>('ink700', '#3c3a37')),
      statusBarRight: resolve<string>('statusBarRight', '1.25cqw'),
      statusBarBottom: resolve<string>('statusBarBottom', '0.35cqw'),
      contentPaddingTop: resolve<string>('contentPaddingTop', '2.8cqw'),
      contentPaddingRight: resolve<string>('contentPaddingRight', '4.8cqw'),
      contentPaddingBottom: resolve<string>('contentPaddingBottom', '4.25cqw'),
      contentPaddingLeft: resolve<string>('contentPaddingLeft', '4.8cqw'),
      contentMaxWidth: resolve<string>('contentMaxWidth', '100%'),
      mermaidBackground: resolve<string>('mermaidBackground', 'var(--slidev-code-background)'),
      columnRatio: resolve<string>('columnRatio', '1fr 1fr'),
      columnGap: resolve<string>('columnGap', '3cqw'),
      columnAlign: resolve<string>('columnAlign', 'start'),
      columnDivider: resolve<boolean>('columnDivider', false),
      tocPanelWidth: resolve<string>('tocPanelWidth', '64cqw'),
      tocItemSize: resolve<string>('tocItemSize', '2cqw'),
      tocListTop: resolve<string>('tocListTop', '14cqw'),
      tocListBottom: resolve<string>('tocListBottom', '5cqw'),
      tocListMinWidth: resolve<string>('tocListMinWidth', '20cqw'),
      tocPanelTop: resolve<string>('tocPanelTop', '-1%'),
      tocPanelHeight: resolve<string>('tocPanelHeight', '102%'),
      tocFrameTopInset: resolve<string>('tocFrameTopInset', '12%'),
      tocFrameBottomInset: resolve<string>('tocFrameBottomInset', '0%'),
      tocFrameExtension: resolve<string>('tocFrameExtension', '0.12%'),
      fontSans: resolve<string>('fontSans', '"Microsoft YaHei", "Noto Sans CJK SC", "PingFang SC", sans-serif'),
      fontSerif: resolve<string>('fontSerif', 'Georgia, "Times New Roman", serif'),
      coverTitleSize: resolve<string>('coverTitleSize', '4.6cqw'),
      coverSubtitleSize: resolve<string>('coverSubtitleSize', '2.45cqw'),
      coverMetaSize: resolve<string>('coverMetaSize', '1.75cqw'),
      slideTitleSize: resolve<string>('slideTitleSize', '3.8cqw'),
      bodySize: resolve<string>('bodySize', '1.55cqw'),
    }
  })

  const cssVars = computed(() => {
    const value = theme.value
    return {
      '--bupt-primary': value.primary,
      '--bupt-primary-deep': value.primaryDeep,
      '--bupt-primary-wine': value.primaryWine,
      '--bupt-primary-bright': value.primaryBright,
      '--bupt-primary-tint': value.primaryTint,
      '--bupt-primary-shadow': value.primaryShadow,
      '--bupt-on-primary': value.onPrimary,
      '--bupt-ink-900': value.ink900,
      '--bupt-ink-700': value.ink700,
      '--bupt-ink-500': value.ink500,
      '--bupt-ink-400': value.ink400,
      '--bupt-line': value.line,
      '--bupt-canvas': value.canvas,
      '--bupt-surface': value.surface,
      '--bupt-card': value.card,
      '--bupt-accent-gold': value.accentGold,
      '--bupt-accent-steel': value.accentSteel,
      '--bupt-mask-color': value.maskColor,
      '--bupt-curve-color': value.curveColor,
      '--bupt-curve-width': value.curveWidth,
      '--bupt-overlay-opacity': String(value.overlayOpacity),
      '--bupt-glass-blur': value.glassBlur,
      '--bupt-glass-saturation': String(value.glassSaturation),
      '--bupt-glass-brightness': String(value.glassBrightness),
      '--bupt-glass-highlight-color': value.glassHighlightColor,
      '--bupt-glass-highlight-opacity': String(value.glassHighlightOpacity),
      '--bupt-glass-shadow-color': value.glassShadowColor,
      '--bupt-glass-shadow-opacity': String(value.glassShadowOpacity),
      '--bupt-glass-gradient-angle': value.glassGradientAngle,
      '--bupt-background-opacity': String(value.backgroundOpacity),
      '--bupt-top-nav-height': value.topNavHeight,
      '--bupt-top-nav-logo-left': value.topNavLogoLeft,
      '--bupt-top-nav-logo-size': value.topNavLogoSize,
      '--bupt-top-nav-range-width': value.topNavRangeWidth,
      '--bupt-top-nav-range-center-x': value.topNavRangeCenterX,
      '--bupt-top-nav-gap': value.topNavGap,
      '--bupt-top-nav-item-width': value.topNavItemWidth,
      '--bupt-top-nav-item-height': value.topNavItemHeight,
      '--bupt-top-nav-active-width': value.topNavActiveWidth,
      '--bupt-top-nav-text-size': value.topNavTextSize,
      '--bupt-top-nav-title-gap': value.topNavTitleGap,
      '--bupt-top-nav-progress-color': value.topNavProgressColor,
      '--bupt-status-bar-height': value.statusBarHeight,
      '--bupt-status-text-size': value.statusTextSize,
      '--bupt-status-text-color': value.statusTextColor,
      '--bupt-status-bar-right': value.statusBarRight,
      '--bupt-status-bar-bottom': value.statusBarBottom,
      '--bupt-content-padding-top': value.contentPaddingTop,
      '--bupt-content-padding-right': value.contentPaddingRight,
      '--bupt-content-padding-bottom': value.contentPaddingBottom,
      '--bupt-content-padding-left': value.contentPaddingLeft,
      '--bupt-content-max-width': value.contentMaxWidth,
      '--bupt-mermaid-background': value.mermaidBackground,
      '--bupt-column-ratio': value.columnRatio,
      '--bupt-column-gap': value.columnGap,
      '--bupt-column-align': value.columnAlign,
      '--bupt-toc-panel-width': value.tocPanelWidth,
      '--bupt-toc-item-size': value.tocItemSize,
      '--bupt-toc-list-top': value.tocListTop,
      '--bupt-toc-list-bottom': value.tocListBottom,
      '--bupt-toc-list-min-width': value.tocListMinWidth,
      '--bupt-font-sans': value.fontSans,
      '--bupt-font-serif': value.fontSerif,
      '--bupt-cover-title-size': value.coverTitleSize,
      '--bupt-cover-subtitle-size': value.coverSubtitleSize,
      '--bupt-cover-meta-size': value.coverMetaSize,
      '--bupt-cover-brand-top': value.coverBrandTop,
      '--bupt-cover-brand-right': value.coverBrandRight,
      '--bupt-cover-copy-top': value.coverCopyTop,
      '--bupt-cover-copy-left': value.coverCopyLeft,
      '--bupt-cover-copy-width': value.coverCopyWidth,
      '--bupt-cover-mask-expansion': value.coverMaskExpansion,
      '--bupt-cover-curve-center-x': value.coverCurveCenterX,
      '--bupt-cover-curve-center-y': value.coverCurveCenterY,
      '--bupt-cover-curve-radius-x': value.coverCurveRadiusX,
      '--bupt-cover-curve-radius-y': value.coverCurveRadiusY,
      '--bupt-toc-panel-top': value.tocPanelTop,
      '--bupt-toc-panel-height': value.tocPanelHeight,
      '--bupt-toc-frame-top-inset': value.tocFrameTopInset,
      '--bupt-toc-frame-bottom-inset': value.tocFrameBottomInset,
      '--bupt-toc-frame-extension': value.tocFrameExtension,
      '--bupt-end-curve-center-x': value.endCurveCenterX,
      '--bupt-end-curve-center-y': value.endCurveCenterY,
      '--bupt-end-curve-radius-x': value.endCurveRadiusX,
      '--bupt-end-curve-radius-y': value.endCurveRadiusY,
      '--bupt-end-mask-expansion': value.endMaskExpansion,
      '--bupt-end-brand-bottom': value.endBrandBottom,
      '--bupt-end-brand-left': value.endBrandLeft,
      '--bupt-slide-title-size': value.slideTitleSize,
      '--bupt-body-size': value.bodySize,
    }
  })

  function chapterState(index: number) {
    const chapter = index + 1
    if (chapter < theme.value.activeSection)
      return 'done'
    if (chapter === theme.value.activeSection)
      return 'current'
    return 'upcoming'
  }

  const sectionTargets = computed<(number | undefined)[]>(() => {
    const nav = unref($nav)
    const slides = nav?.slides ? unref(nav.slides) : []
    const sections = theme.value.sections
    const targets = Array<number | undefined>(sections.length).fill(undefined)

    for (const slide of slides) {
      const frontmatter = slide?.meta?.slide?.frontmatter as ThemeRecord | undefined
      if (!frontmatter)
        continue

      let targetIndex = -1
      if (hasValue(frontmatter, 'section'))
        targetIndex = sections.findIndex(item => item === String(frontmatter.section))

      if (targetIndex < 0 && hasValue(frontmatter, 'activeSection')) {
        const rawActive = Number(frontmatter.activeSection)
        if (Number.isFinite(rawActive))
          targetIndex = Math.trunc(rawActive) - 1
      }

      if (
        targetIndex >= 0
        && targetIndex < sections.length
        && targets[targetIndex] === undefined
      ) {
        targets[targetIndex] = Number(slide.no)
      }
    }

    return targets
  })

  async function goToSection(index: number) {
    const target = sectionTargets.value[index]
    const nav = unref($nav)
    if (target !== undefined && nav?.go)
      await nav.go(target)
  }

  const sectionProgress = computed(() => {
    const nav = unref($nav)
    const slides = nav?.slides ? unref(nav.slides) : []
    const targets = sectionTargets.value
    const currentIndex = theme.value.activeSection - 1
    const startPage = targets[currentIndex]

    if (startPage === undefined)
      return 0

    let nextStartPage: number | undefined
    for (let index = currentIndex + 1; index < targets.length; index += 1) {
      if (targets[index] !== undefined) {
        nextStartPage = targets[index]
        break
      }
    }

    const endPage = (nextStartPage ?? slides.length + 1) - 1
    const contentPages = slides
      .filter((slide) => {
        const pageNumber = Number(slide.no)
        const frontmatter = slide?.meta?.slide?.frontmatter as ThemeRecord | undefined
        const layout = String(frontmatter?.layout ?? 'default')
        return pageNumber >= startPage
          && pageNumber <= endPage
          && layout !== 'cover'
          && layout !== 'toc'
          && layout !== 'end'
      })
      .map(slide => Number(slide.no))

    if (contentPages.length === 0)
      return 0
    if (contentPages.length === 1)
      return 1

    const currentPage = Number(unref($page))
    const currentPosition = contentPages.indexOf(currentPage)
    if (currentPosition < 0)
      return currentPage < contentPages[0] ? 0 : 1

    return currentPosition / (contentPages.length - 1)
  })

  return {
    theme,
    cssVars,
    chapterState,
    sectionTargets,
    goToSection,
    sectionProgress,
  }
}
