import { useTranslation } from 'react-i18next'

const Catalog = () => {
	const { t } = useTranslation('catalog')
	return <div>{t('Каталог')}</div>
}

export default Catalog
