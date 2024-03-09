import { type FC } from 'react'
import classNames from 'shared/lib/classNames/classNames'
import { NavItemsList } from 'widgets/Sidebar/model/items'
import NavItem from '../NavItem/NavItem'
import css from './Navbar.module.scss'

interface NavbarProps {
	className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
	return (
		<nav className={classNames(css.nav, {}, [className])}>
			<ul>
				{NavItemsList.map(item => (
					<NavItem key={item.path} item={item} />
				))}
			</ul>
		</nav>
	)
}
