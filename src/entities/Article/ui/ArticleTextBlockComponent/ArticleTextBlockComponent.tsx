import { ArticleTextBlock } from '../../model/types/article'
import { useTranslation } from 'react-i18next'
import classNames from 'shared/lib/classNames/classNames'
import css from './ArticleTextBlockComponent.module.scss'
import { Text } from 'shared/ui/Text/Text'
import { memo } from 'react'

type ArticleTextBlockComponentProps = {
	className?: string
	block: ArticleTextBlock
}

const ArticleTextBlockComponent = memo(
	(props: ArticleTextBlockComponentProps) => {
		const { className, block } = props
		const { t } = useTranslation()
		return (
			<div className={classNames(css.textBlock, {}, [className])}>
				{block.title && <Text title={block.title} className={css.title} />}
				{Boolean(block.paragraphs.length) &&
					block.paragraphs.map((p, i) => <Text key={i} text={p} />)}
			</div>
		)
	}
)

export default ArticleTextBlockComponent
