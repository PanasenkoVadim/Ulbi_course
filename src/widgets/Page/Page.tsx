import { StateSchema } from 'app/providers/StoreProvider'
import {
	ScrollPositionActions,
	getScrollByPath,
} from 'features/ScrollPosition'
import {
	MutableRefObject,
	ReactNode,
	UIEvent,
	memo,
	useEffect,
	useRef,
} from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import classNames from 'shared/lib/classNames/classNames'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDIspatch'
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle'
import css from './Page.module.scss'

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
