// SignInFormの定義
import { SignInErrorNames, SignInFieldNames } from '../../types/SignIn.type'
import * as globalType from '@/types'
import * as Organism from '@/components/organisms'
import { signInAction } from '../../actions/signInAction'

const inputFields: Array<globalType.FormInput<SignInFieldNames>> = [
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

const initialState: globalType.PrimaryFormState<SignInFieldNames> = {
  email: '',
  password: '',
}

export const SignInForm = () => {
  return (
    <Organism.Form<SignInFieldNames, SignInErrorNames>
      formAction={signInAction}
      initialState={initialState}
      inputFields={inputFields}
    />
  )
}
