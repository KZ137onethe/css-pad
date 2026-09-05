import type { ESwitchState } from "@/index";
import { watch } from "@vue/reactivity";
import { EProgress, ESwitch } from "@/index";

type SwitchProps = HTMLElement & {
  state: ESwitchState;
};

const switchEl = document.querySelector("e-switch#large") as SwitchProps;
const progressEl = document.querySelector("e-progress");

document.addEventListener("DOMContentLoaded", loaded);

function loaded(): void {
  ESwitch.register();
  EProgress.register();

  watch(() => switchEl.state.open, (newVal) => {
    console.log("当前 switch 组件状态:", newVal);
  });

  console.log(progressEl?.getAttribute("degree"));
}
