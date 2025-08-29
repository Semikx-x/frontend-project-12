const Login = () => {
  return (
    <div className="col-12 col-md-8 col-xxl-6">
      <div className="card shadow-sm">
        <div className="card-body row p-5">
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
            <img src="/assets/avatar-DIE1AEpS.jpg" class="rounded-circle" alt="Войти"/>
          </div>
          <form className="col-12 col-md-6 mt-3 mt-md-0">
            <h1 className="text-center mb-4">Войти</h1>
            <div className="form-floating mb-3">
              <input name="username" autocomplete="username" required="" placeholder="Ваш ник" id="username" class="form-control" value=""/>
              <label for="username">Ваш ник</label>
            </div>
            <div className="form-floating mb-4">
              <input name="password" autocomplete="current-password" required="" placeholder="Пароль" type="password" id="password" class="form-control" value=""/>
              <label className="form-label" for="password">Пароль</label>
            </div>
            <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
          </form>
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

export {Login}