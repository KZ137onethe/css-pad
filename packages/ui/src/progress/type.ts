interface ProgressView<T = any, R = any> {
  // 影子节点的根元素
  element: HTMLElement;
  /**
   * 更新节点
   * @param this 一般指自定义类
   * @returns void
   */
  update: (this: T) => void;
  // 销毁节点
  destroy: () => void;
}

type ProgressType = "line" | "circle";

interface ProgressProps {
  currentType: ProgressType;
  color?: string;
  value?: number;
  ani?: boolean;
}

interface AnimateCallbackArgs<T = number> {
  ani: Animation;
  duration: number;
  callback?: (progress: T) => void;
}

export type {
  AnimateCallbackArgs,
  ProgressProps,
  ProgressType,
  ProgressView,
};
