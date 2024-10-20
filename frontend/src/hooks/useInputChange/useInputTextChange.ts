import { useState, useCallback, ChangeEvent } from 'react'

function useInputTextChange<T>(initialState: T) {
  const [changedValues, change] = useState<T>(initialState)

  const onChangeInputText = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target
      change(prev => ({
        ...prev,
        [name]: value,
      }))
    },
    [],
  )

  return { changedValues, onChangeInputText }
}

export default useInputTextChange
