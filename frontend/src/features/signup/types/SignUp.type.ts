import * as globalType from '@/types'

// フィールド名のユニオン型
export type SignUpFieldNames = 'username' | 'email' | 'password'
// エラー名のユニオン型
export type SignUpErrorNames = 'username' | 'email' | 'password'

export type SignUpFormState = globalType.FormState<
  SignUpFieldNames,
  SignUpErrorNames
>
