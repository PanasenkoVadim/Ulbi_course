import { Profile } from 'entities/Profile/model/types/profile'
import { useTranslation } from 'react-i18next'
import classNames from 'shared/lib/classNames/classNames'
import Avatar from 'shared/ui/Avatar/Avatar'
import { Input } from 'shared/ui/Input/Input'
import Loader from 'shared/ui/Loader/Loader'
import { Text, TextAligh } from 'shared/ui/Text/Text'
import css from './ProfileCard.module.scss'
import Select from 'shared/ui/Select/Select'
import { Currency } from 'entities/Currency'
import { CurrencySelect } from 'entities/Currency'
import { Country, CountrySelect } from 'entities/Country'

type ProfileCardProps = {
	className?: string
	formData?: Profile
	error?: string
	isLoading?: boolean
	readonly?: boolean
	onNameChange: (value: string) => void
	onLastnameChange: (value: string) => void
	onAgeChange: (value: string) => void
	onCityChange: (value: string) => void
	onCountryChange: (value: Country) => void
	onCurrencyChange: (value: Currency) => void
	onAvatarChange: (value: string) => void
}

export const ProfileCard = (props: ProfileCardProps) => {
	const {
		className,
		formData,
		error,
		isLoading,
		readonly,
		onNameChange,
		onLastnameChange,
		onAgeChange,
		onCityChange,
		onCountryChange,
		onCurrencyChange,
		onAvatarChange,
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
		<div
			className={classNames(css.profileCard, { [css.editing]: !readonly }, [
				className,
			])}
		>
			<div className={css.avatarWrapper}>
				<Avatar
					src={
						formData?.avatar ||
						'https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg'
					}
				/>
			</div>

			<div className={css.formData}>
				<div className={css.field}>
					<label htmlFor='' className={css.label}>
						{t('Имя') + ':'}
					</label>
					<Input
						className={css.input}
						value={formData?.firstname}
						placeholder={t('Введите ваще имя')}
						onChange={onNameChange}
						disabled={readonly}
					/>
				</div>

				<div className={css.field}>
					<label htmlFor='' className={css.label}>
						{t('Страна') + ':'}
					</label>
					<CountrySelect
						onChange={onCountryChange}
						readonly={readonly}
						value={formData?.country}
					/>
				</div>

				<div className={css.field}>
					<label htmlFor='' className={css.label}>
						{t('Фамилия') + ':'}
					</label>
					<Input
						className={css.input}
						value={formData?.lastname}
						placeholder={t('Введите вашу фамилию')}
						onChange={onLastnameChange}
						disabled={readonly}
					/>
				</div>

				<div className={css.field}>
					<label htmlFor='' className={css.label}>
						{t('Город') + ':'}
					</label>
					<Input
						className={css.input}
						value={formData?.city}
						placeholder={t('Укажите город проживания')}
						onChange={onCityChange}
						disabled={readonly}
					/>
				</div>
				<div className={css.field}>
					<label htmlFor='' className={css.label}>
						{t('Возраст') + ':'}
					</label>
					<Input
						className={css.input}
						value={formData?.age}
						// type='number'
						placeholder={t('Укажите свей возраст')}
						onChange={onAgeChange}
						disabled={readonly}
					/>
				</div>
				<div className={css.field}>
					<label htmlFor='' className={css.label}>
						{t('Валюта') + ':'}
					</label>
					<CurrencySelect
						onChange={onCurrencyChange}
						readonly={readonly}
						value={formData?.currency}
					/>
				</div>
				<div className={classNames(css.field, {}, [css.field_avatar])}>
					<label htmlFor='' className={css.label}>
						{t('Аватар') + ':'}
					</label>
					<Input
						className={css.input}
						value={formData?.avatar}
						placeholder={t('Ссылка на аватар')}
						onChange={onAvatarChange}
						disabled={readonly}
					/>
				</div>
			</div>
		</div>
	)
}
