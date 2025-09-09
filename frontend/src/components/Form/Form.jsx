import {Formik, Form} from 'formik'
import { initialValues } from './helper.js'
import { Input } from '../input/Input.jsx'
import { LogButton } from '../Buttons/Button.jsx'

export const LoginForm = () => {
  return (
    <Formik 
      initialValues={initialValues}
      onSubmit={() => console.log({initialValues})}
    >
      {() => (
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
          <LogButton>Войти</LogButton>
        </Form>
      )}
    </Formik>
  )
}

