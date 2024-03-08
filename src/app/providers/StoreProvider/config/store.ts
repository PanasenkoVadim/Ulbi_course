import { ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { StateSchema } from './StateSchema'
import { counterReducer } from 'entities/counter'
import { userReducer } from 'entities/user'
import { createReducerManager } from './reducerManager'

export function createReduxStore(initialState?: StateSchema) {
	const rootReducers: ReducersMapObject<StateSchema> = {
		counter: counterReducer,
		user: userReducer,
	}
	const reducerManager = createReducerManager(rootReducers)
	const store = configureStore<StateSchema>({
		reducer: reducerManager.reduce,
		devTools: __IS_DEV__,
		preloadedState: initialState,
	})
	// @ts-ignore
	store.reducerManager = reducerManager
	return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
