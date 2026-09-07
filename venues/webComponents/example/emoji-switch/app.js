import sheetText from "./component.scss?inline";
import "@css-pad/ui/styles/index";

class EmojiSwitch extends HTMLElement {
  constructor() {
    super();
  }

  appendStyles() {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(sheetText);
    console.log(sheetText);
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
