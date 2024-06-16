import {
	ArticleList,
	ArticleListView,
	articlesReducer,
	getArticleList,
} from 'entities/Article'
import { fetchArticles } from 'entities/Article/model/services/fetchArticles/fetchArticles'
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
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import TilesLogo from 'shared/static/images/views/tiles.svg'
import ListLogo from 'shared/static/images/views/list.svg'
import { Icon } from 'shared/ui/Icon/Icon'

type ArticlesPageProps = {
	className?: string
}
const initialReducers: ReducersList = {
	articles: articlesReducer,
}
const ArticlesPage = (props: ArticlesPageProps) => {
	const { className } = props
	const [view, setView] = useState("LIST")
	const { t } = useTranslation('articles')
	const dispatch = useAppDispatch()
	const articles = useSelector(getArticleList) || []

	useEffect(() => {
		dispatch(fetchArticles())
	}, [dispatch])

	return (
		<DynamicModuleLoader reducers={initialReducers}>
			<div className={classNames(css.articles, {}, [className])}>
				<div className={css.heading}>
					<Text className={css.title} title={t('Статьи')} size={TextSize.L} />
					<div>
						<Button onClick={()=> setView("TILES")} theme={ThemeButton.CLEAR}>
							<Icon Svg={TilesLogo} />
						</Button>
						<Button onClick={()=> setView("LIST")} theme={ThemeButton.CLEAR}>
							<Icon Svg={ListLogo} />
						</Button>
					</div>
				</div>
				<ArticleList articles={articles} view={view as ArticleListView} />
			</div>
		</DynamicModuleLoader>
	)
}

export default memo(ArticlesPage)
