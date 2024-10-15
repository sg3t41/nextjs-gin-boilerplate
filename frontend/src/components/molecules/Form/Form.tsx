'use client'

import { signUpAction } from '@/features/signup/actions/signUpAction'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

const initialState = {
  message: '',
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
  const [state, formAction] = useActionState(signUpAction, initialState)

  return (
    <form action={formAction}>
      <label htmlFor='todo'>Enter Task</label>
      <input type='text' id='todo' name='todo' required />
      <SubmitButton />
      <p aria-live='polite' className='sr-only' role='status'>
        {state?.message}
      </p>
    </form>
  )
}
