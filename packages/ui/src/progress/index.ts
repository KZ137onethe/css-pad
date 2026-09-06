import sheetText from "./style.scss?inline";

class EProgressState {
  loaded: boolean = false;
}

class EProgress extends HTMLElement {
  public el: { [key: string]: HTMLDivElement | undefined } = {};
  public state: EProgressState = { loaded: false };
  private frameId: ReturnType<typeof requestAnimationFrame> | undefined;
  constructor() {
    super();
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
    this.state.loaded = true;
  }

  attributeChangedCallback(...args: string[]): void {
    const [name, oldVal, newVal] = [...args];
    if (this.state.loaded) {
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
    const hasAnimate = this.hasAttribute("has-animate");
    const color = this.getAttribute("color");
    const circleEl = this.el.circle as HTMLElement;

    if (hasAnimate) {
      const duration = 2000;
      circleEl.style.setProperty("--progress-color", color);
      const keyframes = { "--progress": ["0%", `${degree}%`] } as PropertyIndexedKeyframes;
      const options = {
        duration,
        easing: "ease-in",
        fill: "forwards",
      } as KeyframeAnimationOptions;

      const animation = circleEl.animate(keyframes, options);
      animation.play();
      this.frameId = requestAnimationFrame(timestamp => this.animateCallback(timestamp, duration));
    } else {
      circleEl.style.background = `conic-gradient(${color} ${degree}%, transparent 0%)`;
      this.el.content!.innerHTML = `${degree}`;
    }
  }

  private animateCallback(timestamp: number, duration: number): void {
    const degree = Number.parseInt(this.getAttribute("degree") as string);
    const progress = Number.parseInt(String(timestamp * 100 / duration));
    this.el.content!.innerHTML = `${progress}`;
    if (progress < degree) {
      requestAnimationFrame(timestamp => this.animateCallback(timestamp, duration));
    } else {
      cancelAnimationFrame(this.frameId as number);
    }
  }
}

export {
  EProgress,
  EProgressState,
};
