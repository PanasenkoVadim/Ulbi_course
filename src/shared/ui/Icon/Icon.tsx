import React from 'react'
import classNames from 'shared/lib/classNames/classNames'
import css from './Icon.module.scss'

type IconProps = {
	className?: string
	Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>
}

export const Icon = (props: IconProps) => {
	const { className, Svg } = props
	return <Svg className={classNames(css.icon, {}, [className])} />
}
