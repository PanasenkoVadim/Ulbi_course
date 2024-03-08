import { FC, lazy } from 'react'
import { LoginFormProps } from './LoginForm'

// export const LoginFormLazy = lazy(async () => await import('./LoginForm'))

export const LoginFormLazy = lazy<FC<LoginFormProps>>(
	/* искусственная задержка для тестирования loader-а */
	() =>
		new Promise(resolve => {
			setTimeout(() => resolve(import('./LoginForm')), 1000)
		})
)
