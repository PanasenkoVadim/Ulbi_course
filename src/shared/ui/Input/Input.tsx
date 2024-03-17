import classNames from 'shared/lib/classNames/classNames'
import css from './Input.module.scss'
import { ChangeEvent, InputHTMLAttributes, memo } from 'react'

type HTMLInputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'value' | 'onChange' | 'readonly' | 'placeholder'
>

interface InputProps extends HTMLInputProps {
	className?: string
	value?: string | number
	placeholder?: string
	onChange?: (value: string) => void
}
export const Input = memo((props: InputProps) => {
	const {
		className,
		value,
		placeholder,
		onChange,
		type = 'text',
		id,
		disabled,
		...otherProps
	} = props

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value)
	}

	return (
		<div className={classNames(css.input, {}, [className])}>
			<input
				id={id}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChangeHandler}
				disabled={disabled}
			/>
		</div>
	)
})
