import { useSelector, useDispatch } from 'react-redux';
import filter from 'leo-profanity';
import { selectChannels, setActive } from '../slices/ChannelsSlice.js';
import { openEditModal } from '../slices/ModalSlice.js';

const ChatList = () => {
  filter.clearList();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  const dispatch = useDispatch();
  const channels = useSelector(selectChannels);

  return (
    channels.map((chan) => (
      <div
        key={chan.id}
        onClick={() => dispatch(setActive(chan))}
        style={{ padding: '12px 20px', cursor: 'pointer' }}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') dispatch(setActive(chan)); }}
        tabIndex={0}
        role="button"
      >
        <span>{filter.clean(`# ${chan.name}`)}</span>
        {chan.removable && (
          <button
            type="button"
            size="sm"
            onClick={() => dispatch(openEditModal({ extraData: chan }))}
          >
            Управление каналом
          </button>
        )}
      </div>
    ))
  );
};

export default ChatList;
