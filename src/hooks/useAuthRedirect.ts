import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { CABINET_ROUTE, LOGIN, REGISTRATION } from 'utils/constsRoutes.ts'

export const useAuthRedirect = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const getAccessToken = localStorage.getItem('access_token')
  const getRefreshToken = localStorage.getItem('refresh_token')

  useEffect(() => {
    if (getAccessToken && getRefreshToken) {
      if (location.pathname === LOGIN || location.pathname === REGISTRATION) {
        navigate(CABINET_ROUTE)
      }
    }
  }, [location, navigate, getAccessToken, getRefreshToken])
}
