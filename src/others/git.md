# Git 版本管理

## 01 用户信息

```sh
# 查看 git 版本
git -v

# 每台设备初次使用时的设定
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com

# 查看设置
git config --list
```

## 02 仓库基础操作

```sh
# 初始化一个仓库
git init
 
# 克隆一个仓库
git clone <repo directory> [repo name]

# 本地仓库连接到远程仓库 (origin 是默认推荐的远程仓库名称)
git remote add origin <server>

# 取消本地仓库与远程仓库的关联
git remote remove origin

# 添加到暂存区
git add <filename>
git add *

# 移除暂存区
git rm --cached <filename>

# 提交到存储区
git commit -m <msg>

# 推送到远程仓库
git push origin master

# 从远程仓库拉取
git pull origin master

# 显示工作区和暂存区的状态
git status

# 显示远程仓库地址
git remote -v

# 查看提交历史
git log
git log --oneline

# 恢复删除的文件（仅在工作区删除）
git restore <filename>  # 从存储区恢复到工作区

# 恢复删除的文件（存储区中也删除了）
git reset --hard <hash>  # 修改head头，部分提交历史会丢失
git revert <hash>  # 恢复删除的文件，提交历史不会丢失

# 查看指定文件的修改记录
git blame <file>
```

## 03 分支操作

* 从 master 主分支创建分支的时候，会把 master 上的内容都复制到新分支中，之后在分支上的操作不会互相影响；
* 合并分支时，新分支中删除的文件在 master 中会被删除，新分支添加的文件在 master 中会被添加
* 合并冲突

```sh
# 创建分支
git branch <branchname>

# 查看本地分支
git branch -v

# 查看远程分支
git branch -r

# 切换分支
git checkout <branchname>
git checkout -b <branchname> # 创建并切换到新分支

# 删除分支
git branch -d <branchname>

# 合并分支
git merge <branchname>  # 把 branchname 合并到当前分支 

# fetch
git pull = git fetch + git merge
```

### 解决冲突

```sh

```





---------------------

# 一、Git 简介

![img](https://cdn.nlark.com/yuque/0/2024/jpeg/35780599/1710828308672-345a249a-b557-4cf0-ae8a-2a205789bba8.jpeg?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_40%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

Git 是一款版本控制系统，它可以**追踪文件的更改**，并能**多人协同开发**，它最初由 Linus Torvalds 在 2005 年为更好地管理 Linux 内核而设计的； Git 是目前最流行的版本控制系统，主要功能有：

- 代码备份
- 版本回退
- 协同开发
- 权限控制

# 二、下载安装

下载地址：https://git-scm.com/ ，随后“傻瓜式”安装（一路下一步即可）

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1711154388895-31bfbffa-a921-487e-9536-1f1ac82d03ae.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_76%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

**注意：如果自定义安装路径，切记路径中不要包含中文！**

# 三、Git 基本使用

## 1. 起始配置

第一次使用 Git 的时候，我们需要配置**姓名**和**邮箱**，让 Git 知道当前开发者的基本信息

配置姓名：

```sh
git config --global user.name "Your Name" 
```

配置邮箱：

```sh
git config --global user.email "email@example.com" 
```

注意点：

1. 命令中的各单词中间有空格。
2. 上述两个命令只在第一次使用 Git 时运行, 若输入错误, 重新运行命令即可。
3. 可以使用 `git config --list`或`git config -l` 命令来查看配置信息 。
4. 上述这两个命令不用自己手敲, 直接复制粘贴，随后修改【姓名】与【邮箱】即可。

## 2. linux 常用命令

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1711682965049-b9cdd207-1f7c-49cf-8310-c65a61951ba3.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_36%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

Windows 为图形化操作形式，Linux 一般使用命令与系统进行交互，常用的命令如下：

| 命令         | 含义                                                         |
| ------------ | ------------------------------------------------------------ |
| `mkdir`      | 创建文件夹（make directory）                                 |
| `cd`         | 改变工作目录，（change directory 缩写）                      |
| `touch`      | 创建一个文件                                                 |
| `ls`         | 查看文件夹下的文件 （list 单词的缩写）                       |
| `cat`        | 查看文件内容                                                 |
| `Tab`        | 路径自动补全                                                 |
| `clear`      | 清屏（也可以使用 `ctrl + L`  快捷键）                        |
| `rm`         | 删除文件或文件夹 （删除不会进入回收站） -r 递归删除（用来删除文件夹） |
| `ctrl + c`   | 取消命令 c cancel 缩写                                       |
| `上下方向键` | 查看命令历史                                                 |

## 3. vim 编辑器

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1711683007262-a11dfa15-dea8-4c15-a6f1-c84b47221efe.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_34%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

Vim 是一款命令行下的文本编辑器，编辑方式跟图形化编辑器不同，基本操作

1.  命令行 `vim 文件名` 打开文件 
2.  按 `i` 进入编辑模式 
3.  开始编辑文件内容 
4.  `ESC` + `:wq` 保存并退出（w => write  q => quit）
5. `ESC` + `:q!` 不保存并退出 

## 4. Git 的三个区

以生活中做菜为例，整个过程中涉及到三个区域：① 货架、② 购物车、③ 厨房

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1710831879638-5251867b-e8fc-4de5-be13-df8b9197ded7.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_69%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

Git 中同样也分为三个区域，分别是：

1. 工作区（代码编辑区）
2. 暂存区（暂时存储区）
3. 版本区（版本控制区）

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1710831903075-ca64b740-e22d-404b-8518-d8ec573b8493.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_69%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

工作区、暂存区、版本区，三个区共同组成了一个 **Git 仓库**

## 5. 基本操作流程

**第一步：**创建一个空文件夹（名称不要包含中文），随后双击打开文件夹。

**第二步：**在文件夹空白处右键 ，随后点击![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1711160926096-1504aac8-2122-4605-bffa-abf478292d2b.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_10%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10) 启动命令行。

**第三步：**创建一个 Git 仓库，命令为：`git init`，命令执行成后，提示如下：

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1711348183248-f07b7a78-97ef-4a14-95ed-6702aac2bf72.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_46%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

`git init` 执行后，会出现一个![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1710835996644-e45a6009-6da9-405b-9ddd-32d4c1773599.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_9%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)文件夹，这表示当前文件夹已成为一个 Git 仓库。

**第四步：**创建一些文件并编写代码，比如创建 【a.txt】，此时工作区已经有了新文件。

**第五步：**把工作区中【a.txt】添加到暂存区，具体命令为：`git add a.txt`，此命令无提示。

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1711348236513-acaf2916-37c7-48a2-bb5a-08026370abe2.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_40%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

补充：`git add -A`可以把工作区中的所有文件，都添加到暂存区，比较常用。

**第六步：**把暂存区【a.txt】添加到版本区，具体命令为：`git commit -m 'xxx'`，随后提示如下：

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1711505021152-9298ee86-79ce-485c-a3e3-f8f829b90f46.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_46%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

注意：此时我们先不用关心上图中的具体提示，后面会详细讲解。

**关键步骤图示：**![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1711505169966-317ee080-5b79-48b9-87ce-18e72e8a188c.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_88%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

## 6. Git 三区的位置

Git 的三区位置大致如下（了解即可）

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1711160360657-6b3abc98-5249-4df2-bf0d-30cca4d2278a.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_73%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

## 7. 查看仓库状态

`git status` 命令用于显示仓库当前的状态，`git status -s` 也用于查看仓库状态，但提示更为简短。

<details class="lake-collapse"><summary id="u86f1d84c"><span class="ne-text">1.  若</span><strong><span class="ne-text" style="color: #601BDE">没有</span></strong><span class="ne-text">需要</span><strong><span class="ne-text" style="color: #601BDE">提交</span></strong><span class="ne-text">的内容，提示如下</span></summary><p id="uf3a0ac0d" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1711349105243-4a6e4483-846a-40d9-b661-a04506002c92.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_46%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="592.7591552734375" id="yDdYZ" class="ne-image"></p></details>

<details class="lake-collapse"><summary id="ue8ef4869"><span class="ne-text">2. 若工作区的内容</span><strong><span class="ne-text" style="color: #DF2A3F">没有</span></strong><span class="ne-text">提交</span><strong><span class="ne-text" style="color: #DF2A3F">暂存区</span></strong><span class="ne-text">，提示如下</span></summary><p id="u5374a10d" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1711175908186-5ef74c5c-37d0-4838-b360-e8357bb4695c.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_79%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="694.0068359375" id="wpJjU" class="ne-image"></p></details>

<details class="lake-collapse"><summary id="u85cb87e1"><span class="ne-text">3. 若暂存区的内容</span><strong><span class="ne-text" style="color: #5C8D07">没有</span></strong><span class="ne-text">提交</span><strong><span class="ne-text" style="color: #5C8D07">版本区</span></strong><span class="ne-text">，提示如下</span></summary><p id="u6566791f" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1711179630665-eed23ef1-d099-4fd6-b366-9946df077a62.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_78%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="916.7639145568314" id="Cl0E1" class="ne-image"></p></details>

## 8. 小练习

在工作区创建四个文件，如下图，接下来我们进行六个操作，并进行练习：

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1711350710349-dbf73400-e845-40f7-84bd-b3ba618ad698.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_11%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

<details class="lake-collapse"><summary id="ud41a9b4f"><strong><span class="ne-text">操作一</span></strong></summary><p id="ub0558265" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><span class="ne-text">对 a、b 两个文件分别进行 </span><code class="ne-code" style="font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace; background-color: rgba(0, 0, 0, 0.06); border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 2px; padding: 0px 2px"><span class="ne-text">git add</span></code><span class="ne-text">和</span><code class="ne-code" style="font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace; background-color: rgba(0, 0, 0, 0.06); border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 2px; padding: 0px 2px"><span class="ne-text">git commit -m</span></code><span class="ne-text">操作，让二者接受版本控制。</span></p><p id="u50f14e99" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><span class="ne-text">使用</span><code class="ne-code" style="font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace; background-color: rgba(0, 0, 0, 0.06); border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 2px; padding: 0px 2px"><span class="ne-text">git status -s</span></code><span class="ne-text">查看仓库状态如下：</span></p><p id="ub27576df" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1711350854540-306be129-f7b5-4efe-bd6a-c8b7f37685ac.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_25%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="193" id="n2W5Q" class="ne-image"></p><div data-type="tips" class="ne-alert" style="border: 1px solid #BEC0BF; background-color: #EFF0F0; margin: 4px 0; padding: 10px; border-radius: 4px"><p id="ub439c24c" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><span class="ne-text">结果含义：新增了 c 和 d 两个文件，但目前两个文件还在</span><strong><span class="ne-text" style="color: #DF2A3F">工作区</span></strong><span class="ne-text">，没有接受版本控制。</span></p><p id="uf27f9273" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><span class="ne-text">具体分析：</span></p><ul class="ne-ul" style="margin: 0; padding-left: 23px"><li id="uc03cbb91" data-lake-index-type="0"><strong><span class="ne-text" style="color: #DF2A3F">红色</span></strong><span class="ne-text">的含义：操作停留在工作区</span></li><li id="u36e85a78" data-lake-index-type="0"><strong><span class="ne-text" style="color: #DF2A3F">？</span></strong><span class="ne-text">的含义：当前文件还没有接受版本控制</span></li></ul></div></details>

<details class="lake-collapse"><summary id="ub6805d8a"><strong><span class="ne-text">操作二</span></strong></summary><p id="u838a02a4" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><span class="ne-text">在刚才的基础上继续操作，对 c 文件进行</span><code class="ne-code" style="font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace; background-color: rgba(0, 0, 0, 0.06); border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 2px; padding: 0px 2px"><span class="ne-text">git add</span></code><span class="ne-text">操作，将 a 存入暂存区。</span></p><p id="u1cd2e739" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><span class="ne-text">使用</span><code class="ne-code" style="font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace; background-color: rgba(0, 0, 0, 0.06); border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 2px; padding: 0px 2px"><span class="ne-text">git status -s</span></code><span class="ne-text">查看仓库状态如下：</span></p><p id="uc6c40cb1" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1711350991212-413026bc-62ee-496f-a1d3-0c1bfb66df5b.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_15%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="194.86237509163803" id="IzSHi" class="ne-image"></p><div data-type="tips" class="ne-alert" style="border: 1px solid #BEC0BF; background-color: #EFF0F0; margin: 4px 0; padding: 10px; border-radius: 4px"><p id="u07b87367" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><span class="ne-text">结果含义：新增的 c 文件，已经存入了</span><strong><span class="ne-text" style="color: #5C8D07">暂存区</span></strong><span class="ne-text">，新增的 d 文件还在工作区中。</span></p><p id="u07e274ca" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><span class="ne-text">具体分析：</span></p><ul class="ne-ul" style="margin: 0; padding-left: 23px"><li id="u64ef05d5" data-lake-index-type="0"><strong><span class="ne-text" style="color: #5C8D07">绿色</span></strong><span class="ne-text">的含义：操作已经存入暂存区</span></li><li id="u4bd0cf2c" data-lake-index-type="0"><strong><span class="ne-text" style="color: #5C8D07">A</span></strong><strong><span class="ne-text" style="color: #DF2A3F"> </span></strong><span class="ne-text">的含义：新增（单词：add）</span></li></ul></div></details>

<details class="lake-collapse"><summary id="u1b3cd9f2"><strong><span class="ne-text">操作三</span></strong></summary><p id="u3a541eed" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><span class="ne-text">在刚才的基础上继续操作，对 a、b 文件进行内容修改后保存，不执行任操作。</span></p><p id="u9b74a4e3" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><span class="ne-text">使用</span><code class="ne-code" style="font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace; background-color: rgba(0, 0, 0, 0.06); border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 2px; padding: 0px 2px"><span class="ne-text">git status -s</span></code><span class="ne-text">查看仓库状态如下：</span></p><p id="u8fd92b72" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1711351180071-44370079-be32-40d1-8efd-a398642962cd.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_16%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="193" id="SfDxu" class="ne-image"></p><div data-type="tips" class="ne-alert" style="border: 1px solid #BEC0BF; background-color: #EFF0F0; margin: 4px 0; padding: 10px; border-radius: 4px"><p id="uc622b643" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><span class="ne-text">结果含义：修改了 a 文件和 b 文件，且修改还停留在</span><strong><span class="ne-text" style="color: #DF2A3F">工作区</span></strong><span class="ne-text">中。</span></p><p id="uabbea013" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><span class="ne-text">具体分析：</span></p><ul class="ne-ul" style="margin: 0; padding-left: 23px"><li id="u90f5f0ae" data-lake-index-type="0"><strong><span class="ne-text" style="color: #DF2A3F">红色</span></strong><span class="ne-text">的含义：操作停留在工作区</span></li><li id="uc8c913e0" data-lake-index-type="0"><strong><span class="ne-text" style="color: #DF2A3F">M  </span></strong><span class="ne-text">的含义：修改（单词： modify）</span></li></ul></div></details>

<details class="lake-collapse"><summary id="udd6191f5"><strong><span class="ne-text">操作四</span></strong></summary><p id="u2b6258d5" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><span class="ne-text">在刚才的基础上继续操作，对 a 文件进行</span><code class="ne-code" style="font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace; background-color: rgba(0, 0, 0, 0.06); border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 2px; padding: 0px 2px"><span class="ne-text">git add</span></code><span class="ne-text">操作，将 a 存入暂存区。</span></p><p id="u59436116" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1711351288764-a16f4b99-c049-4098-aedd-2639c9396d96.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_18%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="194" id="ZjDxF" class="ne-image"></p><div data-type="tips" class="ne-alert" style="border: 1px solid #BEC0BF; background-color: #EFF0F0; margin: 4px 0; padding: 10px; border-radius: 4px"><p id="u640a9320" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><span class="ne-text">结果含义：修改了 a 文件，且修改已存入暂存区；修改了 b 文件，且修改还停留在工作区</span></p></div></details>

<details class="lake-collapse"><summary id="ubf31c54f"><strong><span class="ne-text">操作五</span></strong></summary><p id="u78f35d2c" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><span class="ne-text">执行</span><code class="ne-code" style="font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace; background-color: rgba(0, 0, 0, 0.06); border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 2px; padding: 0px 2px"><span class="ne-text">git add -A</span></code><span class="ne-text">命令，随后执行</span><code class="ne-code" style="font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace; background-color: rgba(0, 0, 0, 0.06); border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 2px; padding: 0px 2px"><span class="ne-text">git commit -m '提交所有'</span></code><span class="ne-text">命令。</span></p><p id="u5fe41109" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><span class="ne-text">使用</span><code class="ne-code" style="font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace; background-color: rgba(0, 0, 0, 0.06); border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 2px; padding: 0px 2px"><span class="ne-text">git status -s</span></code><span class="ne-text">查看仓库状态，没有任何提示，如下图：</span></p><p id="ua1bfee44" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1711352485268-5ff35abb-19a0-45f3-8a90-7195d9edc9b4.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_16%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="184" id="uSvzq" class="ne-image"></p></details>

<details class="lake-collapse"><summary id="u5045ccef"><strong><span class="ne-text">操作六</span></strong></summary><p id="u1359d40b" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><span class="ne-text">在工作区中删除 d 文件，随后不执行任何操作。</span></p><p id="ue07b9816" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><span class="ne-text">使用</span><code class="ne-code" style="font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace; background-color: rgba(0, 0, 0, 0.06); border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 2px; padding: 0px 2px"><span class="ne-text">git status -s</span></code><span class="ne-text">查看仓库状态如下：</span></p><p id="u812120d5" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1711352568497-5711c26a-e655-445b-b601-04999af37a33.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_58%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="191" id="bEdvj" class="ne-image"></p><div data-type="tips" class="ne-alert" style="border: 1px solid #BEC0BF; background-color: #EFF0F0; margin: 4px 0; padding: 10px; border-radius: 4px"><p id="u64554c48" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><span class="ne-text">结果含义：删除了 d 文件，且删除动作还停留在</span><strong><span class="ne-text" style="color: #DF2A3F">工作区</span></strong><span class="ne-text">中。</span></p><p id="u98bb5a88" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><span class="ne-text">具体分析：</span></p><ul class="ne-ul" style="margin: 0; padding-left: 23px"><li id="u2cac918a" data-lake-index-type="0"><strong><span class="ne-text" style="color: #DF2A3F">红色</span></strong><span class="ne-text">的含义：操作停留在工作区</span></li><li id="uaba5edb6" data-lake-index-type="0"><strong><span class="ne-text" style="color: #DF2A3F">D  </span></strong><span class="ne-text">的含义：修改（单词： delete）</span></li></ul></div></details>

## 9. 删除暂存

`git rm --cached <file>`可以将文件**从暂存区中删除**。

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1711355388929-fc3e590d-5da8-4334-be3f-988233292fd5.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_87%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

## 10. 对比差异

`git diff` 用于对比：**工作区** vs  **暂存区**

`git diff --cached` 用于对比：**暂存区** vs **仓库区**

 diff 命令的返回格式如下图：

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1711693522346-74e6707e-2547-489c-918e-2a6d0778e849.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_75%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

注意：实际开发中文件多，且修改内容也多，我们会借助 git 的 GUI 工具进行文件差异对比。

## 11. 查看版本日志

借助于下面命令，可以查看整个 git 的提交记录

1. `git log`：按提交时间降序列出所有提交，最新的提交会首先显示。

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1711694523684-fe126098-8270-46f1-a839-93d320f8c7ef.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_94%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

1. `git log --oneline`：在`git log`的基础上，以简洁的一行显示每个提交。

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1711694657278-c9323a24-6ca4-40bb-9d33-dde5b1f259c4.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_86%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

如果内容偏多， 需要使用方向键上下滚动， 按 q 退出。

## 12. 版本回退

Git 可以将项目代码内容切换到历史的任何一个版本，使用 `git reset --hard 版本号`

使用场景如下：

1. 创建一个 git 仓库，随后创建：a、b、c、d 四个文件

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1711350710349-dbf73400-e845-40f7-84bd-b3ba618ad698.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_11%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

1. 随后对四个文件，分别依次执行：`git add`、`git commit` 进行版本控制
2. 随后使用`git log --online`查看版本记录

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1711696411315-3d59bf63-249f-4d1f-b105-e5f9ff7bdf62.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_37%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

1. 现在我们使用`git reset --hard 版本号`把代码回滚到：刚提交完 b 文件的时候

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1711696563019-17945aa9-ec3c-4e83-9f14-3084f2b3cc09.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_51%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

1. 两个注意点：

注意点 1：`git reset --hard` 会有如下动作：

① 切换**版本区** HEAD （指针）指向

② 还原**暂存区**到对应版本

③ 还原**工作区**到对应版本

执行 `git reset --hard` 之前，最好进行： `git add` 、`git commit` 操作！

--soft：重置 HEAD 到指定提交，所有的更改都会自动添加到暂存区，对工作区无影响。

--mixed (默认值)：重置 HEAD 到指定的提交，并且重置暂存区，对工作区无影响。

--hard：重置 HEAD 到指定的提交，并且重置暂存区，重置工作区！

注意点 2：使用 `git reset --hard` 版本回滚后，使用 `git log` 只能看到当前版本之前的记录，例如：刚才回到了 `**13f46ca**` 这个版本，那使用 `git log --online` 就会看到：

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1711697204925-5b0751f2-7a34-4170-b0be-40b4ed6f1fc3.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_38%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

此时：看不见 c 文件和 d 文件的提交记录了，因为对于**13f46ca** 这个版本来说，c 文件和 d 文件的提交记录属于**未来**，是看不到的，要想看到最完整的日志记录，可以使用`git reflog`命令。

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1711697361672-bf25fea2-539b-44e8-8e8e-d42a8b2be1cd.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_61%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

## 13. 修改提交

`git commit --amend` 命令可以修改最近一次提交，它可以：

1. 重新编辑上次的提交信息。

如果在一次提交后，意识到提交信息有误或不够详细，可以使用 `git commit --amend` 来重新编辑上次提交信息

1. 将新的更改添加到上次提交中。

如果在一次提交后，意识到忘记将某文件提交了，可以先使用 `git add` 将这些遗漏的更改添加到暂存区，然后通过 `git commit --amend` 将它们添加到上一个提交中。

<details class="lake-collapse"><summary id="u041c6687"><span class="ne-text">场景演示（重新编辑上次的提交信息）</span></summary><ol class="ne-ol" style="margin: 0; padding-left: 23px"><li id="u5f003d50" data-lake-index-type="0"><span class="ne-text">创建一个 a 文件，其内容如下（包含 4 行内容）</span></li></ol><p id="u18cf833c" class="ne-p" style="margin: 0; padding: 0; min-height: 24px; text-indent: 2em"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1711952292002-269dd1f3-d968-402a-9459-b786b12272b5.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_16%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="203.30274162103103" id="Dlqsb" class="ne-image"></p><ol start="2" class="ne-ol" style="margin: 0; padding-left: 23px"><li id="u3ad26f43" data-lake-index-type="0"><span class="ne-text">随后对 a 文件进行版本控制，但提交信息编写有误</span></li></ol><p id="u9c2b7c8b" class="ne-p" style="margin: 0; padding: 0; min-height: 24px; text-indent: 2em"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1711952361152-520fa76a-c7be-49a9-9275-65b85dbfc4f8.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_54%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="560.998779296875" id="kQKBs" class="ne-image"></p><ol start="3" class="ne-ol" style="margin: 0; padding-left: 23px"><li id="u8cbb0b20" data-lake-index-type="0"><span class="ne-text">查看一下提交记录</span></li></ol><p id="ucfdf1fad" class="ne-p" style="margin: 0; padding: 0; min-height: 24px; text-indent: 2em"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1711952427480-452c941c-253d-40a3-8f4f-e5fd9d788cb6.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_39%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="499.44951506538484" id="asbZz" class="ne-image"></p><ol start="4" class="ne-ol" style="margin: 0; padding-left: 23px"><li id="u743f7ae4" data-lake-index-type="0"><span class="ne-text">随后使用</span><code class="ne-code" style="font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace; background-color: rgba(0, 0, 0, 0.06); border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 2px; padding: 0px 2px"><span class="ne-text">git commit --amend</span></code><span class="ne-text">命令进行修改提交，弹出 vim 编辑框，随后编辑好正确的提交信息，保存并退出</span></li></ol><p id="ubd2f3257" class="ne-p" style="margin: 0; padding: 0; min-height: 24px; text-indent: 2em"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1711952499012-b4b2ef62-2edf-48a7-bf61-c9e19a32cf8c.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_54%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="484.9988098144531" id="vjhCb" class="ne-image"></p><ol start="5" class="ne-ol" style="margin: 0; padding-left: 23px"><li id="u5af23a36" data-lake-index-type="0"><span class="ne-text">此时提示提交成功</span></li></ol><p id="u99b72ec4" class="ne-p" style="margin: 0; padding: 0; min-height: 24px; text-indent: 2em"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1711952563135-f5e497a1-74bc-44d8-b1c4-5fa631773883.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_33%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="428.25685825224406" id="DHHKM" class="ne-image"></p><ol start="6" class="ne-ol" style="margin: 0; padding-left: 23px"><li id="ua92fc530" data-lake-index-type="0"><span class="ne-text">随后查看提交日志如下：</span></li></ol><p id="u1a6403f5" class="ne-p" style="margin: 0; padding: 0; min-height: 24px; text-indent: 2em"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1711952626432-98db97d6-287e-4b80-9ff6-32b49f110393.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_38%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="493.57795574058974" id="iye7P" class="ne-image"></p></details>

<details class="lake-collapse"><summary id="uee21a27d"><span class="ne-text">场景演示（将新的更改添加到上次提交中）</span></summary><ol class="ne-ol" style="margin: 0; padding-left: 23px"><li id="u338b0d97" data-lake-index-type="0"><span class="ne-text">进行了一次提交后，查看提交记录如下：</span></li></ol><p id="u1c80d306" class="ne-p" style="margin: 0; padding: 0; min-height: 24px; text-indent: 2em"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1711695395249-3e73d29c-72fd-487a-b248-a87650b72b18.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_36%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="302.5481262207031" id="q855O" class="ne-image"></p><ol start="2" class="ne-ol" style="margin: 0; padding-left: 23px"><li id="uc3d0e478" data-lake-index-type="0"><span class="ne-text">但发现 a 文件中少写了一些代码，随后我们补上了少写的代码，然后想对最近一次提交进行修改，执行</span><code class="ne-code" style="font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace; background-color: rgba(0, 0, 0, 0.06); border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 2px; padding: 0px 2px"><span class="ne-text">git add -A</span></code><span class="ne-text">后使用</span><code class="ne-code" style="font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace; background-color: rgba(0, 0, 0, 0.06); border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 2px; padding: 0px 2px"><span class="ne-text">git commit --amend</span></code><span class="ne-text">命令进行修改提交。</span></li></ol><p id="u20aac18e" class="ne-p" style="margin: 0; padding: 0; min-height: 24px; text-indent: 2em"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1711695513457-4c306385-962c-4827-848d-e0223caac6fd.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_55%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="361.9976806640625" id="rekbv" class="ne-image"></p><ol start="3" class="ne-ol" style="margin: 0; padding-left: 23px"><li id="uafba113d" data-lake-index-type="0"><span class="ne-text">随后弹出 vim 编辑框，我们在编辑框里重新编写提交说明，随后保存并退出。</span></li></ol><p id="u15587aae" class="ne-p" style="margin: 0; padding: 0; min-height: 24px; text-indent: 2em"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1711695596338-410c36dd-2008-4f4b-9158-4b0c7005df5e.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_79%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="461.99993896484375" id="dpt7S" class="ne-image"><span class="ne-text">。</span></p><ol start="4" class="ne-ol" style="margin: 0; padding-left: 23px"><li id="ud72a99d6" data-lake-index-type="0"><span class="ne-text">随后提交完毕，我们使用</span><code class="ne-code" style="font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace; background-color: rgba(0, 0, 0, 0.06); border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 2px; padding: 0px 2px"><span class="ne-text">git log --online</span></code><span class="ne-text">查看提交记录，发现提交已经被修改。</span></li></ol><p id="uccbf79e6" class="ne-p" style="margin: 0; padding: 0; min-height: 24px; text-indent: 2em"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1711695705187-34ce912f-40cf-4b5a-b5c5-b1c33276086c.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_63%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="458.00225830078125" id="O3LHX" class="ne-image"></p></details>

## 14. 忽略文件

在项目开发过程中有些文件**不应该存储到版本库中**，这个时候配置忽略这些文件。

git 中需要创建一个文件 『`.gitignore`』文件来设置忽略，『`.gitignore`』文件与`.git` 目录同级，常用规则如下：

| 内容    | 含义                                                         |
| ------- | ------------------------------------------------------------ |
| `temp`  | 忽略**任何路径下**的名为 temp 的**文件**、**文件夹。**       |
| `*.log` | 忽略**任何路径下**以`.log` 结尾的文件。                      |
| `/dist` | 忽略根目录下的 `dist` 文件，不会忽略其他目录下的 `dist` 文件 |

备注：`.gitkeep`文件可以把空文件夹提交

## 15. 分支

### 15.1. 分支的概念

分支是 git 的一个重要特性，它可以让开发人员**从主线上分离出来，在一个独立的线路上继续开发**，最后可以灵活的选择合并分支，还是丢弃分支。用一个生活中的例子，来理解分支：

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1712024847910-84a7ab72-89e2-442e-ad87-8f2e72b2b2b2.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_71%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

比如我们正在写一本小说，这本小说的**当前内容**就像是 git 中的 **master 分支**，现在我们有几个新的想法，比如：新的角色、新的剧情，但不确定这些是否最终一定出现在故事里，所以我们可以这样做：

1. 可以为每个新的想法，创建一个新的**笔记本**（一个笔记本就相当于 git 中的**一个新分支**）
2. 每个笔记本（分支）中都可以自由地探索想法，且不会搅乱你的当前内容（master 分支）
3. 当我们觉得一个剧情线非常好，并且想要将其包含在故事中时，就会把那个笔记本的内容（分支）合并到你的当前内容（master 分支）中。
4. 如果某个想法实验失败，可以选择抛弃那个笔记本（相当于 git 中的删除分支），且这个过程不会影响当前内容（master分支）

### 15.2. 创建与切换分支

- 使用 `git branch xxx` 可以创建分支，其中 `xxx` 是分支名字

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1711769307064-b124e211-15ee-434e-a666-004109dde9fa.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_48%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

**备注：创建完 test 分支后，tets 分支并不是空的，而且保留了 master 分支当前所有的提交记录。**

- 使用 `git branch` 可以查看所有分支

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1711769330103-51665904-4edd-468d-80a2-38109a79d3a3.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_48%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

- 使用 `git checkout xxx` 可以切换分支

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1711769431574-969348b4-1919-4119-8485-47deed26146b.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_48%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

- 注意点如下：

① 切换分支前，最好把当前分支管理好，即最好进行：`add`、`commit`操作。

② 切换分支后，工作区、暂存区、会受到影响，具体为：

- 工作区：会变为**切换到的**分支的**最后一次提交的状态**
- 暂存区：同上，且如果暂存区有未提交的更改，那这些更改会被带到新分支的暂存区上。

**比如：在 test 分支对 x 文件进行了暂存，没提交，随后切换到 master 分支时，x 文件会自动加在 master 分支的暂存区**

### 15.3. 合并分支（快速合并）

例如我们有 master 和 test 两个分支，test 分支是领先于 master 分支的，且 tets 分支包含 master 的所有历史记录，那么这时就可以触发 git 的快速合并，具体演示如下：

<details class="lake-collapse"><summary id="u07ea3dd4"><strong><span class="ne-text">第一步：</span></strong><span class="ne-text">创建 a、b 两个文件，随后提交到 master 分支。</span></summary><p id="u6050442b" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1711770939117-10146d85-1467-4583-a01f-49ddfd9e8134.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_49%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="403.1180725097656" id="HxSqI" class="ne-image"></p></details>

<details class="lake-collapse"><summary id="ub60b447f"><strong><span class="ne-text">第二步：</span></strong><span class="ne-text">创建 test 分支，随后在 test 分支创建一个 c 文件，随后提交到 test 分支。</span></summary><p id="ue8b7cc5a" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1711777728665-2eafdf47-b07b-493d-be42-934443421d25.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_62%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="571.0010986328125" id="qDHKA" class="ne-image"></p></details>

<details class="lake-collapse"><summary id="ud28836a2"><strong><span class="ne-text">第三步：</span></strong><span class="ne-text">切回 master 分支</span></summary><p id="u6e9d838c" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><span class="ne-text">此时发现工作区中 c 文件消失（因为 master 分支中没有 c 文件）。</span></p><p id="u72bc6dc7" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1711771228930-9b6827f8-5389-40f8-894f-53fee037e5ea.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_59%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="517.9942321777344" id="gOlGM" class="ne-image"></p></details>

<details class="lake-collapse"><summary id="ud87cf802"><strong><span class="ne-text">第四步：</span></strong><span class="ne-text">把 test 分支合并到 master 分支</span></summary><p id="uf90b3194" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><span class="ne-text">使用</span><code class="ne-code" style="font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace; background-color: rgba(0, 0, 0, 0.06); border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 2px; padding: 0px 2px"><span class="ne-text">git merge test</span></code><span class="ne-text">合并分支，合并成功后，会发现工作区中已经有了 c 文件，且可以查看到 c 文件的提交记录。</span></p><p id="udc229d46" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1711777434203-3a837743-cd6d-430f-8b67-b71ea9e82405.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_60%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="512.0022583007812" id="RSeDg" class="ne-image"></p><p id="u38ff3b61" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1711777936169-61c0d80c-76ff-4e22-be1c-fe9d53f554d5.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_28%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="303.9357604980469" id="vgDLS" class="ne-image"></p></details>

### 15.4. 合并分支（提交合并）

场景描述：当进行分支合并时，若两个分支有不一致的版本，则会提示输提示输入提交信息，在当前分支形成一个新的提交记录，具体场景请执行上述 `15.3` 的**前三步**，然后接下来执行下面步骤：

<details class="lake-collapse"><summary id="u399dac95"><strong><span class="ne-text">第四步</span></strong><span class="ne-text">：切到 master 分支后，创建 d 文件，随后提交到 master 分支。</span></summary><p id="u21255d89" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1711804705867-ce4e6034-dfba-4951-b1bc-2e6920fcf6a1.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_45%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="480.38525390625" id="vK9X1" class="ne-image"></p></details>

<details class="lake-collapse"><summary id="u24fd3dda"><strong><span class="ne-text">第五步：</span></strong><span class="ne-text">在 master 分支中合并 test 分支</span></summary><p id="u1750c5b1" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><span class="ne-text">输入</span><code class="ne-code" style="font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace; background-color: rgba(0, 0, 0, 0.06); border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 2px; padding: 0px 2px"><span class="ne-text">git merge test</span></code><span class="ne-text">命令，进行分支合并</span></p><p id="u949fe81d" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1711805046418-ff04098c-4b39-4854-816f-0fc425fda10c.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_45%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="448.81646728515625" id="ZwEpM" class="ne-image"></p><p id="ud45ce591" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><span class="ne-text">出现如下提示，含义是本次分支合并，存在不一样的版本，请为生成的新版本编写说明</span></p><p id="ue96a0c8d" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1711805343244-d7271863-ac0c-4c7e-b983-8a935cd88bc1.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_67%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="504.0091552734375" id="P0Tfj" class="ne-image"></p><p id="u54728341" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><span class="ne-text">输入完说明后，保存并退出</span></p><p id="udd46066d" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1711805410686-75568a3d-a35b-4c40-a72b-6a97741bca9b.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_67%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="509.0102844238281" id="ztKd7" class="ne-image"></p><p id="u62138405" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><span class="ne-text">随后提示合并完毕</span></p><p id="u5cd73046" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1711805476204-b30359f9-adeb-4c83-bb0a-010cf3b38798.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_45%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="451.18341064453125" id="db7Vk" class="ne-image"></p></details>

### 15.5. 删除分支

- `git branch -d xxx` 可用于删除一个分支，其中 `xxx` 是分支名，例如我们删除 test 分支：

 	![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1711778690194-07970947-94e5-4462-be19-6e4d836c7e6e.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_42%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

- 若删除时提示下图，说明：要删除的分支包含了一些尚未合并到其他分支的内容。

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1711778784216-1c2d8b56-55a9-403f-9961-d109cf3dd743.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_64%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

解决办法有三种：

- 第一种方式：将要删除的分支合并到一个其他的分支，再进行删除。
- 第二种方式：使用`git branch -D xxx`强制删除。
- 第三种方式：使用`git config advice.forceDeleteBranch false`命令关掉该提示。

### 15.6. 分支变基

在 Git 中，合并（merge）和变基（rebase）都是用于整合来自不同分支的更改的操作，它们区别如下：

- 合并（merge）：

将两个分支的历史合并在一起，gti 会创建一个新的“合并提交”，所有的分支和合并点都会被保留在历史中，有完整的历史记录。

![img](https://cdn.nlark.com/yuque/0/2024/gif/35780599/1712634803620-3f65f793-ab1c-4d12-b4df-9272ad68ecaf.gif)

- 变基（rebase）

将一个分支（test）上的提交重新应用到另一个分支（master）上，变基会重写项目历史，因为它实际上是在创建一系列新的提交，会产生一个更线性的历史记录，看起来更干净、更简单。

![img](https://cdn.nlark.com/yuque/0/2024/gif/35780599/1712278910007-278e9284-cae4-46d7-b32b-89810a7f1359.gif)

### 15.7. tag（标签）

在 Git中，标签（Tag）是用来指向特定提交的引用，通常用于标记项目中的重要点，比如版本发布。标签分为两种类型：

1. 轻量标签（Lightweight）

轻量标签只是简单地指向一个提交，不包含其他信息，创建轻量标签不会存储任何额外的信息。

1. 附注标签（Annotated）

附注标签存储了额外的信息，例如：标签名、标签信息、创建者名字、电子邮件、创建日期等。因为它们包含了更多的信息，附注标签更适用于公共或正式发布的场合，比如软件版本的发布。

创建标签

| 命令                                                     | 作用                      |
| -------------------------------------------------------- | ------------------------- |
| `git tag 标签名 版本号`                                  | 给指定提交打 **轻量标签** |
| `git tag -a 标签名 版本号 -m "标签描述"`                 | 给指定提交打 **附注标签** |
| **上述两个命令可以不写版本号，不写就是给最新提交打标签** |                           |
| `git tag`                                                | 查看标签                  |
| `git show 标签名`                                        | 查看标签信息              |
| `git tag -d 标签名`                                      | 删除标签                  |

### 15.8. 游离分支

`git checkout`也可以将代码签出到指定版本，即可以执行`git checkout 具体版本号`，当签出到指定版本时，签出的代码出于一个游离分支中，如下图操作：

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1712632266329-1400e3ea-b26d-464c-ae17-88470fe9ea02.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_79%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

游离分支上可以对代码进行版本控制，但要注意：一旦从游离分支切走，游离分支的提交不会交给任何一个分支，所以对于游离分支我们的原则是：

1. 尽量不修改游离分支的代码（只是看一看某个版本的代码）。
2. 若确实需要修改游离分支代码，应该从当前游离分支，创建出一个新的分支，随后去修改。
3. 若修在游离分支上发生了提交，随后从游离分支切走了，就要使用 reflog 寻找游离分支的提交。

## 16. GitFlow

GitFlow 是团队开发的一种最佳实践，将代码划分为以下几个分支

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1710828311788-0bd8a49c-99f3-4991-a9ae-593ac0d8d7bc.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_35%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

| 分支      | 含义                                                         |
| --------- | ------------------------------------------------------------ |
| `master`  | 主分支，只保存**正式发布**的代码。                           |
| `develop` | 开发分支，开发者的编写的代码最终要出现在这个分支。           |
| `hotfix`  | 线上 bug 修复分支，修复完毕后要合并回 master 和 develop 分支，同时在 master 分支上打一个tag。 |
| `feature` | 功能分支，当开发某个功能时创建一个单独的分支，开发完毕后再合并到 dev 分支。 |
| `release` | 待发布分支，Release分支基于Develop分支创建，在这个Release分支上测试。 |

# 四、Gitee

## 1. Gitee 简介

![img](https://cdn.nlark.com/yuque/0/2024/svg/35780599/1712460685515-9e7edeff-5719-4768-b43f-903198ee692f.svg)

[Gitee](https://gitee.com/) 是一个 Git 仓库管理网站，可以创建远程中心仓库，为多人合作开发提供便利，与 Gitee 类似的网站还有很多，例如：GitHub、GitLab 等等，本教程选择 Gitee 进行讲解，有了 Gitee 的基础后 GitHub 和 GitLab 也同样能很快上手。

## 2. 关联远程库

第一步：维护好本地仓库（所有文件均接受版本控制）。

```sh
git add xxxx
git commit -m '注释'
```

第二步：注册并激活 Gitee 账号。

第三步：创建远程仓库，并获取仓库的地址。

第四步：配置本地仓库关联远程仓库：

```sh
git remote add origin https://xxxx/xxxx/xxxxx.git
```

备注：

- 查看当前仓库关联远程仓库地址：`git remote -v`
- 更改远程仓库的 URL：`git remote set-url origin 新的仓库URL`
- 删除与远程仓库的关联：`git remote remove origin`

## 3. 推送代码

将本地仓库的 master 分支推送到远程仓库

```sh
git push -u origin master
```

命令说明：

1. push 表示推送。
2. -u（upstream） 表示关联，加上 -u 以后，后续提交时可以直接使用 git push 即可。
3. origin 远端仓库的别名。
4. master 本地仓库的分支名称。

## 4. 拉取代码

当本地仓库想获得远程仓库的最新修改时，可以使用`git pull`命令拉取远端代码。

```sh
git pull
```

备注：git pull 会将远端代码自动执行合并操作，即：将远程分支的修改合并到本地当前分支。

## 5. 关于冲突

- **合并/变基**引起的冲突：两个分支在**同一文件**的**同一位置**都有修改时，合并或变基时会引起冲突。
- **拉取**引起的冲突：不同的开发者修改了**同一文件**的**同一位置**都有修改时，拉取代码会有冲突。

## 6. 克隆远程库

获取一个远程仓库的地址，随后执行克隆命令

```sh
git clone https://xxxx/xxxx/xxxx.git
```

使用 `--depth 1` 参数可以克隆仓库的最近一次提交，这样可以减少克隆所需的时间和空间。

```sh
git clone --depth 1 https://xxxx/xxxx/xxxx.git
```

注意点：

- 克隆下来的仓库，使用 `git branch` 命令，只能看到默认分支，其他分支其实也已经克隆下来了，但不出现在`git branch` 列表中，需要使用 `git branch -r` 或  `gir branch -a` 来查看。

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1712640255101-8da002fe-dcce-4122-8350-86c726262789.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_76%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

- 需要切换到其他分支时，可以直接`git checkout -b xxx origin/xxx`来进行切换，当然对于 1.7.0 以后得 git 版本，也可以使用简短的命令：`git checkout xxx`来切换。

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1712640255101-8da002fe-dcce-4122-8350-86c726262789.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_76%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

## 7. SSH 协议

### 7.1. 公钥加密

我们来举个例子，你在 **A 城市**，想给你在 **B 城市**的朋友张三发送一个机密的信件，由于工作原因，你无法亲自去送，同时你也担心快递不能严格的保密。这时你就可以使用公钥加密技术，大致思路是：

- 张三先给你**一个特制的保险箱（公钥）****，**这个保险箱 **仅有一把** 能打开它的钥匙，钥匙在张三那里**。**
- 你将信件放入保险箱并锁上，随后交给快递员，快递员携带着这个箱子去送货，但 **无法打开** 它。
- 快递到达，**张三手里的钥匙（私钥）**打开保险箱，取出信件。

**总结：**

1. 通过这种方式，即使在不完全可信的通道上，你的信件也能安全到达目的地，没有人能够在途中打开保险箱并窃取它。这就是公钥加密的工作原理。
2. 使用公钥（所有人可见的保险箱）来加密信息，而只有对应的私钥（只有接收者持有的钥匙）能解密信息。这种方法不仅保护了数据的安全性，还确保了数据传输的私密性和完整性。

### 7.2. SSH 简介

SSH（Secure Shell）是一种网络协议，SSH利用公钥加密技术提供了一种安全的方法，来管理和操作远程计算机，保护数据的安全和隐私

### 7.3. Gitee 使用 ssh

<details class="lake-collapse"><summary id="u811c905f"><strong><span class="ne-text">第一步：生成 SSH 公钥</span></strong></summary><ol class="ne-ol" style="margin: 0; padding-left: 23px"><li id="u11a56aed" data-lake-index-type="0"><span class="ne-text">使用</span><code class="ne-code" style="font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace; background-color: rgba(0, 0, 0, 0.06); border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 2px; padding: 0px 2px"><span class="ne-text" style="color: rgb(57, 58, 52); background-color: rgb(246, 248, 250); font-size: 14px">ssh-keygen </span><span class="ne-text" style="color: rgb(54, 172, 170); background-color: rgb(246, 248, 250); font-size: 14px">-t</span><span class="ne-text" style="color: rgb(57, 58, 52); background-color: rgb(246, 248, 250); font-size: 14px"> ed25519 </span><span class="ne-text" style="color: rgb(54, 172, 170); background-color: rgb(246, 248, 250); font-size: 14px">-C</span><span class="ne-text" style="color: rgb(227, 17, 108); background-color: rgb(246, 248, 250); font-size: 14px">"Gitee SSH Key"</span></code><span class="ne-text">命令生成公钥。</span></li><li id="u1265048d" data-lake-index-type="0"><span class="ne-text">提示输入公钥的保存地址，如无需修改，直接回车即可：</span></li></ol><p id="udb909a6c" class="ne-p" style="margin: 0; padding: 0; min-height: 24px; text-indent: 2em"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1712889776725-e5c2d121-7170-4cae-9d12-b5844b851f8a.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_45%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="579.4495108657184" id="ncnSs" class="ne-image"></p><ol start="3" class="ne-ol" style="margin: 0; padding-left: 23px"><li id="u062d10a7" data-lake-index-type="0"><span class="ne-text">提示是否为私钥建立密码，如需要直接输入，不需要直接回车：</span></li></ol><p id="ub1305924" class="ne-p" style="margin: 0; padding: 0; min-height: 24px; text-indent: 2em"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1712889882532-5b1bbd3d-3688-478a-a2bb-a2b65b81f0ff.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_45%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="579.4495108657184" id="OqtnA" class="ne-image"></p><ol start="4" class="ne-ol" style="margin: 0; padding-left: 23px"><li id="u15efe9bc" data-lake-index-type="0"><span class="ne-text">提示确认密码，输入和上一步相同的密码即可，若无密码直接回车：</span></li></ol><p id="uf5518c9a" class="ne-p" style="margin: 0; padding: 0; min-height: 24px; text-indent: 2em"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1712889931549-9490ed70-85db-4540-8265-c0800bb6a339.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_45%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="579.4495108657184" id="MiAUy" class="ne-image"></p><ol start="5" class="ne-ol" style="margin: 0; padding-left: 23px"><li id="ua1eb1de0" data-lake-index-type="0"><span class="ne-text">提示生成完毕</span></li></ol><p id="u21bdb875" class="ne-p" style="margin: 0; padding: 0; min-height: 24px; text-indent: 2em"><span class="ne-text"> </span><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1712889996918-12cf3131-ebc1-40f7-abf8-7bb7afee9e16.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_45%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="579.4495108657184" id="LeoPR" class="ne-image"></p></details>

<details class="lake-collapse"><summary id="u914539ea"><strong><span class="ne-text">第二步：在 Gitee 上配置公钥</span></strong></summary><ol class="ne-ol" style="margin: 0; padding-left: 23px"><li id="ufbcb7b8d" data-lake-index-type="0"><span class="ne-text">输入</span><code class="ne-code" style="font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace; background-color: rgba(0, 0, 0, 0.06); border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 2px; padding: 0px 2px"><span class="ne-text" style="color: rgb(215, 58, 73); background-color: rgb(246, 248, 250); font-size: 14px">ls</span><span class="ne-text" style="color: rgb(57, 58, 52); background-color: rgb(246, 248, 250); font-size: 14px"> ~/.ssh/</span></code><span class="ne-text">命令查看生成的公钥与私钥</span></li></ol><p id="u12264063" class="ne-p" style="margin: 0; padding: 0; min-height: 24px; text-indent: 2em"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1712890172464-85374350-2337-4cbe-b3f3-c33590136b7c.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_20%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="255.04585817078802" id="uafe11441" class="ne-image"></p><ul class="ne-ul" style="margin: 0; padding-left: 23px"><li id="u4331a86e" data-lake-index-type="0"><span class="ne-text" style="color: rgb(46, 64, 94)">私钥文件 </span><code class="ne-code" style="font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace; background-color: rgba(0, 0, 0, 0.06); border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 2px; padding: 0px 2px"><span class="ne-text" style="color: rgb(46, 64, 94); font-size: 14px">id_ed25519</span></code></li><li id="uef64434a" data-lake-index-type="0"><span class="ne-text" style="color: rgb(46, 64, 94)">公钥文件 </span><code class="ne-code" style="font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace; background-color: rgba(0, 0, 0, 0.06); border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 2px; padding: 0px 2px"><span class="ne-text" style="color: rgb(46, 64, 94); font-size: 14px">id_ed25519.pub</span></code></li></ul><ol start="2" class="ne-ol" style="margin: 0; padding-left: 23px"><li id="u5c61827f" data-lake-index-type="0"><span class="ne-text" style="color: rgb(46, 64, 94)">使用</span><code class="ne-code" style="font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace; background-color: rgba(0, 0, 0, 0.06); border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 2px; padding: 0px 2px"><span class="ne-text" style="color: rgb(215, 58, 73); background-color: rgb(246, 248, 250); font-size: 14px">cat</span><span class="ne-text" style="color: rgb(57, 58, 52); background-color: rgb(246, 248, 250); font-size: 14px"> ~/.ssh/id_ed25519.pub</span></code><span class="ne-text" style="color: rgb(46, 64, 94)">查看公钥</span></li></ol><p id="udeb4acbe" class="ne-p" style="margin: 0; padding: 0; min-height: 24px; text-indent: 2em"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1712890311441-5dfa669e-f811-4e59-ad93-022cff1ffb55.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_45%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="577.2476761189203" id="u716584b2" class="ne-image"></p><ol start="3" class="ne-ol" style="margin: 0; padding-left: 23px"><li id="uf8f7babb" data-lake-index-type="0"><span class="ne-text">复制公钥，添加到 Gitee 设置中</span></li></ol><p id="u14c4107e" class="ne-p" style="margin: 0; padding: 0; min-height: 24px; text-indent: 2em"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1712890479075-94866ee3-bd12-4da1-a9d6-8a104c237298.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_97%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="577.0079956054688" id="ud35e918f" class="ne-image"></p></details>

<details class="lake-collapse"><summary id="ubaf15bf9"><strong><span class="ne-text">第三步：本地库与远端交互</span></strong></summary><ol class="ne-ol" style="margin: 0; padding-left: 23px"><li id="u35ae3f4d" data-lake-index-type="0"><span class="ne-text">尝试使用 ssh 方式克隆仓库</span></li></ol><p id="u98aef4d8" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1712890588276-7790d211-098f-485e-a7aa-0a643cdf9c57.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_55%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="703.1192291442156" id="ufcb3ac7c" class="ne-image"></p><ol start="2" class="ne-ol" style="margin: 0; padding-left: 23px"><li id="u55c696e2" data-lake-index-type="0"><span class="ne-text">第一次操作，此处会有提示，输入 yes 即可</span></li></ol><p id="u87c21851" class="ne-p" style="margin: 0; padding: 0; min-height: 24px; text-indent: 2em"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1712890695874-cb5691e6-b3e9-4fd2-8f65-15f002a58021.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_74%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="591.0125732421875" id="u1caced8a" class="ne-image"></p><ol start="3" class="ne-ol" style="margin: 0; padding-left: 23px"><li id="u4d9e3962" data-lake-index-type="0"><span class="ne-text">克隆成功</span></li></ol><p id="u8ad7c141" class="ne-p" style="margin: 0; padding: 0; min-height: 24px; text-indent: 2em"><img src="https://cdn.nlark.com/yuque/0/2024/png/35780599/1712890729966-ae428126-56b8-4514-bcc6-ba9d3e104c6a.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_73%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10" width="555.0125732421875" id="u1a5293e6" class="ne-image"></p><p id="u4c46459c" class="ne-p" style="margin: 0; padding: 0; min-height: 24px"><span class="ne-text">后续的拉取，推送，可以直接尽心，无序任何的密码输入。</span></p></details>

# 五、VSCode 中使用 git

## 1. 插件推荐

VSCode 中有很多 git 相关的插件，本教程中推荐下面两个：

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1712460146110-aa4bb544-2e23-430e-8c34-bd20576e06fd.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_50%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1712460302583-786d3932-d144-44df-bf93-43cf9d60be3d.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_44%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

## 2. 创建仓库

如图所示点击操作，即可借助`Vscode`来创建仓库

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1712556404604-62a6c085-7ed4-4447-bbeb-30e53b50c519.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_34%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

不同的工具创建出来的主分支名字可能不一样，比如 Vscode 中通过点击下方按钮创建的仓库，主分支的名字就叫`main`，当然也可以进行修改，让 Vscode 默认的主分支名是 `master`

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1712891047594-1dc808d3-cbbe-4862-981f-4513324a78ae.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_109%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

## 3. 版本控制

点击“+”将文件添加到暂存区（相当于`git add`命令）

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1712556976563-d185460b-3e6b-44dd-b57d-6286a2effa11.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_25%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

点击【提交】将文件添加到版本区（相当于`git commit`命令）

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1712557062735-d8082b50-861d-4bcc-8f06-1ad590deb4c6.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_24%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

## 4. 撤销暂存

点击“-”撤销对 b 文件的暂存

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1712557180691-0674c78a-f0eb-4094-b565-9ba20711a957.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_24%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

## 5. 查看日志

点击【Git Graph】查看仓库日志

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1712557564352-17899a97-01c7-4d88-ab70-d875e9da52bd.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_91%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

## 6. 对比差异

点击文件名对比文件和上次提交的差异

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1712558030800-4fc911d8-4725-478a-8f9d-55d36a086887.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_63%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1712558051173-9c19f3fa-11a0-4cac-89ab-e30f76f0be6a.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_74%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

点击某个版本的提交后，按住 ctrl 点击另一个版本号，可以对比两个版本的区别

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1712892450863-8c9d3f5a-3b68-45b5-99bf-72f9ea1cfcc1.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_61%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

## 7. 版本回退

借助 Git Graph 以游离分支的形式回退（本质是 `git checkout 版本号`）

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1712892732660-dba13139-1061-4f37-91ac-8c2a1319455d.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_56%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

借助 Git History 版本回退（本质是 `git reset --hard 版本号`或 `git reset --soft 版本号`）

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1712892866371-9792c18d-b4dc-4e72-9131-1b02ec9201a3.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_46%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

## 8. 添加 tag

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1712892949205-cdf5133d-a4e1-458e-aaca-228f94988376.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_42%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

## 9. 创建分支

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1712893556188-f96ea183-ee9b-4917-ad42-f8cd6bd98851.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_75%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

## 10. 分支合并

在当前分支上鼠标右键，随后选择将当前分支合并到哪个分支

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1712898638404-3c0361eb-c851-422c-9f89-b8115f643eb1.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_19%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

选择 Yes,merge

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1712898652258-1beef4de-6431-48ee-a85b-fccbb9865ec1.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_15%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

## 11. 分支变基

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1712901334319-edb4f2d7-2f5b-4d42-9581-ce9b6e7bd3f3.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_19%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1712901355177-972e9c05-b05a-4747-9a98-756e88321af6.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_15%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

## 12. 推送代码

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1712901387312-d5273e32-b4d5-4ab4-8ecb-c50bdc96fea7.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_19%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

## 13. 拉取代码

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1712901408851-0f48ec59-5072-46ca-ab20-510ffc274b9c.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_17%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

## 14. 处理冲突

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1712974519154-685b04f0-1e4b-4089-a1a5-4da06e58dbaa.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_73%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

# 六、附录

## 1. Git 官方书籍

[https://git-scm.com/book/zh/v2/](https://git-scm.com/book/zh/v2/起步-关于版本控制)

## 2. git 目录介绍

- hooks 目录包含客户端或服务端的钩子脚本，在特定操作下自动执行
- info 信息文件夹. 包含一个全局性排除文件，可以配置文件忽略
- logs 保存日志信息
- objects 目录存储所有数据内容,本地的版本库存放位置
- refs 目录存储指向数据的提交对象的指针（分支）
- config 文件包含项目特有的配置选项
- description 用来显示对仓库的描述信息
- HEAD 文件指示目前被检出的分支
- index 暂存区文件，是一个二进制文件 (git ls-files)

切记： 不要手动去修改 .git 文件夹中的内容

## 3. CRLF

CRLF 是Carriage-Return Line-Feed 的缩写。

CR 表示的是 ASCII 码的第 13 个符号 \r 回车，LF 表示的是 ASCII 码表的第 10 个符号 \n 换行。

每个操作系统对回车换行的存储方式不同

- windows 下用 CRLF（\r\n）表示
- linux 和 unix 下用 LF（\n）表示
- mac 系统下用 CR（\r）表示

## 4.  卸载密码管理工具

执行命令： `git config --system --unset credential.helper`
