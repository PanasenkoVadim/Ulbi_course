import { ReactNode } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { createReduxStore } from '../config/store'
import { StateSchema } from '../config/StateSchema'

interface StoreProviderProps {
	children?: ReactNode
	initialState?: StateSchema
}

export const StoreProvider = (props: StoreProviderProps) => {
	const { children, initialState } = props
	const store = createReduxStore(initialState)
	return <Provider store={store}>{children}</Provider>
}
const store = createReduxStore()
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
