# 动图背景推荐

## 当前使用

已在首页 Hero 区域使用 GIF 动图背景，通过 CSS background-image 实现。

## 推荐的免费 GIF 动图资源

### 1. Giphy（最推荐）
- **深色美学**: https://giphy.com/explore/aesthetic-dark
- **电影感**: https://giphy.com/explore/cinematic
- **抽象动画**: https://giphy.com/explore/abstract-animation

**使用方法**：
1. 在 Giphy 找到喜欢的 GIF
2. 右键点击 GIF → 复制图片地址
3. 替换到 `src/styles/index.css` 中的 `.hero-background` 的 `url()`

### 2. Pixabay GIF
- **背景动图**: https://pixabay.com/gifs/search/background/
- **深色氛围**: https://pixabay.com/gifs/search/dark%20ambient/
- **哥特风格**: https://pixabay.com/gifs/search/gothic%20background/

### 3. 游戏环境相关
- **Unreal Engine 资源**: https://itch.io/game-assets/free/tag-unreal-engine
- **游戏动画**: https://www.unrealengine.com/en-US/blog/game-animation-sample

## 推荐的 GIF 风格

### 适合游戏地编作品集的动图：

1. **抽象粒子动画**
   - 金色粒子流动
   - 黑色背景 + 金色光点
   - 缓慢移动的光效

2. **环境氛围**
   - 雾气飘动
   - 光线变化
   - 云层流动

3. **科技感**
   - 数字雨
   - 网格动画
   - 扫描线效果

4. **自然元素**
   - 星空闪烁
   - 极光流动
   - 水波纹理

## 如何更换背景

### 方法 1: 使用 GIF URL（当前方法）

编辑 `src/styles/index.css`：

```css
.hero-background {
  background:
    linear-gradient(...),
    url('你的GIF链接') center/cover no-repeat;
}
```

### 方法 2: 使用本地 GIF

1. 将 GIF 文件放到 `public/images/` 目录
2. 更新 CSS：

```css
.hero-background {
  background:
    linear-gradient(...),
    url('/images/hero-bg.gif') center/cover no-repeat;
}
```

### 方法 3: 使用视频（更流畅）

如果 GIF 太大或卡顿，建议转换为视频：

```html
<video class="hero-video" autoplay muted loop playsinline>
  <source src="/videos/hero-bg.mp4" type="video/mp4">
</video>
```

## 性能优化建议

### GIF 优化
- 文件大小：< 5MB
- 尺寸：1920x1080 或更小
- 帧率：15-24 fps
- 循环：无缝循环

### 工具推荐
- **压缩 GIF**: https://ezgif.com/optimize
- **GIF 转视频**: https://ezgif.com/gif-to-mp4
- **调整尺寸**: https://ezgif.com/resize

## 当前配置

```css
.hero-background {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background:
    linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(212, 175, 55, 0.15) 100%),
    url('https://media.giphy.com/media/xT0xeMA62E1XIlup68/giphy.gif') center/cover no-repeat;
  opacity: 0.5;
  filter: brightness(0.6) contrast(1.1);
  z-index: 0;
}
```

## 推荐的具体 GIF

### 1. 金色粒子（推荐）
```
https://media.giphy.com/media/xT0xeMA62E1XIlup68/giphy.gif
```
金色粒子流动，非常适合奢华风格

### 2. 抽象黑金
```
https://media.giphy.com/media/3o7TKP9ln2Dr6ze6f6/giphy.gif
```
黑色背景 + 金色线条

### 3. 星空闪烁
```
https://media.giphy.com/media/l0HlNQ03J5JxX6lva/giphy.gif
```
深色星空，适合科幻风格

### 4. 烟雾效果
```
https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif
```
黑色烟雾流动

### 5. 光线扫描
```
https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif
```
科技感扫描线

## 注意事项

1. **版权**: 使用 Giphy/Pixabay 的 GIF 前确认可商用
2. **性能**: GIF 文件过大会影响加载速度
3. **移动端**: 考虑在移动端使用静态图片
4. **可访问性**: 确保文字在动图上清晰可读

## 移动端优化

在移动端禁用动图，使用静态背景：

```css
@media (max-width: 768px) {
  .hero-background {
    background:
      linear-gradient(...),
      url('/images/hero-static.jpg') center/cover no-repeat;
  }
}
```

---

更新时间: 2026-04-13
当前背景: Giphy 金色粒子动画
