import { useTranslation } from 'react-i18next'
import classNames from 'shared/lib/classNames/classNames'
import css from './ProfilePage.module.scss'
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { profileReducer } from 'entities/Profile'

const reducers: ReducersList = {
	profile: profileReducer,
}

type ProfilePageProps = {
	className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {
	const { t } = useTranslation()
	return (
		<DynamicModuleLoader reducers={reducers}>
			<div className={classNames(css.profile, {}, [className])}>
				{t('Профайл')}
			</div>
		</DynamicModuleLoader>
	)
}

export default ProfilePage
