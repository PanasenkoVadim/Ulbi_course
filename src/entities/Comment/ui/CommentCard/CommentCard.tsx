import { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDIspatch'
import css from './CommentCard.module.scss'
import { Comment } from '../../model/types/comment'
import Avatar from 'shared/ui/Avatar/Avatar'
import { Text } from 'shared/ui/Text/Text'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'
import { NavLink } from 'react-router-dom'

type CommentCardProps = {
	className?: string
	comment?: Comment
	isLoading?: boolean
}

export const CommentCard = memo((props: CommentCardProps) => {
	const { className, comment, isLoading } = props
	if (isLoading) {
		return (
			<div className={classNames(css.commentCard, {}, [className])}>
				<div className={css.header}>
					<Skeleton width={30} height={30} border='50%' />
					<Skeleton width={200} height={16} />
				</div>
				<Skeleton width={'100%'} height={50} />
			</div>
		)
	}
	
	if(!comment) return 

	return (
		<div className={classNames(css.commentCard, {}, [className])}>
			<NavLink to={`/profile/${comment.user.id}`} className={css.header}>
				{comment.user.avatar && <Avatar src={comment.user.avatar} size={30} />}
				<Text title={comment.user.username} />
			</NavLink>
			<Text text={comment.text} />
		</div>
	)
})
