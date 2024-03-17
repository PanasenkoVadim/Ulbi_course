import { Country } from 'entities/Country/model/types/country'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Select from 'shared/ui/Select/Select'

type CountrySelectProps = {
	className?: string
	value?: Country
	onChange?: (value: Country) => void
	readonly?: boolean
}

const options = [
	{ label: 'Россия', value: Country.Russia },
	{ label: 'Казахстан', value: Country.Kazakhstan },
	{ label: 'Беларусь', value: Country.Belarus },
	{ label: 'Армения', value: Country.Armenia },
	{ label: 'Азербайджан', value: Country.Azerbaijan },
	{ label: 'Грузия', value: Country.Georgia },
]

export const CountrySelect = (props: CountrySelectProps) => {
	const { className, onChange, readonly, value } = props
	const { t } = useTranslation('profile')
	const onChangeHandler = useCallback(
		(value: string) => {
			onChange?.(value as Country)
		},
		[onChange]
	)

	return (
		<Select
			className={className}
			options={options}
			onChange={onChangeHandler}
			placeholder={'Выберете страну...'}
			value={value}
			disabled={readonly}
		/>
	)
}
