'use client'

import { signUpAction } from '@/features/signup/actions/signUpAction'
import { useFormState, useFormStatus } from 'react-dom'

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
      Add
    </button>
  )
}

export function Form() {
  const [state, formAction] = useFormState(signUpAction, initialState)

  return (
    <form action={formAction} noValidate>
      <label htmlFor='username'>Username</label>
      <input type='text' id='username' name='username' required />
      {state?.errors?.username && state.errors.username.length > 0 && (
        <ul>
          {state.errors.username.map((error, index) => (
            <li key={index} className='error-message'>
              {error}
            </li>
          ))}
        </ul>
      )}

      <label htmlFor='email'>Email</label>
      <input type='email' id='email' name='email' required />
      {state?.errors?.email && state.errors.email.length > 0 && (
        <ul>
          {state.errors.email.map((error, index) => (
            <li key={index} className='error-message'>
              {error}
            </li>
          ))}
        </ul>
      )}

      <label htmlFor='password'>Password</label>
      <input type='password' id='password' name='password' required />
      {state?.errors?.password && state.errors.password.length > 0 && (
        <ul>
          {state.errors.password.map((error, index) => (
            <li key={index} className='error-message'>
              {error}
            </li>
          ))}
        </ul>
      )}

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
