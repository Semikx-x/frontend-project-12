const Chats = () => {

  const styles = {
    chatContainer: {
      height: '100vh',
    },
    sidebar: {
      borderRight: '1px solid #dee2e6',
      overflowY: 'auto',
    },
    chatMessages: {
      flexGrow: 1,
      overflowY: 'auto',
      backgroundColor: '#f8f9fa',
      padding: '20px',
    },
    chatArea: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    messageOther: {
      maxWidth: '70%',
    },
    messageMine: {
      maxWidth: '70%',
    }
  };
  return (
    <div className="container-fluid" style={styles.chatContainer}>
      <div className="row h-100">
        <nav className="col-md-4 col-lg-3 bg-light p-0 d-flex flex-column" style={styles.sidebar}>
          <div className="p-3 border-bottom bg-white sticky-top">
            <h5 className="mb-0">Каналы</h5>
          </div>
          <div className="list-group list-group-flush">
            <button className="list-group-item list-group-item-action active py-3 border-0">
              <strong># general</strong>
              <div className="small text-truncate opacity-75">Общий чат для всех</div>
            </button>
            <button className="list-group-item list-group-item-action py-3">
              <strong># development</strong>
              <div className="small text-truncate text-muted">Обсуждение кода</div>
            </button>
            <button className="list-group-item list-group-item-action py-3">
              <strong># design</strong>
              <div className="small text-truncate text-muted">Макеты и UI</div>
            </button>
          </div>
        </nav>
        {/* Правая панель: Чат */}
        <main className="col-md-8 col-lg-9 p-0" style={styles.chatArea}>
  
          {/* Заголовок чата */}
          <div className="p-3 border-bottom bg-white">
            <h6 className="mb-0"># general</h6>
          </div>

          {/* Область сообщений */}
          <div className="chat-messages d-flex flex-column gap-3" style={styles.chatMessages}>
            <div className="bg-white p-3 rounded shadow-sm align-self-start" style={styles.messageOther}>
              <strong className="d-block mb-1 text-primary">Иван</strong>
              Привет всем! Как успехи с проектом?
            </div>
            
            <div className="bg-primary text-white p-3 rounded shadow-sm align-self-end" style={styles.messageMine}>
              <strong className="d-block mb-1">Вы</strong>
              Всё отлично, перевел верстку на JSX!
            </div>

            <div className="bg-white p-3 rounded shadow-sm align-self-start" style={styles.messageOther}>
              <strong className="d-block mb-1 text-primary">Мария</strong>
              Отлично выглядит, Bootstrap 5 работает хорошо.
            </div>
          </div>

          {/* Форма ввода сообщения */}
          <div className="p-3 border-top bg-white">
            <form className="input-group" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Напишите сообщение..." 
                aria-label="Message" 
              />
              <button className="btn btn-primary" type="submit">
                Отправить
              </button>
            </form>
          </div>

        </main>
      </div>
    </div>
  )
}
export {Chats}