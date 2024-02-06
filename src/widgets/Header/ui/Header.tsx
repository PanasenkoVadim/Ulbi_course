import { FC } from 'react'
import Icon from 'shared/static/images/test.svg'
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher/'
import { Navbar } from 'widgets/Navbar'
import Container from '../../Container/Container'
import css from './Header.module.scss'
export const Header: FC = () => {
	return (
		<header className={css.header}>
			<Container>
				<div className={css.inner}>
					<div className={css.logo}>LOGO</div>
					<ThemeSwitcher />
					<Icon />
					<Navbar />
				</div>
			</Container>
		</header>
	)
}
