export type PrimaryState<T extends string> = {
  [key in T]: string
}

export type ErrorState<T extends string> = {
  errors?: { [key in T]?: string[] }
  hasError?: true
}

export type FormState<P extends string, E extends string> = PrimaryState<P> &
  ErrorState<E>

export type FormInput<P extends string> = {
  label: string
  type: string
  name: P
  placeholder?: string
}
