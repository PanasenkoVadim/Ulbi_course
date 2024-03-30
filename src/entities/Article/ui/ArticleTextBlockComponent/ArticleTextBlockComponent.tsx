import { useTranslation } from 'react-i18next'
import classNames from 'shared/lib/classNames/classNames'

type ArticleTextBlockComponentProps = {
	className?: string
}

const ArticleTextBlockComponent = (props: ArticleTextBlockComponentProps) => {
	const { className } = props
	const { t } = useTranslation()
	return (
		<div className={classNames('test', {}, [className])}>
			{t('ArticleTextBlockComponent ')}
		</div>
	)
}

export default ArticleTextBlockComponent
