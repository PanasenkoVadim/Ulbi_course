import { ArticleDetails } from 'entities/Article'
import { memo, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
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
import { AddCommentForm } from 'features/AddCommentForm'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { addArticleComment } from '../../model/services/addArticleComment/addArticleComment'
import { Page } from 'shared/ui/Page/Page'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'

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
	const navigate = useNavigate()
	const comments = useSelector(getArticleComments.selectAll)
	const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
	const dispatch = useAppDispatch()

	const onBackToList = useCallback(() => {
		navigate(RoutePath.articles)
	}, [navigate])

	const onSendComment = useCallback(
		(text: string) => {
			dispatch(addArticleComment(text))
		},
		[dispatch]
	)

	useEffect(() => {
		dispatch(fetchCommentsByArticleId(id))
	}, [dispatch, id])

	if (!id) return

	return (
		<DynamicModuleLoader reducers={reducers}>
			<Page className={classNames(css.articleDetailsPage, {}, [className])}>
				<Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
        <b>&#8592;</b>&nbsp;{t('Список статей')}
				</Button>
				<ArticleDetails id={id} />
				<Text className={css.commentsTitle} title={t('Комментарии')} />
				<AddCommentForm onSendComment={onSendComment} />
				<CommentList comments={comments} isLoading={commentsIsLoading} />
			</Page>
		</DynamicModuleLoader>
	)
}

export default memo(ArticleDetailsPage)
