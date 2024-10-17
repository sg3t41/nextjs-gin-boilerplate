'use client'

import { signUpAction } from '@/features/signup/actions/signUpAction'
import * as Molecule from '@/components/molecules/index'
import { useActionState } from 'react'

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

export function Form() {
  const [state, action, isPending] = useActionState(signUpAction, initialState)

  return (
    <form action={action} noValidate>
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

      <button type='submit' aria-disabled={isPending}>
        送信
      </button>

      <p aria-live='polite' className='sr-only' role='status'>
        {state?.username}
        {state?.email}
        {state?.passwordHash}
      </p>
    </form>
  )
}
