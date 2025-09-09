import {Formik, Form} from 'formik'
import { initialValues, loginToken } from './helper.js'
import { Input } from '../input/Input.jsx'
import { LogButton } from '../Buttons/Button.jsx'
import { useNavigate } from 'react-router-dom'

export const LoginForm = () => {
  const navigate = useNavigate()
  
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await loginToken(values)
      navigate('/', { replace: true })
    }
    catch (error) {
      setErrors({ general: error.message || 'Неверный логин или пароль' })
    }
    finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik 
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors}) => (
        <Form className="col-12 col-md-6 mt-3 mt-md-0">
          <h1 className="text-center mb-4">Войти</h1>
          <Input
            label="Ваш ник"
            name="userName"
            id="userName"
            placeholder="Ваш ник"
          />
          <Input
            label="Пароль"
            name="password"
            id="password"
            placeholder="Пароль"
          />
          {errors.general && (
            <div className="alert alert-danger mt-3" role="alert">
              {errors.general}
            </div>
          )}
          <LogButton>{isSubmitting ? 'Вход...' : 'Войти'}</LogButton>
        </Form>
      )}
    </Formik>
  )
}

