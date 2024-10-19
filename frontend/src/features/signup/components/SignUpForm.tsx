// SignUpFormの定義
import { signUpAction as formAction } from '../actions/signUpAction'
import type { SignUpFormState } from '../types/SignUpFormState.type'
import type { SignUpFormInputField } from '../types/SignUpFormInputField.type'
import * as Organism from '@/components/organisms'
import { useCallback, useState } from 'react'

const inputFields: Array<SignUpFormInputField> = [
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

const initialState: SignUpFormState = {
  username: '',
  email: '',
  password: '',
}

export const SignUpForm = () => {
  //  const [state, update] = useState<SignUpFormState>({
  //    username: '',
  //    email: '',
  //    password: '',
  //  } as SignUpFormState) // 初期値として空の文字列をセット

  return (
    <Organism.Form<SignUpFormState, SignUpFormInputField>
      formAction={formAction}
      initialState={initialState}
      inputFields={inputFields}
    />
  )
}
