import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import classNames from 'shared/lib/classNames/classNames'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDIspatch'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState'
import { loginActions } from '../../model/slice/loginSlice'
import css from './LoginForm.module.scss'
import { Text, TextTheme } from 'shared/ui/Text/Text'

interface LoginFormProps {
	className?: string
}
export const LoginForm = memo(({ className }: LoginFormProps) => {
	const { t } = useTranslation()
	const { username, password, isLoading, error } = useSelector(getLoginState)
	const dispatch = useAppDispatch()

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
