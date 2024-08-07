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
	getArticlesPageView,
} from 'pages/ArticlesPage/model/selectors/articlesPageSelectors'
import { fetchNextArticlesPage } from 'pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage'
import { initArticlesPage } from 'pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage'
import { Page } from 'shared/ui/Page/Page'
import {
	articlesPageActions,
	articlesPageReducer,
	getArticles,
} from '../../model/slices/articlesPageSlice'
import { ArticlesPageFilters } from '../ArticlePageFilters/ArticlesPageFilters'
import { useSearchParams } from 'react-router-dom'

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
	const [searchParams] = useSearchParams()
	
	const onLoadNextPart = useCallback(() => {
		dispatch(fetchNextArticlesPage())
	}, [dispatch])

	useEffect(() => {
		dispatch(initArticlesPage(searchParams))
	}, [dispatch, searchParams])

	if (error) {
		return <>{error}</>
	}
	return (
		<DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={false}>
			<Page
				onScrollEnd={onLoadNextPart}
				className={classNames(css.articles, {}, [className])}
			>
				<div className={css.heading}>
					<Text className={css.title} title={t('Статьи')} size={TextSize.L} />
					<ArticlesPageFilters />
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
