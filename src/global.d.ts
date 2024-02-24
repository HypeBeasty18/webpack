declare module '*.module.scss' {
  interface IClassNames {
    [className: string] : string
  }
  const classNames: IClassNames
  export = classNames
}
//чтобы была возможность использовать module стили в scss

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module "*.svg" {
  import React from "react";
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}
// модулю чтобы работали каринки данных форматов

declare const __PLATFORM : 'modile' | 'desktop'
//глобальная переменная