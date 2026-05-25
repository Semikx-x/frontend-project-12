import { useSelector, useDispatch } from 'react-redux'
import { selectChannels, setActive } from "../slices/ChannelsSlice.js";
import { openEditModal } from '../slices/ModalSlice.js';
import filter from 'leo-profanity'


export const ChatList = () => {

  filter.clearList()
  filter.add(filter.getDictionary('en'))
  filter.add(filter.getDictionary('ru'))

  const dispatch = useDispatch()
  const channels = useSelector(selectChannels)

  return (
    channels.map(chan => (
      <div key={chan.id} onClick={() => dispatch(setActive(chan))} style={{ padding: '12px 20px', cursor: 'pointer' }}>
        <span role="button">{filter.clean(`# ${chan.name}`)}</span>
        {chan.removable && (
          <button 
            variant="outline-light" 
            size="sm" 
            onClick={() => dispatch(openEditModal({ extraData: chan }))}
          >
            Управление каналом
          </button>
    )}
      </div>
    ))
  )
}