import crypto from 'crypto'

export const hash = (s: string): string => {
  return crypto.createHash('sha256').update(s).digest('hex')
}
