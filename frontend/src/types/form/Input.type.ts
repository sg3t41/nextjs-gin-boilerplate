export type Input<T extends string> = {
  // fixme
  [key: string]: any
  label: string
  type: string
  name: T
  placeholder?: string
}
