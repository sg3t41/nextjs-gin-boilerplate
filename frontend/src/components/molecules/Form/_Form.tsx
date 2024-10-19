import { useFormState } from 'react-dom'
import * as Molecule from '@/components/molecules'
import * as type from '@/types'

const _Form = <
  T extends type.FormState<T>,
  U extends { label: string; type: string; name: keyof T; placeholder: string },
>({
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
          key={name as string}
          label={label}
          type={type}
          name={name as string}
          placeholder={placeholder}
          value={state?.[name] as string}
          errors={state?.errors?.[name] || []}
        />
      ))}
    </form>
  )
}

export default _Form
