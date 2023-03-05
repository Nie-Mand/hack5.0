import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { Button, ButtonProps } from './Button'

interface IModalContext {
  isOpen: boolean
  toggle: () => void
  close: () => void
}

const ModalContext = createContext<IModalContext>({
  isOpen: false,
  toggle: () => {},
  close: () => {},
})

export default function Modal({ children }: { children: React.ReactNode }) {
  const [isOpen, set] = useState(false)
  const toggle = useCallback(() => set(!isOpen), [isOpen])
  const close = useCallback(() => set(false), [])
  const value = useMemo(
    () => ({
      isOpen,
      toggle,
      close,
    }),
    [isOpen, close, toggle]
  )

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export function useModal() {
  return useContext(ModalContext)
}

function Trigger({ onClick, ...rest }: ButtonProps) {
  const { toggle } = useModal()
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      toggle()
      onClick?.(e)
    },
    [onClick, toggle]
  )

  return <Button onClick={handleClick} {...rest} />
}
Modal.Trigger = Trigger

function Content({ children }: { children?: React.ReactNode }) {
  const { isOpen, close } = useModal()

  return (
    <>
      {isOpen ? (
        <div
          className="duration-300 bg-black/50 fixed inset-0 z-10"
          onClick={close}
        />
      ) : null}
      {isOpen ? (
        <div className="duration-300 bg-white rounded-2xl fixed z-20 p-4 top-1/2 translate-x-1/2 right-1/2 -translate-y-1/2">
          {children}
        </div>
      ) : null}
    </>
  )
}
Modal.Content = Content
