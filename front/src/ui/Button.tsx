import { cva, VariantProps } from 'class-variance-authority'
import { Link } from 'react-router-dom'

export function Button({
  href,
  variant,
  thin,
  className,
  loading,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  if (href) {
    return (
      <Link
        to={href}
        className={buttonStyles({ variant, thin }) + ' ' + className}
        {...(rest as React.HTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      className={buttonStyles({ variant, thin, loading }) + ' ' + className}
      {...rest}
      disabled={loading || disabled}
    >
      {children}
      {loading && '...'}
    </button>
  )
}

const buttonStyles = cva(
  'box-border text-center px-6 h-10 grid place-content-center rounded-md capitalize duration-300',
  {
    variants: {
      variant: {
        normal:
          'bg-transparent text-primary-800 hover:text-primary-700 active:text-primary-900',
        primary:
          'bg-primary-800 hover:bg-primary-700 active:bg-primary-900 text-white',
        tertiary:
          'text-tertiary-500 border-2 border-tertiary-500 hover:border-tertiary-800 hover:text-tertiary-800 bg-transparent rounded-md',
      },
      thin: {
        true: 'font-medium',
        false: 'font-semibold',
      },
      loading: {
        true: 'opacity-50 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'normal',
      thin: false,
      loading: false,
    },
  }
)

export interface ButtonProps
  extends VariantProps<typeof buttonStyles>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  loading?: boolean
}
