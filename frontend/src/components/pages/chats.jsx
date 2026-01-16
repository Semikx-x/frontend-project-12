import { useEffect } from "react";
import { fetchChannels, selectError, selectStatus,  selectChannels} from "../slices/ChannelsSlice.js";

const Chats = () => {

  useEffect(() => {
    const result = fetchChannels()
    console.log(result)
  }, [])

  const styles = {
    wrapper: {
      display: 'flex',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    },
    sidebar: {
      width: '260px',
      backgroundColor: '#2c3e50',
      color: 'white',
      display: 'flex',
      flexDirection: 'column'
    },
    chatContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f5f5f5',
      position: 'relative'
    },
    header: {
      height: '60px',
      padding: '0 20px',
      backgroundColor: 'white',
      borderBottom: '1px solid #ddd',
      display: 'flex',
      alignItems: 'center',
      fontWeight: 'bold'
    },
    messagesList: {
      flex: 1,
      overflowY: 'auto',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    },
    inputWrapper: {
      padding: '20px',
      backgroundColor: 'white',
      borderTop: '1px solid #ddd'
    },
    form: {
      display: 'flex',
      gap: '10px',
      maxWidth: '1000px',
      margin: '0 auto',
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
      <aside style={styles.sidebar}>
        <div style={{ padding: '20px', fontSize: '1.2rem', borderBottom: '1px solid #3e4f5f' }}>
          Каналы
        </div>
      </aside>

      <main style={styles.chatContainer}>
        <header style={styles.header}>
          # general
        </header>

        <div style={styles.messagesList}>
        </div>

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