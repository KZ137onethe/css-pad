import "@css-pad/common-ui/styles/index";
import "./style.scss";

// 参考: https://github.com/mdn/web-components-examples/tree/main/word-count-web-component

// 自定义元素
class WordCount extends HTMLElement {
  static observedAttributes = ["size"];

  constructor() {
    super();

    const parentEl = this.parentNode;
    const text = `共 ${wordCount(parentEl)} 字`;

    // 这里只计算中文
    function wordCount(node) {
      const text = node.innerText || node.textContent;
      const count = text
        .trim()
        .split(/\s+/g)
        .filter((str) => str.trim().length > 0)
        .map((word) => word.length)
        .reduce((pre, cur) => pre + cur, 0);
      return count;
    }

    const shadow = this.attachShadow({ mode: "open" });
    const span = document.createElement("span");
    Object.assign(span.style, {
      color: "orange",
      float: "right",
    });
    span.textContent = text;

    shadow.appendChild(span);

    this.parentNode.addEventListener("input", () => {
      span.textContent = `共 ${wordCount(parentEl)} 字`;
    });
  }

  // 此处编写元素功能
  // 每当元素添加到文档中时调用。
  connectedCallback() {
    console.log("自定义元素添加至页面");
  }

  // 每当元素从文档中移除时调用。
  disconnectedCallback() {
    console.log("自定义元素从页面中移除。");
  }

  // 每当元素被移动到新文档中时调用。
  adoptedCallback() {
    console.log("自定义元素移动到新页面");
  }

  // 在属性更改、添加、移除或替换时调用。
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`属性${name}已变更`);
  }
}

customElements.define("word-count", WordCount);
