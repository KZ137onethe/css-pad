import "@css-pad/common-ui/styles/index";
import "./style.scss";

class PopupInfo extends HTMLElement {
  constructor() {
    super();
  }

  async appendStyle() {
    const styleContent = `
			.wrapper { position: relative; }

			.info {
				font-size: 0.8rem;
				width: 200px;
				display: inline-block;
				border: 1px solid black;
				padding: 10px;
				background: white;
				border-radius: 10px;
				opacity: 0;
				transition: 0.6s all;
				position: absolute;
				bottom: 20px;
				left: 10px;
				z-index: 3;
			}

			img {
				width: 1.2rem;
			}

			.icon:hover + .info, .icon:focus + .info {
				opacity: 1;
			}`;
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(styleContent.replace(/[\n\t]/g, ""));
    this.shadowRoot.adoptedStyleSheets.push(sheet);
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
