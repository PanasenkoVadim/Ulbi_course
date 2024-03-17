import { useEffect, useRef, useState } from 'react'
import classNames from 'shared/lib/classNames/classNames'
import css from './Select.module.scss'

interface SelectOptions {
	label: string
	value: string
}

interface SelectProps {
	className?: string
	options?: SelectOptions[]
	value?: string
	placeholder?: string
	disabled?: boolean
	onChange?: (value: string) => void
}

const Select = (props: SelectProps) => {
	const {
		className,
		options = [],
		placeholder,
		value,
		onChange,
		disabled,
	} = props

	const [opened, setOpened] = useState(false)
	const [selected, setSelected] = useState<number | null>(null)
	const selectRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)

	const onButtonClick = () => {
		setOpened(!opened)
	}

	const onOptionClick = (value: number) => {
		setSelected(value)
		setOpened(false)
	}

	useEffect(() => {
		selected !== null && onChange?.(options[selected].value)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected])

	useEffect(() => {
		options.forEach((option, i) => option.value === value && setSelected(i))
	}, [value, options])

	useEffect(() => {
		const onOutsideClick: EventListenerOrEventListenerObject = e => {
			if (selectRef.current && !e.composedPath().includes(selectRef.current)) {
				setOpened(false)
			}
		}
		document.body.addEventListener('click', onOutsideClick)

		return () => {
			document.body.removeEventListener('click', onOutsideClick)
		}
	}, [])

	return (
		<div
			className={classNames(
				css.select,
				{ [css.opened]: opened, [css.disabled]: disabled },
				[className]
			)}
			ref={selectRef}
		>
			<button className={css.button} onClick={onButtonClick}>
				{selected !== null ? options[selected].label : placeholder}
			</button>
			<div className={css.popup}>
				<div className={css.list}>
					{options.map((option, i) => (
						<div
							key={i}
							className={classNames(
								css.item,
								{ [css.selected]: selected === i },
								[]
							)}
							onClick={() => onOptionClick(i)}
						>
							{option.label}
						</div>
					))}
				</div>
				<div className={css.angly}></div>
			</div>
			{/* <input
				ref={inputRef}
				type='text'
				name='select'
				value={value}
				onChange={() => {}}
			/> */}
		</div>
	)
}

export default Select
