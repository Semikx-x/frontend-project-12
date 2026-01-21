import { RegForm } from "../Form/RegistrationForm.jsx"

const Registration = () => {
  return (
    <div className="col-12 col-md-8 col-xxl-6">
      <div className="card shadow-sm">
        <div className="card-body row p-5">
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          </div>
          <RegForm/>
        </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span>Нет аккаунта?</span>
              <a href="/signup">Регистрация</a>
            </div>
          </div>
      </div>
    </div>
  )
}

export {Registration}