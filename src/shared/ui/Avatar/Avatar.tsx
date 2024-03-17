import { CSSProperties, useMemo } from 'react'
import classNames from 'shared/lib/classNames/classNames'
import css from './Avatar.module.scss'

interface AvatarProps {
	className?: string
	src: string | undefined
	alt?: string
	size?: number
}

const Avatar = (props: AvatarProps) => {
	const { className, src, alt = 'avatar', size = 100 } = props

	const styles = useMemo<CSSProperties>(() => {
		return {
			height: size,
			width: size,
		}
	}, [size])

	return (
		<img
			src={src}
			alt={alt}
			style={styles}
			className={classNames(css.avatar, {}, [className])}
		/>
	)
}

export default Avatar
