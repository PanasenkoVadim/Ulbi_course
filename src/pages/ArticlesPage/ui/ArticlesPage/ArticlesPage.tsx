import { ArticleList, ArticleView, ArticleViewSelector } from 'entities/Article'

import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import classNames from 'shared/lib/classNames/classNames'
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDIspatch'
import css from './ArticlesPage.module.scss'
import { Text, TextSize } from 'shared/ui/Text/Text'

import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList'
import {
	articlesPageActions,
	articlesPageReducer,
	getArticles,
} from '../../model/slices/articlesPageSlice'
import { getArticlesPageView } from 'pages/ArticlesPage/model/selectors/articlesPageSelectors'

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

	useEffect(() => {
		dispatch(fetchArticlesList())
		dispatch(articlesPageActions.initState())
	}, [dispatch])

	return (
		<DynamicModuleLoader reducers={initialReducers}>
			<div className={classNames(css.articles, {}, [className])}>
				<div className={css.heading}>
					<Text className={css.title} title={t('Статьи')} size={TextSize.L} />
					<ArticleViewSelector />
				</div>
				<ArticleList articles={articles} view={view as ArticleView} />
			</div>
		</DynamicModuleLoader>
	)
}

export default memo(ArticlesPage)
