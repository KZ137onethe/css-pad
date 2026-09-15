import type { PreinitializedMapStore } from "nanostores";
import type { ESwitchState } from "@/index";
import { listenKeys } from "nanostores";
import { EProgress, ESwitch } from "@/index";
import "./style.scss";

type SwitchProps = HTMLElement & {
  state: PreinitializedMapStore<ESwitchState>;
};

const switchEl = document.querySelector("e-switch#large") as SwitchProps;

document.addEventListener("DOMContentLoaded", loaded);

function loaded(): void {
  ESwitch.register();
  EProgress.register();

  listenKeys(switchEl.state, ["open"], (value, oldValue, changed) => {
    console.log(`当前 switch 组件状态: ${value.open}`);
  });
}
