---
title: CSS - Custom Functions
published: 2026-01-01
description: 'Custom functions are finally available in CSS and they let you do some amazing things.'
image: './cover.jpg'
tags:
  - CSS
draft: false
---

CSS 自定义函数允许创建可重用的代码块，这些函数的工作方式与 JavaScript 函数截然不同

## Intro

在 CSS 中创建自定义函数，需要使用 `@function` 关键字进行声明。函数名称必须以双短横线（`--`）开头，这点与自定义属性的命名规则保持一致。函数名后跟一对圆括号（`()`）用于接收参数，并通过花括号（`{}`）定义函数体，最终使用 `result` 返回函数的计算结果。

## Example

### Function basics

```css
@function --transparent(--color, --amount) {
  result: hsl(from var(--color) h s l / var(--amount));
}
```
### Default parameters

```css
@function --transparent(--color: blue, --amount: 0.5) {
  result: hsl(from var(--color) h s l / var(--amount));
}
```

### Calling a CSS function

```css
.box {
  background-color: --transparent(red, 0.5);
  color: white;
  width: 100px;
  height: 100px;
}
```

## Function Cascade

### Why `result` and not `return`

尽管 `result` 在形式上类似于 JavaScript 的 `return`，但是，`result` 不代表控制流中的“返回点”。在 CSS 中，`result` 只是用于声明函数的最终输出值，而不存在立即终止的语义。

CSS 的值计算遵循层叠规则：在相同作用域和优先级下，后声明的值会覆盖先前声明的值，从而确定最终生效的值。

## Mixins

### Media Query

```css
@function --transparent(--color: red, --amount: 0.5) {
  result: hsl(from var(--color) h s l / var(--amount));

  @media(max-width: 200px) {
    result: orange;
  }
}
```

### `@layer`

`@layer` 用于控制样式优先级，可以将 `@function` 放置在不同层中，后定义的层会覆盖前层的同名函数，类似于变量覆盖

```css
@layer base, theme;

@layer theme {
  @function --transparent(--color: blue, --amount: 0.5) {
    result: hsl(from var(--color) h s l / var(--amount));
  }
}

@layer base {
  @function --transparent(--color: red, --amount: 0.5) {
    result: hsl(from var(--color) h s l / var(--amount));
  }
}
```

> `@layer` 显式声明了层的优先级顺序，`theme` 的优先级高于 `base`，层的书写顺序决定优先级，而层内声明顺序将不在影响跨层结果。

## Function Types

`type()` 函数用于指定参数的类型。每个参数的数据类型在参数名称后指定，`result` 的类型在大括号之前指定

```css
@function --transparent(--color <color>: red, --amount <number>: 0.5) returns <color> {
  result: hsl(from var(--color) h s l / var(--amount));
}
```

> [!NOTE]
> 如果只指定一种类型，可以省略 `type()` 语法

```css
@function --transparent(
  --color <color>: red,
  --amount type(<number> | <percentage>): 0.5) returns <color> {
  result: hsl(from var(--color) h s l / var(--amount));
}
```

## Advanced Function

在函数中封装断点，使样式根据不同视口宽度自动选择对应变量值

```css
@function --responsive(--sm, --md, --lg) {
  result: var(--lg);

  @media (width <= 200px) {
    result: var(--sm);
  }

  @media (200px < width <= 300px) {
    result: var(--md);
  }
}
```

使用 CSS 高级语法中的 `if-else` 条件判断实现对可选参数的处理

```css
@function --responsive(--sm, --md, --lg: no-value) {
  result: if(style(--lg: no-value): var(--md); else: var(--lg));

  @media (width <= 200px) {
    result: var(--sm);
  }

  @media (200px < width <= 300px) {
    result: var(--md);
  }
}
```

## References

- [Using CSS custom functions](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Custom_functions_and_mixins/Using_custom_functions)