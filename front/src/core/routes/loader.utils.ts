import { lazy, useState } from 'react'

export function useRoutes() {
  const [routes, _setRoutes] = useState<Routes>(loadRoutes())
  return routes
}

const loadRoutes = () => {
  const ROUTES = import.meta.glob('/src/routes/**/*.tsx')

  const routes = Object.entries(ROUTES).map(entry => {
    const path = entry[0] as string
    const fn = entry[1] as () => Promise<{
      default: React.ComponentType<any>
    }>

    const absolutePath = path
      .replace(/\/src\/routes|\.tsx$/g, '')
      .replace(/\[\.{3}.+\]/, '*')
      .replace(/\[(.+)\]/, ':$1')
      .replace(/\$/, ':')
      .replace(/index/, '')

    return {
      path: absolutePath,
      component: lazy(fn),
    }
  })

  return routes
}

type Routes = ReturnType<typeof loadRoutes>
