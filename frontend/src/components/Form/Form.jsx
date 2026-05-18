import {Formik, Form} from 'formik'
import { initialValues } from './helper.js'
import { Input } from '../input/Input.jsx'
import { LogButton } from '../Buttons/Button.jsx'
import { fetchJWS } from '../slices/LoginSlice.js'
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

export const LoginForm = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const result = await dispatch(fetchJWS(values)).unwrap()
      
      if (fetchJWS.rejected.match(result)) {
        setErrors({ general: result.payload })
        toast(result.payload)
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik 
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors }) => (
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

