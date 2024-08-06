# SASS

## 变量

`scss`

```scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

`css`

```css
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}
```

## 嵌套

`scss`

```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
}
```

`css`

```css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
```

## 部分样式文件

以 `_` 开头命名的 scss 文件，它不会被转换生成 css 文件，而是作为其他样式文件的一部分被使用

```scss
// _base.scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

## 模块化

`scss`

```scss
// _base.scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}

// styles.scss
@use 'base'; // 这个路径不知道是什么

.inverse {
  background-color: base.$primary-color;
  color: white;
}
```

`css`

```css
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}

.inverse {
  background-color: #333;
  color: white;
}
```

## 混入 Mixins

`scss`

```scss
// 创建 mixin，命名为 theme，传入变量 $theme
@mixin theme($theme: darkgray) {
  background: $theme;
  box-shadow: 0 0 1px rgba($theme, .25);
  color: #fff;
}

.info {
  // 使用 @include 标记 mixin 的 css 声明
  @include theme;
}
.alert {
  @include theme($theme: darkred); // 可以传参数
}
.success {
  @include theme($theme: darkgreen);
}
```

`css`

```css
.info {
  background: darkgray;
  box-shadow: 0 0 1px rgba(169, 169, 169, 0.25);
  color: #fff;
}

.alert {
  background: darkred;
  box-shadow: 0 0 1px rgba(139, 0, 0, 0.25);
  color: #fff;
}

.success {
  background: darkgreen;
  box-shadow: 0 0 1px rgba(0, 100, 0, 0.25);
  color: #fff;
}
```

## 继承 extend

`scss`

```scss
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.message {
  @extend %message-shared;
}

.success {
  @extend %message-shared;
  border-color: green;
}

.error {
  @extend %message-shared;
  border-color: red;
}

.warning {
  @extend %message-shared;
  border-color: yellow;
}
```

`css`

```css
.warning, .error, .success, .message {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.success {
  border-color: green;
}

.error {
  border-color: red;
}

.warning {
  border-color: yellow;
}
```

## 运算

`scss`

```scss

```

`css`

```css

```



`scss`

```scss

```

`css`

```css

```



`scss`

```scss

```

`css`

```css

```

