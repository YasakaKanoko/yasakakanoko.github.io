---
title: CSS - if statements
published: 2025-06-25
description: 'The if() CSS function allows different values to be set for a property depending on the result of a conditional test'
image: './cover.jpg'
tags:
  - CSS
draft: false
---

`if()` 函数允许根据不同属性检查结果赋予不同的值，这些条件包括 [style query](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_size_and_style_queries#container_style_queries)、[media query](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using) 以及 [feature query](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Conditional_rules/Using_feature_queries) 等

## Intro

`if()` 是 2025 年引入的 CSS 新特性（Chrome 137 及以上版本支持），允许开发者在纯 CSS 中实现条件逻辑，而无需依赖 JavaScript、预处理器（如：Sass）或多个类名

在此之前，CSS 的条件主要通过 `@media`、`@container`、`@supports` 等规则实现

## Example

### Basics

```css
.box {
  width: 300px;
  height: 300px;
  background-color: red;
}

@media (width <= 1000px) {
  .box {
    background-color: blue;
  }
}

@media (width <= 600px) {
  .box {
    background-color: green;
  }
}
```

```css
.box {
  width: 300px;
  height: 300px;
  background-color: if(
    media(width <= 600px): green;
    media(width <= 1000px): blue;
    else: red;
  );
}
```
`if()` 局限在于**无法复用属性逻辑**

> 例如：对于同样的 `color` 属性需要根据不同的媒体查询赋值，在每一个选择器中重复定义条件

```css
.box {
  color: if(
    media(width <= 600px): red;
    media(width <= 1000px): blue;
    else: white;
  );
}

a {
  color: if(
    media(width <= 600px): red;
    media(width <= 1000px): blue;
    else: white;
  );
}
```

### if style checks

```css
.box {
  --test: "hi";

  width: 300px;
  height: 300px;
  background-color: if(
    style(--test: "hi"): green;
    else: red;
  );
}
```

这种 `style()` 检查也可以通过更早的 `@container` 实现 

```css
:root {
  --test: "hi";
}

.box {
  width: 300px;
  height: 300px;
  background-color: red;
}

@container style(--test: "hi") {
  .box {
    background-color: green;
  }
}
```

### Example use case for if function

使用 `if()` 函数将媒体查询的结果抽象为断点变量

```css
:root {
  --bp: if(
    media(width <= 600px): "sm";
    media(width <= 1000px): "md";
    else: "lg";
  );
}

.box {
  width: 300px;
  height: 300px;
  background-color: if(
    style(--bp: "sm"): green;
    style(--bp: "md"): blue;
    style(--bp: "lg"): red;
    else: black;
  );
}
```

### if attr checks

`attr()` 函数允许在 CSS 中访问元素的属性值，例如：`data-*` 或其他标准属性

```css
.box {
  --status: attr(data-status);

  width: 300px;
  height: 300px;
  background-color: if(
    style(--status: "loading"): green;
    style(--status: "loaded"): blue;
    style(--status: "error"): red;
    else: black;
  );
}
```

## References

- [if()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/if)