import { LoginForm } from "../Form/Form.jsx"
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { selectAuth, selectToken } from '../slices/LoginSlice.js'
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next'

const Login = () => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  const isAuth = useSelector(selectAuth)
  const token = useSelector(selectToken)

  useEffect(() => {
    
    if (isAuth === true) {
      navigate('/main', { replace: true })
    }
  }, [status, token])

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12">
                <LoginForm/>
              </div>
            </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>{t('login.NoAcc')}</span>
                  <a href="/signup">{t('login.RegBut')}</a>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {Login}