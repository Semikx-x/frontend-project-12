import { RegForm } from "../Form/RegistrationForm.jsx"

const Registration = () => {
  return (
    <div className="container mt-5">
      <div className="card shadow-sm mx-auto">
        <div className="card-body p-4">
          <RegForm/>
        </div>
      </div>
    </div>
  )
}

export {Registration}