// SignUpFormの定義
import _Form, { FormInput, PrimaryState } from './_Form'
import { signUpAction } from './signUpAction'

// フィールド名のユニオン型
export type SignUpFieldNames = 'username' | 'email' | 'password'
// エラー名のユニオン型
export type SignUpErrorNames = 'username' | 'email' | 'password'

const inputFields: Array<FormInput<SignUpFieldNames>> = [
  {
    label: 'ユーザー名',
    type: 'text',
    name: 'username',
    placeholder: 'ユーザー名を入力してください',
  },
  {
    label: 'メールアドレス',
    type: 'email',
    name: 'email',
    placeholder: 'メールアドレスを入力してください',
  },
  {
    label: 'パスワード',
    type: 'password',
    name: 'password',
    placeholder: 'パスワードを入力してください',
  },
]

const initialState: PrimaryState<SignUpFieldNames> = {
  username: '',
  email: '',
  password: '',
}

export const _SignUpForm = () => {
  return (
    <_Form<SignUpFieldNames, SignUpErrorNames>
      formAction={signUpAction}
      initialState={initialState}
      inputFields={inputFields}
    />
  )
}
