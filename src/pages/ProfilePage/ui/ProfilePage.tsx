import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
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
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import classNames from 'shared/lib/classNames/classNames'
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDIspatch'
import css from './ProfilePage.module.scss'
import ProfilePageHeader from './ProfilePageHeader/ProfilePageHeader'

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
	const onCountryChange = (value?: Country) => {
		formData && dispatch(profileActions.updateProfile({ country: value }))
	}
	const onCurrencyChange = (value?: Currency) => {
		formData && dispatch(profileActions.updateProfile({ currency: value }))
	}
	const onAvatarChange = (value?: string) => {
		formData && dispatch(profileActions.updateProfile({ avatar: value }))
	}

	return (
		<DynamicModuleLoader reducers={reducers}>
			<div className={classNames(css.profile, {}, [className])}>
				<ProfilePageHeader isLoading={isLoading} readonly={readonly} />
				<ProfileCard
					readonly={readonly}
					formData={formData}
					isLoading={isLoading}
					error={error}
					onNameChange={onNameChange}
					onLastnameChange={onLastnameChange}
					onAgeChange={onAgeChange}
					onCityChange={onCityChange}
					onCountryChange={onCountryChange}
					onCurrencyChange={onCurrencyChange}
					onAvatarChange={onAvatarChange}
				/>
			</div>
		</DynamicModuleLoader>
	)
}

export default ProfilePage
