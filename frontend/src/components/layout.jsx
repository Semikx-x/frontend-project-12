import { Outlet } from 'react-router-dom'
import { ToastContainer, Bounce } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const Layout = () => {
  const { t } = useTranslation()

  return (
    <div>
      <header>
        <a href="/">{t('menu.chat')}</a>
      </header>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        transition={Bounce}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <main>
        <Outlet />
      </main>

    </div>
  )
}

export default Layout
