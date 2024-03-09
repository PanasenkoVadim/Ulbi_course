import { Reducer } from '@reduxjs/toolkit'
import { ReduxStoreWithManager } from 'app/providers/StoreProvider'
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema'
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice'
import { FC, ReactNode, useEffect } from 'react'
import { useStore } from 'react-redux'

export type ReducersList = {
	[name in StateSchemaKey]?: Reducer
}

type ReducersListEntry = [StateSchemaKey, Reducer]

type DynamicModuleLoaderProps = {
	children: ReactNode
	reducers: ReducersList
	removeAfterUnmount?: boolean
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = props => {
	const { children, reducers, removeAfterUnmount = true } = props
	const store = useStore() as ReduxStoreWithManager

	useEffect(() => {
		Object.entries(reducers).forEach(([name, reducer]: ReducersListEntry) => {
			store.reducerManager.add(name, reducer)
		})

		return () => {
			if (removeAfterUnmount) {
				Object.entries(reducers).forEach(([name]: ReducersListEntry) => {
					store.reducerManager.remove(name)
				})
			}
		}
		// eslint-disable-next-line
	}, [])

	return <>{children}</>
}
