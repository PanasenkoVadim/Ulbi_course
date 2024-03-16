import { Profile } from 'entities/Profile/model/types/profile'
import { useTranslation } from 'react-i18next'
import classNames from 'shared/lib/classNames/classNames'
import { Input } from 'shared/ui/Input/Input'
import Loader from 'shared/ui/Loader/Loader'
import { Text, TextAligh } from 'shared/ui/Text/Text'
import css from './ProfileCard.module.scss'

type ProfileCardProps = {
	className?: string
	data?: Profile
	error?: string
	isLoading?: boolean
	readonly?: boolean
	onNameChange: (value: string) => void
	onLastnameChange: (value: string) => void
}

export const ProfileCard = (props: ProfileCardProps) => {
	const {
		className,
		data,
		error,
		isLoading,
		readonly,
		onNameChange,
		onLastnameChange,
	} = props
	const { t } = useTranslation('profile')

	if (isLoading) {
		return (
			<div
				className={classNames(css.profileCard, {}, [className, css.loading])}
			>
				<Loader />
			</div>
		)
	}
	if (error) {
		return (
			<div className={classNames(css.profileCard, {}, [className, css.error])}>
				<Text
					align={TextAligh.CENTER}
					title={'Не удалось получить данные профиля'}
					text={'Попробуйте обновить страницу'}
				/>
			</div>
		)
	}
	return (
		<div className={classNames(css.profileCard, {}, [className])}>
			<div className={css.data}>
				<img src={data?.avatar} alt='' />
				<div className={css.row}>
					<label htmlFor='' className={css.label}>
						{t('Имя')}
					</label>
					<Input
						className={css.input}
						value={data?.firstname}
						placeholder={t('Имя')}
						onChange={onNameChange}
						disabled={readonly}
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
						disabled={readonly}
					/>
				</div>
			</div>
		</div>
	)
}
