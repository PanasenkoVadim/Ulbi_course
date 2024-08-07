import { HTMLAttributeAnchorTarget, memo } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'shared/lib/classNames/classNames'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDIspatch'
import css from './ArticleList.module.scss'
import { Article, ArticleView } from '../../model/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import { Text } from 'shared/ui/Text/Text'

type ArticleListProps = {
	className?: string
	articles: Article[]
	isLoading?: boolean
	view?: ArticleView
	target?: HTMLAttributeAnchorTarget;
}

export const ArticleList = memo((props: ArticleListProps) => {
	const { className, articles, isLoading, view = ArticleView.TILES, target } = props
	const { t } = useTranslation()
	const dispatch = useAppDispatch()

	const renderArticle = (article: Article) => {
		return <ArticleListItem article={article} view={view} target={target} />
	}

	const getSkeletons = (view: ArticleView) => {
		return (
			<>
				{new Array(view === ArticleView.TILES ? 8 : 3)
					.fill(0)
					.map((_, index) => (
						<ArticleListItemSkeleton key={index} view={view} />
					))}
			</>
		)
	}
	// if (!isLoading && !articles.length) {
	// 	return (
	// 		<div className={classNames(css.list, {}, [className, css[view]])}>
	// 			<Text text={t('Статьи не найдены')} />
	// 		</div>
	// 	)
	// }
	return (
		<div className={classNames(css.list, {}, [className, css[view]])}>
			{articles.length > 0 ? articles.map(renderArticle) : null}
			{isLoading && getSkeletons(view)}
		</div>
	)
})
