import React from 'react'
import * as Atom from '@/components/atoms'

const InputField = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  errors = [],
}: {
  label: string
  type: string
  name: string
  placeholder: string
  value: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  errors?: string[]
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e) // onChangeが定義されている場合のみ呼び出す
    }
  }

  return (
    <div>
      <label htmlFor={name} className='block mb-1 font-bold'>
        {label}
      </label>
      <Atom.Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      {errors.length > 0 && (
        <ul className='text-red-500'>
          {errors.map((error, index) => (
            <li key={index} className='error-message'>
              {error}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default InputField
