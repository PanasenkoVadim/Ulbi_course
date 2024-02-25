import classNames from 'shared/lib/classNames/classNames'
import css from './Modal.module.scss'
import { FC, ReactNode, useCallback, useEffect, useState } from 'react'
import Portal from '../Portal/Portal'

interface ModalProps {
	className?: string
	children?: ReactNode
	isOpen?: boolean
	onClose?: () => void
	lazy?: boolean
}

export const Modal: FC<ModalProps> = props => {
	const { className, children, isOpen = false, onClose, lazy } = props
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		if (isOpen) {
			setIsMounted(true)
		}
	}, [isOpen])

	const closeHandler = useCallback(() => {
		if (onClose) {
			onClose()
		}
	}, [onClose])

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeHandler()
			}
		},
		[closeHandler]
	)

	useEffect(() => {
		if (isOpen) {
			window.addEventListener('keydown', onKeyDown)
		}
		return () => {
			window.removeEventListener('keydown', onKeyDown)
		}
	}, [isOpen, onKeyDown])

	if (lazy && !isMounted) return

	return (
		<Portal element={document.getElementById('modal_wrapper')}>
			<div
				className={classNames(css.modal, { [css.opened]: isOpen }, [className])}
			>
				<div className={css.overlay} onClick={closeHandler}>
					<div className={css.content} onClick={e => e.stopPropagation()}>
						{children}
						<div className={css.closeBtn} onClick={closeHandler}>
							&#215;
						</div>
					</div>
				</div>
			</div>
		</Portal>
	)
}
