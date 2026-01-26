import { LoginForm } from "../Form/Form.jsx"

const Login = () => {
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
                  <span>Нет аккаунта?</span>
                  <a href="/signup">Регистрация</a>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {Login}