import {Formik, Form} from 'formik'
import { initialValues } from './helper.js'
import { Input } from '../input/Input.jsx'
import { LogButton } from '../Buttons/Button.jsx'
import { useEffect } from 'react'
import { fetchJWS, selectStatus, selectError, selectAuth, selectToken } from '../slices/LoginSlice.js'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation();

  const status = useSelector(selectStatus)
  const error = useSelector(selectError)
  const isAuth = useSelector(selectAuth)
  const token = useSelector(selectToken)

  useEffect(() => {
    
    if (status === 'succeeded' && isAuth === true) {
      navigate('/main', { replace: true })
    }
  }, [status, token])

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const result = await dispatch(fetchJWS(values))
      
      if (fetchJWS.fulfilled.match(result)) {
      } else if (fetchJWS.rejected.match(result)) {
        setErrors({ general: result.payload })
      }
    } catch (err) {
      setErrors({ general: 'Произошла ошибка' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik 
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="col-12 col-md-6 mt-3 mt-md-0">
          <h2 className="text-center mb-4">{t('login.log-in')}</h2>
          <Input
            name="userName"
            id="userName"
            placeholder={t('login.placeholderL')}
          />
          <Input
            name="password"
            id="password"
            placeholder={t('login.placeholderP')}
          />
          {errors.general && (
            <div className="alert alert-danger mt-3" role="alert">
              {errors.general}
            </div>
          )}
          <LogButton>{isSubmitting ? t('login.ing') : t('login.butLog')}</LogButton>
        </Form>
      )}
    </Formik>
  )
}

