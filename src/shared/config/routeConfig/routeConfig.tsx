import {
	AboutPage,
	CatalogPage,
	ContactsPage,
	HomePage,
	ProfilePage,
	NotFoundPage,
	TestPage,
} from 'pages'
import { type RouteProps } from 'react-router-dom'

export type AppRoutesProps = RouteProps & {
	authOnly?: boolean
}

export enum AppRoutes {
	HOME = 'home',
	ABOUT = 'about',
	CATALOG = 'catalog',
	CONTACTS = 'contacts',
	PROFILE = 'profile',
	ERROR = 'error',
	TEST = 'test',
}

export const RoutePath: Record<AppRoutes, string> = {
	[AppRoutes.HOME]: '/',
	[AppRoutes.ABOUT]: '/about',
	[AppRoutes.CATALOG]: '/catalog',
	[AppRoutes.CONTACTS]: '/contacts',
	[AppRoutes.PROFILE]: '/profile',
	[AppRoutes.ERROR]: '/*',
	[AppRoutes.TEST]: '/test',
}

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
	[AppRoutes.HOME]: {
		path: RoutePath.home,
		element: <HomePage />,
	},
	[AppRoutes.ABOUT]: {
		path: RoutePath.about,
		element: <AboutPage />,
	},
	[AppRoutes.CATALOG]: {
		path: RoutePath.catalog,
		element: <CatalogPage />,
	},
	[AppRoutes.CONTACTS]: {
		path: RoutePath.contacts,
		element: <ContactsPage />,
	},
	[AppRoutes.PROFILE]: {
		path: RoutePath.profile,
		element: <ProfilePage />,
		authOnly: true,
	},
	[AppRoutes.ERROR]: {
		path: RoutePath.error,
		element: <NotFoundPage />,
	},
	[AppRoutes.TEST]: {
		path: RoutePath.test,
		element: <TestPage />,
	},
}
