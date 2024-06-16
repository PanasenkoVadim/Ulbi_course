import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { NavItemType } from '../types/sidebar'
import HomeLogo from 'shared/static/images/navbar/home.svg'
import AboutLogo from 'shared/static/images/navbar/about.svg'
import ContactsLogo from 'shared/static/images/navbar/contacts.svg'
import CatalogLogo from 'shared/static/images/navbar/catalog.svg'
import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from 'entities/user'

export const getSidebarItems = createSelector(getUserAuthData, userData => {
	const NavItemsList: NavItemType[] = [
		{
			path: RoutePath.home,
			text: 'Главная',
			Icon: HomeLogo,
		},
		{
			path: RoutePath.about,
			text: 'О проекте',
			Icon: AboutLogo,
		},
		{
			path: RoutePath.catalog,
			text: 'Каталог',
			Icon: CatalogLogo,
		},
		{
			path: RoutePath.contacts,
			text: 'Контакты',
			Icon: ContactsLogo,
		},
	]
	if (userData) {
		NavItemsList.push(
			{
				path: RoutePath.profile + userData.id,
				text: 'Профиль',
				Icon: ContactsLogo,
				authOnly: true,
			},
			{
				path: RoutePath.articles,
				text: 'Статьи',
				Icon: CatalogLogo,
				authOnly: true,
			}
		)
	}
	return NavItemsList
})
