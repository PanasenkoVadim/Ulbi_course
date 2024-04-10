import { articlesReducer } from 'entities/Article'
import { getArticleDetailsData } from 'entities/Article/model/selectors/articleDetails'
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
	const articles = useSelector(getArticleDetailsData)
	useEffect(() => {
		dispatch(fetchArticles())
	}, [dispatch, articles])

	return (
		<DynamicModuleLoader reducers={initialReducers}>
			<div className={classNames('atricles', {}, [className])}>
				{t('ArticlesPage')}
			</div>
		</DynamicModuleLoader>
	)
}

export default memo(ArticlesPage)
