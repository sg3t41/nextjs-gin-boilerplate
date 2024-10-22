'use server'

import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import * as utils from '@/utils'
import { SignInFormState } from '../types/SignIn.type'

export async function signInAction(
  _: SignInFormState,
  formData: FormData,
): Promise<SignInFormState> {
  // validation scheme
  const schema = z.object({
    email: z.string().email({ message: 'メールアドレスの形式が不正です。' }),
    password: z.string().refine(value => value.length >= 8, {
      message: 'パスワードは8文字以上で入力してください。',
    }),
  })

  const validatedFields = schema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      email: '',
      password: '',
      errors: validatedFields.error.flatten().fieldErrors,
      hasError: true,
    }
  }

  const { email, password } = validatedFields.data
  try {
    const passwordHash = utils.sha256.hash(password)

    const response = await fetch('http://syomei_api:8080/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password_hash: passwordHash,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to sign up')
    }

    console.log(response)
    console.log(email)
    console.log(passwordHash)

    const data = await response.json()
    const token = data.token
    console.log('Received token:', token)

    cookies().set('jwttoken', token)

    const decoded = jwtDecode(token)
    console.log(decoded)

    revalidatePath('/')
    return {
      email,
      password: utils.sha256.hash(password),
    }
  } catch (e) {
    console.log(e)
    return {
      email: '',
      password: '',
      hasError: true,
    }
  }
}
