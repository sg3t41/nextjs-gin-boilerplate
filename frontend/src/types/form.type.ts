// 任意のフィールドそれぞれに対応したエラーメッセージを定義する
export type State<T extends string> = {
  [k in T]: string | number
} & {
  errors?: Partial<{ [k in T]: string[] }>
  message: string
}
