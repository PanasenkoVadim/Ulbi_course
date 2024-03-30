import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'shared/lib/classNames/classNames'

type ArticlesPageProps = {
	className?: string
}

const ArticlesPage = (props: ArticlesPageProps) => {
	const { className } = props
	const { t } = useTranslation()
	return (
		<div className={classNames('atricles', {}, [className])}>
			{t('ArticlesPage')}
		</div>
	)
}

export default memo(ArticlesPage)
