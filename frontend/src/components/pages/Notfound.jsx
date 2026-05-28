import { useTranslation } from 'react-i18next'

const NotF = () => {
  const { t } = useTranslation()
  return (
    <div>{t('NotF.404')}</div>
  )
}
export default NotF
