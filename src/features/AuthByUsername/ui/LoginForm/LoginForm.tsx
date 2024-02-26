import { useTranslation } from 'react-i18next'
import classNames from 'shared/lib/classNames/classNames'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import css from './LoginForm.module.scss'
import { Input } from 'shared/ui/Input/Input'
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginActions } from '../../model/slice/loginSlice'
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState'

interface LoginFormProps {
	className?: string
}
export const LoginForm = memo(({ className }: LoginFormProps) => {
	const { t } = useTranslation()
	const { username, password } = useSelector(getLoginState)
	const dispatch = useDispatch()
	const onChangeUsername = (value: string) => {
		dispatch(loginActions.setUsername(value))
	}
	const onChangePassword = (value: string) => {
		dispatch(loginActions.setPassword(value))
	}
	const onLoginClick = () => {}
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
