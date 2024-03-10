import {
	EnhancedStore,
	Reducer,
	ReducersMapObject,
	UnknownAction,
	combineReducers,
} from '@reduxjs/toolkit'
import { ProfileSchema } from 'entities/Profile'
import { CounterSchema } from 'entities/counter'
import { UserSchema } from 'entities/user'
import { LoginSchema } from 'features/AuthByUsername'

export interface StateSchema {
	counter: CounterSchema
	user: UserSchema

	// Async reducers
	loginForm?: LoginSchema
	profile?: ProfileSchema
}

const rootReducer = combineReducers({})
export type RootState = ReturnType<typeof rootReducer>

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateSchema>
	reduce: (state: StateSchema, action: UnknownAction) => StateSchema
	add: (key: StateSchemaKey, reducer: Reducer) => void
	remove: (key: StateSchemaKey) => void
}

export type StateSchemaKey = keyof StateSchema

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
	reducerManager: ReducerManager
}
