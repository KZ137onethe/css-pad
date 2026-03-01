/* eslint-disable style/no-tabs */
const updateEl = document.querySelector(".update");
const squareEl = document.querySelector("custom-square");
class Square extends HTMLElement {
  static get observedAttributes() {
    return ["color", "size"];
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const divEl = document.createElement("div");
    const styleEl = document.createElement("style");
    shadow.appendChild(styleEl);
    shadow.appendChild(divEl);
  }

  connectedCallback() {
    this.setAttribute("size", "100");
    this.setAttribute("color", "red");
  }

  attributeChangedCallback() {
    updateStyle(this);
  }
}

function updateStyle(ele) {
  const shadow = ele.shadowRoot;
  shadow.querySelector("style").textContent = `
		div {
			width: ${ele.getAttribute("size")}px;
			height: ${ele.getAttribute("size")}px;
			background-color: ${ele.getAttribute("color")};
		}
	`;
}

customElements.define("custom-square", Square);

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

updateEl.onclick = function () {
  squareEl.setAttribute("size", random(50, 200));
  squareEl.setAttribute("color", `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`);
};
