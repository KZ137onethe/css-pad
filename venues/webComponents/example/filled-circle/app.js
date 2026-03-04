/* eslint-disable no-useless-constructor */
// 这里使用声明式来导入样式

class FilledCircle extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("filled-circle");
    const shadow = this.attachShadow({ mode: "open" });

    const divEl = document.createElement("div");
    shadow.append(template.content, divEl);
  }
}

customElements.define("filled-circle", FilledCircle);
