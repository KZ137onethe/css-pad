import sheet from "./style.scss" assert { type: "css" };

interface Props {
  size: "default" | "small" | "large" | null;
}

class ESwitch extends HTMLElement {
  private class_prefix = "switch-";

  private rootEl?: HTMLLabelElement;
  constructor() {
    super();
  }

  appendStyles(): void {
    this.shadowRoot!.adoptedStyleSheets = [sheet as unknown as CSSStyleSheet];
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
  }
}

customElements.define("e-switch", ESwitch);
