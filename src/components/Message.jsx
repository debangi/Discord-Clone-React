import { Avatar } from '@mui/material';
import React from 'react';
import './Message.css';

const Message = () => {
  return (
    <div className='message'>
      <Avatar src='https://avatars.githubusercontent.com/u/67732957?v=4' />
      <div className='message__info'>
        <h4>
          Debangi
          <span className='span message__timestamp'>this is timestamp</span>
        </h4>
        <p>This is message</p>
      </div>
    </div>
  );
};

export default Message;
