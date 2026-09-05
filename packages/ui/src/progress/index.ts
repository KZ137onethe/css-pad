import sheetText from "./style.scss?inline";

class EProgressState {
  loaded: boolean = false;
}

class EProgress extends HTMLElement {
  public el: { [key: string]: HTMLDivElement | undefined } = {};
  public state: EProgressState = { loaded: false };
  private interval: ReturnType<typeof setInterval> | undefined;
  constructor() {
    super();
  }

  static register(): void {
    customElements.define("e-progress", EProgress);
  }

  static get observedAttributes(): string[] {
    return ["color", "val"];
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
    this.state.loaded = true;
  }

  attributeChangedCallback(...args: string[]): void {
    const [name, oldVal, newVal] = [...args];
    if (["degree", "color"].includes(name)) {
      clearInterval(this.interval);
      this.apply();
    }
  }

  appendStyles(): void {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(sheetText);
    this.shadowRoot!.adoptedStyleSheets = [sheet];
  }

  apply(): void {
    let degree = 0;
    const targetDegree = Number.parseInt(this.getAttribute("degree") as string);
    const color = this.getAttribute("color");

    this.interval = setInterval(() => {
      degree += 1;

      if (degree > targetDegree) {
        clearInterval(this.interval);
        return;
      }

      this.el.circle!.style.background = `conic-gradient(${color} ${degree}%, transparent 0%)`;
      this.el.content!.innerHTML = `${degree}`;
    }, 50);
  }
}

export {
  EProgress,
  EProgressState,
};
