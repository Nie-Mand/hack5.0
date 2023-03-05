import { cva, VariantProps } from 'class-variance-authority'
import { useState } from 'react'


export function Checkbox({
  label,
  suffix,
  disabled,
  className,
  ...rest
}: Props) {
  const id = label.toLowerCase().replace(' ', '-')

  return (
    <div className="py-2 flex flex-col space-y-2">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <div className={`flex items-center px-3 py-2 duration-300`}>
        <div className="mr-2">
          <input
            type="checkbox"
            className={inputStyles({ hasSuffix: !!suffix, disabled })}
            {...rest}
          />
        </div>
        <label>{rest['aria-label']}</label>
      </div>
    </div>
  )
}

export function Input({ label, suffix, disabled, ...rest }: Props) {
  const id = label.toLowerCase().replace(' ', '-')
  return (
    <div className="py-2 flex flex-col space-y-2">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <div
        className={`flex items-center border rounded-md px-3 py-2 focus-within:ring-[3px] focus-within:ring-primary-800/50 duration-300 ${
          disabled ? 'cursor-not-allowed bg-gray-200' : ''
        }`}
      >
        <InputByType {...rest} suffix={suffix} disabled={disabled} />
        <div>{suffix}</div>
      </div>
    </div>
  )
}

function InputByType({
  type,
  suffix,
  className,
  ...rest
}: Omit<Props, 'label'>) {
  if (type === 'textarea') {
    return (
      <textarea
        className={
          inputStyles({
            hasSuffix: !!suffix,
            kind: 'textarea',
            disabled: rest.disabled,
          }) +
          ' ' +
          className
        }
        {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    )
  }

  if (type === 'file') {
    return <FileUploadInput suffix={suffix} className={className} {...rest} />
  }

  return (
    <input
      className={
        inputStyles({ hasSuffix: !!suffix, disabled: rest.disabled }) +
        ' ' +
        className
      }
      type={type}
      {...rest}
    />
  )
}

function FileUploadInput({
  suffix,
  className,
  onChange,
  ...rest
}: Omit<Props, 'label'>) {
  const [filename, setFilename] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const name = file.name.split('.')[0]
      const extension = file.name.split('.')[1]

      if (name.length > 25) {
        setFilename(`${name.slice(0, 25)}...${extension}`)
      } else {
        setFilename(file.name)
      }
    }
    onChange?.(e)
  }

  return (
    <label
      className={
        inputStyles({ hasSuffix: !!suffix }) +
        ' ' +
        className +
        ' ' +
        'cursor-pointer'
      }
      htmlFor={rest.id}
    >
      <input type="file" className="hidden" {...rest} onChange={handleChange} />
      <span className="text-black">
        {filename ? filename : 'Choose a file'}
      </span>
    </label>
  )
}

const inputStyles = cva('focus:outline-none', {
  variants: {
    hasSuffix: {
      true: 'flex-1',
      false: 'w-full',
    },
    kind: {
      textarea: 'resize-none',
      input: '',
    },
    disabled: {
      true: 'cursor-not-allowed bg-gray-200',
      false: '',
    },
  },
  defaultVariants: {
    hasSuffix: false,
    kind: 'input',
    disabled: false,
  },
})

interface Props
  extends VariantProps<typeof inputStyles>,
    React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  suffix?: React.ReactNode
  disabled?: boolean | undefined
}
