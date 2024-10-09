export enum Sky {
  daytime = 'daytime',
  dusk = 'dusk',
  night = 'night'
}

export type Animate = {
  fun: (arg: any) => any
  content: any
}

export type CallbackFn<T = any> = (arg: T) => any