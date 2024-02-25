import { useTranslation } from 'react-i18next'
import classNames from 'shared/lib/classNames/classNames'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import css from './LoginForm.module.scss'
import { Input } from 'shared/ui/Input/Input'

interface LoginFormProps {
	className?: string
}
export const LoginForm = ({ className }: LoginFormProps) => {
	const { t } = useTranslation()
	return (
		<div className={classNames(css.form, {}, [className])}>
			<h1 className={css.form_title}>{t('Авторизация')}</h1>
			<div className={css.form_row}>
				<div>
					<label htmlFor='login'>{t('Логин')}</label>
				</div>
				<Input type='text' id='login' />
			</div>
			<div className={css.form_row}>
				<div>
					<label htmlFor='password'>{t('Пароль')}</label>
				</div>
				<Input type='text' id='password' />
			</div>
			<Button className={css.form_btn} theme={ThemeButton.BACKGROUND}>
				{t('Войти')}
			</Button>
		</div>
	)
}
