/* eslint-disable style/no-tabs */
import type { EProgress } from "./index";

import type { ProgressView } from "./type";
// import type { PreinitializedMapStore } from "nanostores";
// import { map } from "nanostores";
import sheetText from "./styles/line.scss?inline";

interface AnimateCallbackArgs {
  value: number;
  ani: Animation;
  duration: number;
}

function createLineView(): ProgressView<EProgress> {
  const element = document.createElement("div");
  element.classList.add("progress");

  // 固定模板，只在创建视图时使用一次
  element.innerHTML = `
		<div class="line"></div>
		<span class="content"></span>
  `;

  const line = element.querySelector<HTMLDivElement>(".line");
  const content = element.querySelector<HTMLSpanElement>("span.content");

  function appendStyles(this: EProgress): void {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(sheetText);
    this.shadowRoot!.adoptedStyleSheets = [sheet];
  }

  return {
    element,
    update(this) {
      const { color, value, ani } = this;

      // 加载样式
      appendStyles.call(this);

      // 判断是否执行动画
      if (ani) {
        const duration = 2000;
        line!.style.setProperty("--progress-color", color!);
        const keyframes = { "--progress": ["0%", `${value}%`] } as PropertyIndexedKeyframes;
        const options = {
          duration,
          easing: "linear",
          fill: "forwards",
        } as KeyframeAnimationOptions;

        const animation = line!.animate(keyframes, options);
        animation.play();
        // this.frameId = requestAnimationFrame(
        //   () => animateCallback.call(this, { value, ani: animation, duration }),
        // );
      } else {
        line!.style.setProperty("--progress", `${value}%`);
        line!.style.setProperty("--progress-color", `${color}`);
      }
    },
    destroy() {
      // 如果存在动画、定时器或订阅，在这里清理
      element.remove();
    },
  };
}

export {
  createLineView,
};
