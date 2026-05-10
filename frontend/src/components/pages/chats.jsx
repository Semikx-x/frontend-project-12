import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchChannels, setActive, selectActive, newChannel, removeChannel } from "../slices/ChannelsSlice.js";
import { selectToken, logOut } from "../slices/LoginSlice.js";
import { fetchMessages, selectMessages, newMessage } from '../slices/MessagesSlice.js'
import { MessageInput } from "../input/MessageInput.jsx";
import { ChatList } from "../ChatComponent/ChatList.jsx";
import { io } from 'socket.io-client';
import { openModal } from "../slices/ModalSlice.js";
import NewChannelModal from "../Modals/NewChannelModal.jsx"
import EditChannelModal from "../Modals/ModalEditChannel.jsx";
import { useTranslation } from 'react-i18next'
import { LogButton } from '../Buttons/Button.jsx';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const Chats = () => {

  const navigate = useNavigate()
  const token = useSelector(selectToken)
  const activeChat = useSelector(selectActive)
  const dispatch = useDispatch()
  const messages = useSelector(selectMessages)
  const { t, i18n } = useTranslation()


  useEffect(() => {
    const socket = io();

    socket.on('newMessage', (payload) => {
      console.log('Новое сообщение через сокет:', payload);
      dispatch(newMessage(payload));
    });
    socket.on('newChannel', (payload) => {
      console.log('Создан новый канал:', payload);
      dispatch(newChannel(payload));
    });
    socket.on('removeChannel', (payload) => {
      console.log('Канал удален, ID:', payload.id);
      dispatch(removeChannel(payload.id));
    });
    socket.on('connect_error', (error) => {
      toast("Нет сети")
    })
    return () => {
      socket.off('newMessage');
      socket.off('newChannel')
      socket.off('removeChannel')
      socket.disconnect();
    };
  }, [dispatch])

  useEffect(() => {
    const loadData = async () => {
      const result = await dispatch(fetchChannels(token)).unwrap();
      dispatch(setActive(result[0]));

      if (fetchChannels.rejected.match(result)) {
        toast(result.payload)
      }
    };
    loadData();
  }, [dispatch, token])

  useEffect(() => {
    dispatch(fetchMessages(token))
  }, [activeChat, dispatch, token])

  const handleOut = async () => {
    await dispatch(logOut()).unwrap
    localStorage.removeItem('JWT')
    navigate('/login', { replace: true })
  }

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
  };

  return (
    <div style={styles.wrapper}>
      <NewChannelModal />
      <EditChannelModal />
      <aside style={styles.sidebar}>
        <div style={{ padding: '20px', fontSize: '1.2rem', borderBottom: '1px solid #3e4f5f' }}>
          {t('chats.channels')}
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
          <button size="sm" onClick={() => dispatch(openModal({ type: 'adding', extraData: null }))}>
            {t('chats.create')}
          </button>
          <ChatList />
        </div>
      </aside>

      <main style={styles.chatContainer}>
        <header style={styles.header}>
          <div>
            {activeChat?.name ?? ""}
          </div>
          <button variant="secondary" onClick={handleOut} className="me-2 ms-auto">Выйти</button>
        </header>

        <div style={styles.messagesList}>
          {messages
            .filter((message) => message.channelId === activeChat.id)
            .map((message) => (
              <div key={message.id} style={{ background: 'white', padding: '10px', borderRadius: '8px', width: 'fit-content' }}>
                {message.body}
              </div>
            ))
          }
        </div>
        <MessageInput />
      </main>
    </div>
  )
}
export { Chats }