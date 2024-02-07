import { useState } from 'react'
import classNames from 'shared/lib/classNames/classNames'
import css from './Sidebar.module.scss'

interface SidebarProps {
	className: string
}

export const Sidebar = ({ className }: SidebarProps) => {
	const [collapsed, setCollapsed] = useState(false)
	return (
		<div
			className={classNames(css.sidebar, { [css.collapsed]: collapsed }, [
				className,
			])}
		>
			Sidebar
		</div>
	)
}
