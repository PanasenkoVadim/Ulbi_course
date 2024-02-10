import { useTranslation } from 'react-i18next'
import { PageLoader } from 'widgets/PageLoader'

const TestPage = () => {
  const { t } = useTranslation()
  return <> <PageLoader/></>
}
export default TestPage
