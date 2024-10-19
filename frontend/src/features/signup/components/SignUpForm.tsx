// SignUpFormの定義
import { signUpAction } from '../actions/signUpAction'
import type { SignUpFormState } from '../types/SignUpFormState.type'
import * as Organism from '@/components/organisms'
import type { SignUpInputs } from '../types/SignUpInputs.type'

const inputFields: SignUpInputs = [
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

const initialState: SignUpFormState = { username: '', email: '', password: '' }

export const SignUpForm = () => {
  return (
    <Organism.Form<SignUpFormState, SignUpInputs>
      action={signUpAction}
      initialState={initialState}
      inputFields={inputFields}
    />
  )
}
