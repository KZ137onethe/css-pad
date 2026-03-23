import { ESwitch } from "@css-pad/common-ui/e-switch.js";
import "@css-pad/common-ui/styles/index";
import "./style.scss";

ESwitch.register();

// 网格布局参考MDN：https://developer.mozilla.org/zh-CN/docs/Web/CSS/Guides/Grid_layout/Basic_concepts

const appEl = document.querySelector("#app");
const headEl = document.querySelector("header.head");

//
const gridTemplateTo200Btn = headEl.querySelector("#use-grid-template-200px");

gridTemplateTo200Btn.addEventListener("click", addGridTemplateTo200);
function addGridTemplateTo200() {
  if (addGridTemplateTo200.flag === true) {
    return;
  }
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(`main.wrapper { display: grid; grid-template-columns: 200px 200px 200px }`);
  document.adoptedStyleSheets.push(sheet);
  addGridTemplateTo200.flag = true;
}

console.log("ok");
