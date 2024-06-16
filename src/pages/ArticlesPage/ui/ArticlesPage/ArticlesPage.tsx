import { ArticleList, articlesReducer, getArticleList } from 'entities/Article'
import { fetchArticles } from 'entities/Article/model/services/fetchArticles/fetchArticles'
import { memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import classNames from 'shared/lib/classNames/classNames'
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDIspatch'
import css from "./ArticlesPage.module.scss"

type ArticlesPageProps = {
	className?: string
}
const initialReducers: ReducersList = {
	articles: articlesReducer,
}
const ArticlesPage = (props: ArticlesPageProps) => {
	const { className } = props
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const articles = useSelector(getArticleList) || []

	useEffect(() => {
		dispatch(fetchArticles())
	}, [dispatch])

	return (
		<DynamicModuleLoader reducers={initialReducers}>
			<div className={classNames(css.articles, {}, [className])}>
				{t('ArticlesPage')}
				<ArticleList articles={articles} />
			</div>
		</DynamicModuleLoader>
	)
}

export default memo(ArticlesPage)
