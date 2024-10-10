import React from 'react'
import { render } from '@testing-library/react'
import { describe, it } from '@jest/globals'
import { Button } from './Button'

describe('Sample', () => {
  it('コンポーネントのレンダリングのテスト', async () => {
    render(<Button label={''} />)
  })
})
