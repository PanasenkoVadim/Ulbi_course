import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData'
import { getProfileError } from 'entities/Profile/model/selectors/getProfileError/getProfileError'
import { getProfileLoading } from 'entities/Profile/model/selectors/getProfileLoading/getProfileLoading'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import css from './ProfileCard.module.scss'
import classNames from 'shared/lib/classNames/classNames'
import { Text } from 'shared/ui/Text/Text'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDIspatch'
import { profileActions } from 'entities/Profile/model/slice/profileSlice'

type ProfileCardProps = {
	className?: string
}

export const ProfileCard = ({ className }: ProfileCardProps) => {
	const { t } = useTranslation('profile')
	const data = useSelector(getProfileData)
	const error = useSelector(getProfileError)
	const isLoading = useSelector(getProfileLoading)
	const dispatch = useAppDispatch()
	const onNameChange = (value: string) => {
		dispatch(profileActions.setName(value))
	}
	const onLastnameChange = (value: string) => {
		dispatch(profileActions.setLastname(value))
	}
	return (
		<div className={classNames(css.profileCard, {}, [className])}>
			<div className={css.header}>
				<Text className={css.title} title={t('Профиль')} />
				<Button theme={ThemeButton.OUTLINE}>{t('Редактировать')}</Button>
			</div>
			<div className={css.data}>
				<div className={css.row}>
					<label htmlFor='' className={css.label}>
						{t('Имя')}
					</label>
					<Input
						className={css.input}
						value={data?.firstname}
						placeholder={t('Имя')}
						onChange={onNameChange}
					/>
				</div>
				<div className={css.row}>
					<label htmlFor='' className={css.label}>
						{t('Фамилия')}
					</label>
					<Input
						className={css.input}
						value={data?.lastname}
						placeholder={t('Фамилия')}
						onChange={onLastnameChange}
					/>
				</div>
			</div>
		</div>
	)
}
