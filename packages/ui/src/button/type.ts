interface ButtonView<T = any> {
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
  // 监听函数
  addEventListener: () => void;
}

export type {
  ButtonView,
};
