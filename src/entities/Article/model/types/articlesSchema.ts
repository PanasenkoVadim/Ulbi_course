import { Article } from './article'

export interface ArticlesSchema {
	isLoading: boolean
	error?: string
	data?: Article[]
}
