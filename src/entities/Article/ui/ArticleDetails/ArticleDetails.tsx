import { memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import classNames from 'shared/lib/classNames/classNames'
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDIspatch'
import { PageLoader } from 'shared/ui/PageLoader'
import { Text, TextAligh } from 'shared/ui/Text/Text'
import {
	getArticleDetailsData,
	getArticleDetailsError,
	getArticleDetailsLoading,
} from '../../model/selectors/articleDetails'
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById'
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice'
import css from './ArticleDetails.module.scss'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'

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
	const data = useSelector(getArticleDetailsData)
	const isLoading = true
	// const isLoading = useSelector(getArticleDetailsLoading)
	const error = useSelector(getArticleDetailsError)

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
		content = <>{t('ArticleDetails')}</>
	}

	return (
		<DynamicModuleLoader reducers={initialReducers}>
			<div className={classNames(css.articleDetails, {}, [className])}>
				<div className={css.content}>{content}</div>
			</div>
		</DynamicModuleLoader>
	)
})
