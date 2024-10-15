'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function signUpAction(
  prevState: {
    message: string
  },
  formData: FormData,
) {
  const schema = z.object({
    todo: z.string().min(1),
  })
  const parse = schema.safeParse({
    todo: formData.get('todo'),
  })

  if (!parse.success) {
    return { message: 'Failed to create todo' }
  }

  const data = parse.data

  try {
    console.log(data.todo)

    revalidatePath('/')
    return { message: `Added todo ${data.todo}` }
  } catch (e) {
    console.log(e)
    return { message: 'Failed to create todo' }
  }
}
