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

type ProfileCardProps = {
	className?: string
}

export const ProfileCard = ({ className }: ProfileCardProps) => {
	const { t } = useTranslation('profile')
	const data = useSelector(getProfileData)
	const error = useSelector(getProfileError)
	const isLoading = useSelector(getProfileLoading)

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
					/>
				</div>
			</div>
		</div>
	)
}
