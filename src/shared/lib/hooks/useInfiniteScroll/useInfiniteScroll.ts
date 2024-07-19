import { MutableRefObject, useEffect, useRef } from 'react'

export interface UseInfiniteScrollOptions {
	callback?: () => void
	triggerRef: MutableRefObject<HTMLElement>
	wrapperRef: MutableRefObject<HTMLElement>
}
let observer: IntersectionObserver | null = null

export function useInfiniteScroll({
	callback,
	wrapperRef,
	triggerRef,
}: UseInfiniteScrollOptions) {
	useEffect(() => {
		const triggerElement = triggerRef.current
		const wrapperElement = wrapperRef.current
		if (callback) {
			const options = {
				root: wrapperElement,
				rootMargin: '0px',
				threshold: 1.0,
			}

			observer = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) {
					callback()
				}
			})

			observer.observe(triggerElement)
		}
		return () => {
			if (observer && triggerElement) {
				observer.unobserve(triggerElement)
			}
		}
	}, [callback, triggerRef, wrapperRef])
}
