import { useTranslation } from 'react-i18next'

const AboutPage = () => {
  const { t } = useTranslation('about')
  return <div><h1>{t('О нас')}</h1><ul><li>123123</li></ul></div>
}

export default AboutPage
