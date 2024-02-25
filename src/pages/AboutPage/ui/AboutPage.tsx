import { Counter } from 'entities/counter'
import { useTranslation } from 'react-i18next'

const AboutPage = () => {
	const { t } = useTranslation('about')
	return (
		<div>
			<h1>{t('О нас')}</h1>
			<ul>
				<li>
					<Counter />
				</li>
			</ul>
		</div>
	)
}

export default AboutPage
