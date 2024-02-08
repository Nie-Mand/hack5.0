import { useCallback } from 'react'
import { Button } from '~/ui'
import { useGetMe } from './api/users/context'
import { useCurrentRoute } from './hooks'

export default function ProfileNavigation() {
  const me = useGetMe()
  const isCurrentRoute = useCurrentRoute()

  const linkStyle = useCallback(
    (_route: string) => {
      return `${
        isCurrentRoute(_route) ? '!text-[#000]' : '!text-[#888]'
      } text-xs sm:text-base`
    },
    [isCurrentRoute]
  )

  return (
    <div>
      <div className="flex flex-wrap justify-center sm:justify-start py-4">
        <Button className={linkStyle('/profile')} href="/profile">
          About
        </Button>
        <Button
          className={linkStyle('/profile/invoices')}
          href="/profile/invoices"
        >
          All Invoices
        </Button>
        <Button
          className={linkStyle('/profile/unpaid')}
          href="/profile/unpaid"
        >
          Pay Pending Invoices
        </Button>
        <Button className={linkStyle('/profile/create')} href="/profile/create">
          Create Invoice
        </Button>

      </div>
      <hr />
    </div>
  )
}
