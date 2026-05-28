import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import filter from 'leo-profanity'
import {
  fetchChannels, setActive, selectActive, newChannel, removeChannel,
} from '../slices/ChannelsSlice.js'
import { selectToken, logOut, selectAuth } from '../slices/LoginSlice.js'
import { fetchMessages, selectMessages, newMessage } from '../slices/MessagesSlice.js'
import MessageInput from '../input/MessageInput.jsx'
import ChatList from '../ChatComponent/ChatList.jsx'
import { openAddModal } from '../slices/ModalSlice.js'
import NewChannelModal from '../Modals/NewChannelModal.jsx'
import EditChannelModal from '../Modals/ModalEditChannel.jsx'
import ModalDelete from '../Modals/ModalDelete.jsx'

const Chats = () => {
  const navigate = useNavigate()
  const token = useSelector(selectToken)
  const activeChat = useSelector(selectActive)
  const dispatch = useDispatch()
  const messages = useSelector(selectMessages)
  const { t } = useTranslation()
  filter.clearList()
  filter.add(filter.getDictionary('en'))
  filter.add(filter.getDictionary('ru'))
  const isAuth = useSelector(selectAuth)

  useEffect(() => {
    if (!isAuth) {
      navigate('/login', { replace: true })
    }
  })

  useEffect(() => {
    const socket = io()

    socket.on('newMessage', (payload) => {
      console.log('Новое сообщение через сокет:', payload)
      dispatch(newMessage(payload))
    })
    socket.on('newChannel', (payload) => {
      console.log('Создан новый канал:', payload)
      dispatch(newChannel(payload))
    })
    socket.on('removeChannel', (payload) => {
      console.log('Канал удален, ID:', payload.id)
      dispatch(removeChannel(payload.id))
    })
    socket.on('connect_error', () => {
      toast('Нет сети')
    })
    return () => {
      socket.off('newMessage')
      socket.off('newChannel')
      socket.off('removeChannel')
      socket.disconnect()
    }
  }, [dispatch])

  useEffect(() => {
    const loadData = async () => {
      const result = await dispatch(fetchChannels(token)).unwrap()
      dispatch(setActive(result[0]))

      if (fetchChannels.rejected.match(result)) {
        toast(result.payload)
      }
    }
    loadData()
  }, [dispatch, token])

  useEffect(() => {
    dispatch(fetchMessages(token))
  }, [activeChat, dispatch, token])

  const handleOut = async () => {
    await dispatch(logOut()).unwrap
    localStorage.removeItem('JWT')
    navigate('/login', { replace: true })
  }

  return (
    <div className="d-flex vh-100 vw-100 overflow-hidden bg-light">
      <NewChannelModal />
      <EditChannelModal />
      <ModalDelete />
      <aside className="d-flex flex-column text-white bg-dark border-end" style={{ width: '260px' }}>
        <div className="p-4 border-bottom border-secondary lh-sm fw-bold">
          {t('chats.channels')}
        </div>
        <div className="flex-grow-1 overflow-auto p-3">
          <button
            type="button"
            className="btn btn-primary w-100 mb-3"
            onClick={() => dispatch(openAddModal({ extraData: null }))}
          >
            {t('chats.create')}
          </button>
          <ChatList />
        </div>
      </aside>

      <main className="d-flex flex-column flex-grow-1 bg-light position-relative">
        <header className="navbar navbar-expand navbar-light bg-white border-bottom px-4 shadow-sm" style={{ height: '60px' }}>
          <div className="navbar-brand fw-bold m-0 text-truncate" style={{ maxWidth: '70%' }}>
            {activeChat?.name ?? ''}
          </div>
          <button
            type="button"
            onClick={handleOut}
            className="btn btn-outline-danger btn-sm ms-auto"
          >
            Выйти
          </button>
        </header>

        <div className="flex-grow-1 overflow-auto p-4 d-flex flex-column gap-3">
          {messages
            .filter(message => message.channelId === activeChat?.id)
            .map(message => (
              <div
                key={message.id}
                className="bg-white p-3 rounded shadow-sm border border-light align-self-start"
                style={{ maxWidth: '75%' }}
              >
                <div className="fw-bold small text-muted mb-1">{message.userName}</div>
                <div className="text-break">{filter.clean(message.body)}</div>
              </div>
            ))}
        </div>
        <div className="p-3 bg-white border-top">
          <MessageInput />
        </div>
      </main>
    </div>
  )
}
export default Chats
