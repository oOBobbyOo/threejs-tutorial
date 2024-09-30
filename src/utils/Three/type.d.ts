export enum Sky {
  daytime = 'daytime',
  dusk = 'dusk',
  night = 'night'
}

export type Animate = {
  fun: (arg: any) => any
  content: any
}