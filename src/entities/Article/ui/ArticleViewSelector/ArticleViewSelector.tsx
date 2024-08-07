import { ArticleView } from 'entities/Article/model/types/article'
import classNames from 'shared/lib/classNames/classNames'
import ListLogo from 'shared/static/images/views/list.svg'
import TilesLogo from 'shared/static/images/views/tiles.svg'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Icon } from 'shared/ui/Icon/Icon'
import css from './ArticleViewSelector.module.scss'
import { memo } from 'react'

type ArticleViewSelectorProps = {
	className?: string
	view: ArticleView
	onViewClick?: (view: ArticleView) => void
}

const viewTypes = [
	{
		view: ArticleView.TILES,
		icon: TilesLogo,
	},
	{
		view: ArticleView.LIST,
		icon: ListLogo,
	},
]

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
	const { className, view, onViewClick } = props
	const onClick = (newView: ArticleView) => () => {
		onViewClick?.(newView)
	}
	return (
		<div className={classNames(css.view, {}, [className])}>
			{viewTypes.map(viewType => (
				<Button
					className={classNames(
						css.viewBtn,
						{ [css.active]: viewType.view === view },
						[]
					)}
					onClick={onClick(viewType.view)}
					theme={ButtonTheme.CLEAR}
					key={viewType.view}
				>
					<Icon Svg={viewType.icon} />
				</Button>
			))}
		</div>
	)
})
