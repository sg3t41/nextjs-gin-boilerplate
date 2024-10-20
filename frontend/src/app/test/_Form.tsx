'use client'

import { useFormState } from 'react-dom'
import * as Molecule from '@/components/molecules'
import * as Atom from '@/components/atoms'
import * as hook from '@/hooks'

export type PrimaryState<T extends string> = {
  [key in T]: string
}

export type ErrorState<T extends string> = {
  errors?: { [key in T]?: string[] }
  hasError?: true
}

export type FormState<P extends string, E extends string> = PrimaryState<P> &
  ErrorState<E>

export type FormInput<P extends string> = {
  label: string
  type: string
  name: P
  placeholder?: string
}

// T: FormStateのkey
// U: InputFieldのvalueに使うkey
const _Form = <P extends string, E extends string>({
  formAction,
  initialState,
  inputFields,
}: {
  formAction: (
    state: FormState<P, E>,
    formData: FormData,
  ) => Promise<FormState<P, E>>

  // Awaitedの必要性は、初期値が非同期に決定されるケースも想定するため
  initialState: Awaited<PrimaryState<P>>
  inputFields: Array<FormInput<P>>
}) => {
  const [formState, dispatch] = useFormState<FormState<P, E>, FormData>(
    formAction,
    initialState,
  )
  const { changedValues, onChangeInputText } =
    hook.useInputTextChange<PrimaryState<P>>(initialState)

  return (
    <form action={dispatch} noValidate>
      {inputFields.map(({ name, type, label, placeholder }) => (
        <Molecule.InputField
          key={name}
          label={label}
          type={type}
          name={name}
          placeholder={placeholder}
          value={changedValues[name]}
          errors={formState?.errors?.[name]}
          onChange={onChangeInputText}
        />
      ))}

      <Atom.Button text={'送信'} type={'submit'} />
    </form>
  )
}

export default _Form
