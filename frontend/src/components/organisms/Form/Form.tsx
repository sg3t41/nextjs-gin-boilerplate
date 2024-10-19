'use client'

import { useFormState } from 'react-dom'
import * as Molecule from '@/components/molecules'
import * as Atom from '@/components/atoms'
import * as type from '@/types'

const Form = <T extends type.FormState<string>, U extends type.FormInput>({
  action,
  initialState,
  inputs,
}: {
  action: (state: T, formData: FormData) => T | Promise<T>
  initialState: Awaited<T>
  inputs: U[]
}) => {
  const [state, dispatch] = useFormState(action, initialState)

  return (
    <form action={dispatch}>
      {inputs.map(({ name, type, label, placeholder }) => (
        <Molecule.InputField
          key={name}
          label={label}
          type={type}
          name={name}
          placeholder={placeholder ?? ''}
          value={state?.[name] as string}
          errors={state?.errors?.[name]}
        />
      ))}

      <Atom.Button text={'送信'} type={'submit'} />
    </form>
  )
}

export default Form
