import { Link, type LinkProps } from 'react-router-dom'
import classNames from 'shared/lib/classNames/classNames'
import css from './AppLink.module.scss'
import { type FC } from 'react'

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
  className?: string
  theme?: AppLinkTheme
}

const AppLink: FC<AppLinkProps> = (props) => {
  const {
    children,
    to,
    className,
    theme = AppLinkTheme.PRIMARY,
    ...otherProps
  } = props
  return (
        <Link
          to={to}
          className={classNames(css.link, {}, [className, css[theme]])}
          {...otherProps}
        >
          {children}
      </Link>
  )
}

export default AppLink
