import React from 'react'

const Input = ({
  type,
  name,
  placeholder,
  value,
  onChange,
}: {
  type?: string
  name?: string
  placeholder?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}

export default Input
