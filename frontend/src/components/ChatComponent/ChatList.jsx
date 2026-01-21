import { useSelector, useDispatch } from 'react-redux'
import { selectChannels, setActive } from "../slices/ChannelsSlice.js";


export const ChatList = () => {

  const dispatch = useDispatch()
  const channels = useSelector(selectChannels)

  return (
    channels.map(chan => (
      <div key={chan.id}  onClick={() => dispatch(setActive(chan.id))} style={{ padding: '12px 20px', cursor: 'pointer' }}>
        # {chan.name}
      </div>
    ))
  )
}