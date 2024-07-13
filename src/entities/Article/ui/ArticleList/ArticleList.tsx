import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'shared/lib/classNames/classNames'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDIspatch'
import css from './ArticleList.module.scss'
import { Article, ArticleView } from '../../model/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'

type ArticleListProps = {
	className?: string
	articles: Article[]
	isLoading?: boolean
	view?: ArticleView
}

export const ArticleList = memo((props: ArticleListProps) => {
	const { className, articles, isLoading, view = ArticleView.TILES } = props
	const { t } = useTranslation()
	const dispatch = useAppDispatch()

	const renderArticle = (article: Article) => {
		return <ArticleListItem article={article} view={view} />
	}

	if (isLoading) {
		return (
			<div className={classNames(css.list, {}, [className, css[view]])}>
				{new Array(view === ArticleView.TILES ? 8 : 3).fill(0).map((_, index) => (
					<ArticleListItemSkeleton key={index} view={view} />
				))}
			</div>
		)
	}

	return (
		<div className={classNames(css.list, {}, [className, css[view]])}>
			{articles.length > 0 ? articles.map(renderArticle) : null}
		</div>
	)
})
