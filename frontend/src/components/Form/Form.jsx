import {Formik, Form} from 'formik'
import { initialValues } from './helper.js'
import { Input } from '../input/Input.jsx'
import { LogButton } from '../Buttons/Button.jsx'
import { useEffect } from 'react'
import { fetchJWS, selectStatus, selectError, selectAuth } from '../slices/LoginSlice.js'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

export const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const status = useSelector(selectStatus)
  const error = useSelector(selectError)
  const isAuth = useSelector(selectAuth)

  useEffect(() => {
    
    if (status === 'succeeded' && isAuth === true) {
      navigate('/main', { replace: true })
    }
  }, [status])

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

