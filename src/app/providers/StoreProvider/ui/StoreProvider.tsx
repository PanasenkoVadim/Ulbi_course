import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { createReduxStore } from '../config/store'
import { StateSchema } from '../config/StateSchema'
import { ReducersMapObject } from '@reduxjs/toolkit'

interface StoreProviderProps {
	children?: ReactNode
	initialState?: StateSchema
	asyncReducers?: ReducersMapObject<StateSchema>
}

export const StoreProvider = (props: StoreProviderProps) => {
	const { children, initialState, asyncReducers } = props
	const store = createReduxStore(initialState, asyncReducers)
	return <Provider store={store}>{children}</Provider>
}
