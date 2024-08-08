import { useCallback } from 'react'
import classNames from 'shared/lib/classNames/classNames'
import css from './ArticleDetailsPageHeader.module.scss'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getUserAuthData } from 'entities/user'
import { getArticleDetailsData } from 'entities/Article'
import { getCanEditArticle } from '../../model/selectors/article'

type ArticleDetailsPageHeaderProps = {
	className?: string
}

export default function ArticleDetailsPageHeader(
	props: ArticleDetailsPageHeaderProps
) {
	const { className } = props
	const navigate = useNavigate()
	const { t } = useTranslation()
	const userData = useSelector(getUserAuthData)
	const article = useSelector(getArticleDetailsData)
	const canEdit = useSelector(getCanEditArticle)
	console.log(article?.id)
	const onBackToList = useCallback(() => {
		navigate(RoutePath.articles)
	}, [navigate])

	const onEditArticle = useCallback(() => {
		navigate(`${RoutePath.article_details}${article?.id}/edit`)
	}, [navigate, article?.id])

	return (
		<div className={classNames(css.header, {}, [className])}>
			<Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
				<b>&#8592;</b>&nbsp;{t('Список статей')}
			</Button>
			{canEdit && (
				<Button
					className={css.editBtn}
					theme={ButtonTheme.OUTLINE}
					onClick={onEditArticle}
				>
					<b>&#9998;</b>&nbsp;{t('Редактировать')}
				</Button>
			)}
		</div>
	)
}
