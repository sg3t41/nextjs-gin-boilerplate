// SignUpFormの定義
import { signUpAction as formAction } from '../actions/signUpAction'
import type { SignUpFormState } from '../types/SignUpFormState.type'
import type { SignUpFormInputField } from '../types/SignUpFormInputField.type'
import * as Organism from '@/components/organisms'

const inputFields: Array<SignUpFormInputField> = [
  {
    label: 'Username',
    type: 'text',
    name: 'username',
    placeholder: 'Enter your username',
  },
  {
    label: 'Email',
    type: 'email',
    name: 'email',
    placeholder: 'Enter your email',
  },
  {
    label: 'Password',
    type: 'password',
    name: 'password',
    placeholder: 'Enter your password',
  },
]

const initialState: SignUpFormState = {
  username: '',
  email: '',
  password: '',
}

export const SignUpForm = () => {
  return (
    <Organism.Form<SignUpFormState, SignUpFormInputField>
      formAction={formAction}
      initialState={initialState}
      inputFields={inputFields}
    />
  )
}
