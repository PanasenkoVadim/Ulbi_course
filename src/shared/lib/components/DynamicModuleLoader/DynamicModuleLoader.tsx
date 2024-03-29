import { Reducer } from '@reduxjs/toolkit'
import { ReduxStoreWithManager } from 'app/providers/StoreProvider'
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema'
import { FC, ReactNode, useEffect } from 'react'
import { useStore } from 'react-redux'

export type ReducersList = {
	[name in StateSchemaKey]?: Reducer
}

type DynamicModuleLoaderProps = {
	children: ReactNode
	reducers: ReducersList
	removeAfterUnmount?: boolean
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = props => {
	const { children, reducers, removeAfterUnmount = true } = props
	const store = useStore() as ReduxStoreWithManager

	useEffect(() => {
		Object.entries(reducers).forEach(([name, reducer]) => {
			store.reducerManager.add(name as StateSchemaKey, reducer)
		})

		return () => {
			if (removeAfterUnmount) {
				Object.entries(reducers).forEach(([name]) => {
					store.reducerManager.remove(name as StateSchemaKey)
				})
			}
		}
		// eslint-disable-next-line
	}, [])

	return <>{children}</>
}
