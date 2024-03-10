import { useTranslation } from 'react-i18next'
import AppLink, { AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { NavItemType } from 'widgets/Sidebar/model/items'
import css from './NavItem.module.scss'
import { memo } from 'react'

interface NavItemProps {
	item: NavItemType
}

const NavItem = memo(({ item }: NavItemProps) => {
	const { t } = useTranslation()
	return (
		<li>
			<AppLink className={css.link} theme={AppLinkTheme.PRIMARY} to={item.path}>
				<item.Icon className={css.logo} />
				<span className={css.text}>{t(item.text)}</span>
			</AppLink>
		</li>
	)
})

export default NavItem
