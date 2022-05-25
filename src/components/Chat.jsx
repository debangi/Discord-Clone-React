import React from 'react';
import ChatHeader from './ChatHeader';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';
import GifRoundedIcon from '@mui/icons-material/GifRounded';
import InsertEmoticonRoundedIcon from '@mui/icons-material/InsertEmoticonRounded';
import './Chat.css';

const Chat = () => {
  return (
    <div className='chat'>
      <ChatHeader />
      <div className='chat__messages'></div>
      <div className='chat__input'>
        <AddCircleRoundedIcon fontSize='large' />
        <form>
          <input placeholder={`Message #TESTCHANNEL`} />
          <button className='chat__inputButton' type='submit'>
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
