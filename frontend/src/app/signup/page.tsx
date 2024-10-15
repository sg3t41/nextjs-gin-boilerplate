'use client'

import * as Atom from 'components/atoms/index'
import { useState } from 'react'
import crypto from 'crypto'

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const signUp = async () => {
    // パスワードをSHA-256でハッシュ化
    const hash = crypto.createHash('sha256')
    hash.update(formData.password)
    const password_hash = hash.digest('hex')

    // リクエストボディ
    const body = JSON.stringify({
      username: formData.username,
      email: formData.email,
      password_hash,
    })

    try {
      const response = await fetch('http://127.0.0.1:8080/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      })

      if (response.ok) {
        console.log('User signed up successfully!')
        console.log(response.body)
      } else {
        console.error('Sign up failed')
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  return (
    <>
      <Atom.Input
        type='text'
        name='username'
        placeholder='Username'
        value={formData.username}
        onChange={handleChange}
      />
      <Atom.Input
        type='email'
        name='email'
        placeholder='Email'
        value={formData.email}
        onChange={handleChange}
      />
      <Atom.Input
        type='password'
        name='password'
        placeholder='Password'
        value={formData.password}
        onChange={handleChange}
      />
      <Atom.Button onClick={signUp}>Sign Up</Atom.Button>
    </>
  )
}
