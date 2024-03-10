import { ProfileCard, fetchProfileData, profileReducer } from 'entities/Profile'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'shared/lib/classNames/classNames'
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDIspatch'
import css from './ProfilePage.module.scss'

const reducers: ReducersList = {
	profile: profileReducer,
}

type ProfilePageProps = {
	className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchProfileData())
	}, [dispatch])

	return (
		<DynamicModuleLoader reducers={reducers}>
			<div className={classNames(css.profile, {}, [className])}>
				<ProfileCard />
			</div>
		</DynamicModuleLoader>
	)
}

export default ProfilePage
