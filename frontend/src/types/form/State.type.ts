export type State<T extends string> = {
  [key in T]: string
} & {
  errors?: Partial<Record<T, string[]>>
  message?: string
}
