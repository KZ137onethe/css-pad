import type { ButtonAttrs, ButtonView } from "./type";
import { assertIsProps } from "~/component";
import { addOnly } from "~/dom";
import sheetText from "./style.scss?inline";

class EButton extends HTMLElement implements ButtonAttrs {
  static observedAttributes = ["size", "variant"];
  private root = this.attachShadow({ mode: "open" });
  private view?: ButtonView;
  protected text?: string;
  public size: ButtonAttrs["size"] = null;
  public variant: ButtonAttrs["variant"] = null;

  connectedCallback(): void {
    this.sync();
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

  sync(): void {
    this.preset();

    if (!this.view) {
      // this.view?.destroy();
      this.view = createView();
      this.root.append(this.view.element);
      this.view.addEventListener();
      this.text = this.textContent;
    }

    this.view.update.call(this);
  }

  private preset(): void {
    const size = this.getAttribute("size");
    const variant = this.getAttribute("variant");
    assertIsProps<ButtonAttrs["size"]>("size", size);
    assertIsProps<ButtonAttrs["variant"]>("variant", variant);
    size && (this.size = size);
    variant && (this.variant = variant);
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

  function forSize(size: ButtonAttrs["size"]): void {
    if (size === null)
      size = "default";
    addOnly<typeof size>(element, ["", "small", "large"], size);
  }

  function forVariant(variant: ButtonAttrs["variant"]): void {
    if (variant === null)
      variant = "default";
    addOnly<typeof variant>(
      element,
      ["", "outline", "secondary", "ghost", "destructive", "link"],
      variant,
    );
  }

  return {
    element,
    update(this) {
      // 添加样式
      appendStyles.call(this);
      // 主要逻辑
      span!.textContent = this.text!;
      this.textContent = "";
      forSize(this.size);
      forVariant(this.variant);
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
