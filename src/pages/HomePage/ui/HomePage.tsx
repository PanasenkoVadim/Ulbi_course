import { Counter } from 'entities/counter'
import { useTranslation } from 'react-i18next'

const HomePage = () => {
	const { t } = useTranslation('home')

	return (
		<div>
			<h1>{t('Домашняя страница')}</h1>
			<Counter />
		</div>
	)
}

export default HomePage
