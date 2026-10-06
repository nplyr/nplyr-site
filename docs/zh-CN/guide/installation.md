# 安装

nPlyr 来自同一个 Xcode 工程的两个 target：

- **`nPlyr`**——macOS 应用。
- **`nPlyrIOS`**——iOS / iPadOS 应用。

两者共用同一套播放内核与规则引擎。

## macOS

### Mac App Store（推荐）

1. 打开 **Mac App Store**，搜索 **nPlyr**，或使用[首页](/zh-CN/)上的徽章。
2. 点击 **获取**，等待下载完成。
3. 从 Dock 或启动台启动 nPlyr。

Mac App Store 版本经过沙盒化并由 Apple 签名，因此无需额外设置。

### 侧载（开发 / TestFlight）

如果你从源码构建，请打开 `nPlyr.xcodeproj`，选择 **`nPlyr`** scheme，并在"My Mac"上运行。开发签名构建在首次使用浏览器或下载功能时，可能会提示你授予[权限](/zh-CN/guide/permissions)中描述的权限。

## iOS / iPadOS

### App Store

在 iOS App Store 中搜索 **nPlyr** 并安装。同一个账号可在两个平台上解锁小程序功能。

### 从源码构建

1. 打开 `nPlyr.xcodeproj` 并选择 **`nPlyrIOS`** scheme。
2. 选择一个模拟器或已连接的设备（iOS 16+）。
3. 运行。在实体设备上，你需要在 Signing & Capabilities 中设置一个开发团队。

> iOS 构建与 macOS 使用同一套共享源码；只有少量平台胶水文件不同。没有独立的 `ffmpeg` 依赖。

## 首次启动

首次启动时，nPlyr 会：

- 请求它所需的权限（参见[权限](/zh-CN/guide/permissions)），
- 在用户数据容器内创建本地媒体库，
- 默认使用你的系统语言（可随时在[设置](/zh-CN/guide/settings)中切换）。

如果安装后某些行为不符合预期，请跳转到[故障排查](/zh-CN/guide/troubleshooting)。
