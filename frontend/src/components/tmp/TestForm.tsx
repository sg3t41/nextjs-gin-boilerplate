'use client'
import { useFormState } from 'react-dom'
import * as Molecule from '@/components/molecules'

// Tのerrorsの型をRecord<keyof T, string[]>に変更
const TestForm = <T extends { errors: Record<keyof T, string[]> }>({
  action,
  initialState,
  inputFields,
}: {
  action: (state: T, formData: FormData) => Promise<T>
  initialState: Awaited<T>
  inputFields: {
    label: string
    type: string
    name: keyof T // nameをkeyof Tに変更
    placeholder: string
  }[]
}) => {
  const [state, dispatch] = useFormState<T, FormData>(action, initialState)

  return (
    <form action={dispatch}>
      {inputFields.map(({ label, type, name, placeholder }, index) => (
        <Molecule.InputField
          key={index}
          label={label}
          type={type}
          name={name as string} // 型キャストは必要
          placeholder={placeholder}
          value={state[name as keyof T] as string} // keyof Tを使用して型安全に
          errors={state.errors[name] || []} // state.errorsからエラーを取得
        />
      ))}
    </form>
  )
}

export default TestForm
