import {
	ProfileCard,
	fetchProfileData,
	getProfileData,
	getProfileError,
	getProfileLoading,
	getProfileReadonly,
	profileActions,
	profileReducer,
} from 'entities/Profile'
import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'shared/lib/classNames/classNames'
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDIspatch'
import css from './ProfilePage.module.scss'
import { useSelector } from 'react-redux'
import ProfilePageHeader from './ProfilePageHeader/ProfilePageHeader'
import { updateProfileData } from 'entities/Profile/model/services/updateProfileData/updateProfileData'

const reducers: ReducersList = {
	profile: profileReducer,
}

type ProfilePageProps = {
	className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const data = useSelector(getProfileData)
	const error = useSelector(getProfileError)
	const isLoading = useSelector(getProfileLoading)
	const readonly = useSelector(getProfileReadonly)

	useEffect(() => {
		dispatch(fetchProfileData())
	}, [dispatch])

	const onSaveClick = useCallback(async () => {
		if (data) {
			const result = await dispatch(updateProfileData(data))
			dispatch(profileActions.setReadonly(true))
		}
	}, [dispatch, data])

	const onEditClick = useCallback(() => {
		dispatch(profileActions.setReadonly(false))
	}, [dispatch])

	const onNameChange = (value: string) => {
		data && dispatch(profileActions.updateProfile({ firstname: value }))
	}

	const onLastnameChange = (value: string) => {
		data && dispatch(profileActions.updateProfile({ lastname: value }))
	}

	return (
		<DynamicModuleLoader reducers={reducers}>
			<div className={classNames(css.profile, {}, [className])}>
				<ProfilePageHeader
					isLoading={isLoading}
					readonly={readonly}
					onEditClick={onEditClick}
					onSaveClick={onSaveClick}
				/>
				<ProfileCard
					readonly={readonly}
					data={data}
					isLoading={isLoading}
					error={error}
					onNameChange={onNameChange}
					onLastnameChange={onLastnameChange}
				/>
			</div>
		</DynamicModuleLoader>
	)
}

export default ProfilePage
