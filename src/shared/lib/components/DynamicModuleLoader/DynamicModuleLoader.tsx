import { Reducer } from '@reduxjs/toolkit'
import { ReduxStoreWithManager } from 'app/providers/StoreProvider'
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema'
import { FC, ReactNode, useEffect } from 'react'
import { useStore } from 'react-redux'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDIspatch'

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
	const dispatch = useAppDispatch()
	useEffect(() => {
		const mountedReducers = store.reducerManager.getMountedReducers()
		Object.entries(reducers).forEach(([name, reducer]) => {
			const mounted = mountedReducers[name as StateSchemaKey]
			//Добавляем новый reducer только если его нет
			if (!mounted) {
				store.reducerManager.add(name as StateSchemaKey, reducer)
				dispatch({ type: `@INIT ${name} reducer` })
			}
		})

		return () => {
			if (removeAfterUnmount) {
				Object.entries(reducers).forEach(([name]) => {
					store.reducerManager.remove(name as StateSchemaKey)
					dispatch({ type: `@DESTROY ${name} reducer` })
				})
			}
		}
		// eslint-disable-next-line
	}, [])

	return <>{children}</>
}
