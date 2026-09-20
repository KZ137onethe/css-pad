import { intersection } from "es-toolkit";

// 在一组指定的类名（allClassName）中，只保留本次要添加的那个（addClassName），其他无关类名不受影响。
// 如果传入 "default"，则只清除这组类名，不添加新类名。
function addOnly<T extends string>(el: Element, allClassName: string[], addClassName: T): void {
  const classList = Array.from(el.classList.values());
  const removeClass = intersection(allClassName, classList);
  el.classList.remove(...removeClass);
  if (addClassName !== "default") {
    el.classList.add(addClassName);
  }
}

export {
  addOnly,
};
