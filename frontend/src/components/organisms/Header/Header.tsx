import { jwtDecode, JwtPayload } from 'jwt-decode'
import { cookies } from 'next/headers'

type CustomJwtPayload = {
  username: string
  email: string
  user_id: string
} & JwtPayload

const Header = async () => {
  const cookieStore = await cookies()
  const jwtToken = cookieStore.get('jwttoken')?.value
  const currentUserInfo = jwtToken
    ? jwtDecode<CustomJwtPayload>(jwtToken)
    : undefined

  return (
    <header>
      {currentUserInfo
        ? `username: ${currentUserInfo?.username}
					user_id: ${currentUserInfo?.user_id}
					email: ${currentUserInfo?.email}
			でログイン中`
        : 'ログインしていません'}
    </header>
  )
}

export default Header
