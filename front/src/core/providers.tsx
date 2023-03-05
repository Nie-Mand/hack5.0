import { Toaster } from 'react-hot-toast'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { UserProvider } from './api/users/context'

const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Toaster />
          {children}
        </UserProvider>
      </QueryClientProvider>
    </Router>
  )
}
