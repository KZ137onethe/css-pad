import type { PreinitializedMapStore } from "nanostores";
import { map } from "nanostores";
import sheetText from "./style.scss?inline";

class EProgressState {
  loaded: boolean = false;
  color?: string;
  degree?: number;
}

class EProgress extends HTMLElement {
  public el: { [key: string]: HTMLDivElement | undefined } = {};
  public state!: PreinitializedMapStore<EProgressState>;
  private frameId: ReturnType<typeof requestAnimationFrame> | undefined;
  constructor() {
    super();
    this.state = map<EProgressState>({
      loaded: false,
    });
  }

  static register(): void {
    CSS.registerProperty({
      name: "--progress",
      syntax: "<percentage>",
      inherits: false,
      initialValue: "0%",
    });
    customElements.define("e-progress", EProgress);
  }

  static get observedAttributes(): string[] {
    return ["color", "degree"];
  }

  connectedCallback(): void {
    const shadow = this.attachShadow({ mode: "open" });

    const [rootEl, circleEl, contentEl] = [
      document.createElement("div"),
      document.createElement("div"),
      document.createElement("div"),
    ];
    rootEl.className = "progress";
    circleEl.className = "circle";
    contentEl.className = "content";

    rootEl.append(circleEl);
    circleEl.append(contentEl);
    shadow.append(rootEl);

    this.el = {
      root: rootEl,
      circle: circleEl,
      content: contentEl,
    };

    this.appendStyles();
    this.apply();
    this.state.setKey("loaded", true);
  }

  attributeChangedCallback(...args: string[]): void {
    const [name, oldVal, newVal] = [...args];
    const { loaded } = this.state.value;
    if (loaded) {
      if (["degree", "color"].includes(name)) {
        this.apply();
      }
    }
  }

  appendStyles(): void {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(sheetText);
    this.shadowRoot!.adoptedStyleSheets = [sheet];
  }

  apply(): void {
    const degree = Number.parseInt(this.getAttribute("degree") as string);
    const color = this.getAttribute("color");
    this.state.setKey("degree", degree);
    this.state.setKey("color", color ?? undefined);
    const hasAnimate = this.hasAttribute("has-animate");
    const circleEl = this.el.circle as HTMLElement;
    const contentEl = this.el.content as HTMLElement;

    if (hasAnimate) {
      const duration = 2000;
      circleEl.style.setProperty("--progress-color", color);
      const keyframes = { "--progress": ["0%", `${degree}%`] } as PropertyIndexedKeyframes;
      const options = {
        duration,
        easing: "cubic-bezier(0.42, 0, 0.58, 1)",
        fill: "forwards",
      } as KeyframeAnimationOptions;

      const animation = circleEl.animate(keyframes, options);
      animation.play();
      this.frameId = requestAnimationFrame(() => this.animateCallback(animation, duration));
    } else {
      circleEl.style.background = `conic-gradient(${color} ${degree}%, transparent 0%)`;
      contentEl.innerHTML = `${degree}`;
    }
  }

  private animateCallback(ani: Animation, duration: number): void {
    const degree = this.state.value.degree as number;
    const currentTime = ani.currentTime as number;
    const progress = Math.floor(currentTime * 100 / duration);
    this.el.content!.innerHTML = `${progress}`;
    if (progress < degree) {
      this.frameId = requestAnimationFrame(() => this.animateCallback(ani, duration));
    } else {
      cancelAnimationFrame(this.frameId as number);
    }
  }
}

export {
  EProgress,
  EProgressState,
};
