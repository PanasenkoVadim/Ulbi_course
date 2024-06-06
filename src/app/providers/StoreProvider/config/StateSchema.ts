import {
	EnhancedStore,
	Reducer,
	ReducersMapObject,
	UnknownAction,
	combineReducers,
} from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import { ArticleDetailsSchema, ArticlesSchema } from 'entities/Article'
import { ProfileSchema } from 'entities/Profile'
import { CounterSchema } from 'entities/counter'
import { UserSchema } from 'entities/user'
import { AddCommentFormSchema } from 'features/AddCommentForm'
import { LoginSchema } from 'features/AuthByUsername'
import { ArticleDetailsCommentsSchema } from 'pages/ArticleDetailsPage'
import { NavigateOptions, To } from 'react-router-dom'

export interface StateSchema {
	counter: CounterSchema
	user: UserSchema

	// Async reducers
	loginForm?: LoginSchema
	profile?: ProfileSchema
	articles?: ArticlesSchema
	articleDetails?: ArticleDetailsSchema
	articleDetailsComments?: ArticleDetailsCommentsSchema
	addCommentForm?: AddCommentFormSchema
}

export type StateSchemaKey = keyof StateSchema

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateSchema>
	reduce: (state: StateSchema, action: UnknownAction) => StateSchema
	add: (key: StateSchemaKey, reducer: Reducer) => void
	remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
	reducerManager: ReducerManager
}

export interface ThunkExtraArg {
	api: AxiosInstance
	navigate?: (to: To, options?: NavigateOptions) => void
}

export interface ThunkConfig<T> {
	rejectValue: T
	extra: ThunkExtraArg
	state: StateSchema
}
