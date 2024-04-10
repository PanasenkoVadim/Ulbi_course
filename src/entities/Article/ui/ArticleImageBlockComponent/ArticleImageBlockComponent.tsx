import { ArticleImageBlock } from '../../model/types/article'
import { useTranslation } from 'react-i18next'
import classNames from 'shared/lib/classNames/classNames'
import css from './ArticleImageBlockComponent.module.scss'
type ArticleImageBlockComponentProps = {
	className?: string
	block: ArticleImageBlock
}

const ArticleImageBlockComponent = (props: ArticleImageBlockComponentProps) => {
	const { className, block } = props
	const { t } = useTranslation()
	return (
		<figure className={classNames(css.figure, {}, [className])}>
			<img src={block.src} alt={block.title} />
			{block.title && <figcaption>{block.title}</figcaption>}
		</figure>
	)
}

export default ArticleImageBlockComponent
