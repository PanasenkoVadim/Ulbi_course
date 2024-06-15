export { getArticleDetailsData } from './model/selectors/articleDetails'
export { articlesReducer } from './model/slice/articlesSlice'

export type { Article } from './model/types/article'
export type {
	ArticleDetailsSchema,
	ArticlesSchema,
} from './model/types/articleDetailsSchema'
export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails'