declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.scss?inline" {
  const cssText: string;
  export default cssText;
}
