import {
	MutableRefObject,
	ReactNode,
	UIEvent,
	memo,
	useEffect,
	useRef,
} from 'react'
import classNames from 'shared/lib/classNames/classNames'
import css from './Page.module.scss'
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDIspatch'
import {
	ScrollPositionActions,
	getScrollByPath,
} from 'features/AuthByUsername copy'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { StateSchema } from 'app/providers/StoreProvider'
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle'

type PageProps = {
	className?: string
	children: ReactNode
	onScrollEnd?: () => void
}

export const Page = memo((props: PageProps) => {
	const { className, children, onScrollEnd } = props
	const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
	const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
	const dispatch = useAppDispatch()
	const { pathname } = useLocation()
	const scrollPosition = useSelector((state: StateSchema) =>
		getScrollByPath(state, pathname)
	)

	useInfiniteScroll({
		triggerRef,
		wrapperRef,
		callback: onScrollEnd,
	})

	useEffect(() => {
		wrapperRef.current.scrollTop = scrollPosition
	}, [scrollPosition])

	const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
		dispatch(
			ScrollPositionActions.setScrollPosition({
				position: e.currentTarget.scrollTop,
				path: pathname,
			})
		)
	}, 500)

	return (
		<section
			ref={wrapperRef}
			className={classNames(css.page, {}, [className])}
			onScroll={onScroll}
		>
			{children}
			{onScrollEnd && <div className={css.trigger} ref={triggerRef} />}
		</section>
	)
})
