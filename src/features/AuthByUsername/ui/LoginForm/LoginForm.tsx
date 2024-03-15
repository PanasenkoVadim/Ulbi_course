import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
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
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'

export interface LoginFormProps {
	className?: string
	onSuccess?: () => void
}
const initialReducers: ReducersList = {
	loginForm: loginReducer,
}

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const username = useSelector(getLoginUsername)
	const password = useSelector(getLoginPassword)
	const isLoading = useSelector(getLoginLoading)
	const error = useSelector(getLoginError)

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

	const onLoginClick = useCallback(async () => {
		const result = await dispatch(loginByUsername({ username, password }))
		if (
			result.meta.requestStatus === 'fulfilled' &&
			typeof onSuccess === 'function'
		) {
			onSuccess()
		}
	}, [dispatch, onSuccess, password, username])

	return (
		<DynamicModuleLoader reducers={initialReducers}>
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
		</DynamicModuleLoader>
	)
})

export default LoginForm
