// SignUpFormの定義
import TestForm from '@/components/tmp/TestForm'
import { signUpAction } from '../actions/signUpAction'

// errorsの型をRecord<string, string[]>に変更
type Errors = Record<keyof State, string[]>

const initialState: State = {
  username: '',
  email: '',
  password: '', // passwordHashからpasswordに変更
  errors: {
    username: [],
    email: [],
    password: [],
  },
  message: '',
}

type State = {
  username: string
  email: string
  password: string // passwordHashではなくpassword
  errors: Errors // ここをErrors型に変更
  message?: string
}

export const SignUpForm = () => {
  const inputFields = [
    {
      label: 'Username',
      type: 'text',
      name: 'username', // これはStateのプロパティ名と一致
      placeholder: 'Enter your username',
    },
    {
      label: 'Email',
      type: 'email',
      name: 'email', // これはStateのプロパティ名と一致
      placeholder: 'Enter your email',
    },
    {
      label: 'Password',
      type: 'password',
      name: 'password', // nameをpasswordに変更
      placeholder: 'Enter your password',
    },
  ]

  return (
    <TestForm<State>
      action={signUpAction}
      initialState={initialState}
      inputFields={inputFields}
    />
  )
}
