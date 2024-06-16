import { memo, useState } from 'react'
import classNames from 'shared/lib/classNames/classNames'
import MenuLogo from 'shared/static/images/menuBtn.svg'
import { Button } from 'shared/ui/Button/Button'
import { LangSwitcher, ThemeSwitcher } from 'shared/ui/Switchers'
import NavItem from '../NavItem/NavItem'
import css from './Sidebar.module.scss'
import { useSelector } from 'react-redux'
import { getSidebarItems } from 'widgets/Sidebar/model/selectors/getSidebarItems'

interface SidebarProps {
	className?: string
}

export const Sidebar = memo(({ className }: SidebarProps) => {
	const [collapsed, setCollapsed] = useState(false)
	const NavItemsList = useSelector(getSidebarItems)
	const onOpenClick = () => {
		setCollapsed(!collapsed)
		document.body.classList.toggle('sidebar-open')
	}
	return (
		<div
			data-testid='sidebar'
			className={classNames(css.sidebar, { [css.collapsed]: collapsed }, [
				className,
			])}
		>
			<div className={css.inner}>
				<Button
					data-testid='sidebar-toggle'
					className={css.button_open}
					onClick={onOpenClick}
				>
					<MenuLogo />
				</Button>
				<nav className={classNames(css.nav, {}, [className])}>
					<ul>
						{NavItemsList.map(item => (
							<NavItem key={item.path} item={item} />
						))}
					</ul>
				</nav>
				<div className={css.switchers}>
					<LangSwitcher />
					<ThemeSwitcher />
				</div>
			</div>
		</div>
	)
})
