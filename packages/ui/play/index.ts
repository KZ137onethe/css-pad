import type { ESwitchState } from "@/index";
import { watch } from "@vue/reactivity";
import { ESwitch } from "@/index";

type SwitchProps = HTMLElement & {
  state: ESwitchState;
};

const switchEl = document.querySelector("e-switch#large") as SwitchProps;

document.addEventListener("DOMContentLoaded", loaded);

function loaded(): void {
  ESwitch.register();

  watch(() => switchEl.state.open, (newVal) => {
    console.log("当前 switch 组件状态:", newVal);
  });
}
