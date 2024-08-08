import { Counter } from 'entities/counter'
import { useTranslation } from 'react-i18next'
import { Page } from 'widgets/Page/Page'

const HomePage = () => {
	const { t } = useTranslation('home')

	return (
		<Page>
			<h1>{t('Домашняя страница')}</h1>
			<Counter />
		</Page>
	)
}

export default HomePage
