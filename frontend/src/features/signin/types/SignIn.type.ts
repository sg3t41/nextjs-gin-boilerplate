import * as globalType from '@/types'

// フィールド名のユニオン型
export type SignInFieldNames = 'email' | 'password'
// エラー名のユニオン型
export type SignInErrorNames = 'email' | 'password'

export type SignInFormState = globalType.FormState<
  SignInFieldNames,
  SignInErrorNames
>
