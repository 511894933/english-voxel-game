* Unity 项目版本：本仓库提供一个轻量的 Web 可玩原型，使用纯 HTML/JS/CSS 实现，方便直接在浏览器中打开并试玩。

如何在本地运行

1. 克隆仓库：
   git clone https://github.com/511894933/english-voxel-game.git
2. 进入仓库目录并直接打开 index.html（双击或用浏览器打开）。
   建议用 Live Server（VSCode 插件）或通过简单的本地静态服务器（如 python -m http.server 8000）以避免浏览器的部分安全限制。

玩法说明

- 在网格世界中点击箱子（Chest）可以触发一个英语任务（填空或输入单词）。
- 正确回答会获得钥匙。收集 3 把钥匙后，出口会解锁并胜利。

示例：
- 点击 Chest1，提示："I eat an ___ every day."，输入 "apple" 获得钥匙。

你可以把这个原型作为 Web MVP。后续我可以：
- 把它替换为 Unity WebGL 构建并上传到 GitHub Pages（需要大文件处理）。
- 集成语音识别（Web Speech API）把朗读任务加入游戏。
- 扩展为真正的体素世界（基于 three.js 或 Unity WebGL）。
