import {
	ArticleSortField,
	ArticleSortSelector,
	ArticleView,
	ArticleViewSelector,
} from 'entities/Article'
import {
	getArticlesPageOrder,
	getArticlesPageSearch,
	getArticlesPageSort,
	getArticlesPageType,
	getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors'
import { articlesPageActions } from '../../model/slices/articlesPageSlice'
import { memo, useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import classNames from 'shared/lib/classNames/classNames'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDIspatch'
import { Input } from 'shared/ui/Input/Input'
import css from './ArticlesPageFilters.module.scss'
import { SortOrder } from 'shared/types'
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList'
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce'
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle'
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs'
import { ArticleType } from 'entities/Article/model/types/article'

interface ArticlesPageFiltersProps {
	className?: string
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
	const { className } = props
	const view = useSelector(getArticlesPageView)
	const sort = useSelector(getArticlesPageSort)
	const order = useSelector(getArticlesPageOrder)
	const search = useSelector(getArticlesPageSearch)
	const type = useSelector(getArticlesPageType)
	const dispatch = useAppDispatch()
	const { t } = useTranslation()

	const fetchData = useCallback(() => {
		dispatch(fetchArticlesList({ replace: true }))
	}, [dispatch])

	const debouncedFetchData = useDebounce(fetchData, 200)

	const onChangeView = useCallback(
		(newView: ArticleView) => {
			dispatch(articlesPageActions.setView(newView))
		},
		[dispatch]
	)

	const onChangeOrder = useCallback(
		(newOrder: SortOrder) => {
			dispatch(articlesPageActions.setOrder(newOrder))
			dispatch(articlesPageActions.setPage(1))
			fetchData()
		},
		[dispatch, fetchData]
	)
	const onChangeSort = useCallback(
		(newSort: ArticleSortField) => {
			dispatch(articlesPageActions.setSort(newSort))
			dispatch(articlesPageActions.setPage(1))
			fetchData()
		},
		[dispatch, fetchData]
	)
	const onChangeSearch = useCallback(
		(search: string) => {
			dispatch(articlesPageActions.setSearch(search))
			dispatch(articlesPageActions.setPage(1))
			debouncedFetchData()
		},
		[dispatch, debouncedFetchData]
	)
	const onChangeType = useCallback(
		(tab: TabItem) => {
			dispatch(articlesPageActions.setType(tab.value as ArticleType))
			dispatch(articlesPageActions.setPage(1))
			fetchData()
		},
		[dispatch, fetchData]
	)

	const typeTabs = useMemo<TabItem[]>(
		() => [
			{ value: ArticleType.ALL, content: t('Все статьи') },
			{ value: ArticleType.IT, content: t('Айти') },
			{ value: ArticleType.SCIENCE, content: t('Наука') },
			{ value: ArticleType.ECONOMICS, content: t('Экономика') },
		],
		[t]
	)

	return (
		<div className={classNames(css.filter, {}, [className])}>
			<Input
				value={search}
				onChange={onChangeSearch}
				className={css.input}
				placeholder='Поиск'
			/>
			<ArticleSortSelector
				order={order}
				sort={sort}
				onChangeOrder={onChangeOrder}
				onChangeSort={onChangeSort}
			/>
			<ArticleViewSelector view={view} onViewClick={onChangeView} />
			<Tabs tabs={typeTabs} value={type} onTabClick={onChangeType} />
		</div>
	)
})
