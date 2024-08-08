import { ArticleDetails, ArticleList } from 'entities/Article'
import { CommentList } from 'entities/Comment'
import { AddCommentForm } from 'features/AddCommentForm'
import { getArticleRecommendationsIsLoading } from 'pages/ArticleDetailsPage/model/selectors/recommendations'
import { fetchArticleRecommendations } from 'pages/ArticleDetailsPage/model/services/fetchArticleRecommendations/fetchArticleRecommendations'
import { getArticleRecommendations } from 'pages/ArticleDetailsPage/model/slices/ArticleDetailsPageRecommendationsSlice'
import { memo, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import classNames from 'shared/lib/classNames/classNames'
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDIspatch'
import { Page } from 'widgets/Page/Page'
import { Text } from 'shared/ui/Text/Text'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import { addArticleComment } from '../../model/services/addArticleComment/addArticleComment'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { articleDetailsPageReducer } from '../../model/slices'
import { getArticleComments } from '../../model/slices/ArticleDetailsCommentsSlice'
import css from './ArticleDetailsPage.module.scss'
import ArticleDetailsPageHeader from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'

type ArticleDetailsPageProps = {
	className?: string
}

const reducers: ReducersList = {
	articleDetailsPage: articleDetailsPageReducer,
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
	const { className } = props
	const { t } = useTranslation()
	const { id } = useParams<{ id: string }>()
	const comments = useSelector(getArticleComments.selectAll)
	const recommendations = useSelector(getArticleRecommendations.selectAll)
	const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
	const recommendationsIsLoading = useSelector(
		getArticleRecommendationsIsLoading
	)
	const dispatch = useAppDispatch()

	const onSendComment = useCallback(
		(text: string) => {
			dispatch(addArticleComment(text))
		},
		[dispatch]
	)

	useEffect(() => {
		dispatch(fetchCommentsByArticleId(id))
		dispatch(fetchArticleRecommendations())
	}, [dispatch, id])

	if (!id) return

	return (
		<DynamicModuleLoader reducers={reducers}>
			<Page className={classNames(css.articleDetailsPage, {}, [className])}>
				<ArticleDetailsPageHeader />
				<ArticleDetails id={id} />
				<Text className={css.commentsTitle} title={t('Рекоммендуем')} />
				<ArticleList
					className={css.recommendations}
					articles={recommendations}
					isLoading={recommendationsIsLoading}
					target={'_blank'}
				/>
				<Text className={css.commentsTitle} title={t('Комментарии')} />
				<AddCommentForm onSendComment={onSendComment} />
				<CommentList comments={comments} isLoading={commentsIsLoading} />
			</Page>
		</DynamicModuleLoader>
	)
}

export default memo(ArticleDetailsPage)
