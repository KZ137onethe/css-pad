/* eslint-disable style/no-tabs */
import type { EProgress } from "./index";
import type { ProgressView } from "./type";
// import type { PreinitializedMapStore } from "nanostores";
// import { map } from "nanostores";
import sheetText from "./styles/circle.scss?inline";

interface AnimateCallbackArgs {
  value: number;
  ani: Animation;
  duration: number;
}

function createCircleView(): ProgressView<EProgress, [EProgress, AnimateCallbackArgs]> {
  const element = document.createElement("div");
  element.classList.add("progress");

  // 固定模板，只在创建视图时使用一次
  element.innerHTML = `
		<div class="circle">
			<div class="content"></div>
		</div>
  `;

  const circle = element.querySelector<HTMLDivElement>(".circle");
  const content = element.querySelector<HTMLDivElement>(".content");

  function appendStyles(this: EProgress): void {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(sheetText);
    this.shadowRoot!.adoptedStyleSheets = [sheet];
  }

  return {
    element,
    update(this: EProgress) {
      // 添加样式
      appendStyles.call(this);
      // 其他逻辑
      const { color, value, ani } = this;

      // 是否执行动画
      if (ani) {
        const duration = 2000;
        circle!.style.setProperty("--progress-color", color!);
        const keyframes = { "--progress": ["0%", `${value}%`] } as PropertyIndexedKeyframes;
        const options = {
          duration,
          easing: "cubic-bezier(0.42, 0, 0.58, 1)",
          fill: "forwards",
        } as KeyframeAnimationOptions;

        const animation = circle!.animate(keyframes, options);
        animation.play();
        this.frameId = requestAnimationFrame(
          () => this.animateCallback({
            ani: animation,
            duration,
            callback: progress => content!.innerHTML = `${progress}`,
          }),
        );
      } else {
        circle!.style.background = `conic-gradient(${color} ${value}%, transparent 0%)`;
        content!.innerHTML = `${value}`;
      }
    },
    destroy() {
      // 如果存在动画、定时器或订阅，在这里清理
      element.remove();
    },
  };
}

export {
  createCircleView,
};
