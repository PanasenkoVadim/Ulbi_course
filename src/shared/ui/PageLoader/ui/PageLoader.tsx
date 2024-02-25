import classNames from 'shared/lib/classNames/classNames'
import Loader from 'shared/ui/Loader/Loader'
import css from './PageLoader.module.scss'

interface PageLoaderProps {
	className?: string
}
export const PageLoader = ({ className }: PageLoaderProps) => {
	return (
		<div className={classNames(css.wrapper, {}, [className])}>
			<Loader />
		</div>
	)
}
