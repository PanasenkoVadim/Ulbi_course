import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import classNames from 'shared/lib/classNames/classNames'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDIspatch'
import Eye from 'shared/static/images/eye.svg'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Icon } from 'shared/ui/Icon/Icon'
import { Text, TextSize } from 'shared/ui/Text/Text'
import {
	Article,
	ArticleBlockType,
	ArticleTextBlock,
	ArticleView,
} from '../../model/types/article'
import css from './ArticleListItem.module.scss'

type ArticleListItemProps = {
	className?: string
	article: Article
	view: ArticleView
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
	const { className, article, view } = props
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const onReadMoreClick = () => {
		navigate(RoutePath.article_details + article.id)
	}
	if (view === ArticleView.TILES) {
		return (
			<div className={classNames(css.item, {}, [className, css[view]])}>
				<Link to={RoutePath.article_details + article.id}>
					<div className={css.image}>
						<img src={article.img} alt='' />
						<span className={css.date}>{article.createdAt}</span>
					</div>
					<div className={css.row}>
						<div className={css.type}>{article.type.join(', ')}</div>
						<div className={css.views}>
							{article.views}
							<Icon Svg={Eye} />
						</div>
					</div>
					<div className={css.name}>{article.title}</div>
				</Link>
			</div>
		)
	}

	const textBlock = article.blocks.find(
		block => block.type === ArticleBlockType.TEXT
	) as ArticleTextBlock

	return (
		<div className={classNames(css.item, {}, [className, css[view]])}>
			<div className={css.item_top}>
				<div className={css.user}>
					<img src={article.user.avatar} alt='' />
					<span>{article.user.username}</span>
				</div>
				<span>{article.createdAt}</span>
			</div>
			<Link className={css.title} to={RoutePath.article_details + article.id}>
				<Text title={article.title} size={TextSize.L} />
			</Link>
			<Text
				className={css.subtitle}
				title={article.subtitle}
				size={TextSize.M}
			/>
			<div className={css.tags}>{article.type.join(' ')}</div>
			<div className={css.img}>
				<img src={article.img} alt='' />
			</div>
			<div className={css.text}>{textBlock.paragraphs}</div>
			<div className={css.item_bottom}>
				<Button theme={ThemeButton.OUTLINE} onClick={onReadMoreClick}>
					Читать далее...
				</Button>
				<div className={css.views}>
					{article.views}
					<Icon Svg={Eye} />
				</div>
			</div>
		</div>
	)
})
