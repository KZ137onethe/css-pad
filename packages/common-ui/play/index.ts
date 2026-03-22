import { reaction } from "mobx";

interface SwitchProps extends HTMLElement {
  state: Record<string, any>;
  [k: string]: any;
}

const switchEl = document.querySelector("e-switch#large") as SwitchProps;

document.addEventListener("DOMContentLoaded", loaded);

function loaded(): void {
  reaction(
    // eslint-disable-next-line ts/no-unsafe-return
    () => switchEl?.state?.open,
    (newVal) => {
      console.log("当前 switch 组件状态:", newVal);
    },
  );
}
