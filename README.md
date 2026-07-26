# slidev-theme-bupt-sdmda-red

`slidev-theme-bupt-sdmda-red` 是一个独立的本地 Slidev 主题，依据项目中的 `主题设计.docx`、四个 HTML 样本和 `palette.html` 实现。主题包含 `cover`、`toc`、`default`、`two-cols`、`end` 五种布局，并提供图片与图注组件 `Figure`。

主题要求 Slidev `>=52.18.0`，默认使用 16:9、980px 逻辑画布和浅色模式，并在 `package.json` 的 Slidev 主题元数据中显式声明使用 `shiki` 语法高亮器。

## 启用主题

在演示文稿首段 headmatter 中指定本地主题：

```yaml
---
theme: ./slidev-theme-bupt-sdmda-red
title: Unity 艺术课程设计
themeConfig:
  sections: [项目背景, 设计目标, 视觉概念, 场景构建]
---
```

`theme-main2024` 与本主题互不引用。Slidev 只会加载 `theme:` 指向的主题目录，因此两个主题可以安全共存。

## 参数优先级

所有主题参数都遵循同一顺序：

```text
当前页 frontmatter > 全局 themeConfig > 主题内置默认值
```

空字符串、`false` 和 `0` 都会被视为有效的页面覆盖值。例如可以用 `showDate: false` 隐藏某一页日期，用 `organization: ''` 隐藏封面单位。

同一个参数既可以写进首段的 `themeConfig` 作为全局默认值，也可以写在任意页面的 frontmatter 外层作为单页覆盖。例如：

```yaml
---
themeConfig:
  surfaceEffect: glass
  overlayOpacity: 0.72
---

---
layout: toc
overlayOpacity: 0.86
---
```

以上写法会让所有页面默认使用 `glass + 0.72`，但目录页临时使用 `glass + 0.86`。`surfaceEffect`、`overlayOpacity` 以及其他主题参数的作用域规则完全相同。

## 表面材质

封面、目录、内容和结束页共用同一套表面材质参数。主题默认使用原有白色半透明遮罩；在演示文稿首段的 `themeConfig` 中设置一次即可让全部页面切换为静态玻璃：

```yaml
---
theme: ./slidev-theme-bupt-sdmda-red
themeConfig:
  surfaceEffect: glass
---
```

也可以在任意页面的 frontmatter 中临时覆盖：

```yaml
---
layout: default
surfaceEffect: plain
---
```

`surfaceEffect` 支持 `plain` 和 `glass`。玻璃模式使用背景模糊、饱和度、亮度及静态高光/暗部渐变，不依赖图片素材。`overlayOpacity` 在两种模式下都控制白色色调强度；未显式设置时，`plain` 默认 `0.94`，`glass` 默认 `0.68`。内容页主标题下方的细分割线仅在 `plain` 模式显示，`glass` 模式会保留原有间距但隐藏线条。

## 页面示例

### 封面

```yaml
---
layout: cover
title: Unity 艺术课程设计
subtitle: 从校园意象到数字场景
presenterName: 汇报人：张同学
organization: 数字媒体与设计艺术学院
date: 2026.07.26
---
```

封面可用参数：

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| `title` | 演示文稿顶层 `title` | 封面主标题 |
| `subtitle` | 空 | 封面副标题 |
| `presenterName` | 空 | 汇报人 |
| `organization` | `数字媒体与设计艺术学院` | 封面单位文字 |
| `date` | 当天 | 封面日期 |
| `showDate` | `true` | 是否显示日期 |
| `showBrand` | `true` | 是否显示右上校徽和院徽 |
| `coverImage` | 主题内置 `cover.png` | 封面背景图 |
| `coverBackgroundPosition` | `top center` | 背景裁切位置 |
| `surfaceEffect` | `plain` | 表面材质：`plain` 或 `glass` |
| `overlayOpacity` | `plain: 0.94` / `glass: 0.68` | 所有布局表面白色色调强度，可在当前页临时覆盖 |
| `coverMaskExpansion` | `0.25%` | 让遮罩渐变刚好藏入红色弧线内部的接缝补偿 |
| `coverCurveCenterX` | `100%` | 封面弧线椭圆中心的水平位置 |
| `coverCurveCenterY` | `100%` | 封面弧线椭圆中心的垂直位置 |
| `coverCurveRadiusX` | `70%` | 封面弧线椭圆的水平半径 |
| `coverCurveRadiusY` | `50%` | 封面弧线椭圆的垂直半径 |
| `coverBrandTop` | `1.55cqw` | 右上角 Logo 与顶部的距离 |
| `coverBrandRight` | `1.75cqw` | 右上角 Logo 与右侧的距离 |
| `coverCopyTop` | `49.5%` | 标题信息组的垂直中心位置 |
| `coverCopyLeft` | `3.9cqw` | 标题信息组的左侧位置 |
| `coverCopyWidth` | `56cqw` | 标题信息组宽度 |
| `coverTitleSize` | `4.6cqw` | 封面标题字号 |
| `coverSubtitleSize` | `2.45cqw` | 封面副标题字号 |
| `coverMetaSize` | `1.75cqw` | 汇报人、学院和日期字号 |
| `emblem` | 主题内置 `xh.png` | 校徽图片 |
| `wordmark` | 主题内置 `yh1.png` | 学院标识图片 |

### 目录

目录和左侧导航都由 `sections` 生成。当前章节由 `activeSection` 或 `section` 明确指定，主题不会自动判断演示进度。

```yaml
---
layout: toc
activeSection: 3
---
```

目录页使用 `tocTitle`、`sections`、`activeSection`、`tocPanelWidth` 和 `tocItemSize` 控制内容与尺寸；`tocListTop`、`tocListBottom` 和 `tocListMinWidth` 控制独立章节列表区域。`tocPanelTop`、`tocPanelHeight`、`tocFrameTopInset` 和 `tocFrameBottomInset` 可以调整梯形面板及两侧红线的位置。白色面板与其他布局共用表面材质参数。章节序号由主题自动显示为“一、”至“六、”。

### 内容页

```yaml
---
layout: default
activeSection: 3
---

# 从校园意象到数字场景

正文内容。
```

`activeSection` 和 `section` 是指定同一章节状态的两种方式（正确名称是 `activeSection`，不是 `activateSection`）：

| 参数 | 写法 | 含义 |
| --- | --- | --- |
| `activeSection` | `activeSection: 2` | 按从 1 开始的章节序号选择 |
| `section` | `section: 设计目标` | 按章节标题选择，文字必须与 `sections` 中的项目完全一致 |

如果当前页同时设置两个参数，能够匹配 `sections` 的 `section` 优先。当前页如果两个参数都没写，主题会向前查找最近一页明确设置的章节并自动继承；封面、目录或其他未设置章节的页面不会打断继承。直接跳页、演讲者模式和导出时也按幻灯片顺序计算，不依赖实际播放历史。若此前没有任何页面设置章节，则使用全局 `themeConfig` 中的值，最后回退到主题默认值 `1`。

左侧导航自动显示中文数字“一”至“六”，已讲、当前和未讲章节与目录页使用同一套状态层级。底栏第二段固定显示解析后的当前章节标题。主题最多显示六章。

```yaml
---
layout: default
activeSection: 2
---

# 本章第一页

---
layout: default
---

# 自动继承 activeSection: 2
```

基本内容页直接承载 Markdown，已提供一级至六级标题、段落、粗体、斜体、删除线、链接、引用、有序/无序/任务列表、行内代码、代码块、表格和 Slidev 原生 LaTeX 的默认排版。一级标题作为页面主标题，二至六级标题使用统一的深色文字，通过逐级递减的字号、字重和间距建立层级。

四段底栏使用统一的灰色背景与文字颜色：第一段显示演示标题，第二段显示当前章节标题，第三段显示日期，第四段显示补零后的两位 Slidev 实际页码（例如 `04`）。底栏的间距、字号、字色、底色和列宽均可在全局或单页覆盖。

### 双栏内容页

当整页内容需要左右并列时，使用 `two-cols`。它与 `default` 共用背景、表面材质、左侧章节导航、Markdown 样式和底部状态栏，只把正文区域改为两个命名插槽：

```markdown
---
layout: two-cols
activeSection: 2
columnRatio: 42% 58%
columnGap: 3cqw
columnAlign: start
columnDivider: false
---

# 页面标题

::left::

## 左栏标题

左栏使用普通 Markdown。

::right::

## 右栏标题

右栏可以放文字、列表、代码、图片或 Vue 组件。
```

`# 页面标题` 必须写在第一个命名插槽之前；`::left::` 和 `::right::` 分别开始左右栏。四个布局参数都支持全局 `themeConfig` 默认值和当前页 frontmatter 覆盖：

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| `columnRatio` | `1fr 1fr` | 两栏宽度，接受 CSS `grid-template-columns` 写法，例如 `40% 60%` 或 `2fr 3fr` |
| `columnGap` | `3cqw` | 两栏内容之间的总间距 |
| `columnAlign` | `start` | 两栏内容的垂直对齐方式，可用 `start`、`center`、`end` 或 `stretch` |
| `columnDivider` | `false` | 是否在两栏之间显示低对比度主色分割线 |

不建议为了“左文右图”“左右文字”等组合继续创建更多 layout；这些内容都可以放进 `two-cols` 的左右插槽中。

### Figure 图片与图注组件

`Figure` 用于在 `default`、`two-cols` 或其他内容区域中插入一组图片和下方说明。最常见的写法是：

```markdown
<Figure
  src="/images/campus-scene.png"
  alt="校园数字场景"
  caption="图 1：校园数字场景的视觉构成"
  width="68%"
/>
```

图片文件推荐放入演示项目的 `public/images`，并使用 `/images/文件名.png` 这样的路径。组件默认整体居中、图片保持比例、图注在图片下方居中。

如果图注需要粗体、公式或其他 Markdown，可以改用默认插槽：

```markdown
<Figure src="/images/campus-scene.png" width="68%">

图 1：这里可以使用 **Markdown 强调** 或公式 $\beta_1$。

</Figure>
```

| 属性 | 默认值 | 说明 |
| --- | --- | --- |
| `src` | 主题内置 `cover.png` | 图片地址；内置图片主要用于让示例无需额外文件即可显示，正式内容建议明确设置 |
| `alt` | 空 | 图片替代文字 |
| `caption` | 空 | 纯文字图注；若使用默认插槽则优先渲染插槽内容 |
| `width` | `70%` | 整组图片与图注的宽度 |
| `maxHeight` | `27cqw` | 图片最大高度 |
| `fit` | `contain` | 图片适配方式：`contain`、`cover`、`fill`、`none` 或 `scale-down` |
| `align` | `center` | 整组内容的水平位置：`left`、`center` 或 `right` |
| `captionAlign` | `center` | 图注对齐方式：`left`、`center` 或 `right` |
| `captionSize` | `1.05cqw` | 图注字号 |

`Figure` 的属性属于单个组件实例，不写时使用上表默认值；它们不放在页面 frontmatter 中。页面级的整体结构和间距仍由 layout 参数负责。

### 结束页

```yaml
---
layout: end
---
```

结束页默认不生成任何中间文字。可以通过 `title` / `endTitle` 显式添加标题，也可以直接在 Markdown 中写文字或嵌入 HTML；这些内容默认居中显示。顶部弧线可通过 `endCurveCenterX`、`endCurveCenterY`、`endCurveRadiusX` 和 `endCurveRadiusY` 调整，遮罩会同步跟随。

## 参数参考

### 内容与状态

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| `deckTitle` | 演示文稿顶层 `title`，否则“演示标题” | 底栏和封面标题的基础值 |
| `coverTitle` | `deckTitle` | 封面默认标题 |
| `tocTitle` | `目录` | 目录页默认标题 |
| `endTitle` | 空 | 结束页可选标题；未设置时不生成标题 |
| `title` | 当前布局的默认标题 | 当前页标题覆盖值 |
| `subtitle` | 空 | 封面副标题 |
| `presenterName` | 空 | 汇报人；推荐使用这个名称 |
| `presenter` | 空 | `presenterName` 的兼容别名；Slidev 顶层可能将其作为保留字段处理 |
| `organization` | `数字媒体与设计艺术学院` | 封面单位 |
| `date` | 当天，格式 `YYYY.MM.DD` | 日期；也接受 `auto` 或空字符串 |
| `sections` | 第一章至第四章 | 动态章节数组，最多六项 |
| `activeSection` | 最近上一页的明确设置，否则 `1` | 从 1 开始的当前章节序号；页面未设置时自动向前继承 |
| `section` | 最近上一页的明确设置，否则空 | 与 `sections` 完全匹配的章节名称；成功匹配时优先于 `activeSection` |
| `footerTitle` | 当前页 `title`，否则 `deckTitle` | 底栏第一段演示标题 |
| `showDate` | `true` | 是否显示日期 |
| `showPageNumber` | `true` | 是否显示补零后的两位 Slidev 实际页码 |
| `showBrand` | `true` | 是否显示封面/结束页校院标识 |

### 品牌色

| 参数 | 默认值 |
| --- | --- |
| `primary` | `#c2272b` |
| `primaryDeep` | `#9e1c20` |
| `primaryWine` | `#7a1418` |
| `primaryBright` | `#e2474b` |
| `primaryTint` | `#f8e7e7` |
| `primaryShadow` | `#8a181c` |
| `onPrimary` | `#ffffff` |
| `ink900` | `#1b1a18` |
| `ink700` | `#3c3a37` |
| `ink500` | `#6e6a64` |
| `ink400` | `#938e87` |
| `line` | `#e5dfd6` |
| `canvas` | `#fbfaf7` |
| `surface` | `#f3efe9` |
| `card` | `#ffffff` |
| `accentGold` | `#b79a5e` |
| `accentSteel` | `#98a0a6` |

### 图片与标识

| 参数 | 默认值 |
| --- | --- |
| `coverImage` | 主题内置 `cover.png` |
| `tocImage` | 主题内置 `toc.png` |
| `contentImage` | 主题内置 `content.png` |
| `endImage` | 主题内置 `end.jpg` |
| `emblem` | 主题内置 `xh.png` |
| `wordmark` | 主题内置 `yh1.png` |
| `sideLogo` | 主题内置 `yh2.png` |
| `emblemAlt` | `北京邮电大学校徽` |
| `wordmarkAlt` | `数字媒体与设计艺术学院` |
| `sideLogoAlt` | `数字媒体与设计艺术学院标识` |

自定义图片推荐放进 Slidev 项目的 `public` 目录，并使用 `/images/example.jpg` 这类路径。

### 遮罩、背景与尺寸

| 参数 | 默认值 |
| --- | --- |
| `maskColor` | `#ffffff` |
| `curveColor` | `primary` |
| `curveWidth` | `0.72cqw` |
| `surfaceEffect` | `plain` |
| `overlayOpacity` | `plain: 0.94` / `glass: 0.68` |
| `glassBlur` | `1.35cqw` |
| `glassSaturation` | `1.25` |
| `glassBrightness` | `1.06` |
| `glassHighlightColor` | `#ffffff` |
| `glassHighlightOpacity` | `0.34` |
| `glassShadowColor` | `#7c8794` |
| `glassShadowOpacity` | `0.10` |
| `glassGradientAngle` | `135deg` |
| `coverMaskExpansion` | `0.25%` |
| `coverCurveCenterX` | `100%` |
| `coverCurveCenterY` | `100%` |
| `coverCurveRadiusX` | `70%` |
| `coverCurveRadiusY` | `50%` |
| `backgroundOpacity` | `1` |
| `coverBackgroundPosition` | `top center` |
| `coverBrandTop` | `1.55cqw` |
| `coverBrandRight` | `1.75cqw` |
| `coverCopyTop` | `49.5%` |
| `coverCopyLeft` | `3.9cqw` |
| `coverCopyWidth` | `56cqw` |
| `tocBackgroundPosition` | `top center` |
| `contentBackgroundPosition` | `top center` |
| `endBackgroundPosition` | `top center` |
| `endCurveCenterX` | `50%` |
| `endCurveCenterY` | `-30%` |
| `endCurveRadiusX` | `70%` |
| `endCurveRadiusY` | `68%` |
| `endMaskExpansion` | `0.3%` |
| `endBrandBottom` | `1.55cqw` |
| `endBrandLeft` | `1.75cqw` |
| `sideNavWidth` | `5.2cqw` |
| `statusBarHeight` | `3.15cqw` |
| `statusBarGap` | `0.28cqw` |
| `statusBarPadding` | `0.28cqw 0.28cqw 0` |
| `statusBarColumns` | `minmax(0, 1.15fr) minmax(0, 1fr) max-content max-content` |
| `statusItemPaddingX` | `1.05cqw` |
| `statusTextSize` | `1.05cqw` |
| `statusTextColor` | `ink700` |
| `statusBackground` | `line`（`#e5dfd6`） |
| `contentPaddingTop` | `2.8cqw` |
| `contentPaddingRight` | `4.8cqw` |
| `contentPaddingBottom` | `4.25cqw` |
| `contentPaddingLeft` | `4.8cqw` |
| `contentMaxWidth` | `100%` |
| `columnRatio` | `1fr 1fr` |
| `columnGap` | `3cqw` |
| `columnAlign` | `start` |
| `columnDivider` | `false` |
| `tocPanelWidth` | `64cqw` |
| `tocItemSize` | `2cqw` |
| `tocListTop` | `14cqw` |
| `tocListBottom` | `5cqw` |
| `tocListMinWidth` | `20cqw` |
| `tocPanelTop` | `-1%` |
| `tocPanelHeight` | `102%` |
| `tocFrameTopInset` | `12%` |
| `tocFrameBottomInset` | `0%` |
| `tocFrameExtension` | `0.12%` |

背景采用 `object-fit: cover`。对于原始 3:2 图片，默认从顶部对齐并裁掉底部超出 16:9 的部分。

弧线和梯形位置参数可以放在全局 `themeConfig` 中，也可以只在某一页覆盖。例如：

```yaml
---
layout: cover
coverCurveCenterX: 96%
coverCurveCenterY: 104%
coverCurveRadiusX: 68%
coverCurveRadiusY: 54%
---
```

封面和结束页的中心位置与两个半径会同时驱动红线及对应遮罩，不需要分别调整。目录页的 `tocFrameTopInset` / `tocFrameBottomInset` 表示梯形红线在上、下边缘向内缩进的距离；`tocFrameExtension` 仅用于让线段稍微越过画布边缘，避免端点被截断，通常不需要修改。

#### 封面弧线四个参数如何理解

封面上看到的红色弧线并不是一条单独定义起点和终点的曲线，而是一个完整椭圆落在幻灯片画布内的那一段。其余部分位于画布外，因此不可见。四个参数共同定义这个椭圆：

- `coverCurveCenterX`：椭圆中心的水平坐标；`0%` 是画布左边，`100%` 是画布右边。
- `coverCurveCenterY`：椭圆中心的垂直坐标；`0%` 是画布顶部，`100%` 是画布底部。
- `coverCurveRadiusX`：椭圆的水平半径，值越大，弧线在水平方向延伸得越远。
- `coverCurveRadiusY`：椭圆的垂直半径，值越大，弧线在垂直方向延伸得越远。

默认值是：

```yaml
coverCurveCenterX: 100%
coverCurveCenterY: 100%
coverCurveRadiusX: 70%
coverCurveRadiusY: 50%
```

这表示椭圆中心位于画布右下角。弧线与画布底边的交点位于：

```text
100% - 70% = 30%（从画布左侧算起）
```

弧线与画布右边的交点位于：

```text
100% - 50% = 50%（从画布顶部算起）
```

因此，默认可见弧线大致从底边 `30%` 处延伸到右边 `50%` 处。若希望弧线改为从底边 `40%` 处延伸到右边 `60%` 处，并继续让椭圆中心保持在右下角，可以写：

```yaml
coverCurveCenterX: 100%
coverCurveCenterY: 100%
coverCurveRadiusX: 60%
coverCurveRadiusY: 40%
```

只给“起点”和“终点”并不能唯一确定弧线，因为同样的两个端点可以对应很多种不同曲率。使用中心与两个半径既能明确控制弧线形状，也能让红线和白色遮罩始终使用完全相同的几何边界，避免两者错位或漏出背景图。

### 字体与字号

| 参数 | 默认值 |
| --- | --- |
| `fontSans` | 微软雅黑等系统中文无衬线回退栈 |
| `fontSerif` | Georgia 等衬线回退栈 |
| `coverTitleSize` | `4.6cqw` |
| `coverSubtitleSize` | `2.45cqw` |
| `coverMetaSize` | `1.75cqw` |
| `slideTitleSize` | `3.8cqw` |
| `bodySize` | `1.55cqw` |

当前版本不内嵌字体文件，后续可以在布局确定后单独补充。

## 本地预览

在 `my_slidev` 目录中运行：

```powershell
.\node_modules\.bin\slidev.cmd .\slidev-theme-bupt-sdmda-red\example.md
```

构建验证：

```powershell
.\node_modules\.bin\slidev.cmd build .\slidev-theme-bupt-sdmda-red\example.md
```
