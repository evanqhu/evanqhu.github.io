# 笔记

## 以 x86 架构运行 shell

`arch -x86_64 zsh` 是一个命令，用于在 macOS 系统上以 x86_64 架构运行 Zsh

像 Node 14 及其之前版本是基于 x86 架构开发的，直接在 M 系列芯片的设备上使用 `nvm install 14` 会报错，这时需要先运行 `arch -x86_64 zsh` 命令，再安装

- `arch`：这是一个 macOS 命令，用于指定运行命令时使用的架构。macOS 系统可以运行在不同的处理器架构上，例如 x86_64 (即 Intel 的 64 位架构) 和 arm64 (即 Apple Silicon M1 和 M2 处理器的 64 位架构)
- `-x86_64`：这是 `arch` 命令的一个参数，指定需要使用 x86_64 架构来运行后面的命令
- `zsh`：这是一个流行的命令行 Shell，类似于 Bash，但提供了更多的功能和更强的自定义能力

组合起来，`arch -x86_64 zsh` 意思是在 x86_64 架构下启动 Zsh Shell。这在使用 Apple Silicon 的 macOS 设备时特别有用，因为这些设备默认运行在 arm64 架构下，但有时可能需要在 x86_64 架构下运行某些程序或命令。

例如，当你在 Apple Silicon Mac 上运行一些只兼容 x86_64 架构的软件时，可以使用这种方法启动兼容环境。

## ES6 模块化语法

在 ES6 的模块化语法中使用到了符号绑定，即导入的变量和导出的变量使用的是同一块内存空间。

```js
// module.js
export let count = 1; // 注意这里的 let
export function increase() {
  count++;
}
```

模块化的特殊语法，具名导入，导入后的数据都变成了常量

```js
// index.js
import { count, increase } from "./module.js"; // 具名导入

count++; // 报错，这里的 count 是常量了

console.log(count); // 1
increase();
console.log(count); // 2
// 按道理这里第二次打印 count 也应该是 1，因为常量不可变
// 在 JS 语法中所有的传值都是复制粘贴，用到两块内存空间。
// 而这里是用的符号绑定，也就是引用
```

> 因此在导出的时候不要使用 let，都要用 const

## VPN 终端代理

在 clashX 中点击 `复制终端代理命令`，粘贴到终端中执行，当前终端的网络请求即可强制使用代理

复制的命令一般为：

```sh
export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890
```

## CDN 字体

https://www.cdnfonts.com/

https://fonts.google.com/

项目中需要使用某些字体时，可以直接通过 CDN 引入，然后在项目中使用即可，无需下载字体包

```css
@import url("https://fonts.cdnfonts.com/css/archivo-black");
```

CDN 链接中一般是这样一段代码，其中 src 表示先尝试从本地获取代码，如果没有，则从对应链接下载代码，并格式化为指定字体格式

```css
@font-face {
  font-family: archivo black;
  font-style: normal;
  font-weight: 400;
  src: local("Archivo Black"), url(https://fonts.cdnfonts.com/s/15376/ArchivoBlack-Regular.woff) format("woff");
}
```

## 自动切换 Node 版本

当使用 nvm 作为 Node 包管理工具时， 可以使用 `nvm use v18` 或 `nvm use 18` 这样的命令来切换终端的 Node 版本

可以在项目根目录新建 `.nvmrc` 文件，指定项目的 Node 版本

在 VS Code 中安装 `vsc-nvm` 插件，该插件会在打开终端时自动运行 `nvm use` 命令，选择的 Node 版本正是读取自 `.nvmrc` 文件

```sh
# .nvmrc
v18
```