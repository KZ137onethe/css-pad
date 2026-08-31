import { reactive } from "@vue/reactivity";
import sheetText from "./style.scss?inline";

interface Props {
  size: "default" | "small" | "large" | null;
}

interface StateProps {
  loaded?: boolean;
  open?: boolean;
}

class ESwitchState implements StateProps {
  open = false;
  loaded?: boolean | undefined = undefined;
}

class ESwitch extends HTMLElement {
  private class_prefix = "switch-";
  private rootEl?: HTMLLabelElement;
  public state: StateProps;
  static get observedAttributes(): string[] {
    return ["size"];
  }

  constructor() {
    super();
    this.state = reactive(new ESwitchState());
  }

  static register(): void {
    customElements.define("e-switch", ESwitch);
  }

  appendStyles(): void {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(sheetText);
    this.shadowRoot!.adoptedStyleSheets = [sheet];
  }

  setClassList(): void {
    const size = this.getAttribute("size") as Props["size"];
    switch (size) {
      case "default":
      // eslint-disable-next-line no-fallthrough
      case null:
        this.rootEl!.classList.add(`${this.class_prefix}size_default`);
        break;
      case "small":
        this.rootEl!.classList.add(`${this.class_prefix}size_small`);
        break;
      case "large":
        this.rootEl!.classList.add(`${this.class_prefix}size_large`);
    }
  }

  watchElement(): void {
    const inputEl = this.rootEl?.querySelector("input");

    inputEl?.addEventListener("input", (e: InputEvent) => {
      this.state.open = (e.target as HTMLInputElement).checked;
    });
  }

  connectedCallback(): void {
    const shadow = this.attachShadow({ mode: "open" });

    const rootEl = document.createElement("label");
    const checkboxEl = document.createElement("input");
    checkboxEl.type = "checkbox";
    const contentEl = document.createElement("span");
    const emojiEl = document.createElement("i");

    this.rootEl = rootEl;

    rootEl.append(checkboxEl, contentEl);
    contentEl.append(emojiEl);

    this.appendStyles();
    this.setClassList();

    shadow.append(rootEl);
    this.state.loaded = true;

    // 开启监听
    this.watchElement();
  }

  attributeChangedCallback(_name_: string, _old_: string, _new_: string): void {
    // 保证在组件加载完成后，才能调用
    if (this.state.loaded) {
      this.setClassList();
    }
  }
}

export {
  ESwitch,
  ESwitchState,
};
