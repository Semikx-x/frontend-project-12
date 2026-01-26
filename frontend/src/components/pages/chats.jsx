import { useEffect,} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { fetchChannels, selectChannels, setActive, selectActive } from "../slices/ChannelsSlice.js";
import { selectToken, selectUser } from "../slices/LoginSlice.js";
import { fetchMessages, selectMessages, newMessage } from '../slices/MessagesSlice.js'
import { MessageInput } from "../input/MessageInput.jsx";
import { ChatList } from "../ChatComponent/ChatList.jsx";
import { io } from 'socket.io-client';
import { openModal } from "../slices/ModalSlice.js";
import NewChannelModal from "../Modals/NewChannelModal.jsx"
import EditChannelModal from "../Modals/ModalEditChannel.jsx";


const Chats = () => {
  
  const token = useSelector(selectToken)
  const activeChat = useSelector(selectActive)
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const messages = useSelector(selectMessages)

  useEffect(() => {
    const socket = io();

    socket.on('newMessage', (payload) => {
      console.log('Новое сообщение через сокет:', payload);
      dispatch(newMessage(payload)); 
    });
    return () => {
      socket.off('newMessage');
      socket.disconnect();
    };
  }, [dispatch])

  useEffect(() => {
  const loadData = async () => {
    const result = await dispatch(fetchChannels(token)).unwrap();
    dispatch(setActive(result[0]));
    };
    loadData();
  }, [dispatch, token])

  useEffect(() => {
    dispatch(fetchMessages(token))
  }, [activeChat])


  //console.log(messages)

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
      <NewChannelModal/>
      <EditChannelModal/>
      <aside style={styles.sidebar}>
        <div style={{ padding: '20px', fontSize: '1.2rem', borderBottom: '1px solid #3e4f5f' }}>
          Каналы
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <button variant="outline-light" size="sm" onClick={() => dispatch(openModal({ type: 'adding', extraData: null}))}>
            СОздать канал
          </button>
          <ChatList/>
        </div>
      </aside>

      <main style={styles.chatContainer}>
        <header style={styles.header}>
          # general
        </header>

        <div style={styles.messagesList}>
          {messages
            .filter((message) => message.channelId === activeChat)
            .map((message) => (
          <div key={message.id} style={{ background: 'white', padding: '10px', borderRadius: '8px', width: 'fit-content' }}>
            {message.body}
            </div>
            ))
          }
        </div>
        <MessageInput/>
      </main>
    </div>
  )
}
export {Chats}