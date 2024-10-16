'use client'

import { signUpAction } from '@/features/signup/actions/signUpAction'
import { useFormState, useFormStatus } from 'react-dom'
import * as Molecule from '@/components/molecules/index'

const initialState = {
  username: '',
  email: '',
  passwordHash: '',
  errors: {
    username: [],
    email: [],
    password: [],
    commMessage: '',
  },
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type='submit' aria-disabled={pending}>
      送信
    </button>
  )
}

export function Form() {
  const [state, formAction] = useFormState(signUpAction, initialState)

  return (
    <form action={formAction} noValidate>
      <Molecule.InputField
        label='Username'
        type='text'
        name='username'
        placeholder='Enter your username'
        value={state?.username ?? ''}
        errors={state?.errors?.username}
      />

      <Molecule.InputField
        label='Email'
        type='email'
        name='email'
        placeholder='Enter your email'
        value={state?.email ?? ''}
        errors={state?.errors?.email}
      />

      <Molecule.InputField
        label='Password'
        type='password'
        name='password'
        placeholder='Enter your password'
        value={state?.passwordHash ?? ''}
        errors={state?.errors?.password}
      />

      {state?.errors?.commMessage && state.errors.commMessage && (
        <p className='error-message'>{state.errors.commMessage}</p>
      )}

      <SubmitButton />
      <p aria-live='polite' className='sr-only' role='status'>
        {state?.username}
        {state?.email}
        {state?.passwordHash}
      </p>
    </form>
  )
}
