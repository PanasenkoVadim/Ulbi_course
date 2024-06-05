import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import {
	ProfileCard,
	fetchProfileData,
	getProfileError,
	getProfileFormData,
	getProfileLoading,
	getProfileReadonly,
	getProfileValidateErrors,
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
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { validateErrorText } from 'entities/Profile/model/services/validateProfileData/validateProfileData'
import { useParams } from 'react-router-dom'

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
	const validateErrors = useSelector(getProfileValidateErrors)
	const { id } = useParams()

	useEffect(() => {
		if (id) {
			dispatch(fetchProfileData(id))
		}
	}, [dispatch, id])

	const onNameChange = (value: string) => {
		value = value?.replace(/[^а-яa-zё -]/gi, '')
		formData && dispatch(profileActions.updateProfile({ firstname: value }))
	}
	const onLastnameChange = (value?: string) => {
		formData && dispatch(profileActions.updateProfile({ lastname: value }))
	}
	const onAgeChange = (value?: string) => {
		value = value?.replace(/[\D]/gi, '')
		formData && dispatch(profileActions.updateProfile({ age: Number(value) }))
	}
	const onCityChange = (value?: string) => {
		value = value?.replace(/[^а-яa-zё -]/gi, '')
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
				<ProfilePageHeader isLoading={isLoading} readonly={readonly} profileId={id} />
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
				{validateErrors?.length &&
					validateErrors.map(error => (
						<Text
							key={error}
							theme={TextTheme.ERROR}
							text={validateErrorText[error]}
						/>
					))}
			</div>
		</DynamicModuleLoader>
	)
}

export default ProfilePage
