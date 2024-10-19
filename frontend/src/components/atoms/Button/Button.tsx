import React from 'react'

const Button = ({
  text,
  onClick,
  type,
}: {
  text: string
  onClick?: () => void
  type?: 'submit' | 'reset' | 'button'
}) => {
  return (
    <button type={type} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
