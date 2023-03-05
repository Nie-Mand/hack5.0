import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { Button } from './Button'

function Trigger({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { toggle } = useDrawer()

  return (
    <Button className={className} onClick={toggle}>
      {children}
    </Button>
  )
}

function Content({ children }: { children?: string }) {
  const { isOpen } = useDrawer()

  return <div>{children}</div>
}

export function Drawer({ children }: { children: React.ReactNode }) {
  const [isOpen, set] = useState(false)
  const open = useCallback(() => set(true), [])
  const close = useCallback(() => set(false), [])
  const toggle = useCallback(() => set(!isOpen), [])

  const value = useMemo(
    () => ({
      isOpen,
      open,
      close,
      toggle,
    }),
    [isOpen, open, close, toggle]
  )

  return (
    <DrawerContext.Provider value={value}>
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } fixed inset-0 duration-300 bg-black/50`}
        onClick={close}
      ></div>
      {children}
    </DrawerContext.Provider>
  )
}

Drawer.Trigger = Trigger

interface IDrawerContext {
  open: () => void
  close: () => void
  toggle: () => void
  isOpen: boolean
}

const DrawerContext = createContext<IDrawerContext>({
  isOpen: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
})

export function useDrawer() {
  return useContext(DrawerContext)
}
