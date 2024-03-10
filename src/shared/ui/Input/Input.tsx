import classNames from 'shared/lib/classNames/classNames'
import css from './Input.module.scss'
import { ChangeEvent, InputHTMLAttributes, memo } from 'react'

type HTMLInputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'value' | 'onChange'
>

interface InputProps extends HTMLInputProps {
	className?: string
	value?: string
	onChange?: (value: string) => void
}
export const Input = memo((props: InputProps) => {
	const { className, value, onChange, type = 'text', id, ...otherProps } = props

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value)
	}

	return (
		<div className={classNames(css.input, {}, [className])}>
			<input id={id} type={type} value={value} onChange={onChangeHandler} />
		</div>
	)
})
