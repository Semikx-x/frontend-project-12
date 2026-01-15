const Chats = () => {

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Левая колонка */}
        <div className="col-3 border-end bg-light p-0">
          <div className="p-3 border-bottom">
            <h5>Каналы</h5>
          </div>
          <div className="list-group list-group-flush">
            <a href="#" className="list-group-item list-group-item-action active">
              # Общий
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              # Работа
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              # Развлечения
            </a>
          </div>
        </div>

        {/* Правая колонка */}
        <div className="col-9 d-flex flex-column">
          {/* Заголовок чата */}
          <div className="p-3 border-bottom">
            <h4 className="mb-0"># Общий чат</h4>
          </div>

          {/* Сообщения */}
          <div className="flex-grow-1 p-3 overflow-auto">
            <div className="mb-3">
              <strong>Иван:</strong> Привет всем!
              <small className="text-muted ms-2">10:30</small>
            </div>
            <div className="mb-3 text-end">
              <strong>Вы:</strong> Добрый день!
              <small className="text-muted ms-2">10:45</small>
            </div>
          </div>

          {/* Форма ввода */}
          <div className="p-3 border-top">
            <div className="input-group">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Введите сообщение..."
              />
              <button className="btn btn-primary">Отправить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export {Chats}