import { useTranslation } from 'react-i18next'
import classNames from 'shared/lib/classNames/classNames'
import css from './ProfilePage.module.scss'

type ProfilePageProps = {
	className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {
	const { t } = useTranslation()
	return (
		<div className={classNames(css.profile, {}, [className])}>
			{t('Профайл')}
		</div>
	)
}

export default ProfilePage
