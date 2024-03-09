import React from 'react'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import HomeLogo from 'shared/static/images/navbar/home.svg'
import AboutLogo from 'shared/static/images/navbar/about.svg'
import ContactsLogo from 'shared/static/images/navbar/contacts.svg'
import CatalogLogo from 'shared/static/images/navbar/catalog.svg'

export interface NavItemType {
	path: string
	text: string
	Icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>
}

export const NavItemsList: NavItemType[] = [
	{
		path: RoutePath.home,
		text: 'Главная',
		Icon: HomeLogo,
	},
	{
		path: RoutePath.about,
		text: 'О нас',
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
