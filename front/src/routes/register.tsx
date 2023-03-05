import { Button, Checkbox, Container, Input } from '~/ui'
import {
  AiFillLock as LockIcon,
  MdOutlineMailOutline as EmailIcon,
  AiOutlineUser as UserIcon,
} from '~/core/icons'
import { useSignup } from '~/core/api/users'
import ShowError from '~/core/ShowError'

export default function Register() {
  const { data, error, isLoading, mutate } = useSignup()

  console.log(data, error, isLoading)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const values = Object.fromEntries(data.entries())

    mutate({
      ...values,
      role: values.role === 'sponsor' ? 'sponsor' : 'user',
    })
  }

  return (
    <div>
      <div className="h-[80vh]">
        <Container className="grid grid-cols-1 lg:grid-cols-3 h-full">
          <div className="grid justify-items-center lg:justify-items-start content-center lg:max-w-xl">
            <form
              className="flex flex-col space-y-3 py-4 w-full"
              onSubmit={handleSubmit}
            >
              <h1 className="font-semibold text-xl">Register</h1>
              <Input
                type="text"
                label="Username"
                name="userName"
                suffix={<UserIcon className="text-primary-600" />}
                required
              />
              <Input
                type="text"
                label="Fullname"
                name="fullname"
                suffix={<UserIcon className="text-primary-600" />}
                required
              />
              <Input
                type="text"
                label="Email"
                name="email"
                suffix={<EmailIcon className="text-primary-600" />}
                required
              />
              <Input
                type="password"
                label="Password"
                name="password"
                suffix={<LockIcon className="text-primary-600" />}
                required
              />
              <Input
                type="password"
                label="Repeat Password"
                name="confirmPassword"
                suffix={<LockIcon className="text-primary-600" />}
                required
              />
              <Checkbox
                label="I am a Sponsor"
                aria-label="Yes, I am a Sponsor"
                value="sponsor"
                name="role"
              />
              <ShowError error={(error as any)?.response?.data?.message} />
              <div>
                <Button variant="primary" type="submit" loading={isLoading}>
                  Register
                </Button>
              </div>
            </form>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-evenly">
            <span
              className={`
              font-semibold relative 
              after:absolute after:border-b after:lg:border-r after:border-gray-400 
              after:w-[70vw] after:h-0 after:lg:w-0 after:lg:h-[40vh] after:-z-20
              after:right-1/2 after:translate-x-1/2 after:top-1/2 after:-translate-y-1/2 
              before:absolute before:w-[200%] before:h-[200%] before:bg-background before:-z-10
              before:right-1/2 before:translate-x-1/2 before:top-1/2 before:-translate-y-1/2
              `}
            >
              OR
            </span>
            <Button href="/login" className="min-w-[320px] text-sm">
              Login with Existing Account
            </Button>
          </div>
          <div className="hidden lg:grid justify-items-end content-center">
            <img src="/art/headphones.svg" alt="" />
          </div>
        </Container>
      </div>
    </div>
  )
}
