import { useTranslation } from 'react-i18next'
import classNames from 'shared/lib/classNames/classNames'

type ArticleImageBlockComponentProps = {
	className?: string
}

const ArticleImageBlockComponent = (props: ArticleImageBlockComponentProps) => {
	const { className } = props
	const { t } = useTranslation()
	return (
		<div className={classNames('test', {}, [className])}>
			{t('ArticleImageBlockComponent ')}
		</div>
	)
}

export default ArticleImageBlockComponent
