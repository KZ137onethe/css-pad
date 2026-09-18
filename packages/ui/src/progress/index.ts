import type { AnimateCallbackArgs, ProgressProps, ProgressType, ProgressView } from "./type";
import { createCircleView } from "./circle";
import { createLineView } from "./line";

const viewFactories: Record<ProgressType, () => ProgressView> = {
  line: createLineView,
  circle: createCircleView,
};

class EProgress extends HTMLElement implements ProgressProps {
  static observedAttributes = ["type", "value", "ani", "color"];

  private root = this.attachShadow({ mode: "open" });
  private view?: ProgressView;
  public currentType: ProgressType = "line";
  public frameId?: number;
  public color?: string;
  public value?: number;
  public ani?: boolean;

  connectedCallback(): void {
    this.sync();
  }

  disconnectedCallback(): void {
    this.view?.destroy();
    this.frameId = undefined;
    this.view = undefined;
    this.currentType = "line";
  }

  attributeChangedCallback(
    _name: string,
    oldValue: string | null,
    newValue: string | null,
  ): void {
    if (oldValue !== newValue && this.isConnected) {
      this.sync();
    }
  }

  private sync(): void {
    const type: ProgressType
      = this.getAttribute("type") === "circle" ? "circle" : "line";

    // 只有结构变化时，才销毁并创建视图
    if (!this.view || this.currentType !== type) {
      this.view?.destroy();

      this.view = viewFactories[type]();
      this.currentType = type;
      this.color = this.getAttribute("color") ?? "";
      this.value = Number(this.getAttribute("value")) ?? 0;
      this.ani = this.hasAttribute("ani");
      this.root.append(this.view.element);
    }

    // 普通数值变化不重建 DOM
    this.view.update.call(this);
  }

  protected animateCallback(args: AnimateCallbackArgs): void {
    const { callback, ani, duration } = args;
    const currentTime = ani.currentTime as number;
    const progress = Math.floor(currentTime * 100 / duration);
    callback && callback(progress);
    if (progress < this.value!) {
      this.frameId = requestAnimationFrame(() => this.animateCallback(args));
    } else {
      cancelAnimationFrame(this.frameId as number);
    }
  }

  static register(): void {
    // 注册自定义属性
    CSS.registerProperty({
      name: "--progress",
      syntax: "<percentage>",
      inherits: true,
      initialValue: "0%",
    });
    customElements.define("e-progress", EProgress);
  }
}

export {
  EProgress,
};
