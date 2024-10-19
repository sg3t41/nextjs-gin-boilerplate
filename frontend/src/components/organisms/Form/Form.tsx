'use client'

import { useFormState } from 'react-dom'
import * as Molecule from '@/components/molecules'
import * as Atom from '@/components/atoms'
import * as type from '@/types'
import { useCallback, useState } from 'react'

const Form = <
  T extends type.FormState<string>,
  U extends type.FormInput<string>,
>({
  formAction,
  initialState,
  inputFields,
}: {
  formAction: (state: T, formData: FormData) => T | Promise<T>
  initialState: Awaited<T>
  inputFields: Array<U>
}) => {
  const [formState, dispatch] = useFormState(formAction, initialState)
  // fix
  const [change, update] = useState<U>(initialState as U)
  const onChangeInputText = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.persist()
      const { name, value } = event.target
      update(prev => ({
        ...prev,
        [name]: value,
      }))
    },
    [],
  )

  return (
    <form action={dispatch}>
      {inputFields.map(({ name, type, label, placeholder }) => (
        <Molecule.InputField
          key={name}
          label={label}
          type={type}
          name={name as string}
          placeholder={placeholder ?? ''}
          // value={formState?.[name] as string}
          value={change[name]}
          errors={formState?.errors?.[name]}
          onChange={onChangeInputText}
        />
      ))}

      <Atom.Button text={'送信'} type={'submit'} />
    </form>
  )
}

export default Form
