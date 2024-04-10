import { Article } from './article'

export interface ArticleDetailsSchema {
	isLoading: boolean
	error?: string
	data?: Article
}
export interface ArticlesSchema {
	isLoading: boolean
	error?: string
	data?: Article[]
}
