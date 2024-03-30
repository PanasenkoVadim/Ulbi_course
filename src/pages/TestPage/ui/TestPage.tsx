import { useTranslation } from 'react-i18next'
import classNames from 'shared/lib/classNames/classNames'

type TestPageProps = {
	className?: string
}

const TestPage = (props: TestPageProps) => {
	const { className } = props
	const { t } = useTranslation()
	return (
		<div className={classNames('test', {}, [className])}>{t('TestPage')}</div>
	)
}

export default TestPage
