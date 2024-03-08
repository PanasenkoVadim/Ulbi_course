import classNames from 'shared/lib/classNames/classNames'
import { Modal } from 'shared/ui/Modal/Modal'
import css from './LoginModal.module.scss'
import { LoginFormLazy as LoginForm } from '../LoginForm/LoginForm.lazy'
import { Suspense } from 'react'
import { PageLoader } from 'shared/ui/PageLoader'

interface LoginModalProps {
	className?: string
	isOpen?: boolean
	onClose?: () => void
}

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => {
	return (
		<Modal
			lazy
			isOpen={isOpen}
			onClose={onClose}
			className={classNames(css.loginModal, {}, [className])}
		>
			<Suspense fallback={<PageLoader />}>
				<LoginForm />
			</Suspense>
		</Modal>
	)
}
