declare module '*.module.scss' {
  interface IClassNames {
    [className: string] : string
  }
  const classNames: IClassNames
  export = classNames
}
//чтобы была возможность использовать module стили в scss