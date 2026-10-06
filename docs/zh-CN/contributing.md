# 参与贡献

我们欢迎各种贡献来改进 nPlyr！无论是修复 bug、添加功能、翻译、编写规则，还是完善文档，我们都感激你的帮助。

## 贡献方式

### Bug 报告
- 先查看已有的 [issues](https://github.com/nPlyr/nPlyr-site/issues)。
- 包含你的操作系统版本、nPlyr 版本，以及复现步骤。
- 附上示例链接或规则名称（请勿包含个人媒体或凭据）。

### 功能请求
- 描述该功能及其使用场景。
- 说明它为何会惠及 nPlyr 用户。
- 检查它是否符合本地优先、尊重隐私的理念。

### 翻译
- nPlyr 的界面通过 i18n JSON 文件支持 25 种语言。
- 为缺失或不完整的语言贡献翻译。
- 现有翻译参见 `nPlyr/Resources/i18n/`。

### 小程序与规则
- nPlyr 运行 hikerView 兼容的小程序。在社区中分享新源或修复现有源。
- 发布前，请查阅[兼容性](/zh-CN/guide/miniapp-compatibility)页面，确保你的规则不依赖不受支持的 Java/Rhino 行为。

### 代码贡献
- 应用使用 **Swift 6 + SwiftUI** 编写。
- Fork 仓库并提交 pull request。
- 遵循现有架构（共享的 `Core/**` 与 `Features/**`，平台胶水文件位于 `+macOS` / `+iOS`）。

## 开始上手

### 前置条件
- Node.js 18 或更高版本（用于文档站点）
- pnpm 包管理器（用于文档站点）
- Xcode 16+（用于应用开发）
- macOS 14 Sonoma+（用于构建 / 运行 macOS 应用）

### 开发环境搭建（文档站点）

1. 在 GitHub 上 **Fork 仓库**。
2. **克隆你的 Fork**：
   ```bash
   git clone https://github.com/nPlyr/nPlyr-site.git
   cd nPlyr-site
   ```
3. **安装依赖**：
   ```bash
   pnpm install
   ```
4. **启动开发服务器**：
   ```bash
   pnpm docs:dev
   ```
5. 在浏览器中打开 `http://localhost:5173`。

### 做出修改

1. 为你的修改创建一个新分支：
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. 修改 `docs/` 中的文档文件。
3. 通过构建站点来测试你的修改：
   ```bash
   pnpm docs:build
   ```
4. 提交你的修改：
   ```bash
   git add .
   git commit -m "你的修改说明"
   ```

### 提交修改

1. 将分支 **push 到你的 Fork**：
   ```bash
   git push origin feature/your-feature-name
   ```
2. 在 GitHub 上**创建 Pull Request**。
3. **等待评审**并处理反馈。

## 指南

### 写作风格
- 使用清晰、简洁的语言。
- 尽量使用主动语态。
- 保持包容与友好。
- 使用一致的格式。
- 在有帮助时附上截图。

### 文件结构
- 文档页面放在 `docs/`。
- 指南放在 `docs/guide/`。
- 文件名使用小写加连字符：`my-new-guide.md`。

### 链接
- 内部文档使用相对链接。
- 在有帮助时链接到外部资源。
- 确保所有链接可用。

### 图片与资源
- 将图片放在 `docs/public/` 或其子目录。
- 使用描述性的文件名。
- 为网页优化图片（建议小于 500KB）。

## 行为准则

本项目遵循一份行为准则。参与即表示你同意：
- 保持尊重与包容。
- 聚焦于建设性反馈。
- 为自己的错误承担责任。

## 有疑问？

如果你对贡献有疑问，请查看已有的 [issues](https://github.com/nPlyr/nPlyr-site/issues) 或新建一个。感谢你帮助改进 nPlyr！
