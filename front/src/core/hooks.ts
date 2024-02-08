import { useCallback } from 'react'
import { useLocation } from 'react-router-dom'

export function useCurrentRoute() {
  const { pathname } = useLocation()
  const isCurrentRoute = useCallback(
    (_route: string) => pathname === _route,
    [pathname]
  )
  return isCurrentRoute
}
