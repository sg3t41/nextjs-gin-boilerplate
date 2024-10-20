// SignUpFormの定義
import { SignUpErrorNames, SignUpFieldNames } from '../../types/SignUp.type'
import * as globalType from '@/types'
import * as Organism from '@/components/organisms'
import { signUpAction } from '../../actions/signUpAction'

const inputFields: Array<globalType.FormInput<SignUpFieldNames>> = [
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

const initialState: globalType.PrimaryFormState<SignUpFieldNames> = {
  username: '',
  email: '',
  password: '',
}

export const SignUpForm = () => {
  return (
    <Organism.Form<SignUpFieldNames, SignUpErrorNames>
      formAction={signUpAction}
      initialState={initialState}
      inputFields={inputFields}
    />
  )
}
