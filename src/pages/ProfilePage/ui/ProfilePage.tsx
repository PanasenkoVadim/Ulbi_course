import {
	ProfileCard,
	fetchProfileData,
	getProfileError,
	getProfileFormData,
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
	const formData = useSelector(getProfileFormData)
	const error = useSelector(getProfileError)
	const isLoading = useSelector(getProfileLoading)
	const readonly = useSelector(getProfileReadonly)

	useEffect(() => {
		dispatch(fetchProfileData())
	}, [dispatch])

	const onEditClick = useCallback(() => {
		dispatch(profileActions.setReadonly(false))
	}, [dispatch])

	const onCancelEdit = useCallback(() => {
		dispatch(profileActions.cancelEdit())
	}, [dispatch])

	const onSaveClick = useCallback(async () => {
		if (formData) {
			const result = await dispatch(updateProfileData())
			if (result.meta.requestStatus === 'fulfilled') {
				dispatch(profileActions.setReadonly(true))
			}
		}
	}, [dispatch, formData])

	const onNameChange = (value: string) => {
		formData && dispatch(profileActions.updateProfile({ firstname: value }))
	}
	const onLastnameChange = (value?: string) => {
		formData && dispatch(profileActions.updateProfile({ lastname: value }))
	}
	const onAgeChange = (value?: string) => {
		formData && dispatch(profileActions.updateProfile({ age: Number(value) }))
	}
	const onCityChange = (value?: string) => {
		formData && dispatch(profileActions.updateProfile({ city: value }))
	}
	const onAvatarChange = (value?: string) => {
		formData && dispatch(profileActions.updateProfile({ avatar: value }))
	}

	return (
		<DynamicModuleLoader reducers={reducers}>
			<div className={classNames(css.profile, {}, [className])}>
				<ProfilePageHeader
					isLoading={isLoading}
					readonly={readonly}
					onEditClick={onEditClick}
					onCancelEdit={onCancelEdit}
					onSaveClick={onSaveClick}
				/>
				<ProfileCard
					readonly={readonly}
					formData={formData}
					isLoading={isLoading}
					error={error}
					onNameChange={onNameChange}
					onLastnameChange={onLastnameChange}
					onAgeChange={onAgeChange}
					onCityChange={onCityChange}
					onAvatarChange={onAvatarChange}
				/>
			</div>
		</DynamicModuleLoader>
	)
}

export default ProfilePage
