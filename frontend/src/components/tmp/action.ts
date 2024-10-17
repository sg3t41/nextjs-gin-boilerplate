'use server'

type State = {
  count: number
}

export const countAction = async (state: State, formData: FormData) => {
  const action = formData.get('action')
  switch (action) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      return state
  }
}
