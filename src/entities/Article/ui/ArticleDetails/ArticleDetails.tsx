import { memo, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import classNames from 'shared/lib/classNames/classNames'
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDIspatch'
import { PageLoader } from 'shared/ui/PageLoader'
import { Text, TextAligh, TextSize } from 'shared/ui/Text/Text'
import {
	getArticleDetailsData,
	getArticleDetailsError,
	getArticleDetailsLoading,
} from '../../model/selectors/articleDetails'
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById'
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice'
import css from './ArticleDetails.module.scss'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'
import Avatar from 'shared/ui/Avatar/Avatar'
import ViewsLogo from 'shared/static/images/eye.svg'
import CalendarLogo from 'shared/static/images/calendar.svg'
import { Icon } from 'shared/ui/Icon/Icon'
import {
	ArticleBlock,
	ArticleBlockType,
} from 'entities/Article/model/types/article'
import ArticleCodeBlockComponent from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent'
import ArticleTextBlockComponent from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import ArticleImageBlockComponent from '../ArticleImageBlockComponent/ArticleImageBlockComponent'

type ArticleDetailsProps = {
	id: string
	className?: string
}

const initialReducers: ReducersList = {
	articleDetails: articleDetailsReducer,
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
	const { className, id } = props
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const article = useSelector(getArticleDetailsData)
	const isLoading = useSelector(getArticleDetailsLoading)
	const error = useSelector(getArticleDetailsError)

	const renderBlock = useCallback((block: ArticleBlock) => {
		switch (block.type) {
			case ArticleBlockType.CODE:
				return <ArticleCodeBlockComponent className={css.block} block={block} />
			case ArticleBlockType.TEXT:
				return <ArticleTextBlockComponent className={css.block} block={block} />
			case ArticleBlockType.IMAGE:
				return (
					<ArticleImageBlockComponent className={css.block} block={block} />
				)
			default:
				return null
		}
	}, [])

	useEffect(() => {
		dispatch(fetchArticleById(id))
	}, [dispatch, id])

	let content

	if (isLoading) {
		content = (
			<div className={css.skeleton}>
				<Skeleton width={200} height={200} border={'50%'} />
				<Skeleton width={300} height={24} />
				<Skeleton width={600} height={44} />
				<Skeleton width='100%' height={400} />
				<Skeleton width='100%' height={200} />
			</div>
		)
	} else if (error) {
		content = (
			<>
				<Text title={'Статья не найдена'} align={TextAligh.CENTER} />
			</>
		)
	} else {
		content = (
			<>
				<div className={css.articleAvatar}>
					<Avatar size={200} src={article?.img} className={css.avatar} />
				</div>
				<div className={css.articleTitle}>
					<Text
						title={article?.title}
						text={article?.subtitle}
						size={TextSize.L}
					/>
				</div>
				<div className={css.articleInfo}>
					<Icon Svg={ViewsLogo} />
					<Text text={String(article?.views)} />
				</div>
				<div className={css.articleInfo}>
					<Icon Svg={CalendarLogo} />
					<Text text={article?.createdAt} />
				</div>
				<div>{article?.blocks.map(block => renderBlock(block))}</div>
			</>
		)
	}

	return (
		<DynamicModuleLoader reducers={initialReducers}>
			<div className={classNames(css.articleDetails, {}, [className])}>
				<div className={css.article}>{content}</div>
			</div>
		</DynamicModuleLoader>
	)
})
