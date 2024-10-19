// SignUpFormの定義
import { Input } from '@/types/form/Input.type'
import { signUpAction } from '../actions/signUpAction'
import type { SignUpFormState } from '../types/SignUpFormState.type'
import * as Organism from '@/components/organisms'
// import type { SignUpInputs } from '../types/SignUpInputs.type'

const inputFields: Input[] = [
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
    <Organism.Form<SignUpFormState, Input>
      action={signUpAction}
      initialState={initialState}
      inputs={inputFields}
    />
  )
}
