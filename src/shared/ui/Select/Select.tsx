import { CSSProperties, useMemo } from 'react'
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
}

const Select = (props: SelectProps) => {
	const { className, options = [] } = props

	return (
		<div className={classNames(css.select, {}, [className])}>
			<div className={css.button}>Сделайте свой выбор...</div>
			<div className={css.popup}>
				<div className={css.list}>
					{options.map((option, i) => (
						<div key={i} className={css.item} data-select-value={option.value}>
							{option.label}
						</div>
					))}
				</div>
				<div className={css.angly}></div>
			</div>
			<input type='text' name='select' />
		</div>
	)
}

export default Select
