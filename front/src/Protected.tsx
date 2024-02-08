import { Navigate } from 'react-router-dom'
import { useGetMe } from './core/api/users/context'

export default function Protected({ children }: { children: React.ReactNode }) {
  const me = useGetMe()

  if (!me) {
    return <div className="text-center py-20">Loading...</div>
  }

  if (me.isLoggedIn) {
    return <>{children}</>
  }

  return <>{children}</>;
}
