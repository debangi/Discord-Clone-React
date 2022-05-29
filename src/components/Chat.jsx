import React, { useEffect, useState } from 'react';
import Message from './Message';
import ChatHeader from './ChatHeader';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';
import GifRoundedIcon from '@mui/icons-material/GifRounded';
import InsertEmoticonRoundedIcon from '@mui/icons-material/InsertEmoticonRounded';
import { useSelector } from 'react-redux';
import { selectChannelId, selectChannelName } from '../features/appSlice';
import './Chat.css';
import { selectUser } from '../features/userSlice';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase-config';

const Chat = () => {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      const q = query(
        collection(db, 'channels', `${channelId}`, 'messages'),
        orderBy('timestamp', 'desc')
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
      return unsubscribe;
    }
  }, [channelId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const messagesDocRef = doc(
      db,
      'channels',
      `${channelId}`,
      'messages',
      `${channelId}message${Date.now()}`
    );
    const payload = {
      timestamp: Timestamp.now(),
      message: input,
      user: user,
    };
    await setDoc(messagesDocRef, payload);
    setInput('');
  };

  return (
    <div className='chat'>
      <ChatHeader channelName={channelName} />
      <div className='chat__messages'>
        {messages.map(({ id, data }) => (
          <Message
            key={id}
            message={data.message}
            user={data.user}
            timestamp={data.timestamp}
          />
        ))}
      </div>
      <div className='chat__input'>
        <AddCircleRoundedIcon fontSize='large' />
        <form>
          <input
            placeholder={`Message #${channelName}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!channelId}
          />
          <button
            className='chat__inputButton'
            type='submit'
            disabled={!channelId}
            onClick={sendMessage}
          >
            Send
          </button>
        </form>
        <div className='chat__inputIcons'>
          <CardGiftcardRoundedIcon />
          <GifRoundedIcon />
          <InsertEmoticonRoundedIcon />
        </div>
      </div>
    </div>
  );
};

export default Chat;
