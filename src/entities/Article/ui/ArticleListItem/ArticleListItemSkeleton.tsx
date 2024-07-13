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
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'

type ArticleListItemSkeletonProps = {
	className?: string
	view: ArticleView
}

export const ArticleListItemSkeleton = memo(
	(props: ArticleListItemSkeletonProps) => {
		const { className, view } = props
		const { t } = useTranslation()
		const dispatch = useAppDispatch()
		const navigate = useNavigate()
		if (view === ArticleView.TILES) {
			return (
				<div className={classNames(css.item, {}, [className, css[view]])}>
					<div className={css.image}>
						<Skeleton width='100%' height={200} />
						<Skeleton className={css.date} width={100} height={44} />
					</div>
					<div className={css.row}>
						<Skeleton className={css.type} width={100} height={24} />
						<Skeleton className={css.views} width={42} height={24} />
					</div>
					<Skeleton className={css.name} width='100%' height={34} />
				</div>
			)
		}

		return (
			<div className={classNames(css.item, {}, [className, css[view]])}>
				<div className={css.item_top}>
					<Skeleton width={83} height={33} />
					<Skeleton width={82} height={24} />
				</div>
				<Skeleton className={css.title} width={266} height={40} />
				<Skeleton className={css.subtitle} width={320} height={32} />
				<Skeleton className={css.tags} width={100} height={24} />
				<Skeleton className={css.img} width="auto"/>
				<Skeleton className={css.text} width="100%" height={192}/>
				<div className={css.item_bottom}>
					<Skeleton border="30px" width={137} height={37}/>
					<Skeleton className={css.views} width={42} height={24} />
				</div>
			</div>
		)
	}
)
