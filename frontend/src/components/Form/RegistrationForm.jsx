import {Formik, Form} from 'formik'
import { initialValues } from './helper.js'
import { Input } from '../input/Input.jsx'
import { LogButton } from '../Buttons/Button.jsx'
import { useEffect } from 'react'
import { signup, selectStatus, selectError, selectAuth, selectToken } from '../slices/LoginSlice.js'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getRegistrationSchema } from '../Form/schema.js'

export const RegForm = () => {
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

  const handleSubmit = async (values, { setSubmitting, setErrors, setFieldTouched }) => {
    try {
      const result = await dispatch(signup(values)).unwrap()
      
      if (signup.rejected.match(result)) {
        setErrors({ general: result.payload })
      }
    } catch (err) {
      setErrors({ general: err })
      setFieldTouched('general', true, false);
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik 
      initialValues={initialValues}
      validationSchema={getRegistrationSchema()}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="w-100">
          <h1 className="text-center mb-6 p-4">{t('registr.reg')}</h1>
          <Input
            name="userName"
            id="userName"
            placeholder={t('registr.placeholderL')}
          />
          <Input
            name="password"
            id="password"
            placeholder={t('registr.placeholderP')}
          />
          <Input
            name="acceptPassword"
            id="acceptPassword"
            placeholder={t('registr.placeholderPP')}
          />
          {errors.general && touched.general && (
            <div className="alert alert-danger mt-3" role="alert">
              {errors.general}
            </div>
          )}
          <LogButton>{isSubmitting ? t('registr.reg') : t('registr.butReg')}</LogButton>
        </Form>
      )}
    </Formik>
  )
}

