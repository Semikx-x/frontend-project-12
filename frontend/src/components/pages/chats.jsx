const Chats = () => {

   const containerStyle = {
    height: '100vh',
    overflow: 'hidden'
  };

  const scrollableStyle = {
    overflowY: 'auto',
    height: 'calc(100vh - 70px)'
  };

  const chatAreaStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f0f2f5'
  };

  return (
    <div className="container-fluid p-0" style={containerStyle}>
      <div className="row g-0">
        
        {/* ЛЕВАЯ ПАНЕЛЬ (33.3% - col-4) */}
        <div className="col-4 border-end bg-white">
          {/* Шапка списка */}
          <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-light">
            <h5 className="mb-0">Чаты</h5>
            <button className="btn btn-sm btn-outline-primary">+</button>
          </div>
          
          {/* Список каналов */}
          <div className="list-group list-group-flush" style={scrollableStyle}>
            {['General', 'Development', 'Design', 'Marketing', 'Random'].map((name) => (
              <button key={name} className="list-group-item list-group-item-action py-3 border-bottom">
                <div className="d-flex w-100 justify-content-between">
                  <h6 className="mb-1 fw-bold"># {name}</h6>
                  <small className="text-muted">11:35</small>
                </div>
                <p className="mb-0 small text-muted text-truncate">
                  Последнее сообщение в этом канале...
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* ПРАВАЯ ПАНЕЛЬ (66.6% - col-8) */}
        <div className="col-8" style={chatAreaStyle}>
          
          {/* Шапка текущего чата */}
          <div className="p-3 border-bottom bg-white shadow-sm">
            <h6 className="mb-0 fw-bold"># General</h6>
          </div>

          {/* Область сообщений (растягивается) */}
          <div className="flex-grow-1 p-3 d-flex flex-column gap-3 overflow-auto">
            <div className="bg-white p-3 rounded-3 shadow-sm align-self-start border" style={{ maxWidth: '75%' }}>
              <small className="fw-bold text-primary d-block mb-1">Алексей</small>
              Привет! Теперь мы используем стандартную сетку Bootstrap 5 (col-4).
            </div>

            <div className="bg-primary text-white p-3 rounded-3 shadow-sm align-self-end" style={{ maxWidth: '75%' }}>
              <small className="fw-bold d-block mb-1">Вы</small>
              Да, это ровно 33.3% ширины экрана. Очень удобно для верстки.
            </div>
          </div>

          {/* Форма ввода (всегда внизу) */}
          <div className="p-3 bg-white border-top">
            <form className="input-group" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                className="form-control border-0 bg-light py-2" 
                placeholder="Напишите сообщение..." 
                style={{ boxShadow: 'none' }}
              />
              <button className="btn btn-primary px-4" type="submit">
                Отправить
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}
export {Chats}