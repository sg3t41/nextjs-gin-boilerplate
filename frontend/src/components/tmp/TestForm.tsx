'use client'
import { useFormState } from 'react-dom'

type U = {
  count: number
}

const TestForm = <T extends U>({
  action,
  initialState,
}: {
  action: (state: T, formData: FormData) => Promise<T>
  // initialStateはPromise<T>も想定しているため
  initialState: Awaited<T>
}) => {
  const [state, dispatch] = useFormState<T, FormData>(action, initialState)
  return (
    <form action={dispatch}>
      <div>{state.count}</div>
      <button type='submit' name='action' value='increment'>
        Increment
      </button>
      <button type='submit' name='action' value='decrement'>
        Decrement
      </button>
    </form>
  )
}

export default TestForm
