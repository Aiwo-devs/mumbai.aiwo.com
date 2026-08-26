import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import './Button.css'

type Variant = 'primary' | 'secondary' | 'tertiary'
type Size = 'md' | 'lg'

interface ButtonOwnProps {
  variant?: Variant
  size?: Size
  children: ReactNode
}

type ButtonProps = ButtonOwnProps &
  (
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  )

export function Button({ variant = 'primary', size = 'md', children, className, ...rest }: ButtonProps) {
  const classes = ['btn', `btn--${variant}`, `btn--${size}`, className].filter(Boolean).join(' ')

  if (rest.href) {
    const { href, ...anchorProps } = rest as AnchorHTMLAttributes<HTMLAnchorElement>
    // Internal routes (leading "/") go through React Router so they stay
    // client-side navigations — a plain <a> here was forcing a full page
    // reload on every internal CTA (e.g. "/services/iv-therapy").
    if (href?.startsWith('/')) {
      return (
        <Link className={classes} to={href} {...(anchorProps as unknown as Omit<LinkProps, 'to' | 'className'>)}>
          {children}
        </Link>
      )
    }
    return (
      <a className={classes} href={href} {...anchorProps}>
        {children}
      </a>
    )
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button className={classes} type={buttonProps.type ?? 'button'} {...buttonProps}>
      {children}
    </button>
  )
}
