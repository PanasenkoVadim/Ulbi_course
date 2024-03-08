import { ReduxStoreWithManager } from 'app/providers/StoreProvider'
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername'
import { memo, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useStore } from 'react-redux'
import classNames from 'shared/lib/classNames/classNames'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDIspatch'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError'
import { getLoginLoading } from '../../model/selectors/getLoginLoading/getLoginLoading'
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword'
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername'
import { loginActions, loginReducer } from '../../model/slice/loginSlice'
import css from './LoginForm.module.scss'

export interface LoginFormProps {
	className?: string
}
const LoginForm = memo(({ className }: LoginFormProps) => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const store = useStore() as ReduxStoreWithManager
	const username = useSelector(getLoginUsername)
	const password = useSelector(getLoginPassword)
	const isLoading = useSelector(getLoginLoading)
	const error = useSelector(getLoginError)

	useEffect(() => {
		store.reducerManager.add('loginForm', loginReducer)

		return () => {
			store.reducerManager.remove('loginForm')
		}
		// eslint-disable-next-line
	}, [])

	const onChangeUsername = useCallback(
		(value: string) => {
			dispatch(loginActions.setUsername(value))
		},
		[dispatch]
	)

	const onChangePassword = useCallback(
		(value: string) => {
			dispatch(loginActions.setPassword(value))
		},
		[dispatch]
	)

	const onLoginClick = useCallback(() => {
		dispatch(loginByUsername({ username, password }))
		dispatch(loginActions.setPassword(''))
		dispatch(loginActions.setUsername(''))
	}, [dispatch, password, username])

	return (
		<div className={classNames(css.form, {}, [className])}>
			<Text className={css.form_title} title={t('Авторизация')} />
			<div className={css.form_row}>
				<div>
					<label htmlFor='login'>{t('Логин')}</label>
				</div>
				<Input
					value={username}
					onChange={onChangeUsername}
					type='text'
					id='login'
				/>
			</div>
			<div className={css.form_row}>
				<div>
					<label htmlFor='password'>{t('Пароль')}</label>
				</div>
				<Input
					value={password}
					onChange={onChangePassword}
					type='text'
					id='password'
				/>
			</div>
			{error && <Text text={error} theme={TextTheme.ERROR} />}
			<Button
				onClick={onLoginClick}
				className={css.form_btn}
				disabled={isLoading}
				theme={ThemeButton.BACKGROUND}
			>
				{t('Войти')}
			</Button>
		</div>
	)
})

export default LoginForm
