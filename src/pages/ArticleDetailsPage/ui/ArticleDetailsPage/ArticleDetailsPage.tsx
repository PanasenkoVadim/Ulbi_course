import { ArticleDetails } from 'entities/Article'
import { memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import classNames from 'shared/lib/classNames/classNames'
import css from './ArticleDetailsPage.module.scss'
import { CommentList } from 'entities/Comment'
import { Text } from 'shared/ui/Text/Text'
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {
	articleDetailsCommentsReducer,
	getArticleComments,
} from '../../model/slices/ArticleDetailsCommentsSlice'
import { useSelector } from 'react-redux'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDIspatch'
import { fetchCommentsByArticleId } from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId'

type ArticleDetailsPageProps = {
	className?: string
}

const reducers: ReducersList = {
	articleDetailsComments: articleDetailsCommentsReducer,
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
	const { className } = props
	const { t } = useTranslation()
	const { id } = useParams<{ id: string }>()
	const comments = useSelector(getArticleComments.selectAll)
	const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchCommentsByArticleId(id))
	}, [dispatch, id])

	if (!id) return

	return (
		<DynamicModuleLoader reducers={reducers}>
			<div className={classNames(css.articleDetailsPage, {}, [className])}>
				<ArticleDetails id={id} />
				<Text className={css.commentsTitle} title={t('Комментарии')} />
				<CommentList comments={comments} isLoading={commentsIsLoading} />
			</div>
		</DynamicModuleLoader>
	)
}

export default memo(ArticleDetailsPage)
