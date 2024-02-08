import { cva, VariantProps } from 'class-variance-authority'

export function Container({ className, ...rest }: Props) {
  return <div className={containerStyles() + ' ' + className} {...rest} />
}

const containerStyles = cva('px-4 md:px-20 xl:px-40 2xl:px-80')

interface Props
  extends VariantProps<typeof containerStyles>,
    React.HTMLAttributes<HTMLDivElement> {}
