import {
  AboutPage,
  CatalogPage,
  ContactsPage,
  HomePage,
  NotFoundPage,
  TestPage
} from 'pages'
import { type RouteProps } from 'react-router-dom'

export enum AppRoutes {
  HOME = 'home',
  ABOUT = 'about',
  CATALOG = 'catalog',
  CONTACTS = 'contacts',
  ERROR = 'error',
  TEST = 'test'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.CATALOG]: '/catalog',
  [AppRoutes.CONTACTS]: '/contacts',
  [AppRoutes.ERROR]: '/*',
  [AppRoutes.TEST]: '/test',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.HOME]: {
    path: RoutePath.home,
    element: <HomePage />
  },
  [AppRoutes.ABOUT]: {
    path: RoutePath.about,
    element: <AboutPage />
  },
  [AppRoutes.CATALOG]: {
    path: RoutePath.catalog,
    element: <CatalogPage />
  },
  [AppRoutes.CONTACTS]: {
    path: RoutePath.contacts,
    element: <ContactsPage />
  },
  [AppRoutes.ERROR]: {
    path: RoutePath.error,
    element: <NotFoundPage />
  },
  [AppRoutes.TEST]: {
    path: RoutePath.test,
    element: <TestPage />
  }
}
