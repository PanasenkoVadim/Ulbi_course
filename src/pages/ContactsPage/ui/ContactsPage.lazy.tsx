import { lazy } from 'react'

export const ContactsPageLazy = lazy(async () => await import('./ContactsPage'))
