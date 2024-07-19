import { useTranslation } from 'react-i18next'
import classNames from 'shared/lib/classNames/classNames'
import { Page } from 'shared/ui/Page/Page'

type TestPageProps = {
	className?: string
}

const TestPage = (props: TestPageProps) => {
	const { className } = props
	const { t } = useTranslation()
	return (
		<Page className={classNames('test', {}, [className])}>{t('TestPage')}</Page>
	)
}

export default TestPage
