import { useTranslation } from 'react-i18next'
import classNames from 'shared/lib/classNames/classNames'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import css from './LoginForm.module.scss'
import { Input } from 'shared/ui/Input/Input'
import { memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginActions } from '../../model/slice/loginSlice'
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState'
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername'
import { useAppDispatch } from 'app/providers/StoreProvider/ui/StoreProvider'

interface LoginFormProps {
	className?: string
}
export const LoginForm = memo(({ className }: LoginFormProps) => {
	const { t } = useTranslation()
	const { username, password } = useSelector(getLoginState)
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
	}, [dispatch, password, username])
	return (
		<div className={classNames(css.form, {}, [className])}>
			<h1 className={css.form_title}>{t('Авторизация')}</h1>
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
			<Button
				onClick={onLoginClick}
				className={css.form_btn}
				theme={ThemeButton.BACKGROUND}
			>
				{t('Войти')}
			</Button>
		</div>
	)
})
