import "@css-pad/common-ui/styles/index";
import sheet from "./component.scss" assert { type: "css" };

class PopupInfo extends HTMLElement {
  constructor() {
    super();
  }

  appendStyle() {
    this.shadowRoot.adoptedStyleSheets = [sheet];
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    const [wrapperEl, iconEl, infoEl] = new Array(3)
      .fill("span")
      .map((el) => document.createElement(el));

    wrapperEl.className = "wrapper";
    iconEl.className = "icon";
    iconEl.setAttribute("tabindex", 0);
    infoEl.className = "info";

    // 获取属性内容，插入到infoEl元素
    const text = this.getAttribute("data-text");
    infoEl.textContent = text;

    // 构造图标
    let imgUrl = "";
    if (this.hasAttribute("img")) {
      imgUrl = this.getAttribute("img");
    } else {
      imgUrl = "assets/info.svg";
    }

    const imgEl = document.createElement("img");
    imgEl.src = imgUrl;
    iconEl.appendChild(imgEl);

    // 添加样式
    this.appendStyle();
    wrapperEl.append(iconEl, infoEl);
    shadow.append(wrapperEl);
  }
}

customElements.define("popup-info", PopupInfo);
