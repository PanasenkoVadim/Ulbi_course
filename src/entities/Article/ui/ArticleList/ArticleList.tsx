import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'shared/lib/classNames/classNames'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDIspatch'
import css from './ArticleList.module.scss'
import { Article, ArticleListView } from '../../model/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'

type ArticleListProps = {
	className?: string
	articles: Article[]
	isLoading?: boolean
	view?: ArticleListView
}

export const ArticleList = memo((props: ArticleListProps) => {
	const { className, articles, view = ArticleListView.TILES } = props
	const { t } = useTranslation()
	const dispatch = useAppDispatch()

	const renderArticle = (article: Article) => {
		return <ArticleListItem article={article} view={view} />
	}

	return (
		<div className={classNames(css.list, {}, [className, css[view]])}>
			{articles.length > 0 ? articles.map(renderArticle) : null}
		</div>
	)
})
