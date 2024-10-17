import { countAction } from '@/components/tmp/action'
import TestForm from '@/components/tmp/TestForm'

export default function TestPage() {
  return (
    <>
      <TestForm action={countAction} initialState={{ count: 0 }} />
    </>
  )
}
