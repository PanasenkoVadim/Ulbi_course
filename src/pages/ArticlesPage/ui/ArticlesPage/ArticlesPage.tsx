import { ArticleList, ArticleView, ArticleViewSelector } from 'entities/Article'

import { memo, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import classNames from 'shared/lib/classNames/classNames'
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDIspatch'
import { Text, TextSize } from 'shared/ui/Text/Text'
import css from './ArticlesPage.module.scss'

import {
	getArticlesPageError,
	getArticlesPageIsLoading,
	getArticlesPageView
} from 'pages/ArticlesPage/model/selectors/articlesPageSelectors'
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList'
import { fetchNextArticlesPage } from 'pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage'
import { Page } from 'shared/ui/Page/Page'
import {
	articlesPageActions,
	articlesPageReducer,
	getArticles,
} from '../../model/slices/articlesPageSlice'

type ArticlesPageProps = {
	className?: string
}
const initialReducers: ReducersList = {
	articlesPage: articlesPageReducer,
}
const ArticlesPage = (props: ArticlesPageProps) => {
	const { className } = props
	const { t } = useTranslation('articles')
	const dispatch = useAppDispatch()
	const articles = useSelector(getArticles.selectAll)
	const view = useSelector(getArticlesPageView)
	const error = useSelector(getArticlesPageError)
	const isLoading = useSelector(getArticlesPageIsLoading)

	const onLoadNextPart = useCallback(() => {
		dispatch(fetchNextArticlesPage())
	}, [dispatch])

	useEffect(() => {
		dispatch(articlesPageActions.initState())
		dispatch(fetchArticlesList({ page: 1 }))
	}, [dispatch])

	if (error) {
		return <>{error}</>
	}
	return (
		<DynamicModuleLoader reducers={initialReducers}>
			<Page
				onScrollEnd={onLoadNextPart}
				className={classNames(css.articles, {}, [className])}
			>
				<div className={css.heading}>
					<Text className={css.title} title={t('Статьи')} size={TextSize.L} />
					<ArticleViewSelector />
				</div>
				<ArticleList
					articles={articles}
					isLoading={isLoading}
					view={view as ArticleView}
				/>
			</Page>
		</DynamicModuleLoader>
	)
}

export default memo(ArticlesPage)
