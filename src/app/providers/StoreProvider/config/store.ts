import {
	Reducer,
	ReducersMapObject,
	StateFromReducersMapObject,
	configureStore,
} from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from './StateSchema'
import { counterReducer } from 'entities/counter'
import { userReducer } from 'entities/user'
import { createReducerManager } from './reducerManager'
import { $api } from 'shared/api/api'
import { ScrollPositionReducer } from 'features/ScrollPosition'

export function createReduxStore(
	initialState?: StateSchema,
	asyncReducers?: ReducersMapObject<StateSchema>
) {
	const rootReducers: ReducersMapObject<StateSchema> = {
		...asyncReducers,
		counter: counterReducer,
		user: userReducer,
		scrollPosition: ScrollPositionReducer
	}
	const reducerManager = createReducerManager(rootReducers)

	const extraArg: ThunkExtraArg = {
		api: $api,
	}

	const store = configureStore({
		reducer: reducerManager.reduce as StateFromReducersMapObject<StateSchema>,
		devTools: __IS_DEV__,
		preloadedState: initialState,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware({
				thunk: {
					extraArgument: extraArg,
				},
			}),
	})
	// @ts-ignore
	store.reducerManager = reducerManager
	return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
