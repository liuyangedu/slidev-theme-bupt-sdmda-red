---
theme: ./
title: 第 6 周：碰撞、触发与交互
layout: cover
aspectRatio: 16/9
subtitle: AI时代课程体系建设
presenterName: 柳杨
organization: yang.liu@bupt.edu.cn
themeConfig:
  surfaceEffect: plain
  sections: [项目背景, 设计目标, 视觉概念, 场景构建]
---

---
layout: toc
activeSection: 1
---

---
layout: default
activeSection: 1

---

# 从校园意象到数字场景

以北邮校园建筑、雕塑与品牌色彩为视觉素材，建立统一的场景语言，并在 Unity 中转化为可探索、可叙事的数字空间。


## 设计要点

- 以校园红作为重**点**色，用中性色稳定信息层级。
- 提取建筑与雕塑的_线_条，形成统一的构图节奏。
- 以导览、触发和反馈建立清晰的浏览路径。
- $\int^{t=n}_{t=\alpha}=\left(\left(\left(aaa\left[a\times b \right]\right)\right)\right)$
##  ？？啊啊

$$\beta_1$$
---
layout: default
activeSection: 1
---

# Markdown 文本与列表

普通正文支持 **粗体强调**、*斜体文字*、~~删除内容~~、[链接](https://sli.dev) 和 `行内代码`。

~~aa~~

## 二级标题

### <i>三级标题</i>

#### 44四

##### 5 五

###### 6 六

> 引用内容会使用主题红色作为左侧强调线，并保持适合投影阅读的行距。

- 无序列表第一项
- 无序列表第二项

1. 有序列表第一项
2. 有序列表第二项

---
layout: toc
activeSection: 2
---

---
layout: default
---

# Markdown 代码块

```ts
interface SceneConfig {
  title: string
  activeSection: number
}

const config: SceneConfig = {
  title: '数字校园',
  activeSection: 3,
}
```

代码块支持语法高亮，并保留 Slidev 自带的复制按钮。

---
layout: default
activeSection: 1
---

# Markdown 表格与任务列表

| 元素 | Markdown 写法 | 用途 |
| --- | --- | --- |
| 标题 | `# 标题` | 建立信息层级 |
| 强调 | `**粗体**` | 突出关键词 |
| 链接 | `[文字](地址)` | 补充外部资料 |

啊啊

- [x] 已完成的任务
- [ ] 尚未完成的任务


---
layout: toc
activeSection: 3
---

---
layout: default
primary: '#9e1c20'
surfaceEffect: plain
---

# 每一页都能临时覆盖主题默认值

本页把主色改为深红，并用页面 frontmatter 把表面材质临时切回 `plain`；底栏第二段仍自动显示当前章节标题，其他参数继续继承全局配置和主题默认值。

## 参数优先级

页面 frontmatter → 全局 themeConfig → 主题内置默认值

---
layout: two-cols
activeSection: 4
columnRatio: 1fr 1fr
columnGap: 3.2cqw
columnDivider: true
---

# 双栏：并列组织两组内容

::left::

## 场景构建

左栏和右栏都可以继续使用普通 Markdown：

- 建立校园建筑的基础模型
- 统一材质、光照与色彩关系
- 控制场景层级与资源命名

::right::

## 交互反馈

同一页并列展示另一组信息：

1. 配置碰撞体和触发区域
2. 编写进入与离开事件
3. 用动画、声音和界面反馈结果

---
layout: two-cols
columnRatio: 40% 60%
columnGap: 3.4cqw
columnAlign: center
---

# 双栏：左侧文字，右侧图片

::left::

## 图文配合

当图片承担主要信息时，可以给右栏更多空间。`Figure` 会让图片保持比例，并把说明文字稳定放在图片下方。

::right::

<Figure
  caption="图 1：以主题内置封面图演示右栏图片与图注"
  width="100%"
  maxHeight="24cqw"
/>

---
layout: default
---

# 居中图片与 Markdown 图注

<Figure width="100%" maxHeight="36cqw">

图 2：图注也可以使用 **Markdown 强调**，并默认位于图片下方居中显示。

</Figure>

---
layout: end
---
# bt标题1
版本前期问我
## bt标题2
版本前期问11我
