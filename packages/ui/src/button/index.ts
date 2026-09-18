import type { ButtonView } from "./type";
import sheetText from "./style.scss?inline";

class EButton extends HTMLElement {
  private root = this.attachShadow({ mode: "open" });
  private view?: ButtonView;
  public text?: string;

  connectedCallback(): void {
    this.sync();
  }

  sync(): void {
    if (!this.view) {
      // this.view?.destroy();
      this.view = createView();
      this.root.append(this.view.element);
      this.view.addEventListener();
    }

    this.view.update.call(this);
  }

  static register(): void {
    customElements.define("e-button", EButton);
  }
}

function createView(): ButtonView<EButton> {
  const element = document.createElement("button");
  element.innerHTML = `<span></span>`;
  const span = element.querySelector<HTMLSpanElement>("span");

  function appendStyles(this: EButton): void {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(sheetText);
    this.shadowRoot!.adoptedStyleSheets = [sheet];
  }

  return {
    element,
    update(this) {
      // 添加样式
      appendStyles.call(this);
      // 主要逻辑
      span!.textContent = this.textContent;
      this.textContent = "";
      // 动画逻辑
    },
    destroy() {},
    addEventListener() {
      // 点击时，添加按钮抖动动画
      element.addEventListener("mousedown", () => {
        element.style.transform = "translateY(1px)";
      });
      element.addEventListener("mouseup", () => {
        element.style.transform = "translateY(0)";
      });
    },
  };
}

export {
  EButton,
};
