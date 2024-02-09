import { lazy } from 'react'

export const TestPageLazy = lazy(async () => await import('./TestPage'))
