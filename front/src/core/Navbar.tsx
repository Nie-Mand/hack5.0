import { Button, Container, Drawer } from '~/ui'
import { CgMenuRight as HamburgerMenu } from '~/core/icons'
import Logo from './Logo'
import { useNavigate } from 'react-router-dom'
import { useGetMe } from './api/users/context'

export default function Navbar() {
  const me = useGetMe()

  return (
    <nav className="py-4 border-b bg-background">
      <Container className="flex items-center justify-between">
        <Button href="/">
          <Logo />
        </Button>
        <div className="hidden lg:flex lg:items-center lg:space-x-2">
          <Button thin>Home</Button>
          <Button thin>About</Button>
          <Button thin>Contact Us</Button>
          <Button href="/profile" thin>Dashboard</Button>
        </div>
        <div className="hidden lg:grid grid-cols-2 gap-1">
          {me.data ? (
            <Button
              variant="primary"
              className="!bg-red-500 hover:!bg-red-700 active:!bg-red-600"
              onClick={me.logout}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button thin href="/login">
                login
              </Button>
              <Button variant="primary" href="/register">
                register
              </Button>
            </>
          )}
        </div>
        <div className="block lg:hidden">
          <Drawer>
            <Drawer.Trigger className="!text-black pr-0">
              <HamburgerMenu className="text-3xl" />
            </Drawer.Trigger>
          </Drawer>
        </div>
      </Container>
    </nav>
  )
}
