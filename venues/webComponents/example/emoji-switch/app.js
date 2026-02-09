import "@css-pad/common-ui/styles/index";
import sheet from "./component.scss" assert { type: "css" };

class EmojiSwitch extends HTMLElement {
  constructor() {
    super();
  }

  appendStyles() {
    this.shadowRoot.adoptedStyleSheets = [sheet];
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    const rootEl = document.createElement("label");
    const checkboxEl = document.createElement("input");
    checkboxEl.type = "checkbox";
    const contentEl = document.createElement("span");
    const emojiEl = document.createElement("i");

    rootEl.append(checkboxEl, contentEl);
    contentEl.append(emojiEl);

    this.appendStyles();
    shadow.append(rootEl);
  }
}

customElements.define("emoji-switch", EmojiSwitch);
