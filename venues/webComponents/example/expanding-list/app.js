import "./component.scss";

class ExpandingList extends HTMLUListElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  connectedCallback() {
    // 获取这个 自定义 ul 元素的子 ul 和 li 元素
    // li 元素可以是容器，如果它们包含 ul
    const uls = this.querySelectorAll("ul");
    const lis = this.querySelectorAll("li");

    for (const ul of uls) {
      // 隐藏 ul 元素
      ul.style.display = "none";
    }

    // 查看 ul 中的每个 li 元素
    for (const li of lis) {
      // 如果这个 `li` 元素包含一个 `ul` 子元素，则对其进行装饰并添加点击事件处理程序。
      if (li.querySelectorAll("ul")) {
        // 添加一个可供样式使用的属性。
        // 显示打开或关闭图标
        li.setAttribute("class", "closed");

        // 将 li 元素的文本包裹在一个新的 span 元素中。
        // 因此我们可以为 span 元素分配样式和事件处理程序。
        const childText = li.childNodes[0];
        const newSpan = document.createElement("span");

        newSpan.textContent = childText.textContent;
        newSpan.style.cursor = "pointer";

        const onClick = (e) => {
          // 返回其父节点的 childNodes 列表中紧跟在其后面的节点
          const nextUl = e.target.nextElementSibling;

          // 切换可见状态并更新ul的类属性
          if (nextUl?.style.display === "block") {
            nextUl.style.display = "none";
            nextUl.parentNode.setAttribute("class", "closed");
          } else if (nextUl?.style.display === "none") {
            nextUl.style.display = "block";
            nextUl.parentNode.setAttribute("class", "open");
          }
        };

        newSpan.addEventListener("click", onClick);

        // 将 newSpan 插入到 li 元素中，且位于 childText 之前
        childText.parentNode?.insertBefore(newSpan, childText);
        // 在 li 元素中移除 childText
        childText.parentNode?.removeChild(childText);
      }
    }
  }
}

customElements.define("expanding-list", ExpandingList, { extends: "ul" });
