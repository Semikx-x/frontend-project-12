import { Badge } from 'react-bootstrap'

const Chats = () => {

  const styles = {
    // Главный контейнер на весь экран
    wrapper: {
      display: 'flex',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden', // Чтобы не было общего скролла страницы
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    },
    // Боковая панель
    sidebar: {
      width: '260px',
      backgroundColor: '#2c3e50',
      color: 'white',
      display: 'flex',
      flexDirection: 'column'
    },
    // Правая часть (чат)
    chatContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column', // Располагаем элементы вертикально
      backgroundColor: '#f5f5f5',
      position: 'relative'
    },
    // Шапка чата
    header: {
      height: '60px',
      padding: '0 20px',
      backgroundColor: 'white',
      borderBottom: '1px solid #ddd',
      display: 'flex',
      alignItems: 'center',
      fontWeight: 'bold'
    },
    // Область сообщений (занимает всё доступное место)
    messagesList: {
      flex: 1,               // Это заставляет блок растягиваться
      overflowY: 'auto',     // Включает внутренний скролл
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    },
    // Форма ввода (всегда внизу)
    inputWrapper: {
      padding: '20px',
      backgroundColor: 'white',
      borderTop: '1px solid #ddd'
    },
    form: {
      display: 'flex',
      gap: '10px',
      maxWidth: '1000px',
      margin: '0 auto', // Центрируем форму внутри нижней панели
      width: '100%'
    },
    input: {
      flex: 1,
      padding: '12px 15px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      outline: 'none',
      fontSize: '16px'
    },
    button: {
      padding: '10px 25px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600'
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Список каналов */}
      <aside style={styles.sidebar}>
        <div style={{ padding: '20px', fontSize: '1.2rem', borderBottom: '1px solid #3e4f5f' }}>
          Каналы
        </div>
      </aside>

      {/* Основной интерфейс чата */}
      <main style={styles.chatContainer}>
        <header style={styles.header}>
          # general
        </header>

        {/* Эта область будет скроллиться, если сообщений много */}
        <div style={styles.messagesList}>
        </div>

        {/* Форма, прикрепленная к низу */}
        <footer style={styles.inputWrapper}>
          <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
            <input 
              style={styles.input} 
              type="text" 
              placeholder="Написать в #general..." 
              value=''
            />
            <button style={styles.button} type="submit">Отправить</button>
          </form>
        </footer>
      </main>
    </div>
  )
}
export {Chats}