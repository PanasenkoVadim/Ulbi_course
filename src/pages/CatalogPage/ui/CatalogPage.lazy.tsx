import { lazy } from 'react'

export const CatalogPageLazy = lazy(async () => await import('./CatalogPage'))
