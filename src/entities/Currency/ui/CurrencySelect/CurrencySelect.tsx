import { Currency } from 'entities/Currency/model/types/currency'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Select from 'shared/ui/Select/Select'

type CurrencySelectProps = {
	className?: string
	value?: Currency
	onChange?: (value: Currency) => void
	readonly?: boolean
}

const options = [
	{ label: 'Рубль', value: Currency.RUB },
	{ label: 'Евро', value: Currency.EUR },
	{ label: 'Доллар', value: Currency.USD },
]

export const CurrencySelect = (props: CurrencySelectProps) => {
	const { className, onChange, readonly, value } = props
	const { t } = useTranslation('profile')
	const onChangeHandler = useCallback(
		(value: string) => {
			onChange?.(value as Currency)
		},
		[onChange]
	)

	return (
		<Select
			className={className}
			options={options}
			onChange={onChangeHandler}
			placeholder={'Выберете валюту...'}
			value={value}
			disabled={readonly}
		/>
	)
}
