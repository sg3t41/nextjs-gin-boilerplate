'use server'

import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import * as utils from '@/utils'
import { SignUpFormState } from '../types/SignUp.type'

export async function signUpAction(
  _: SignUpFormState,
  formData: FormData,
): Promise<SignUpFormState> {
  // validation scheme
  const schema = z.object({
    username: z
      .string({
        invalid_type_error: 'ユーザー名が不正です。',
      })
      .min(4, { message: '最短4文字以上の長さで入力してください。' })
      .max(25, { message: '最長25文字以下の長さで入力してください。' }),
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
      username: '',
      email: '',
      password: '',
      errors: validatedFields.error.flatten().fieldErrors,
      hasError: true,
    }
  }

  const { username, email, password } = validatedFields.data
  try {
    const passwordHash = utils.sha256.hash(password)

    const response = await fetch('http://syomei_api:8080/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password_hash: passwordHash,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to sign up')
    }

    console.log(response)
    console.log(username)
    console.log(email)
    console.log(passwordHash)

    const data = await response.json()
    const token = data.token
    console.log('Received token:', token)

    cookies().set('jwttoken', token)

    const decoded = jwtDecode(token)
    console.log('デコードしました')
    console.log(decoded)

    revalidatePath('/')
    return {
      username,
      email,
      password: utils.sha256.hash(password),
    }
  } catch (e) {
    console.log(e)
    return {
      username: '',
      email: '',
      password: '',
      hasError: true,
    }
  }
}
