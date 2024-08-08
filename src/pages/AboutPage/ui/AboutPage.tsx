import { Counter } from 'entities/counter'
import { useTranslation } from 'react-i18next'
import { Page } from 'widgets/Page/Page'

const AboutPage = () => {
	const { t } = useTranslation('about')
	return (
		<Page>
			<h1>{t('О нас')}</h1>
			<ul>
				<li>
					<Counter />
				</li>
			</ul>
		</Page>
	)
}

export default AboutPage
