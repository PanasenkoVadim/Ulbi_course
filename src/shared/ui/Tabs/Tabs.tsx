import classNames from 'shared/lib/classNames/classNames'
import css from './Tabs.module.scss'
import { ReactNode, useCallback } from 'react'
import { Card, CardTheme } from '../Card/Card'

export interface TabItem {
	value: string
	content: ReactNode
}
interface TabsProps {
	className?: string
	tabs: TabItem[]
	value: string
	onTabClick: (tab: TabItem) => void
}

export const Tabs = (props: TabsProps) => {
	const { className, tabs, onTabClick, value } = props

	const clickHandle = useCallback((tab: TabItem) => {
		return () => {
			onTabClick(tab)
		}
	}, [onTabClick])
	return (
		<div className={classNames(css.tabs, {}, [className])}>
			{tabs.map(tab => (
				<Card className={css.tab} theme={tab.value === value ? CardTheme.OUTLINED : CardTheme.NORMAL} key={tab.value} onClick={clickHandle(tab)}>
					{tab.content}
				</Card>
			))}
		</div>
	)
}
