import { Suspense } from 'react'
import { Route, Routes as RoutesProvider } from 'react-router-dom'
import { Loading } from '~/core/Loading'
import { useRoutes } from './loader.utils'
import NotFound from '../404.route'

export default function Routes() {
  const routes = useRoutes()

  return (
    <Suspense fallback={<Loading />}>
      <RoutesProvider>
        {routes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </RoutesProvider>
    </Suspense>
  )
}
