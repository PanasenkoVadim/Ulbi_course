import React from 'react'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import TilesLogo from 'shared/static/images/views/tiles.svg'
import ListLogo from 'shared/static/images/views/list.svg'
import { Icon } from 'shared/ui/Icon/Icon'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDIspatch'
import { articlesPageActions } from 'pages/ArticlesPage/model/slices/articlesPageSlice'
import { ArticleView } from 'entities/Article/model/types/article'

type Props = {}

export const ArticleViewSelector = (props: Props) => {
	const dispatch = useAppDispatch()
	return (
		<div>
			<Button
				onClick={() => {
					dispatch(articlesPageActions.setView(ArticleView.TILES))
				}}
				theme={ButtonTheme.CLEAR}
			>
				<Icon Svg={TilesLogo} />
			</Button>
			<Button
				onClick={() => {
					dispatch(articlesPageActions.setView(ArticleView.LIST))
				}}
				theme={ButtonTheme.CLEAR}
			>
				<Icon Svg={ListLogo} />
			</Button>
		</div>
	)
}
